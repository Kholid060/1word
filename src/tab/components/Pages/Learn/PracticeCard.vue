<template>
  <card-ui class="mt-6">
    <p slot="header">Practice</p>
    <p class="text-center" v-if="wordLength < 10">You need at least 10 words to start practice</p>
    <template v-else>
      <div class="w-full flex mt-3">
        <input v-model="questionLength" min="10" type="number" class="rounded-lg px-5 font-semibold w-9/12 mr-4 focus:outline-none text-center bg-light appearance-none text-2xl" />
        <div class="w-3/12">
          <button-ui icon @click="incNumber" :disabled="questionLength >= wordLength">
            <mdi-icon name="mdi-plus"></mdi-icon>
          </button-ui>
          <button-ui icon class="mt-2" @click="decNumber" :disabled="questionLength <= 10">
            <mdi-icon name="mdi-minus"></mdi-icon>
          </button-ui>
        </div>
      </div>
      <p class="text-center mb-8 mt-5 font-semibold">Questions</p>
      <p v-show="isNotValid" class="text-center">Must be ≥ 10 and ≤ {{ wordLength }}</p>
      <button-ui type="primary" block class="mt-6" @click="startPractice" :disabled="isNotValid">Start practice</button-ui>
    </template>
  </card-ui>
</template>
<script>
import questionGenerator from '~/utils/questionGenerator';

export default {
  props: {
    wordLength: [Number, String],
  },
  data: () => ({
    questionLength: 10,
  }),
  methods: {
    incNumber() {
      if (this.questionLength >= this.wordLength) return;

      this.questionLength += 1;
    },
    decNumber() {
      if (this.questionLength <= 10) return;

      this.questionLength -= 1;
    },
    startPractice() {
      if (this.wordLength < 10) return;

      this.$store.commit('updateState', {
        key: 'practice',
        data: {
          valid: true,
          length: this.questionLength,
        },
      });

      this.$router.push(`/practice/${this.$route.params.id}`);
    },
  },
  computed: {
    isNotValid() {
      return this.questionLength < 10 || this.questionLength > this.wordLength;
    },
  },
};
</script>
<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>
