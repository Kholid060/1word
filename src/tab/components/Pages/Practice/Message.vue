<template>
  <div class="absolute practice-message w-full">
    <card-ui class="w-6/12 border mx-auto shadow-xl">
      <div class="flex items-center">
        <div class="icon p-2 rounded-lg" :class="[correct ? 'correct' : 'wrong']">
          <v-mdi :name="correct ? 'mdi-check' : 'mdi-close'" size="30"></v-mdi>
        </div>
        <p class="text-lg font-semibold ml-4">{{ correct ? 'Correct' : 'Wrong' }} answer</p>
        <div class="flex-grow"></div>
        <button-ui type="primary" style="font-weight: normal;" @click="$emit('next')">
          Next question
        </button-ui>
      </div>
    </card-ui>
  </div>
</template>
<script>
export default {
  props: {
    correct: Boolean,
  },
};
</script>
<style lang="scss">
.practice-message {
  bottom: 13px;
  left: 0;
  .icon {
    &.wrong {
      @apply text-danger;
      background-color: rgba(245, 101, 101, 0.5);
    }
    &.correct {
      background-color: rgba(54, 179, 126, 0.5);
      color: var(--green);
    }
  }
}
</style>
