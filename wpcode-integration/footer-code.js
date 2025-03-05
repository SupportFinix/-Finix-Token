<script>
const isPhantomInstalled = () => {
    return window.solana && window.solana.isPhantom;
};

const connectPhantom = async () => {
    if (!isPhantomInstalled()) {
        alert("⚠️ Phantom Wallet no está instalada. Descárgala en: https://phantom.app/");
        return;
    }

    try {
        const provider = window.solana;
        const response = await provider.connect();
        const walletAddress = response.publicKey.toString();
        
        console.log("✅ Conectado a:", walletAddress);

        const shortAddress = walletAddress.slice(0, 4) + "..." + walletAddress.slice(-4);
        document.getElementById("connect-button").innerText = "Conectado: " + shortAddress;
        document.getElementById("wallet-status").innerText = "Wallet conectada: " + shortAddress;
    } catch (err) {
        console.error("❌ Error al conectar con Phantom:", err);
    }
};

document.getElementById("connect-button").addEventListener("click", connectPhantom);
</script>