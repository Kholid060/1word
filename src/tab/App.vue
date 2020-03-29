<template>
  <div class="flex text-default text-base">
    <template v-if="retrieved">
      <side-menu v-if="!excludeMenu.includes($route.name)"></side-menu>
      <main class="h-full flex-grow px-12 py-10">
        <router-view></router-view>
      </main>
      <Aside v-if="includeAside.includes($route.name)"></Aside>
    </template>
    <div v-else class="mx-auto">
      <div class="loader"></div>
      <p class="text-lg text-center text-light mt-4">Loading...</p>
    </div>
  </div>
</template>
<script>
import SideMenu from './components/layout/SideMenu.vue';
import Aside from './components/layout/Aside.vue';
import Learn from '~/store/models/learn';
import retrieveData from '~/utils/retrieveData';
import extTab from '~/utils/extTab';

export default {
  components: { SideMenu, Aside },
  data: () => {
    return {
      retrieved: false,
      includeAside: ['learn', 'home'],
      excludeMenu: ['welcome', 'practice'],
    };
  },
  created() {
    extTab().catch(async tabs => {
      this.$browser.tabs.remove(tabs.filter(tab => !tab.active).map(tab => tab.id));
    });
    // function randomDate(start, end) {
    //     return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    // }
    // function wordGenerator(id, length = 13){

    //   return new Array(length).fill().map(nothing => {
    //     const randomText = () => Math.random().toString(36).substring(7);

    //     return {
    //       title: randomText(),
    //       meaning: randomText(),
    //       learn_id: id,
    //       timestamp: randomDate(new Date(2020, 3, 10), new Date()).getTime()
    //     }
    //   })
    // }
    // function practiceGenerator(id, length = 10){
    //   const randomNumber = (min = 1, max = 20) => Math.floor(Math.random() * (max - min) + min);

    //   return new Array(length).fill().map(nothingToo => {
    //     return {
    //       correct: randomNumber(),
    //       wrong: randomNumber(5, 30),
    //       score: randomNumber(0, 100),
    //       question_length: randomNumber(10, 28),
    //       learn_id: id,
    //       timestamp: randomDate(new Date(2020, 3, 10), new Date()).getTime()
    //     }
    //   })
    // }

    // Learn.insert({
    //   data: [
    //     {
    //       learn_id: 'de',
    //       practices: practiceGenerator('de', 2),
    //       words: wordGenerator('de', 15)
    //     },
    //     {
    //       learn_id: 'es',
    //       practices: practiceGenerator('es', 6),
    //       words: wordGenerator('es', 21)
    //     },
    //   ]
    // })
    retrieveData().then(({ learns }) => {
      this.retrieved = true;

      if (learns.length === 0) this.$router.push({ path: '/welcome', query: { id: 'add-learn' } });
    });
  },
};
</script>
