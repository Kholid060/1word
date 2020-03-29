import Vue from 'vue';
import meaning from './meaning';
import addWord from './addWord';

export default (popper, type = 'meaning', data = '') => {
  return new Vue({
    data: () => ({
      word: '',
    }),
    methods: {
      hide() {
        popper.destroy();
      },
    },
    render(h) {
      const component = () => {
        if (type === 'add') {
          return h('addWord', {
            props: {
              word: this.word,
            },
            on: {
              close: this.hide,
            },
          });
        }
        if (type === 'meaning') {
          return h('meaning', {
            props: {
              word: this.word,
            },
          });
        }
      };
      return h(
        'div',
        {
          class: ['popover-content-ext'],
        },
        [
          h(
            'div',
            {
              class: ['popover-content--header'],
            },
            [
              h(
                'p',
                {
                  class: ['popover-header--title'],
                },
                [type === 'add' ? 'Add Word' : 'Word Meaning']
              ),
              h(
                'svg',
                {
                  class: ['popover-header--close'],
                  on: {
                    click: this.hide,
                  },
                  attrs: {
                    xmlns: 'http://www.w3.org/2000/svg',
                    viewBox: '0 0 24 24',
                    width: '24',
                    height: '24',
                  },
                },
                [
                  h('path', {
                    attrs: {
                      d:
                        'M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z',
                    },
                  }),
                ]
              ),
            ]
          ),
          component(),
        ]
      );
    },
    mounted() {
      this.word = data;
    },
  });
};
