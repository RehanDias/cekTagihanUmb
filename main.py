import asyncio
import os
from pyppeteer import launch
import pandas as pd
from PIL import Image
from io import BytesIO

CHROME_EXECUTABLE_PATH = "C:/Program Files/Google/Chrome/Application/chrome.exe"

async def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

async def capture_and_display_captcha(page):
    captcha_image = await page.querySelector("#image_captcha")
    screenshot = await captcha_image.screenshot()
    img = Image.open(BytesIO(screenshot))
    img.show()
    captcha = input("Enter the CAPTCHA: ")
    return captcha, img

async def login(page):
    username = input("Enter your username: ")
    password = input("Enter your password: ")

    await page.type('.username-input', username)
    await page.type('.password-input', password)

    captcha, img = await capture_and_display_captcha(page)
    await page.type('#captcha', captcha)

    await page.click(".bottom-right-login-container .rounded-submit")
    await asyncio.sleep(2)

    return username, img

async def check_login_errors(page):
    error_selectors = {
        "password": ".alert.alert-error",
        "username": ".alert.alert-error",
        "captcha": ".alert.alert-error"
    }

    for error_type, selector in error_selectors.items():
        has_error = await page.evaluate(f'''
            (selector) => {{
                const errorElement = document.querySelector(selector);
                if (errorElement) {{
                    if ('{error_type}' === 'captcha') {{
                        return errorElement.innerText.includes("Captha tidak sesuai");
                    }} else {{
                        return errorElement.innerText.includes("{{'Password anda tidak tepat' if error_type == 'password' else 'Akun yang anda masukkan tidak tersedia'}}");
                    }}
                }}
                return false;
            }}
        ''', selector)

        if has_error:
            await clear_screen()
            if error_type == 'captcha':
                print("Incorrect CAPTCHA. Please try again.")
            else:
                print(f"{'Incorrect password' if error_type == 'password' else 'Invalid username or account not found'}. Please try again.")
            return True

    return False

async def extract_billing_info(page, url, billing_type):
    await page.goto(url, waitUntil="domcontentloaded")
    await page.waitForSelector('table[align="center"][width="80%"][border="1"]', visible=True, timeout=30000)

    js_code = f'''
    () => {{
        const rows = document.querySelectorAll('table[align="center"][width="80%"][border="1"] tr');
        const TglJadwalBelumBayar = [];
        rows.forEach((row) => {{
            const columns = row.querySelectorAll("td.text10");
            if (columns.length >= {7 if billing_type == 'pengembangan' else 8}) {{
                const ang = columns[0].innerText.trim();
                const {f"tglJadwal = columns[1].innerText.trim();" if billing_type == 'pengembangan' else "smt = columns[1].innerText.trim();"}
                const {f"jmlTagihan = columns[2].innerText.trim();" if billing_type == 'pengembangan' else "tglJadwal = columns[2].innerText.trim();"}
                const {f"tglBayar = columns[3].innerText.trim();" if billing_type == 'pengembangan' else "jmlTagihan = columns[3].innerText.trim();"}
                const {f"bayarTagihan = columns[4].innerText.trim();" if billing_type == 'pengembangan' else "tglBayar = columns[4].innerText.trim();"}
                {f"" if billing_type == 'pengembangan' else "const bayarTagihan = columns[5].innerText.trim();"}
                if (!tglBayar && !bayarTagihan) {{
                    TglJadwalBelumBayar.push({{
                        ang,
                        {f"tglJadwal, jmlTagihan" if billing_type == 'pengembangan' else "smt, tglJadwal, jmlTagihan"}
                    }});
                }}
            }}
        }});

        const infoTableRows = document.querySelectorAll('tr.text10b > td[width="5%"][align="center"][colspan="{7 if billing_type == 'pengembangan' else 8}"][bgcolor="#ffffff"] > table[align="center"][width="50%"] tr');
        const tagihanData = {{}};
        infoTableRows.forEach((row) => {{
            const keyElement = row.querySelector("td.text10b");
            const valueElement = row.querySelector("td.text10b + td.text10b");
            if (keyElement && valueElement) {{
                const key = keyElement.innerText.trim();
                const value = valueElement.innerText.trim();
                tagihanData[key] = value;
            }}
        }});

        return {{ TglJadwalBelumBayar, ...tagihanData }};
    }}
    '''

    return await page.evaluate(js_code)

