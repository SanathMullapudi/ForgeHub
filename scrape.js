import fs from 'fs';
import webdriver from 'selenium-webdriver';

const { By } = webdriver;
const driver = new webdriver.Builder().forBrowser('firefox').build();

const URL = process.argv[2] || 'http://forge.gg/discover';
const OUPUTDIR = './output/';
const OUTPUTFILE = process.argv[3] || `${OUPUTDIR}output.txt`;
const SEEKING = 3;
const CONTAINER = 'body > div:nth-child(6) > div > div > div > div:nth-child(2) > div:nth-child(4)';
const ITEM = `${CONTAINER} > div > div:nth-child(2) > div`;

(async () => {
  await driver.get(URL);
  let items  = [];
  while (items.length < SEEKING) {
    await driver.executeScript('window.scrollTo(0,document.body.scrollHeight);');
    // await driver.sleep(250); // Optional sleep()
    items = await driver.findElements(By.css(ITEM));
  };

  let html = await driver.findElement(By.css(CONTAINER)).getOuterHtml();
  fs.existsSync(OUPUTDIR) || fs.mkdirSync(OUPUTDIR);
  fs.writeFileSync(OUTPUTFILE, html);
  driver.quit();
})();
