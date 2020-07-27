import findandreplacedomtext from '../findandreplacedomtext';
import { languageFilter, supportedLanguages } from '~/utils/getLang';
import { sendMessage, Bus, storage, deleteMatchWord, filterWordsByLangId } from '~/utils/helper';

export default {
  template: `
    <select v-model="selected" @change="onSelectChange">
      <option
        v-for="language in languages"
        :value="language"
        :key="language"
      > {{ getLang(language) }} </option>
    </select>
  `,
  props: {
    langId: String,
  },
  data() {
    return {
      selected: this.langId,
      languages: supportedLanguages,
    };
  },
  methods: {
    getLang(id) {
      return languageFilter(id);
    },
    findWords() {
      deleteMatchWord();

      storage.get('words').then(({ words }) => {
        const wordsBylangId = filterWordsByLangId(words, this.selected, true);

        if (wordsBylangId.length > 0) {
          findandreplacedomtext({
            target: document.body,
            words: wordsBylangId,
            langId: this.selected,
          });
        }
      });
    },
    removeAllPopover() {
      const { shadowRoot } = document.querySelector('.oneWord-element');
      const popovers = shadowRoot.querySelectorAll('.oneWord-popover');

      Array.from(popovers).forEach(el => {
        shadowRoot.removeChild(el);
      });
    },
    onSelectChange() {
      this.findWords();
      this.removeAllPopover();
      sendMessage('currentTabLanguage', {
        langId: this.selected,
      });
      localStorage.setItem('oneWord-language', this.selected);
      Bus.$emit('language', this.selected);
    },
  },
};
