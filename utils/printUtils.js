function clearTerminal() {
    // For Windows
    if (process.platform === "win32") {
        process.stdout.write("\x1Bc");
    }
    // For Unix-like systems
    else {
        console.clear();
    }
}

function printBillingInfo(billingType, tagihanInfo) {
    // Header section with decorative borders
    console.log("\n" + "=".repeat(70));
    console.log(
        `║ INFORMASI ${
            billingType.toUpperCase() === "PENGEMBANGAN"
                ? "SUMBANGAN PENGEMBANGAN UNIVERSITAS"
                : "BIAYA PENDIDIKAN SEMESTER"
        } ║`
    );
    console.log("=".repeat(70));

    // Financial summary section
    console.log("\n📊 RINGKASAN KEUANGAN:");
    console.log(`💰 Total Tagihan\t\t: ${tagihanInfo["Total Tagihan :"]}`);
    console.log(`💳 Total Pembayaran\t: ${tagihanInfo["Total Pembayaran :"]}`);
    console.log(`💵 Saldo Terhutang\t: ${tagihanInfo["Saldo :"]}`);

    // Outstanding payments section
    console.log("\n📌 STATUS PEMBAYARAN:");

    if (tagihanInfo.TglJadwalBelumBayar.length > 0) {
        console.log("\n⚠️  TAGIHAN YANG BELUM DILUNASI:");
        tagihanInfo.TglJadwalBelumBayar.forEach((tagihan) => {
            if (billingType === "pendidikan") {
                console.log(`
🔸 Angsuran ke-${tagihan.ang}
   • Semester\t: ${tagihan.smt}
   • Jatuh Tempo\t: ${tagihan.tglJadwal}
   • Jumlah\t: ${tagihan.jmlTagihan}
                `);
            } else {
                console.log(`
🔸 Angsuran ke-${tagihan.ang}
   • Jatuh Tempo\t: ${tagihan.tglJadwal}
   • Jumlah\t: ${tagihan.jmlTagihan}
                `);
            }
        });
        console.log(
            "❗ Mohon segera melakukan pembayaran sebelum jatuh tempo untuk menghindari denda."
        );
    } else {
        console.log("\n✅ STATUS PEMBAYARAN: LUNAS");
        console.log("🎉 Selamat! Semua tagihan telah dilunasi.");
    }

    console.log("\n" + "=".repeat(70));
    console.log("ℹ️  Silakan hubungi bagian keuangan jika ada pertanyaan.");
    console.log("=".repeat(70) + "\n");
}

module.exports = {
    printBillingInfo,
    clearTerminal,
};
