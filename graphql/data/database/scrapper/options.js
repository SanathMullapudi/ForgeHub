import webdriver from 'selenium-webdriver';
const { By: { css } } = webdriver;

export const searchURL = 'http://forge.gg/discover';
export const itemSelector = 'body > div:nth-child(8) > div > div > div > div > div:nth-child(2) > div:nth-child(4) > div > div:nth-child(2) > div';

// export const searchURL = 'http://forge.gg/g/world-of-warcraft';
// export const itemSelector = 'body > div:nth-child(8) > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div';

export const outputFileName = 'database.json';
export const seekingCount = 50;

export const dataFormat = new Map([
  ['user.name', {
    cb: async (item) => {
      let aTag = await item.findElement(css('div > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > a'));
      return (await aTag.getAttribute('href')).slice(16);
    },
  }],
  ['user.pic', {
    sel: 'div > div:nth-child(1) > a > div > img',
    attr: 'src',
  }],
  ['game.name', {
    sel: 'div > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > a:nth-child(1) > span',
    attr: 'textContent',
  }],
  ['game.href', {
    sel: 'div > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > a:nth-child(1)',
    attr: 'href',
  }],
  ['video.title', {
    sel: 'div > div:nth-child(4)',
    attr: 'textContent',
  }],
  ['video.href', {
    sel: 'div > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > a:nth-child(3)',
    attr: 'href',
  }],
  ['video.likes', {
    sel: 'div > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(2)',
    attr: 'textContent',
  }],
  ['video.pic', {
    sel: 'div > div:nth-child(2) > img',
    attr: 'src',
  }],
  ['video.src', {
    sel: 'div > div:nth-child(2) > video > source',
    attr: 'src',
  }],
  ['video.viewers', {
    cb: async (item) => {
      let viewers = await item.findElements(css('div > div:nth-child(3) > div > div > a'));
      const viewersData = [];
      for (const viewer of viewers) {
        const viewerData = {};
        viewerData.name = (await viewer.getAttribute('href')).slice(16);
        try {
          viewerData.pic = await viewer.findElement(css('a > div > img')).getAttribute('src');
          viewerData.likedVidBool = (await viewer.findElement(css('a > div > div')).getAttribute('style')).includes('width: 12px;');
        } catch (e) {} // EDGE CASE: no img
        viewersData.push(viewerData);
      };
      return viewersData;
    },
  }],
  ['video.comments', { // This and 'video.viewers' could be cleaned up into external function for later refactoring
    cb: async (item) => {
      let comments = await item.findElements(css('div > div:nth-child(5) > div:nth-child(1) > div'));
      const commentsData = [];
      for (const comment of comments) {
        const commentData = {};
        commentData.name = (await comment.findElement(css('div > a')).getAttribute('href')).slice(16);
        try {
          commentData.pic = await comment.findElement(css('div > a > img')).getAttribute('src');
        } catch (e) {} // EDGE CASE: no img/ellipsis when there are too many viewers for the ui
        commentData.message = await comment.findElement(css('div > span > span')).getAttribute('textContent');
        commentsData.push(commentData);
      };
      return commentsData;
    },
  }],
]);

export function setNestedValue(obj, path, val) {
  let pathArr = path.split('.');
  let key = pathArr.shift();
  pathArr.length ? (
    obj[key] ? null : obj[key] = {},
    setNestedValue(obj[key], pathArr.join('.'), val)
  ) : obj[key] = val;
};
