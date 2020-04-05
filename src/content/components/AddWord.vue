<template>
  <div class="oneWord-popover--add-word" style="width: 100%; margin-top: 15px">
    <div class="oneWord-popover--text">
      <p>{{ tempWord }}</p>
      <img v-if="isVoiceAvailable" class="speaker" :src="require('~/assets/svg/speaker.svg').default" @click="speak" />
    </div>
    <form @keyup.enter="addWord" class="oneWord-form">
      <p @click="translateText" class="translate-text">Translate this word</p>
      <textarea class="oneWord-popover--textarea" placeholder="Word meaning" style="border: none;" v-model="tempMeaning"></textarea>
      <select class="oneWord-popover--select" v-model="selectedLearn">
        <option v-for="learn in learns" :value="learn">{{ filterId(learn) }}</option>
      </select>
      <button @click="addWord" class="oneWord-popover--button" :disabled="!isValid">Add word</button>
    </form>
    <p class="yandex">Translation powered by <a target="_blank" href="http://translate.yandex.com/">Yandex.Translate</a></p>
  </div>
</template>
<script>
import { getStorage, setStorage } from '~/utils/storage';
import { languageFilter } from '~/utils/getLang';
import findAndReplaceDOMText from '../utils/findAndReplaceDOMText';
import textToSpeech, { getVoices } from '~/utils/textToSpeech';

const browser = require('webextension-polyfill');

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
    translateText() {
      browser.runtime
        .sendMessage({
          type: 'translate',
          text: this.tempWord,
          lang: this.selectedLearn,
        })
        .then(res => (this.tempMeaning = res.text[0]));
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

      localStorage.setItem('oneWord-languageId', this.selectedLearn);
      await setStorage('words', words);
      await findAndReplaceDOMText(document.body, [this.tempWord]);

      this.data.element.popper.destroy();
      this.data.element.popoverEl.innerHTML = '';
    },
    speak() {
      textToSpeech(this.tempWord, languageFilter(this.selectedLearn, 'code'));
    },
    async detectLanguage() {
      const oneWordLanguageId = localStorage.getItem('oneWord-languageId');
      if (oneWordLanguageId) return oneWordLanguageId;

      const langAttribute = document.documentElement.getAttribute('lang');
      if (langAttribute) return langAttribute;

      const textTag = document.getElementsByTagName('p');
      const sampleText = Array.from(textTag)
        .map(el => el.innerText)
        .join(' ');
      const { isReliable, languages } = await browser.i18n.detectLanguage(sampleText);
      if (isReliable) return languages[0];
    },
  },
  computed: {
    isValid() {
      return !!this.tempMeaning && !!this.selectedLearn;
    },
    isVoiceAvailable() {
      return getVoices().some(voice => {
        return voice.lang === languageFilter(this.selectedLearn, 'code');
      });
    },
  },
  async mounted() {
    const { learns } = await getStorage('learns');
    const langId = await this.detectLanguage();

    this.learns = learns.map(learn => learn.learn_id);
    this.tempWord = this.data.text;
    this.selectedLearn = !!langId && this.learns.includes(langId) ? langId : this.learns[0];
  },
};
</script>
