import wtf from 'wtf_wikipedia';
import { storage } from '~/utils/helper';

function checkLocalWord(word) {
  return new Promise(resolve => {
    storage.get('dictionary').then(({ dictionary }) => {
      resolve(!dictionary ? null : dictionary[word]);
    });
  });
}

async function saveWord(word, data) {
  const { dictionary } = await storage.get('dictionary');
  const dictionaryData = dictionary || {};

  storage.set('dictionary', {
    ...dictionaryData,
    [word]: data,
  });
}

export default async function(word = '') {
  const localWord = await checkLocalWord(word);

  if (localWord) return localWord;

  try {
    const doc = await wtf.fetch(word, { wiki: 'wiktionary' });

    if (!doc) {
      const data = { phonetic: null, definition: null };

      await saveWord(word, data);

      return data;
    }

    const phoneticArr = doc.templates('IPA').filter(ipa => ipa.audio && ipa.transcription === 'en');
    const phonetic = phoneticArr.length > 0 ? phoneticArr.map(ipa => ipa.audio).join(', ') : null;

    const nouns = (doc.sections('Pronoun') || doc.sections('Noun')).json().lists;
    const definition = nouns[0]
      ? nouns[0]
          .map(({ text }) => text)
          .join('\n')
          .slice(0, 250)
      : null;

    const data = { phonetic, definition };

    await saveWord(word, data);

    return data;
  } catch (err) {}
}
