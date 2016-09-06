import fs from 'fs';
import webdriver from 'selenium-webdriver';
const { By: { css } } = webdriver;
const driver = new webdriver.Builder().forBrowser('chrome').build();

import {
  searchURL,
  outputFileName,
  seekingCount,
  itemSelector,
  dataFormat,
  setNestedValue,
} from './options';

driver.get(searchURL);

(async () => {
  // console.time(`Finished writing ouput to ${outputFileName}`);
  // Scrape Items
  await driver.get(searchURL);
  let items  = [];
  while (items.length < seekingCount) {
    await driver.executeScript('window.scrollTo(0,document.body.scrollHeight);');
    items = await driver.findElements(css(itemSelector));
    console.log(`${items.length} items visible out of ${seekingCount}`);
  };

  // Parse Items
  // - video is only avaliable when scrolled into view so:
  // - we can't perform the process in parrallel via 'Array.map(async () => ...)'
  const itemsData = [];
  for (const item of items) {
    const data = {};
    await driver.executeScript('arguments[0].scrollIntoView();', item);
    for (const [key, { sel, attr, cb }] of dataFormat.entries()) {
      try {
        let value = cb ? await cb(item) : await item.findElement(css(sel)).getAttribute(attr);
        setNestedValue(data, key, value);
      } catch (e) {} // EDGE CASE: no title
    };
    itemsData.push(data);
    console.info(`${itemsData.length} items parsed out of ${items.length}`);
  }
  driver.quit();
  const jsonData = JSON.stringify(itemsData, null, 2);
  fs.writeFileSync(outputFileName, jsonData);
  // console.timeEnd(`Finished writing ouput to ${outputFileName}`);
})();
