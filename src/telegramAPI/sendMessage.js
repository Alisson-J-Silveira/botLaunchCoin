const TelegramBot = require('node-telegram-bot-api');
require('dotenv/config');

const token = process.env.TOKEN;
const chatIdEnv = process.env.ID_CHAT;

const bot = new TelegramBot(token, { polling: true });

async function messageSet(lestedCoin) {
    const message = await lestedCoin.href;

    await bot.sendMessage(chatIdEnv, message);
}
module.exports.messageSet = messageSet
