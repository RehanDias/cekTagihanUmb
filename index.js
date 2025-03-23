const puppeteer = require("puppeteer");
const browserConfig = require("./config/browserConfig");
const authService = require("./services/auth");
const navigationService = require("./services/navigation");
const tagihanService = require("./services/tagihanService");
const printUtils = require("./utils/printUtils");

(async () => {
    // Clear terminal at start
    printUtils.clearTerminal();

    const browser = await puppeteer.launch(browserConfig);
    const page = await browser.newPage();

    try {
        // Login process
        const loginSuccess = await authService.login(page);

        if (loginSuccess) {
            // Navigate to linksia
            const linkSiaSuccess = await navigationService.navigateToLinkSia(
                page
            );

            if (linkSiaSuccess) {
                // Navigate to biomhs/lst
                const bioMhsSuccess = await navigationService.navigateToBioMhs(
                    page
                );

                if (bioMhsSuccess) {
                    // Get tagihan URL
                    const tagihanUrl = await tagihanService.getTagihanUrl(page);

                    if (tagihanUrl) {
                        // Extract and print billing info
                        const tagihanInfoPengembangan =
                            await tagihanService.extractBillingInfo(
                                page,
                                tagihanUrl,
                                "pengembangan"
                            );
                        const tagihanInfoPendidikan =
                            await tagihanService.extractBillingInfo(
                                page,
                                tagihanUrl,
                                "pendidikan"
                            );

                        printUtils.printBillingInfo(
                            "pengembangan",
                            tagihanInfoPengembangan
                        );
                        printUtils.printBillingInfo(
                            "pendidikan",
                            tagihanInfoPendidikan
                        );
                    }
                }
            }
        }
    } catch (error) {
        console.error("Terjadi error:", error.message);
    } finally {
        await browser.close();
    }
})();
