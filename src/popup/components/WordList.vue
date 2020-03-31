<template>
  <card-ui class="mt-6 word-list">
    <template v-for="word in paginateData">
      <list-ui class="group" dense>
        <flag-ui :code="word.learn_id | getLang('country')" size="28" class="shadow-xl" v-if="active === 'all'"></flag-ui>
        <div class="w-9/12">
          <p class="text-overflow">{{ word.title }}</p>
          <p class="text-overflow text-light">{{ word.meaning }}</p>
        </div>
        <mdi-icon name="mdi-pencil" @click="editWord(word)" class="text-light mr-2 invisible group-hover:visible cursor-pointer"></mdi-icon>
        <mdi-icon name="mdi-delete" class="text-danger cursor-pointer" @click="deleteWord(word)"></mdi-icon>
      </list-ui>
    </template>
    <p class="text-center" v-show="words.length === 0">No data</p>
    <paginate-ui :current-page="currentPage" :page-count="pageCount" :perPage="perPage" hide-select @changePerPage="perPage = $event" @changePage="pageChangeHandler"></paginate-ui>
  </card-ui>
</template>
<script>
import Word from '~/store/models/Word';
import saveDataIntoStorage from '~/utils/saveDataIntoStorage';
import Bus from '~/utils/Bus';

export default {
  props: {
    active: String,
    search: String,
  },
  data: () => ({
    currentPage: 0,
    perPage: 5,
  }),
  computed: {
    pageCount() {
      return Math.ceil(this.words.length / this.perPage);
    },
    paginateData() {
      const start = this.currentPage * this.perPage;
      const end = start + this.perPage;

      return this.words.slice(start, end);
    },
    words() {
      return Word.query()
        .where(word => {
          return this.active === 'all' ? true : word.learn_id === this.active;
        })
        .get()
        .filter(word => {
          const search = this.search.toLowerCase();
          return word.title.toLowerCase().match(search) || word.meaning.toLowerCase().match(search);
        });
    },
  },
  watch: {
    pageCount(val) {
      if (this.currentPage >= val) this.currentPage = 0;
    },
  },
  methods: {
    editWord(word) {
      Bus.$emit('openWordPopup', {
        learnId: word.learn_id,
        type: 'edit',
        tempWord: word.title,
        tempMeaning: word.meaning,
        id: word.id,
      });
    },
    deleteWord({ id }) {
      Word.delete(id).then(() => saveDataIntoStorage('words'));
    },
    pageChangeHandler(type) {
      type === 'next' ? (this.currentPage += 1) : (this.currentPage -= 1);
    },
  },
};
</script>
<style scoped lang="scss">
.word-list {
  overflow: visible;
  .flag {
    position: absolute;
    left: -15px;
  }
}
</style>
