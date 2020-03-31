<template>
  <card-ui class="add-word" tabindex="0">
    <p slot="header">Add word</p>
    <form @submit.prevent="addWord" @keyup.enter="addWord">
      <div class="flex">
        <div class="p-2 text-light rounded-lg word-dec bg-lighter mr-3">
          <mdi-icon name="mdi-message-processing"></mdi-icon>
        </div>
        <input-ui class="flex-grow" :value="word" @input="inputWord" placeholder="Word"></input-ui>
      </div>
      <div class="hidden-input">
        <textarea-ui v-model="meaning" placeholder="Meaning" min-height="100px" block class="mt-4 mb-8"></textarea-ui>
        <button-ui block :disabled="!(!!word && !!meaning)" type="primary">Add word</button-ui>
      </div>
    </form>
  </card-ui>
</template>
<script>
import debounce from 'lodash.debounce';
import Word from '~/store/models/Word';
import validateExistWord from '~/utils/validateExistWord';
import saveDataIntoStorage from '~/utils/saveDataIntoStorage';

export default {
  data: () => ({
    word: '',
    meaning: '',
  }),
  methods: {
    inputWord: debounce(function(value) {
      this.word = value.replace(/\s/g, '');
    }, 300),
    addWord() {
      if (this.word === '' && this.meaning === '') return;

      const { id } = this.$route.params;
      const isWordExist = Word.query()
        .where(word => {
          return validateExistWord(word, this.word, this.meaning, id);
        })
        .exists();

      if (isWordExist) return this.$toast.error(`You alread add ${this.word}`);

      Word.insert({
        data: {
          title: this.word,
          meaning: this.meaning,
          timestamp: Date.now(),
          learn_id: id,
        },
      });

      saveDataIntoStorage('words', 'ttt');

      this.word = this.meaning = '';
    },
  },
};
</script>
<style lang="scss">
.hidden-input {
  visibility: hidden;
  transition: all 0.2s ease;
  height: 0;
  overflow: hidden;
  opacity: 0;
}
.add-word {
  &:focus-within,
  &:focus {
    @apply shadow-xl;
    outline: none;
    .word-dec {
      @apply bg-light;
    }
    .hidden-input {
      opacity: 1;
      height: auto;
      visibility: visible;
    }
  }
}
</style>