def print_billing_info(billing_type, tagihan_info):
    print(f"\n{'BIAYA SUMBANGAN PENGEMBANGAN' if billing_type == 'pengembangan' else 'BIAYA SUMBANGAN PENDIDIKAN'}")
    print(f"Total Tagihan: {tagihan_info['Total Tagihan :']}")
    print(f"Total Pembayaran: {tagihan_info['Total Pembayaran :']}")
    print(f"Saldo: {tagihan_info['Saldo :']}")

    if tagihan_info["TglJadwalBelumBayar"]:
        print("\nTagihan yang belum di bayar:")
        for tagihan in tagihan_info["TglJadwalBelumBayar"]:
            print(f"Ang: {tagihan['ang']} {'Semester: ' if billing_type == 'pendidikan' else ''}{tagihan['smt'] if billing_type == 'pendidikan' else tagihan['tglJadwal']} "
                  f"Belum Lunas Di tanggal: {tagihan['tglJadwal'] if billing_type == 'pendidikan' else tagihan['jmlTagihan']} "
                  f"Jml Tagihan: {tagihan['jmlTagihan'] if billing_type == 'pendidikan' else ''}")
    else:
        print("\nTagihan yang belum di bayar:\nSUDAH LUNAS. TIDAK PERLU ADA YANG DI BAYAR")
    print("-" * 50)

def save_to_excel(tagihan_info_pengembangan, tagihan_info_pendidikan, username):
    try:
        with pd.ExcelWriter(f'{username}_Tagihan.xlsx') as writer:
            pd.DataFrame(tagihan_info_pengembangan).to_excel(writer, sheet_name='Biaya Pengembangan', index=False)
            pd.DataFrame(tagihan_info_pendidikan).to_excel(writer, sheet_name='Biaya Pendidikan', index=False)
        print(f"Data tagihan telah berhasil disimpan di {username}_Tagihan.xlsx")
    except Exception as error:
        print(f"Error saving data to Excel: {error}")

async def main():
    await clear_screen()
    browser = await launch(headless="new", executablePath=CHROME_EXECUTABLE_PATH)
    page = await browser.newPage()

    try:
        await page.goto("https://sia.mercubuana.ac.id/gate.php/login", waitUntil="domcontentloaded")

        captcha_img = None
        login_successful = False
        while not login_successful:
            username, captcha_img = await login(page)
            if not await check_login_errors(page):
                login_successful = True
            else:
                await asyncio.sleep(1)  

        print("Login Success.")
        await clear_screen()
        if captcha_img:
            captcha_img.close()

        await page.goto("https://sia.mercubuana.ac.id/akad.php/biomhs/lst", waitUntil="domcontentloaded")
        await page.waitForSelector("#tagihan_wajibbayar a", visible=True, timeout=10000)

        tagihan_url = await page.evaluate('(selector) => document.querySelector(selector)?.href', "#tagihan_wajibbayar a")

        if tagihan_url:
            tagihan_info_pengembangan = await extract_billing_info(page, tagihan_url, 'pengembangan')
            tagihan_info_pendidikan = await extract_billing_info(page, tagihan_url, 'pendidikan')

            print_billing_info('pengembangan', tagihan_info_pengembangan)
            print_billing_info('pendidikan', tagihan_info_pendidikan)

            save_to_excel(tagihan_info_pengembangan, tagihan_info_pendidikan, username)
        else:
            print("URL Tagihan tidak ditemukan.")

    except Exception as error:
        print(f"An error occurred: {error}")
    finally:
        if captcha_img:
            captcha_img.close()
        await browser.close()

if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(main())
