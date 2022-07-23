process.env.NTBA_FIX_319 = 1;

const TelegramBot = require('node-telegram-bot-api');
require('dotenv/config');

const token = process.env.TOKEN;
const chatIdEnvAli = process.env.ID_CHAT_ALI;
const chatIdEnvRog = process.env.ID_CHAT_ROG;

const bot = new TelegramBot(token, { polling: true });

async function messageSet(lestedCoin) {
    const message = await lestedCoin.href;

    await bot.sendMessage(chatIdEnvAli, message);
    await bot.sendMessage(chatIdEnvRog, message);
}

module.exports.messageSet = messageSet

bot.on('message', (msg) => {
    const chatID = msg.chat.id;
    const firstName = msg.chat.first_name;

    bot.sendMessage(chatID, `Olá ${firstName}, atualmente esse bot está em fase de testes, por isso você não receberá os avisos de lançamento.`);
});