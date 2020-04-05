import { Model } from '@vuex-orm/core';
import shortId from 'shortid';
import Word from './Word';
import Practice from './Practice';

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
}
