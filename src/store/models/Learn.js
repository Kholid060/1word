import { Model } from '@vuex-orm/core';
import Word from './Word';
import Practice from './Practice';
import saveDataIntoStorage from '~/utils/saveDataIntoStorage';
import shortId from 'shortId';

export default class Learn extends Model {
  static entity = 'learns';

  static fields() {
    return {
      id: this.uid(() => shortId.generate()),
      learn_id: this.string(''),
      words: this.hasMany(Word, 'learn_id', 'learn_id'),
      practices: this.hasMany(Practice, 'learn_id', 'learn_id'),
    };
  }

  static afterDelete({ learn_id }) {
    Practice.delete(practice => practice.learn_id === learn_id);
    Word.delete(word => word.learn_id === learn_id);

    saveDataIntoStorage('learns');
    saveDataIntoStorage('words');
    saveDataIntoStorage('practices');
  }
}
