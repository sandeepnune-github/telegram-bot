const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = '5985086319:AAGp5zq9vH_yXUunTXZqnj8suzhUcupE7mk';
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    if (msg.text.toLowerCase() === '/start') {
        bot.sendMessage(chatId, 'Welcome to the Chatbot! Type /cat to get a random cat image.');
    } else if (msg.text.toLowerCase() === '/cat') {
        axios.get('https://api.thecatapi.com/v1/images/search').then((response) => {
            bot.sendPhoto(chatId, response.data[0].url);
        }).catch((error) => {
            bot.sendMessage(chatId, 'Error fetching the cat image.');
        });
    } else {
        bot.sendMessage(chatId, 'Sorry, I did not understand that command.');
    }
});
