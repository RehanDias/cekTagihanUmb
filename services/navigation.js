async function navigateToLinkSia(page) {
    try {
        const linksiaSelector = 'a[href="./linksia"]';
        const linksia = await page.$(linksiaSelector);

        if (linksia) {
            await page.evaluate((selector) => {
                const link = document.querySelector(selector);
                if (link) {
                    link.removeAttribute("target");
                }
            }, linksiaSelector);

            await Promise.all([
                linksia.click(),
                page.waitForNavigation({ waitUntil: "networkidle2" }),
            ]);

            if (page.url().includes("linksia")) {
                return true;
            } else {
                throw new Error("Gagal diarahkan ke halaman linksia.");
            }
        }
        return false;
    } catch (error) {
        console.error("Navigasi linksia error:", error.message);
        return false;
    }
}

async function navigateToBioMhs(page) {
    try {
        await page.goto("https://sia.mercubuana.ac.id/akad.php/biomhs/lst", {
            waitUntil: "networkidle2",
        });

        if (
            page
                .url()
                .includes("https://sia.mercubuana.ac.id/akad.php/biomhs/lst")
        ) {
            return true;
        } else {
            throw new Error("Gagal mengakses halaman biomhs/lst.");
        }
    } catch (error) {
        console.error("Navigasi biomhs error:", error.message);
        return false;
    }
}

module.exports = {
    navigateToLinkSia,
    navigateToBioMhs,
};
