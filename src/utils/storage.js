import Vue from 'vue';
const browser = require('webextension-polyfill');

const storage = browser.storage.local;

export function setStorage(key, value) {
  if (typeof key === 'object') return storage.set(key);

  const copyValue = JSON.parse(JSON.stringify(deleteDataId(key, value)));

  return storage.set({
    [key]: copyValue,
  });
}

export function getStorage(key) {
  return storage.get(key);
}

function deleteDataId(key, data) {
  if (!['words', 'practices', 'learns'].includes(key)) return data;

  return data.map(item => {
    Vue.delete(item, '$id');

    return {
      ...item,
    };
  });
}
