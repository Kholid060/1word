import Vue from 'vue';

import { languageFilter } from '../../utils/getLang';
import findAndReplaceDOMText from '../utils/findAndReplaceDOMText';

const browser = require('webextension-polyfill');

Vue.component('addWord', {
  props: {
    word: String,
  },
  data: () => ({
    wordMeaning: '',
    learns: [],
    selected: '',
    showError: false,
    loadData: false,
  }),
  methods: {
    translateWord() {
      this.loadData = true;
      browser.runtime
        .sendMessage({
          to: 'background',
          type: 'translate',
          data: {
            from: this.selected,
            to: 'en',
            word: this.$props.word,
          },
        })
        .then(({ translate }) => {
          this.loadData = false;
          this.wordMeaning = translate.result;
        })
        .catch(() => (this.loadData = false));
    },
    async saveWord() {
      if (this.wordMeaning) {
        const allWords = await browser.storage.sync.get('words');

        localStorage.setItem('website-language', this.selected);

        const getRandomId = () => `_no_key_${Math.floor(Math.random() * (1000 - 0 + 1)) + 0}`;
        let $id;
        while (typeof $id === 'undefined') {
          const id = getRandomId();
          if (allWords.words.some(word => word.learn_id !== id) || allWords.words.length === 0) $id = id;
        }

        const word = {
          $id,
          language: null,
          language_id: 'en',
          learn: null,
          learn_id: this.selected,
          meaning: this.wordMeaning,
          timestamp: Date.now(),
          title: this.$props.word,
        };

        const findWord = allWords.words.some(word => {
          return word.learn_id === this.selected && word.title.toLowerCase() === this.$props.word.toLowerCase();
        });
        if (!findWord) {
          const words = [word, ...allWords.words];
          browser.storage.sync.set({ words });
          findAndReplaceDOMText(document.body, [this.$props.word]);
          this.$emit('close');
        } else {
          this.showError = true;
          setTimeout(() => (this.showError = false), 2000);
        }
      }
    },
  },
  render(h) {
    const input = (value, input) => {
      return h('input', {
        class: ['popover-body--input'],
        domProps: {
          value,
        },
        on: {
          keyup: event => {
            if (event.keyCode === 13 && !!event.target.value) this.saveWord();
          },
          input: event => {
            this[input] = event.target.value;
          },
        },
        attrs: {
          placeholder: input === 'wordTitle' ? 'Title' : 'Meaning',
        },
      });
    };
    return h(
      'div',
      {
        class: ['popover-content--body'],
      },
      [
        h(
          'p',
          {
            class: ['popover-body--title'],
          },
          this.$props.word
        ),
        h(
          'div',
          {
            class: ['popover-body--select-container'],
          },
          [
            h(
              'select',
              {
                class: ['popover-body--select'],
                domProps: {
                  value: this.selected,
                },
                on: {
                  change: event => (this.selected = event.target.value),
                },
              },
              this.learns.map(learn => {
                return h(
                  'option',
                  {
                    domProps: {
                      value: learn,
                    },
                  },
                  languageFilter(learn, 'name')
                );
              })
            ),
            h(
              'button',
              {
                class: {
                  'popover-body--translate-btn': true,
                  disabled: this.loadData,
                },
                on: {
                  click: this.translateWord,
                },
              },
              'translate'
            ),
          ]
        ),
        input(this.wordMeaning, 'wordMeaning'),
        h(
          'button',
          {
            class: {
              'popover-body--save': true,
              disabled: !this.wordMeaning,
            },
            on: {
              click: this.saveWord,
            },
          },
          'save'
        ),
        this.showError
          ? h(
              'p',
              {
                style: {
                  fontWeight: 600,
                  textAlign: 'center',
                },
              },
              `You already add ${this.$props.word}`
            )
          : '',
      ]
    );
  },
  mounted() {
    browser.storage.sync.get('learns').then(({ learns }) => {
      const websiteLanguage = localStorage.getItem('website-language');
      const mapId = learns.map(learn => learn.learn_id);
      if (websiteLanguage !== null && mapId.includes(websiteLanguage)) {
        mapId.splice(mapId.indexOf(websiteLanguage), 1);
        mapId.unshift(websiteLanguage);
      }
      this.learns = mapId;
      this.selected = mapId[0];
    });
  },
});
