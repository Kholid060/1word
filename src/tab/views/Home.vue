<template>
  <div class="home-page">
    <p class="text-3xl mb-10 font-semibold">Dashboard</p>
    <word-chart class="col-span-3"></word-chart>
    <div class="mt-6 flex items-start">
      <practice-history :data="practices.slice(0, 5)" class="flex-grow"></practice-history>
      <div class="ml-6" style="width: 300px">
        <practice-total :data="practices"></practice-total>
        <practice-score-average :data="practices" class="mt-6"></practice-score-average>
      </div>
    </div>
  </div>
</template>
<script>
import PracticeHistory from '~/tab/components/ui/PracticeHistory.vue';
import WordChart from '~/tab/components/Pages/Home/WordChart.vue';
import PracticeTotal from '~/tab/components/Pages/Home/PracticeTotal.vue';
import PracticeScoreAverage from '~/tab/components/Pages/Home/PracticeScoreAverage.vue';

import Practice from '~/store/models/Practice';

export default {
  components: { WordChart, PracticeHistory, PracticeTotal, PracticeScoreAverage },
  computed: {
    practices() {
      return Practice.all();
    },
  },
};
</script>
