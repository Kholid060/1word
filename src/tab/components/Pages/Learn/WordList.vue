<template>
  <card-ui>
    <template slot="header">
      <p>Word List</p>
      <div class="flex-grow"></div>
      <input-ui v-model="search" icon="mdi-magnify" width="150px" placeholder="Search word"></input-ui>
    </template>
    <empty-state-ui v-if="words.length === 0" icon="mdi-message-processing" title="No Data" description="Add your first word."> </empty-state-ui>
    <div class="word-list" v-else>
      <template v-for="word in paginateWords">
        <list-ui class="list mt-3">
          <template v-if="activeEdit === word.id">
            <form class="flex-grow" @keyup.esc="clearAll" @keyup.enter="updateWord(word)">
              <input-ui class="w-5/12 mr-3" @input="inputTempWord" :value="tempWord" placeholder="Word" type="background"></input-ui>
              <input-ui class="w-6/12" v-model="tempMeaning" placeholder="Meaning" type="background"></input-ui>
            </form>
            <div class="self-center" style="width: 80px;">
              <v-mdi name="mdi-close" title="edit" class="text-light" @click="clearAll" size="24"></v-mdi>
              <v-mdi name="mdi-check" title="edit" class="text-primary ml-2" @click="updateWord(word)" size="24"></v-mdi>
            </div>
          </template>
          <template v-else>
            <p class="text-overflow pr-2 w-5/12">{{ word.title }}</p>
            <p class="text-overflow w-5/12">{{ word.meaning }}</p>
            <div class="w-2/12 text-right self-center">
              <v-mdi name="mdi-pencil" title="edit" class="text-light edit-btn" @click="setEditWord(word)" size="24"></v-mdi>
              <v-mdi name="mdi-delete" title="delete" class="text-danger ml-2" @click="deleteWord(word.id)" size="24"></v-mdi>
            </div>
          </template>
        </list-ui>
      </template>
      <p class="text-center text-light mt-8 mb-12" v-show="filteredWords.length === 0">
        Can't find <b>{{ search }}</b>
      </p>
      <paginate-ui :current-page="currentPage" :page-count="pageCount" :perPage="perPage" @changePerPage="perPage = $event" @changePage="pageChangeHandler"></paginate-ui>
    </div>
  </card-ui>
</template>
<script>
import debounce from 'lodash.debounce';
import Word from '~/store/models/Word';
import validateExistWord from '~/utils/validateExistWord';

export default {
  props: {
    words: Array,
  },
  data: () => ({
    activeEdit: '',
    tempWord: '',
    search: '',
    tempMeaning: '',
    currentPage: 0,
    perPage: 10,
  }),
  computed: {
    pageCount() {
      return Math.ceil(this.words.length / this.perPage);
    },
    filteredWords() {
      return this.words.filter(({ title, meaning }) => {
        return title.toLowerCase().match(this.search.toLowerCase()) || meaning.toLowerCase().match(this.search.toLowerCase());
      });
    },
    paginateWords() {
      const start = this.currentPage * this.perPage;
      const end = start + this.perPage;

      return this.filteredWords.slice(start, end);
    },
  },
  methods: {
    inputTempWord: debounce(function(input) {
      this.tempWord = input.replace(/\s/g, '');
    }, 400),
    pageChangeHandler(type) {
      type === 'next' ? (this.currentPage += 1) : (this.currentPage -= 1);
    },
    setEditWord({ title, meaning, id }) {
      this.tempWord = title;
      this.tempMeaning = meaning;
      this.activeEdit = id;
    },
    deleteWord(wordId) {
      Word.delete(wordId);
    },
    updateWord(word) {
      const isWordExist = Word.query()
        .where(word => {
          return validateExistWord(word, this.tempWord, this.tempMeaning, this.$route.params.id) && word.id !== this.activeEdit;
        })
        .exists();

      if (isWordExist) return this.$toast.error(`You already add ${this.tempWord}`);

      Word.update({
        where: this.activeEdit,
        data: {
          title: this.tempWord.replace(/\s/g, ''),
          meaning: this.tempMeaning,
        },
      });
      this.clearAll();
    },
    clearAll() {
      this.activeEdit = this.tempWord = this.tempMeaning = '';
    },
  },
};
</script>
<style lang="scss" scoped>
.list {
  cursor: pointer;
  .edit-btn {
    visibility: hidden;
    opacity: 1;
  }
  p,
  div {
    display: inline-block;
  }
  svg {
    display: inline-block;
  }
  &:hover {
    .edit-btn {
      visibility: visible;
      opacity: 1;
    }
  }
}
</style>
