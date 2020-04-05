<template>
  <card-ui class="add-word" tabindex="0">
    <p slot="header">Add word</p>
    <form @submit.prevent="addWord" @keyup.enter="addWord">
      <div class="flex">
        <div class="p-2 text-light rounded-lg word-dec bg-lighter mr-3">
          <v-mdi name="mdi-message-processing"></v-mdi>
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
import { addWord } from '~/CRUD/Word';

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

      addWord({
        title: this.word,
        meaning: this.meaning,
        learn_id: this.$route.params.id,
        timestamp: Date.now(),
      })
        .then(() => {
          this.word = this.meaning = '';
        })
        .catch(err => {
          this.$toast.error(err);
        });
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
