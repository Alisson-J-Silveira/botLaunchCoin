import messageSet from './messageSet.js';
import fs from 'fs';

const lestedCoin = undefined;
const lestedCoinMemory = undefined;

fs.readFile('src/bots/gate/luanchCoinGate.json', 'utf-8', (err, data) => {
    if (err) throw err;

    return lestedCoin = data[0];
});

fs.readFile('src/usecase/gate/memoryCoinGate.json', 'utf-8', (err, data) => {
    if (err) throw err;

    const lestedCoinMemory = data;

    newsCoinGate(lestedCoinMemory)
});

function dados(lestedCoin, lestedCoinMemory) {

}


async function newsCoinGate() {

}

export default newsCoinGate