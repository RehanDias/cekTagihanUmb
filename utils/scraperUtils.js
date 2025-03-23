async function extractBillingInfo(page, url, billingType) {
    await page.goto(url, { waitUntil: "domcontentloaded" });

    await page.waitForSelector(
        'table[align="center"][width="80%"][border="1"]',
        {
            visible: true,
            timeout: 30000,
        }
    );

    const billingData = await page.evaluate((billingType) => {
        const rows = document.querySelectorAll(
            'table[align="center"][width="80%"][border="1"] tr'
        );
        const TglJadwalBelumBayar = [];

        rows.forEach((row) => {
            const columns = row.querySelectorAll("td.text10");
            if (columns.length >= (billingType === "pengembangan" ? 7 : 8)) {
                const ang = columns[0].innerText.trim();
                const smt =
                    billingType === "pendidikan"
                        ? columns[1].innerText.trim()
                        : null;
                const tglJadwal =
                    billingType === "pengembangan"
                        ? columns[1].innerText.trim()
                        : columns[2].innerText.trim();
                const jmlTagihan =
                    billingType === "pengembangan"
                        ? columns[2].innerText.trim()
                        : columns[3].innerText.trim();
                const tglBayar =
                    billingType === "pengembangan"
                        ? columns[3].innerText.trim()
                        : columns[4].innerText.trim();
                const bayarTagihan =
                    billingType === "pengembangan"
                        ? columns[4].innerText.trim()
                        : columns[5].innerText.trim();

                if (!tglBayar && !bayarTagihan) {
                    TglJadwalBelumBayar.push({
                        ang,
                        smt: billingType === "pendidikan" ? smt : undefined,
                        tglJadwal,
                        jmlTagihan,
                    });
                }
            }
        });

        const infoTableRows = document.querySelectorAll(
            'tr.text10b > td[width="5%"][align="center"][colspan="' +
                (billingType === "pengembangan" ? 7 : 8) +
                '"][bgcolor="#ffffff"] > table[align="center"][width="50%"] tr'
        );
        const tagihanData = {};

        infoTableRows.forEach((row) => {
            const keyElement = row.querySelector("td.text10b");
            const valueElement = row.querySelector("td.text10b + td.text10b");
            if (keyElement && valueElement) {
                const key = keyElement.innerText.trim();
                const value = valueElement.innerText.trim();
                tagihanData[key] = value;
            }
        });

        return { TglJadwalBelumBayar, ...tagihanData };
    }, billingType);

    return billingData;
}

module.exports = {
    extractBillingInfo,
};
