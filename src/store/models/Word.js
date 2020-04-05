import { Model } from '@vuex-orm/core';
import shortid from 'shortid';

export default class Word extends Model {
  static entity = 'words';

  static fields() {
    return {
      id: this.uid(() => shortid.generate()),
      title: this.string(''),
      meaning: this.attr(''),
      learn_id: this.attr(null),
      timestamp: this.attr(0),
    };
  }

  static beforeSelect(practices) {
    return practices.sort((a, b) => a.timestamp - b.timestamp);
  }
}
