import puppeteer from 'puppeteer';
import fs from 'fs';
import newsCoinGate from '../../usecase/gate/newsCoinGate.js';

setInterval(
    async function botLuanchGate() {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);

        await page.goto('https://www.gate.io/pt/articlelist/ann/0');

        const listCoin = await page.evaluate(() => {
            const nodeCoin = document.querySelectorAll('div.entry a');
            const arrayCoin = [...nodeCoin];

            const listCoin = arrayCoin.map(coin => ({
                href: coin.href,
                title: coin.innerText
            }))

            return listCoin
        });


        fs.writeFile('src/bots/gate/luanchCoinGate.json', JSON.stringify(listCoin, null, 2), err => {
            if (err) throw new Error('something went wrong');

            console.log('Json created');

            newsCoinGate();
        });

        await browser.close();
    }, 15000
);