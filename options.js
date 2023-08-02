const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: '💰', callback_data: '1' }, { text: '💰', callback_data: '2' }, { text: '💰', callback_data: '3' }],
            [{ text: '💰', callback_data: '4' }, { text: '💰', callback_data: '5' }, { text: '💰', callback_data: '6' }],
            [{ text: '💰', callback_data: '7' }, { text: '💰', callback_data: '8' }, { text: '💰', callback_data: '9' }],
        ]
    })
};

const againOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Грати ще раз 🏴‍☠️', callback_data: '/again' }, { text: 'Мій профіль 👤', callback_data: '/profile' }]
        ]
    })
};

const wheelOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Покрутити 💰', callback_data: '/wheel' }, { text: 'Мій профіль 👤', callback_data: '/profile' }]
        ]
    })
};

const notMoneyOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Грати 🏴‍☠️', callback_data: '/again' }, { text: 'Мій профіль 👤', callback_data: '/profile' }]
        ]
    })
};

const allOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Грати 🏴‍☠️', callback_data: '/startgame' }, { text: 'Мій профіль 👤', callback_data: '/profile' }, { text: 'Колесо фортуни ⚓️🗺', callback_data: '/wheeloffortune' }],
            [{ text: 'Опис гри ℹ️', callback_data: '/info' }, { text: 'Про автора 🇺🇦', callback_data: '/author' }]
        ]
    })
};

const onlyProfile = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Мій профіль 👤', callback_data: '/profile' }]
        ]
    })
};

module.exports = {
    gameOptions,
    againOptions,
    wheelOptions,
    notMoneyOptions,
    allOptions,
    onlyProfile
};