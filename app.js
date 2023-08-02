const express = require('express'); // Importing the Express framework
const app = express(); // Creating an Express application
const http = require('http').createServer(app); // Creating an HTTP server using the Express app
const TelegramBot = require('node-telegram-bot-api'); // Importing the Telegram Bot API library
const token = '6593417642:AAGG9mredKRabowDju05FwAv4u90nfP4a2s'; // Telegram Bot token
const bot = new TelegramBot(token, {polling: true}); // Creating a new instance of the Telegram Bot
const { gameOptions, againOptions, wheelOptions, notMoneyOptions, allOptions, onlyProfile } = require('./options'); // Importing various options from './options.js' file
const PORT = 3000; // Setting the port for the Express server
const chats = { }; // Object to store game data for each chat
let profileInfo = { userName: '', winCount: 0, coins: 0 }; // Object to store user profile information
const wheelFortune = [0, 1, 3, 5, 20, 50]; // Array representing the possible outcomes of the wheel
let rewardArr = [ { value: 1, name: 'монету' }, { value: 3, name: 'мішок з монетами' },{ value: 6, name: 'ящик з монетами' },{ value: 12, name: 'скриня' } ]; // Array of reward objects, each containing a value and a name

http.listen(PORT, () => {
    console.log(`Server work on port: ${PORT}`); // Starting the Express server and logging the port number
});

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Аррр, так, не підглядуй, друже, куди я їх сховаю!💰'); // Sending a message to the chat
    const randomNumber = JSON.stringify(Math.floor(Math.random() * 9 + 1)); // Generating a random number between 1 and 9
    chats[chatId] = randomNumber; // Storing the random number for the specific chat
    await bot.sendMessage(chatId, 'Гаразд, все, готово! Тепер давай знайдемо цей дорогоцінний скарб! 🏴‍☠️💰 Поглянь уважно на ці мішки, а коли будеш готовий, скажи номер мішки, яку обираєш. Хай щастить у твоєму полюванні на "Скарби Піратів"! ⚓️🗺️', gameOptions); // Sending a message with game instructions and options
};

