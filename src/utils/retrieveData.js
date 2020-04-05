import { getStorage } from './storage';
import { createLearn } from '~/CRUD/Learn';
import { createPractice } from '~/CRUD/Practice';
import { createWord } from '~/CRUD/Word';
import store from '~/store';

const dataKey = ['learns', 'practices', 'words', 'blockedWebsite', 'settings'];
function updateStore(key, data) {
  store.commit('updateState', {
    key,
    data,
  });
}

export default function() {
  return new Promise(async (resolve, reject) => {
    const { learns, practices, words, blockedWebsite, settings } = await getStorage(dataKey);

    createLearn(learns);
    createWord(words);
    createPractice(practices);

    updateStore('blockedWebsite', blockedWebsite);
    updateStore('settings', settings);

    resolve({
      learns,
      practices,
      words,
    });
  });
}
