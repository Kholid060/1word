import { Model } from '@vuex-orm/core';
import saveDataIntoStorage from '~/utils/saveDataIntoStorage';
import shortId from 'shortId';

export default class Practice extends Model {
  static entity = 'practices';

  static fields() {
    return {
      id: this.uid(() => shortId.generate()),
      correct: this.number(0),
      wrong: this.number(0),
      score: this.number(0),
      question_length: this.number(0),
      learn_id: this.attr(null),
      timestamp: this.number(0),
    };
  }

  static beforeSelect(practices) {
    return practices.sort((a, b) => b.timestamp - a.timestamp);
  }

  static afterDelete() {
    saveDataIntoStorage('practices');
  }
}
