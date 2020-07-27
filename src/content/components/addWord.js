import Vue from 'vue';
import createPopper from '../createPopper';
import findandreplacedomtext from '../findandreplacedomtext';
import { Bus, sendMessage } from '~/utils/helper';
import addWord from '~/utils/addWord';

export default function(target, word) {
  const content = Vue.extend({
    template: `
      <div class="oneWord-popover" role="card">
        <p class="mb-4 text-light">Add word</p>
        <div class="flex items-center mb-4">
          <p
            style="line-height: 25px"
            class="p-3 capitalize mr-3 font-semibold rounded-lg bg-lighter flex-auto"
          >
            ${word}
          </p>
          <div
            @click="translateWord"
            class="p-3 rounded-lg bg-lighter text-light cursor-pointer"
            title="Translate word"
          >
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M12.87,15.07L10.33,12.56L10.36,12.53C12.1,10.59 13.34,8.36 14.07,6H17V4H10V2H8V4H1V6H12.17C11.5,7.92 10.44,9.75 9,11.35C8.07,10.32 7.3,9.19 6.69,8H4.69C5.42,9.63 6.42,11.17 7.67,12.56L2.58,17.58L4,19L9,14L12.11,17.11L12.87,15.07M18.5,10H16.5L12,22H14L15.12,19H19.87L21,22H23L18.5,10M15.88,17L17.5,12.67L19.12,17H15.88Z" /></svg>
          </div>
        </div>
        <textarea
          class="w-full resize-none"
          style="height: 90px"
          placeholder="Meaning"
          v-model="meaning"
          ref="textarea"
        ></textarea>
        <p class="text-right text-lighter">{{ meaning.length }}/50</p>
        <button
          class="mt-4 large w-full"
          :class="{ 'disabled': !meaning || meaning.length > 50 || loading }"
          @click="addWord"
        >
          Add word
        </button>
        <p class="text-center text-lighter mt-3" v-if="error">
          Something went wrong
        </p>
      </div>
    `,
    data: () => ({
      meaning: '',
      langId: '',
      loading: false,
      error: false,
    }),
    methods: {
      addWord() {
        this.loading = true;
        const removeEl = () => {
          const { shadowRoot } = document.querySelector('.oneWord-element');
          shadowRoot.removeChild(this.$el);
        };

        addWord({
          word,
          meaning: this.meaning,
          langId: this.langId,
        })
          .then(() => {
            findandreplacedomtext({
              target: document.body,
              words: [word],
              langId: this.langId,
            });

            this.loading = this.error = false;
            removeEl();
          })
          .catch(() => {
            this.error = true;
            this.loading = false;
          });
      },
      translateWord() {
        sendMessage('translate', {
          lang: this.langId,
          text: word,
        }).then(response => {
          if (response.code === 200) {
            this.meaning = response.text.join(', ');
          }
        });
      },
    },
    created() {
      this.langId = localStorage.getItem('oneWord-language');
      Bus.$on('language', language => {
        this.langId = language;
      });
    },
  });

  createPopper(target, content);
}
