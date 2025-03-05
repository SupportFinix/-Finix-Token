# 🚀 Finix Token - Integración con Phantom Wallet

Este proyecto permite la conexión con **Phantom Wallet** en **Solana**, el envío de transacciones en SOL y la consulta de tokens desde **Google Sheets**.

## 🛠️ Características
✅ **Conectar Phantom Wallet**: Detecta si Phantom está instalado y permite la conexión con la billetera.  
✅ **Enviar SOL a la ICO**: Convierte USD a SOL y permite enviar fondos al contrato.  
✅ **Registro de transacciones**: Guarda la transacción en Google Sheets automáticamente.  
✅ **Consulta de tokens**: Muestra cuántos tokens Finix tiene cada billetera en la base de datos.  

## 📂 Estructura del Código

### 📌 **Header (Encabezado)**
- Importa la librería `solanaWeb3.js` para interactuar con la blockchain de Solana.  
- Carga el buffer necesario para la compatibilidad del código.

### 📌 **Body (Cuerpo)**
- **Detecta Phantom Wallet** y muestra el estado en la página.  
- **Conecta la billetera** y muestra la dirección pública del usuario.  
- **Consulta el precio de SOL en USD** usando la API de CoinGecko.  
- **Convierte USD a SOL** y envía la transacción a la billetera de la ICO.  
- **Registra la transacción en Google Sheets** para llevar un control.  

### 📌 **Footer (Pie de Página)**
- Permite volver a conectar la billetera.  
- Consulta la cantidad de tokens asignados a una wallet desde **Google Sheets**.  

## 🚀 **Cómo Usarlo**
1. **Abrir la página en un navegador compatible (Chrome, Brave, Firefox).**  
2. **Conectar Phantom Wallet** haciendo clic en el botón correspondiente.  
3. **Ingresar el monto en USD** para enviar SOL a la ICO.  
4. **Confirmar la transacción** y verificar los tokens en la base de datos.  

## 🔗 **APIs Utilizadas**
- [Solana Web3.js](https://solana-labs.github.io/solana-web3.js/)
- [CoinGecko API](https://www.coingecko.com/en/api/documentation)
- [Google Sheets API](https://developers.google.com/sheets/api)

## ⚠️ **Advertencia**
Este código solo debe utilizarse con fines educativos. No almacena claves privadas ni interactúa con contratos inteligentes sin la autorización del usuario.  

---

📩 **Creado por:** [Support Finix](https://github.com/SupportFinix)  
