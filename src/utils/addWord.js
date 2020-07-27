import { storage } from './helper';
import { request } from './firebase';

export default async function({ langId, meaning, word }) {
  const { languages, words } = await storage.get(['languages', 'words']);

  if (!languages || !languages.includes(langId)) {
    await request('/language', {
      method: 'POST',
      body: JSON.stringify({
        language: langId,
      }),
    });
    const newLanguagesData = !languages ? [langId] : [...languages, langId];
    await storage.set('languages', newLanguagesData);
  }

  const isWordExists = Object.values(words).some(fWord => {
    return fWord.title.toLocaleLowerCase() === word.toLocaleLowerCase() && fWord.langId === langId;
  });

  if (!isWordExists) {
    const { word: wordResponse } = await request('/word', {
      method: 'POST',
      body: JSON.stringify({
        word: {
          title: word,
          meaning,
          langId,
        },
      }),
    });

    await storage.set('words', {
      ...words,
      [wordResponse.id]: wordResponse,
    });
  }
}
