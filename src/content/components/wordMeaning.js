import Vue from 'vue';
import createPopper from '../createPopper';
import { storage } from '~/utils/helper';
import wiktionary from '~/utils/wiktionary';

export default function({ langId, word, target }) {
  const content = Vue.extend({
    template: `
      <div class="oneWord-popover" role="card">
        <div class="mb-4 ml-2 mt-2">
          <p class="text-xl font-semibold capitalize">${word}</p>
          <p class="text-lighter mt-1" v-if="dictionary && dictionary.phonetic">
            {{ dictionary.phonetic }}
          </p>
        </div>
        <div class="rounded-lg bg-lighter" style="min-height: 140px">
          <div
            v-if="dictionary && dictionary.definition"
            class="text-center text-lighter mx-3 pt-3 mb-2 flex"
          >
            <p
              class="py-2 px-3 cursor-pointer rounded-lg"
              :class="[activeTabClasses('meaning')]"
              @click="activeTab = 'meaning'"
            >
              Meaning
            </p>
            <p
              class="py-2 px-3 ml-1 cursor-pointer rounded-lg"
              :class="[activeTabClasses('dictionary')]"
              @click="activeTab = 'dictionary'"
            >
              Wiktionary
            </p>
          </div>
          <div class="p-3">
            <pre class="whitespace-pre-wrap">{{ (activeTab === 'meaning' ? meaning : definition).trim() }}</pre>
            <a
              href="https://en.wiktionary.org/wiki/${word}"
              target="_blank"
              class="text-primary block mt-2 hover:border-b border-primary"
              v-if="activeTab === 'dictionary'"
            >See detail on Wiktionary</a>
          </div>
        </div>
      </div>
    `,
    data: () => ({
      langId,
      meaning: '',
      dictionary: {
        phonetic: '',
        definition: '',
      },
      activeTab: 'meaning',
    }),
    methods: {
      activeTabClasses(id) {
        return this.activeTab === id ? 'bg-primary text-white' : 'bg-input';
      },
      async fetchWordWiktionary() {
        const data = await wiktionary(word);

        this.dictionary = data;
      },
    },
    computed: {
      definition() {
        const { definition } = this.dictionary;

        return definition && definition.length >= 250 ? `${definition.slice(0, 250)}...` : definition;
      },
    },
    async mounted() {
      const { words } = await storage.get('words');
      const { meaning } = Object.values(words).find(fWord => {
        return fWord.title.toLocaleLowerCase() === word.trim().toLocaleLowerCase() && fWord.langId === langId;
      });
      this.meaning = meaning;

      await this.fetchWordWiktionary();
    },
    beforeDestroy() {
      target.classList.remove('open');
    },
  });

  createPopper(target, content);
}
