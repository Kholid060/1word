<template>
  <div class="question">
    <p class="font-semibold text-light text-3xl">Mark the correct meaning</p>
    <p class="text-2xl font-semibold mt-4">{{ data.question }}</p>
    <div class="mt-16">
      <card-ui
        hover
        class="border option cursor-pointer mt-4"
        v-for="(option, index) in data.options"
        :key="option + index"
        :title="option"
        :disabled="!!value"
        :class="{ 'border-primary shadow-xl': !!value && option === data.answer }"
        @click="$emit('answer', option)"
      >
        <div class="py-1 flex items-center">
          <div class="selected rounded-lg p-2 h-8 w-8 border" :class="{ 'is-selected': value === option }">
            <div class="select h-full w-full bg-primary rounded-lg"></div>
          </div>
          <p class="text-lg ml-3">{{ option }}</p>
        </div>
      </card-ui>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    value: String,
  },
};
</script>
<style lang="scss" scoped>
.option {
  &:hover {
    .selected {
      @apply border-primary;
      .select {
        transform: scale(1);
      }
    }
  }
  .selected {
    transition: all 0.2s ease;
    &.is-selected {
      @apply border-primary;
      .select {
        transform: scale(1);
      }
    }
    .select {
      transform: scale(0);
      transition: transform 0.3s ease;
    }
  }
}
</style>
