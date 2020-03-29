import { getStorage } from './storage';
import Learn from '~/store/models/Learn';
import Word from '~/store/models/Word';
import Practice from '~/store/models/Practice';
import store from '~/store';

const dataKey = ['learns', 'practices', 'words', 'blockedWebsite'];

export default function() {
  return new Promise(async (resolve, reject) => {
    const { learns, practices, words, blockedWebsite } = await getStorage(dataKey);

    Learn.create({ data: learns });
    Practice.create({ data: practices });
    Word.create({ data: words });
    store.commit('updateState', {
      key: blockedWebsite,
      data: blockedWebsite,
    });

    resolve({
      learns,
      practices,
      words,
    });
  });
}
