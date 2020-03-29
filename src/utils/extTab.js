const browser = require('webextension-polyfill');
import url from 'url';

export default function() {
  return new Promise(async (resolve, reject) => {
    const { hostname: extId } = url.parse(browser.runtime.getURL('/'));
    const tabs = await browser.tabs.query({});
    const getExtTab = tabs.filter(tab => url.parse(tab.url).hostname === extId);

    if (getExtTab.length >= 1) {
      reject(getExtTab);
      browser.tabs.update(getExtTab[0].id, {
        active: true,
      });
    } else {
      resolve();
    }
  });
}
