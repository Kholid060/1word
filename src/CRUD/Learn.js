import Learn from '~/store/models/Learn';
import store from '~/store';
import { setStorage } from '~/utils/storage';

import { deletePractice } from './Practice';
import { deleteWord } from './Word';

export function createLearn(data) {
  Learn.create({ data });
}

export function addLearn(learn_id) {
  return new Promise((resolve, reject) => {
    Learn.insert({
      data: Array.isArray(learn_id) ? learn_id : { learn_id },
    })
      .then(learns => {
        setStorage('learns', Learn.all());
        resolve(learns);
      })
      .catch(err => reject(err));
  });
}

export function deleteLearn(id, learn_id) {
  return new Promise((resolve, reject) => {
    Learn.delete(id);
    deletePractice(learn_id, 'learn_id');
    deleteWord(learn_id, 'learn_id');

    setStorage('learns', Learn.all());

    if (Learn.all().length === 0) reject();
    else resolve();
  });
}
