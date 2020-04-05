import Practice from '~/store/models/Practice';
import { setStorage } from '~/utils/storage';

export function createPractice(data) {
  Practice.create({ data });
}

export function addPractice(data) {
  return new Promise(resolve => {
    Practice.insert({ data }).then(() => {
      setStorage('practices', Practice.all());
      resolve();
    });
  });
}

export function deletePractice(id, by = 'id') {
  return new Promise(resolve => {
    if (by === 'id')
      Practice.delete(id).then(data => {
        setStorage('practices', Practice.all());
        resolve(data);
      });
    else if (by === 'learn_id')
      Practice.delete(practice => practice.learn_id === id).then(data => {
        setStorage('practices', Practice.all());
        resolve(data);
      });
  });
}
