import store from '~/store';

const browser = require('webextension-polyfill');

export default function() {
  browser.storage.onChanged.addListener(async changes => {
    const entities = ['words', 'learns', 'practices'];
    const { active } = await browser.tabs.getCurrent();

    if (active) return;

    for (const key in changes) {
      const data = changes[key].newValue;

      if (entities.includes(key)) {
        store.dispatch('entities/create', { entity: key, data });
      } else {
        store.commit('updateState', {
          key,
          data,
        });
      }
    }
  });
}
