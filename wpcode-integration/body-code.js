<script type="module">
    import { Buffer } from "https://cdn.jsdelivr.net/npm/buffer@6.0.3/+esm";
    window.Buffer = Buffer;
</script>

<script>
document.addEventListener("DOMContentLoaded", async function() {
    if (typeof solanaWeb3 === "undefined") {
        console.error("⚠️ La librería solanaWeb3 no se cargó correctamente.");
        alert("⚠️ Error al cargar la librería de Solana. Revisa la conexión.");
    }

    if (window.solana && window.solana.isPhantom) {
        console.log("✅ Phantom Wallet detectado.");
        document.getElementById("wallet-status").innerText = "✅ Phantom Wallet detectado.";
    } else {
        console.log("⚠️ Phantom Wallet no detectado.");
        document.getElementById("wallet-status").innerText = "⚠️ Phantom Wallet no detectado. Descárgalo aquí: https://phantom.app/";
    }
});

async function connectPhantomWallet() {
    if (!window.solana || !window.solana.isPhantom) {
        alert("⚠️ Phantom Wallet no está instalada. Descárgala en: https://phantom.app/");
        return;
    }

    try {
        const provider = window.solana;
        const response = await provider.connect();
        const walletAddress = response.publicKey.toString();
        console.log("✅ Conectado a:", walletAddress);

        const shortAddress = walletAddress.slice(0, 4) + "..." + walletAddress.slice(-4);
        document.getElementById("wallet-address").innerText = "Wallet Conectada: " + shortAddress;
    } catch (err) {
        console.error("❌ Error al conectar con Phantom:", err);
    }
}

async function getSOLPrice() {
    try {
        const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd");
        const data = await response.json();
        return data.solana.usd;
    } catch (error) {
        console.error("⚠️ Error obteniendo precio de SOL:", error);
        alert("⚠️ No se pudo obtener el precio de SOL.");
        return null;
    }
}

async function sendCryptoToICO(token) {
    if (!window.solana || !window.solana.isPhantom) {
        alert("⚠️ Phantom Wallet no está instalada.");
        return;
    }

    try {
        const provider = window.solana;
        await provider.connect();
        const walletAddress = provider.publicKey.toString();
        console.log("✅ Wallet conectada:", walletAddress);

        const connection = new solanaWeb3.Connection("https://mainnet.helius-rpc.com/?api-key=bb1e0d38-2433-4316-9e10-5497b7b5005f");
        const recipient = new solanaWeb3.PublicKey("JA52eGi1F2tESgFGEU3ZmUDn6dEJmxDmjkobJ5yChcTt");

        let amountUSD = prompt("💰 Ingresa la cantidad en USD que deseas enviar:");
        if (!amountUSD || isNaN(amountUSD) || amountUSD <= 0) {
            alert("⚠️ Monto inválido. Intenta de nuevo.");
            return;
        }
        amountUSD = parseFloat(amountUSD);

        if (token === "SOL") {
            const solPrice = await getSOLPrice();
            if (!solPrice) return;

            const amountSOL = amountUSD / solPrice;
            const amountLamports = Math.round(amountSOL * 1e9);

            console.log(`💲 USD a SOL: ${amountUSD} USD ≈ ${amountSOL.toFixed(6)} SOL (${amountLamports} lamports)`);

            const transaction = new solanaWeb3.Transaction().add(
                solanaWeb3.SystemProgram.transfer({
                    fromPubkey: provider.publicKey,
                    toPubkey: recipient,
                    lamports: amountLamports,
                })
            );

            transaction.feePayer = provider.publicKey;
            transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

            const { signature } = await provider.signAndSendTransaction(transaction);
            console.log("✅ Transacción enviada:", signature);
            alert("✅ Transacción enviada con éxito: " + signature);


         await sendToGoogleSheets(walletAddress, amountUSD);
        }

    } catch (err) {
        console.error("❌ Error en la transacción:", err);
        alert("❌ Hubo un problema con la transacción.");
    }
}
async function sendToGoogleSheets(walletAddress, amountUSD) {
    const url = "https://script.google.com/macros/s/AKfycbzfj96E1mXuiquW-HdKvlW4rfuM7d6ROIj6ZkEW6BvwoNt4htQm3HeDUvZiDrwGE35w/exec";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                walletAddress: walletAddress,
                amountUSD: amountUSD
            })
        });

        const result = await response.text();
        console.log("📤 Respuesta del servidor:", result);

        if (result.includes("Error")) {
            throw new Error("⚠️ Google Sheets devolvió un error.");
        }

          console.error("✅ Datos enviados correctamente a Google Sheets.");

    } catch (error) {
        console.error("❌ Error al enviar datos a Google Sheets:", error);
         console.error("❌ No se pudo registrar la transacción en Google Sheets.");
    }
}




</script>


