<template>
  <div class="oneWord-popover--add-word" style="width: 100%; margin-top: 15px">
    <form @keyup.enter="addWord" class="oneWord-form">
      <input placeholder="Word" class="oneWord-popover--input" type="text" v-model="tempWord" />
      <textarea class="oneWord-popover--textarea" placeholder="Word meaning" v-model="tempMeaning"></textarea>
      <select class="oneWord-popover--select" v-model="selectedLearn">
        <option v-for="learn in learns" :value="learn">{{ filterId(learn) }}</option>
      </select>
      <button @click="addWord" class="oneWord-popover--button" :disabled="!isValid">Add word</button>
    </form>
  </div>
</template>
<script>
import { getStorage, setStorage } from '~/utils/storage';
import { languageFilter } from '~/utils/getLang';
import findAndReplaceDOMText from '../utils/findAndReplaceDOMText';

export default {
  data: () => ({
    learns: [],
    selectedLearn: '',
    tempWord: '',
    tempMeaning: '',
    exist: false,
  }),
  methods: {
    filterId(id) {
      return languageFilter(id);
    },
    async addWord(e) {
      e.preventDefault();
      if (!this.isValid) return;

      const { words } = await getStorage('words');

      words.push({
        title: this.tempWord,
        meaning: this.tempMeaning,
        learn_id: this.selectedLearn,
        timestamp: Date.now(),
      });

      localStorage.setItem('oneWord-learn', this.selectedLearn);
      await setStorage('words', words);
      await findAndReplaceDOMText(document.body, [this.tempWord]);

      this.data.element.popper.destroy();
      this.data.element.popoverEl.innerHTML = '';
    },
  },
  computed: {
    isValid() {
      return !!this.tempWord && !!this.tempMeaning;
    },
  },
  async mounted() {
    const { learns } = await getStorage('learns');
    const localSelectLearn = localStorage.getItem('oneWord-learn');

    this.learns = learns.map(learn => learn.learn_id);
    this.tempWord = this.data.text;
    this.selectedLearn = localSelectLearn || this.learns[0];
  },
};
</script>
