import webdriver from 'selenium-webdriver';
const { By: { css }, until } = webdriver;

export const searchURL = 'http://forge.gg/discover';
export const itemSelector = 'body > div > div > div > div > div > div:nth-child(3) > div > div > div:nth-child(2) > div';

// For game pages, this is out of date, as of the ui update forge's website had
// export const searchURL = 'http://forge.gg/g/world-of-warcraft';
// export const itemSelector = '????';

export const outputFileName = 'recentFetchData.json';

export const dataFormat = new Map([
  ['user.href', {
    sel: 'div > div:nth-child(1) > a',
    attr: 'href',
  }, ],
  ['user.pic', {
    cb: async (item) => stripUserImgUriFromDivStyle(await item.findElement(css('div > div:nth-child(1) > a > div > div')).getAttribute('style')),
  }, ],
  ['game.name', {
    sel: 'div > div:nth-child(1) > div > div:nth-child(2) > span > a > span',
    attr: 'textContent',
  },],
  ['game.href', {
    sel: 'div > div:nth-child(1) > div > div:nth-child(2) > span > a',
    attr: 'href',
  },],
  ['video.viewers', {
    cb: async (item) => {
      let viewers = await item.findElements(css('div > div:nth-child(3) > div > a'));
      const viewersData = [];
      for (const viewer of viewers) {
        const viewerData = {};
        viewerData.href = (await viewer.getAttribute('href'));
        try {
          viewerData.pic = stripUserImgUriFromDivStyle(await viewer.findElement(css('a > div > div:nth-child(2)')).getAttribute('style'));
          // viewerData.pic.includes('defaultAvatar.png') ? viewerData.pic = 'https://forge.gg/public/img/defaultAvatar.png' : null;
          viewerData.likedVidBool = (await viewer.findElement(css('a > div > div')).getAttribute('style')).includes('background-color: rgb(230, 28, 61)');
          viewersData.push(viewerData);
        } catch (e) {} // EDGE CASE: no img/usually due to too many viewers to show
      };
      return viewersData;
    },
  },],
  ['video.comments', { // This and 'video.viewers' could be cleaned up into external function for later refactoring
    cb: async (item, driver) => {
      const commentsData = [];
      try {
        try {
          const loadMoreComments = await item.findElement(css('div > div:nth-child(4) > div:nth-child(2) > a'));
          await loadMoreComments.click();
          await driver.wait(until.elementIsNotVisible(loadMoreComments), 5000);
        } catch (e) {console.log(e);}
        let comments = await item.findElements(css('div > div:nth-child(4) > div:nth-child(2) > div'));
        for (const comment of comments) {
          const commentData = {};
          commentData.href = (await comment.findElement(css('div > span > a')).getAttribute('href'));
          try {
            commentData.pic = stripUserImgUriFromDivStyle(await comment.findElement(css('div > a > div')).getAttribute('style'));
          } catch (e) {} // EDGE CASE: no img
          commentData.message = await comment.findElement(css('div > span > span')).getAttribute('textContent');
          commentsData.push(commentData);
        }
      } catch (e) {}  // if no comments
      return commentsData;
    },
  }, ],
  ['video.title', {
    sel: 'div > div:nth-child(4) > div > span > span',
    attr: 'textContent',
  }, ],
  ['video.to', {
    sel: 'div > div:nth-child(1) > div > div:nth-child(2) > a',
    attr: 'href',
  },],
  ['video.likes', {
    sel: 'div > div:nth-child(3) > button > div:nth-child(2) > div',
    attr: 'textContent',
  }, ],
  ['video.pic', {
    sel: 'div > div:nth-child(2) > img',
    attr: 'src',
  },],
  ['video.timeAgo', {
    sel: 'div > div:nth-child(1) > div > div:nth-child(2) > a > span',
    attr: 'textContent',
  }, ],
  ['video.src', {
    sel: 'div > div:nth-child(2) > video > source',
    attr: 'src',
  }, ],
]);

function stripUserImgUriFromDivStyle(userStyleStr) {
  const regexMatch = userStyleStr.match(/\(jpeg\)\/(.*)"\);/);
  return regexMatch ? regexMatch[1] : '';
}
