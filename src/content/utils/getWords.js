const browser = require('webextension-polyfill');

export default function() {
  return new Promise(async (resolve, reject) => {
    const { words } = await browser.storage.sync.get('words');
    resolve(words);
  });
}
