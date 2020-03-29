<template>
  <div class="flex flex-col items-center">
    <img class="mb-12" :src="require('~/assets/svg/undraw_winners.svg').default" width="400" />
    <div>
      <div class="inline-block px-4 shadow-xl py-2 mr-3 text-center rounded-lg bg-light">
        <p class="text-4xl font-semibold leading-none">{{ (correct / question) * 100 }}</p>
        <p>Score</p>
      </div>
      <div class="inline-block text-lg">
        <p class="mb-1">
          Correct: <span style="color: var(--green)">{{ correct }}</span>
        </p>
        <p>
          Wrong: <span class="text-danger">{{ question - correct }}</span>
        </p>
      </div>
    </div>
    <router-link :to="`/learn/${$route.params.id}`" class="mt-16">
      <button-ui type="primary" style="width: 190px">Go back</button-ui>
    </router-link>
  </div>
</template>
<script>
export default {
  props: {
    question: Number,
    correct: Number,
  },
};
</script>
