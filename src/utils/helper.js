import Vue from 'vue';

const browser = require('webextension-polyfill');

export function sendMessage(type, payload) {
  return browser.runtime.sendMessage({
    type,
    ...payload,
  });
}

export function isObject(data) {
  return typeof data === 'object' && data !== null;
}

export function getBadgeText(tabId) {
  return new Promise((resolve, reject) => {
    if (!tabId) reject('tabId is require');

    browser.browserAction
      .getBadgeText({
        tabId,
      })
      .then(text => resolve(text))
      .catch(() => reject());
  });
}

export const storage = {
  storage: browser.storage.local,
  set(key, value) {
    if (typeof key === 'object') return this.storage.set(key);

    return this.storage.set({
      [key]: value,
    });
  },
  get(key) {
    return this.storage.get(key);
  },
  remove(key) {
    return this.storage.remove(key);
  },
  clear() {
    return this.storage.clear();
  },
};

export const Bus = new Vue();

export function deleteMatchWord() {
  const onewordElements = document.querySelectorAll('.oneWord-match');
  onewordElements.forEach(element => {
    element.replaceWith(element.textContent);
  });
}

export function filterWordsByLangId(words, langId, mapTitle = false) {
  if (isObject(words) && Object.keys(words).length === 0) return [];

  const wordsArray = Object.values(words);
  const wordsBylangId = wordsArray.filter(word => word.langId === langId);

  if (mapTitle) return wordsBylangId.map(({ title }) => title);
  return wordsBylangId;
}
