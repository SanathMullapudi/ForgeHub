import webdriver from 'selenium-webdriver';
const { By: { css } } = webdriver;

export const searchURL = 'http://forge.gg/discover';
export const itemSelector = 'body > div:nth-child(8) > div > div > div > div > div:nth-child(2) > div:nth-child(4) > div > div:nth-child(2) > div';

// export const searchURL = 'http://forge.gg/g/world-of-warcraft';
// export const itemSelector = 'body > div:nth-child(8) > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div';

export const outputFileName = 'recentFetchData.json';

export const dataFormat = new Map([
  ['user.href', {
    sel: 'div > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > a',
    attr: 'href',
  }, ],
  ['user.pic', {
    sel: 'div > div:nth-child(1) > a > div > img',
    attr: 'src',
  }, ],
  ['game.name', {
    sel: 'div > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > a:nth-child(1) > span',
    attr: 'textContent',
  },],
  ['game.href', {
    sel: 'div > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > a:nth-child(1)',
    attr: 'href',
  },],
  ['video.title', {
    sel: 'div > div:nth-child(4)',
    attr: 'textContent',
  },],
  ['video.to', {
    sel: 'div > div:nth-child(4)',
    attr: 'to',
  },],
  ['video.likes', {
    sel: 'div > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(2)',
    attr: 'textContent',
  },],
  ['video.pic', {
    sel: 'div > div:nth-child(2) > img',
    attr: 'src',
  },],
  ['video.src', {
    sel: 'div > div:nth-child(2) > video > source',
    attr: 'src',
  }, ],
  ['video.timeAgo', {
    sel: 'div > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > a:nth-child(2) > span',
    attr: 'textContent',
  }, ],
  ['video.viewers', {
    cb: async (item) => {
      let viewers = await item.findElements(css('div > div:nth-child(3) > div > div > a'));
      const viewersData = [];
      for (const viewer of viewers) {
        const viewerData = {};
        viewerData.href = (await viewer.getAttribute('href'));
        try {
          viewerData.pic = await viewer.findElement(css('a > div > img')).getAttribute('src');
          viewerData.likedVidBool = (await viewer.findElement(css('a > div > div')).getAttribute('style')).includes('width: 12px;');
          viewersData.push(viewerData);
        } catch (e) {} // EDGE CASE: no img/usually due to too many viewers to show
      };
      return viewersData;
    },
  }, ],
  ['video.comments', { // This and 'video.viewers' could be cleaned up into external function for later refactoring
    cb: async (item) => {
      let comments = await item.findElements(css('div > div:nth-child(5) > div:nth-child(1) > div'));
      const commentsData = [];
      for (const comment of comments) {
        const commentData = {};
        commentData.href = (await comment.findElement(css('div > a')).getAttribute('href'));
        try {
          commentData.pic = await comment.findElement(css('div > a > img')).getAttribute('src');
        } catch (e) {} // EDGE CASE: no img
        commentData.message = await comment.findElement(css('div > span > span')).getAttribute('textContent');
        commentsData.push(commentData);
      };
      return commentsData;
    },
  }, ],
]);
