import { storage, getBadgeText } from './utils/helper';
import { request } from './utils/firebase';

const browser = require('webextension-polyfill');

const checkLocalLanguages = async () => {
  const { languages } = await storage.get('languages');

  if (!languages) {
    const { languages } = request('/language');

    await storage.set('languages', languages);
  }
};

const syncLocalData = async (ids, deletedIds) => {
  const { words: localWords } = await storage.get('words');
  let copyLocalWords = { ...localWords };

  if (ids.length !== 0) {
    const { words } = await request(`/word?ids=${ids.join(',')}`);
    const newWords = words.reduce((obj, word, idx) => {
      if (word !== null) obj[ids[idx]] = word;

      return obj;
    }, {});

    copyLocalWords = {
      ...localWords,
      ...newWords,
    };
  }

  if (deletedIds.length !== 0) {
    deletedIds.forEach(id => delete copyLocalWords[id]);
  }

  await storage.set('words', copyLocalWords);
};

const checkUpdatedIds = async () => {
  const { ids } = await request('/updated-ids');
  const idsArr = ids ? Object.keys(ids) : [];

  if (idsArr.length === 0) return;
  /*
    1 => Added
    2 => Updated
    3 => Deleted
  */
  const filterByType = type => idsArr.filter(id => ids[id] === type);
  const addedAndUpdatedIds = [...filterByType(1), ...filterByType(2)];

  await syncLocalData(addedAndUpdatedIds, filterByType(3));
};

const checkLocalWords = async () => {
  const { words } = await storage.get('words');

  if (!words || Object.keys(words).length === 0) {
    const { words } = await request('/word');

    await storage.set('words', words);
  } else {
    await checkUpdatedIds();
  }
};

browser.browserAction.onClicked.addListener(async ({ id, url }) => {
  const badge = await getBadgeText(id);

  if (url.includes('1word.netlify.app') || !!badge) return;

  const { user } = await storage.get('user');
  if (user) {
    await checkLocalLanguages();
    await checkLocalWords();
  } else if (user && !user.emailVerified) {
    return window.open(`https://1word.netlify.app/auth/verify?extension=true`);
  }

  await browser.tabs.insertCSS(id, {
    file: 'matchWord.css',
  });
  await browser.tabs.executeScript(id, {
    file: 'content.js',
  });
});
