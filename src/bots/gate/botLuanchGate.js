const puppeteer = require('puppeteer');
const fs = require('fs');
const newsCoinGate = require('../../usecase/gate/newsCoinGate.js')

setInterval(
    async function botLuanchGate() {
        const browser = await puppeteer.launch({ args: ['--no-sandbox'] });;
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(0);

        await page.goto('https://www.gate.io/pt/articlelist/ann/0');

        await page.click('[data-cate="newlisted"]');
        await page.waitForNavigation();

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

            newsCoinGate.newsCoinGate(listCoin[0]);
        });

        await browser.close();

    }, 60000
);