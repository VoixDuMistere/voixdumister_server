
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function genererVoix(texte) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  await page.goto('https://www.usetalk.ai', { waitUntil: 'networkidle2' });

  await page.waitForSelector('textarea');
  await page.type('textarea', texte, { delay: 10 });

  const boutons = await page.$$('button');
  await boutons[1].click();

  await page.waitForSelector('a[download]', { timeout: 60000 });
  const audioUrl = await page.$eval('a[download]', a => a.href);

  const audioBuffer = await page.goto(audioUrl).then(res => res.buffer());
  const chemin = path.resolve(__dirname, 'voix.mp3');
  fs.writeFileSync(chemin, audioBuffer);

  await browser.close();
  return chemin;
}

module.exports = genererVoix;
