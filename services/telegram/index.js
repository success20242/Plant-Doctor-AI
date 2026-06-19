const axios = require("axios");

async function sendTelegram(message) {
  await axios.post(
    `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`,
    {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: message
    }
  );
}

module.exports = { sendTelegram };
