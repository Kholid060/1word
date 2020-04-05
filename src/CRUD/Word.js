import Word from '~/store/models/Word';
import { setStorage } from '~/utils/storage';
import validateExistWord from '~/utils/validateExistWord';

export function createWord(data) {
  Word.create({ data });
}

export function addWord(data) {
  return new Promise((resolve, reject) => {
    const isWordExist = Word.query()
      .where(word => {
        return validateExistWord(word, data.title, data.meaning, data.learn_id);
      })
      .exists();

    if (isWordExist) return reject(`You already add ${data.title}`);

    Word.insert({
      data,
    }).then(() => {
      setStorage('words', Word.all());
      resolve();
    });
  });
}

export function updateWord(data) {
  return new Promise((resolve, reject) => {
    const isWordExist = Word.query()
      .where(word => {
        return validateExistWord(word, data.title, data.meaning, data.learn_id) && word.id !== data.id;
      })
      .exists();

    if (isWordExist) return reject(`You already add ${data.title}`);

    Word.update({
      where: data.id,
      data,
    }).then(() => {
      setStorage('words', Word.all());
      resolve();
    });
  });
}

export function deleteWord(id, by = 'id') {
  return new Promise(resolve => {
    if (by === 'id') {
      Word.delete(id).then(() => {
        setStorage('words', Word.all());
        resolve();
      });
    } else if (by === 'learn_id') {
      Word.delete(word => word.learn_id === id).then(() => {
        setStorage('words', Word.all());
        resolve();
      });
    }
  });
}
