<template>
  <div class="onwWord-popover--word-meaning">
    <p class="main-word" :title="data.text">{{ data.text }}</p>
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

export default {
  data: () => ({
    meanings: {},
    activeId: '',
  }),
  methods: {
    filterId(id) {
      return languageFilter(id);
    },
  },
  computed: {
    learns() {
      return Object.keys(this.meanings);
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

.main-word {
  font-size: 25px;
  font-weight: bold;
  line-height: 1.3;
  margin: 0 0 16px 0;
  text-transform: capitalize;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.word-meaning {
  margin-top: 15px;
  font-size: 16px;
  margin-bottom: 8px;
  padding: 15px 13px;
  background-color: #eff5fe;
  border-radius: 13px;
  font-size: 17px;
}
</style>
