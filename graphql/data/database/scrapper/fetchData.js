import fs from 'fs';
import webdriver from 'selenium-webdriver';
const { By: { css } } = webdriver;

import {
  searchURL,
  outputFileName,
  seekingCount,
  itemSelector,
  dataFormat,
} from './options';

import {setNestedObjValue} from './helper';

export async function fetchVideoToJson(...args) {
  const driver = new webdriver.Builder().forBrowser('chrome').build();
  console.time(`Finished fetching video data to JSON`);
  console.log(`Starting scraping on ${searchURL}`);

  // Prep WebPage
  await driver.get(searchURL);
  let items  = [];
  while (items.length < seekingCount) {
    await driver.executeScript('window.scrollTo(0,document.body.scrollHeight);');
    items = await driver.findElements(css(itemSelector));
    console.log(`${items.length} items visible out of ${seekingCount} seeking`);
  };

  // Parse Items
  // - video is only avaliable when scrolled into view so ...
  // - we can't scape multiple videos in parrallel via 'Array.map(async () => ...)'
  const itemsData = [];
  for (const item of items) {
    const data = {};
    await driver.executeScript('arguments[0].scrollIntoView();', item);
    for (const [key, { sel, attr, cb }] of dataFormat.entries()) {
      try {
        let value = cb ? await cb(item) : await item.findElement(css(sel)).getAttribute(attr);
        setNestedObjValue(data, key, value);
      } catch (e) {} // EDGE CASE: no title
    };
    itemsData.push(data);
    console.info(`${itemsData.length} items parsed out of ${items.length}`);
  }
  driver.quit();
  const jsonData = JSON.stringify(itemsData, null, 2);
  fs.writeFileSync(outputFileName, jsonData);

  console.timeEnd(`Finished fetching video data to JSON`);
  return jsonData;
}
