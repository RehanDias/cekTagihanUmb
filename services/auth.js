require("dotenv").config();

async function login(page) {
    await page.setDefaultNavigationTimeout(30000);

    await page.setRequestInterception(true);
    page.on("request", (req) => {
        if (
            req.resourceType() === "image" ||
            req.resourceType() === "stylesheet" ||
            req.resourceType() === "font"
        ) {
            req.abort();
        } else {
            req.continue();
        }
    });

    await page.setViewport({
        width: 1920,
        height: 1080,
    });

    try {
        await page.goto("https://sso.mercubuana.ac.id/", {
            waitUntil: "networkidle2",
        });
        await page.type("#UserUsername", process.env.MERCUBUANA_USERNAME);
        await page.type("#UserPassword", process.env.MERCUBUANA_PASSWORD);
        await Promise.all([
            page.click('button[type="submit"]'),
            page.waitForNavigation({ waitUntil: "networkidle2" }),
        ]);

        if (page.url() === "https://sso.mercubuana.ac.id/Users/profile") {
            console.log("Login berhasil!");
            await page.cookies();
            return true;
        } else {
            throw new Error("Login gagal. Periksa username dan password Anda.");
        }
    } catch (error) {
        console.error("Login error:", error.message);
        return false;
    }
}

module.exports = { login };
