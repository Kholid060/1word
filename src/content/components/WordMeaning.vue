<template>
  <div class="onwWord-popover--word-meaning">
    <div class="main-word-container">
      <p class="main-word" :title="data.text">{{ data.text }}</p>
      <img :src="require('~/assets/svg/speaker.svg').default" class="speaker" @click="speak" v-if="isVoiceAvailable" />
    </div>
    <select class="oneWord-popover--select" v-model="activeId">
      <option v-for="id in learns" :value="id">
        {{ filterId(id) }}
      </option>
    </select>
    <p class="word-meaning">
      {{ meanings[activeId] }}
    </p>
  </div>
</template>
<script>
import { getStorage } from '~/utils/storage';
import { languageFilter } from '~/utils/getLang';
import textToSpeech, { getVoices } from '~/utils/textToSpeech';

export default {
  data: () => ({
    meanings: {},
    activeId: '',
  }),
  methods: {
    filterId(id) {
      return languageFilter(id);
    },
    speak() {
      textToSpeech(this.data.text, languageFilter(this.activeId, 'code'));
    },
  },
  computed: {
    learns() {
      return Object.keys(this.meanings);
    },
    isVoiceAvailable() {
      return getVoices().some(voice => {
        return voice.lang === languageFilter(this.activeId, 'code');
      });
    },
  },
  async mounted() {
    const { words } = await getStorage('words');
    const localActiveId = localStorage.getItem('oneWord-learn');
    const filterByTitle = words.filter(item => item.title.toLowerCase() === this.data.text.toLowerCase());

    this.meanings = filterByTitle.reduce(
      (obj, item) => ({
        ...obj,
        [item.learn_id]: item.meaning,
      }),
      {}
    );

    this.activeId = localActiveId && this.meanings[localActiveId] ? localActiveId : this.learns[0];
  },
};
</script>
<style scoped lang="scss">
@import '~/assets/scss/base/variables.scss';

.main-word-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 0 5px;
  .main-word {
    font-size: 25px;
    font-weight: bold;
    padding-right: 10px;
    line-height: 1.3;
    margin: 0;
    text-transform: capitalize;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.word-meaning {
  margin-top: 15px;
  font-size: 20px;
  margin-bottom: 8px;
  padding: 15px 13px;
  background-color: #eff5fe;
  border-radius: 13px;
  font-size: 17px;
}
</style>
