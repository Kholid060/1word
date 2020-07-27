import Vue from 'vue';
import injectShadowDom from '../injectShadowDom';
import LoadLanguageList from './loadLanguageList';
import { sendMessage, deleteMatchWord } from '~/utils/helper';

export default function(type, langId) {
  const Component = Vue.extend({
    components: { LoadLanguageList },
    template: `
      <div class="oneWord-popup">
        <div class="flex items-center one-word alert" role="card">
          <div
            title="Close 1Word"
            class="p-1 bg-lighter icon-container relative rounded-lg"
            @click="closeExtension"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
            </svg>
            <img src=${require('~/icons/icon_128.png').default} width="40" class="rounded-lg icon" />
          </div>
          <div class="ml-4" id="content">
            <a
              href="https://1word.netlify.app/auth"
              class="large"
              target="_blank"
              role="button"
              v-if="type === 'login'"
            >
              Login
            </a>
            <p v-else-if="type === 'notSupport'">Language not supported</p>
            <load-language-list v-else v-bind="{ langId }"></load-language-list>
          </div>
        </div>
      </div>
    `,
    data: () => ({
      type,
      langId,
    }),
    methods: {
      async closeExtension() {
        await sendMessage('currentTabLanguage', {
          langId: '',
        });

        deleteMatchWord();

        const oneWordEl = document.querySelector('.oneWord-element');
        document.body.removeChild(oneWordEl);
      },
    },
  });
  const popup = new Component().$mount();

  injectShadowDom(popup.$el);
}