// Set custom commands for the bot
const start = () => {
    bot.setMyCommands([
        { command: '/start', description: 'Вітання 👋' },
        { command: '/profile', description: 'Мій профіль 👤' },
        { command: '/startgame', description: 'Зіграти 🎮' },
        { command: '/wheeloffortune', description: 'Колесо фортуни ⚓️🗺️' },
        { command: '/info', description: 'Опис гри ℹ️' },
        { command: '/author', description: 'Про автора 🇺🇦' },
    ]);

    // Handle incoming messages
    bot.on('message', async (msg, match) => {
        profileInfo.userName = msg.chat.username;
        const chatId = msg.chat.id;
        const text = msg.text;
        if (text === '/start') {
            return bot.sendMessage(chatId, 'Ахой, мореплавцю! Вітаю тебе на борту "Скарбів Піратів"! Я - капітан бот, і я вже приховав свій скарб глибоко в недоступних морських таємницях. Ти готовий випробувати свої навички та знайти скарб разом зі мною? Вгадуй число, щоб дістатися до скарбової винагороди! 🏴‍☠️🎲', allOptions);
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Агарр, мій відважний друже! Слухай, я приховав свій скарб у мішках, але лише одна з них приховує справжні багатства 💰💎. Твоя мета - правильно вгадати, в якій саме бочці схований скарб.\nОсь як працює гра:\n1. Ти обираєш бочку, в яку хочеш заглянути . Наприклад, якщо хочеш перевірити бочку, то обери її.\n2. Я відкриваю вибрану бочку... Але хи-хи, не так все просто!\n3. Якщо не вдалось, ти вибираєш наступну бочку і так далі, доки не відшукаєш скарб! Пам'ятай, друже, часу небагато, а скарб може бути дуже близько до тебе... чи далеко від твоїх рук! ⌛️🗝\n\nПідготуй свої команди і показуй, що ти гідний здобути наші скарби, як справжній сміливий пірат! Якщо готовий до пригод то ми відправимось у цю захоплюючу подорож /startgame ! 🏴‍☠️🗺️`, onlyProfile);
        }
        if (text === '/startgame') {
            return startGame(chatId);
        }
        if (text === '/profile') {
            return bot.sendMessage(chatId, `Ім'я пірата: ${profileInfo.userName} 🏴‍☠️\nКількість перемог: ${profileInfo.winCount} 🥇\nМонет : ${profileInfo.coins} 🪙 `, allOptions);
        }
        if (text === '/wheeloffortune') {
            return bot.sendMessage(chatId, `Ахої, мої сміливі мореплавці! Вітаю на борту "Колеса Фортуни" - захоплюючої гри для справжніх піратів! 🏴‍☠️⚓️\n\nОсь правила гри "Колесо Фортуни":\n\n1. Кожне покручення "Колеса Фортуни" коштує 10 монет. Збирайте монети, аби отримати шанс на великі призи! 💰💰\n\n2. Колесо має 5 секторів, в яких можуть випасти різні виграші:\n\n0 монет 😞: Ох, не вдача, друже! Не засмучуйся, збери ще монет та спробуй знову! 💔\n1 монета 🎖️: Маленька винагорода, але знайти скарби потрібно з початку! Продовжуй свою непереборну пригоду! 🏴‍☠️\n3 монети 🎯: Чудово! Ти на правильному шляху до багатства! Так тримати, мореплавцю! 🥳\n5 монет 💎: О-о, це вже цікаво! Майже під дощем скарбів! Продовжуй свою піратську мету! 🏴‍☠️💰\n20 монет 🌟: Велика перемога! Твоя міць та майстерність оцінені великою нагородою! Насолоджуйся своїми здобичами! 🏆💰\n3. А ось і головний приз - 50 монет 💰💰💰: Ох, ти дійшов до найбільшого скарбу! Твоя невпинність та мужність винагороджені найбільшими багатствами! Тепер ти - справжній капітан "Колеса Фортуни"! 🏴‍☠️🏴‍☠️🏴‍☠️\n\n4. Пам'ятай, сміливі пірати, часу небагато! Не гай часу та збирай монети, аби знову спробувати свою удачу на "Колесі Фортуни"! ⏳⏳⏳\n\nАхої, нехай удача буде на твоєму боці, сміливий мореплавцю! Пригоди та скарби чекають на тебе на "Колесі Фортуни"! ⚓️🗺️🎡`, wheelOptions);
        }
        if (text === '/author') {
            return bot.sendMessage(chatId, `Якщо ви бажаєте підтримати розробника та допомогти мені стати ще кращим, можна пожертвувати кошти на його банківську картку. Ось номер банківської карти для підтримки:\n\n🏴‍☠️ Номер карти: 4441 1111 3312 5454 💳\n\n👤 Автор: @firstbigmac 💰\n\nВаші щедрі пожертви допоможуть розробнику продовжувати працювати над моїм розвитком, додавати нові функції та робити мене ще кращим для вас, дорогі користувачі! Дякуємо вам за вашу підтримку та віру в мою міць!\n\nАхої, сміливі друзі! Нехай вас завжди супроводжує удача у всіх ваших пригодах! ⚓️🗺️💰`, onlyProfile);
        }
        return bot.sendMessage(chatId, 'Ви помилились кораблем !🏳️');
    });

    // Handle callback queries
    bot.on('callback_query', async (msg) => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        let rewardIndex = Math.floor(Math.random() * 3);
        let wheelIndex = Math.floor(Math.random() * 5);
        let rewardVal = rewardArr[rewardIndex].value;
        let rewardName = rewardArr[rewardIndex].name;
        if (data === '/again') {
            return startGame(chatId);
        }
        if (data === chats[chatId]) {
            profileInfo.winCount++;
            profileInfo.coins += rewardVal;
            return bot.sendMessage(chatId, `Ти вгадав, і знайшов ${rewardName}! (${rewardVal} монет) 💰`, againOptions);
        }
        if (data === '/profile') {
            return bot.sendMessage(chatId, `Ім'я пірата: ${profileInfo.userName} 🏴‍☠️\nКількість перемог: ${profileInfo.winCount} 🥇\nМонет : ${profileInfo.coins} 🪙 `, allOptions);
        }
        if (data === '/wheeloffortune') {
            return bot.sendMessage(chatId, `Ахої, мої сміливі мореплавці! Вітаю на борту "Колеса Фортуни" - захоплюючої гри для справжніх піратів! 🏴‍☠️⚓️\n\nОсь правила гри "Колесо Фортуни":\n\n1. Кожне покручення "Колеса Фортуни" коштує 10 монет. Збирайте монети, аби отримати шанс на великі призи! 💰💰\n\n2. Колесо має 5 секторів, в яких можуть випасти різні виграші:\n\n0 монет 😞: Ох, не вдача, друже! Не засмучуйся, збери ще монет та спробуй знову! 💔\n1 монета 🎖️: Маленька винагорода, але знайти скарби потрібно з початку! Продовжуй свою непереборну пригоду! 🏴‍☠️\n3 монети 🎯: Чудово! Ти на правильному шляху до багатства! Так тримати, мореплавцю! 🥳\n5 монет 💎: О-о, це вже цікаво! Майже під дощем скарбів! Продовжуй свою піратську мету! 🏴‍☠️💰\n20 монет 🌟: Велика перемога! Твоя міць та майстерність оцінені великою нагородою! Насолоджуйся своїми здобичами! 🏆💰\n3. А ось і головний приз - 50 монет 💰💰💰: Ох, ти дійшов до найбільшого скарбу! Твоя невпинність та мужність винагороджені найбільшими багатствами! Тепер ти - справжній капітан "Колеса Фортуни"! 🏴‍☠️🏴‍☠️🏴‍☠️\n\n4. Пам'ятай, сміливі пірати, часу небагато! Не гай часу та збирай монети, аби знову спробувати свою удачу на "Колесі Фортуни"! ⏳⏳⏳\n\nАхої, нехай удача буде на твоєму боці, сміливий мореплавцю! Пригоди та скарби чекають на тебе на "Колесі Фортуни"! ⚓️🗺️🎡`, wheelOptions);
        }
        if (data === '/wheel') {
            if (profileInfo.coins >= 10) {
                profileInfo.coins -= 10;
                profileInfo.coins += wheelFortune[wheelIndex];
                return bot.sendMessage(chatId, `Аррр! Чудовий вибір, сміливий мореплавцю! 🎡🏴‍☠️\nКолесо обертається, момент істини настав! ⏳\nШуршки Клік Клік Клік\nТа-дам! Що ж нас чекає? 🥁\n🎉 Ви виграли ${wheelFortune[wheelIndex]} монет! 💎 Непогана добивка, але може бути ще більше скарбів! ...`, wheelOptions);
            } else {
                return bot.sendMessage(chatId, `Недостатньо монет на рахунку 😞🪙`, notMoneyOptions);
            }
        }
        if (data === '/startgame') {
            return startGame(chatId);
        }
        if (data === '/info') {
            return bot.sendMessage(chatId, `Агарр, мій відважний друже! Слухай, я приховав свій скарб у мішках, але лише одна з них приховує справжні багатства 💰💎. Твоя мета - правильно вгадати, в якій саме бочці схований скарб.\nОсь як працює гра:\n1. Ти обираєш бочку, в яку хочеш заглянути . Наприклад, якщо хочеш перевірити бочку, то обери її.\n2. Я відкриваю вибрану бочку... Але хи-хи, не так все просто!\n3. Якщо не вдалось, ти вибираєш наступну бочку і так далі, доки не відшукаєш скарб! Пам'ятай, друже, часу небагато, а скарб може бути дуже близько до тебе... чи далеко від твоїх рук! ⌛️🗝\n\nПідготуй свої команди і показуй, що ти гідний здобути наші скарби, як справжній сміливий пірат! Якщо готовий до пригод то ми відправимось у цю захоплюючу подорож /startgame ! 🏴‍☠️🗺️`, onlyProfile);
        }
        if (data === '/author') {
            return bot.sendMessage(chatId, `Якщо ви бажаєте підтримати розробника та допомогти мені стати ще кращим, можна пожертвувати кошти на його банківську картку. Ось номер банківської карти для підтримки:\n\n🏴‍☠️ Номер карти: 4441 1111 3312 5454 💳\n\n👤 Автор: @firstbigmac 💰\n\nВаші щедрі пожертви допоможуть розробнику продовжувати працювати над моїм розвитком, додавати нові функції та робити мене ще кращим для вас, дорогі користувачі! Дякуємо вам за вашу підтримку та віру в мою міць!\n\nАхої, сміливі друзі! Нехай вас завжди супроводжує удача у всіх ваших пригодах! ⚓️🗺️💰`, onlyProfile);
        } else {
            bot.sendMessage(chatId, `Ви обрали мішок під номером: ${data}, і не вгадали, спробуйте ще раз ⚓️🗺️`, againOptions);
        }
    });
};

// Function start call
start();