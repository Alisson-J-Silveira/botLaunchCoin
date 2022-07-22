const fs = require('fs/promises');
const messageSet = require('../../telegramAPI/sendMessage.js');

async function newsCoinGate(newsCoin) {
    const data = await fs.readFile('src/usecase/gate/memoryCoinGate.json', 'utf8', (err, data) => {
        if (err) console.log(err);

        return data;
    });

    const memoryCoinGate = await JSON.parse(data);
    const lestedCoin = newsCoin;

    if (lestedCoin.href !== memoryCoinGate.href) {
        fs.writeFile('src/usecase/gate/memoryCoinGate.json', JSON.stringify(lestedCoin, null, 2), err => {
            if (err) throw new Error('something went wrong');
        });

        return messageSet.messageSet(lestedCoin);
    } else {
        return console.log('mesmo post');
    }

};

module.exports.newsCoinGate = newsCoinGate;