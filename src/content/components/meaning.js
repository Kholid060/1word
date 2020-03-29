import Vue from 'vue';
import { languageFilter } from '../../utils/getLang';
import getWords from '../utils/getWords';

Vue.component('meaning', {
  props: {
    word: String,
  },
  data: () => ({
    words: [],
    loading: true,
    activeID: '',
  }),
  methods: {
    setActiveId(id) {
      this.activeID = id;
    },
  },
  render(h) {
    const filter = value => languageFilter(value, 'name');
    const wordMeaning = this.words.map(word => {
      return h(
        'div',
        {
          class: {
            'word-meaning--container': true,
            active: this.activeID === word.learn_id,
          },
          on: {
            click: () => (this.activeID === word.learn_id ? (this.activeID = '') : (this.activeID = word.learn_id)),
          },
        },
        [
          h(
            'p',
            {
              class: 'word-meaning--id',
            },
            filter(word.learn_id)
          ),
          h(
            'p',
            {
              class: {
                'word-meaning--meaning': true,
                hiddenWord: this.activeID !== word.learn_id,
              },
            },
            word.meaning
          ),
        ]
      );
    });
    const loading = h(
      'div',
      { class: ['lds-ellipsis'] },
      new Array(4).fill().map(() => h('div'))
    );
    return h(
      'div',
      {
        class: 'popover-content--body',
      },
      [
        h(
          'p',
          {
            class: 'popover-body--title',
          },
          this.word
        ),
        h(
          'div',
          {
            class: 'popover-body--meaning',
          },
          [this.loading ? loading : wordMeaning]
        ),
      ]
    );
  },
  mounted() {
    getWords().then(words => {
      this.words = words.filter(item => item.title.toLowerCase() === this.$props.word.toLowerCase());
      setTimeout(() => (this.loading = false), 1000);
    });
  },
});
