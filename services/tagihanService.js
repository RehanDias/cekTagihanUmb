const scraperUtils = require("../utils/scraperUtils");

async function getTagihanUrl(page) {
    try {
        const tagihanUrl = await page.$eval(
            "#tagihan_wajibbayar a",
            (el) => el.href
        );
        if (tagihanUrl) {
            return tagihanUrl;
        } else {
            throw new Error("Link Tagihan tidak ditemukan.");
        }
    } catch (error) {
        console.error("Error mendapatkan URL tagihan:", error.message);
        return null;
    }
}

async function extractBillingInfo(page, url, billingType) {
    return await scraperUtils.extractBillingInfo(page, url, billingType);
}

module.exports = {
    getTagihanUrl,
    extractBillingInfo,
};
