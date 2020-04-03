<template>
  <div class="content rounded-tl-lg rounded-tr-lg -mt-6 px-5 mb-20 pt-6 bg-lighter" id="content">
    <swiper :options="swiperOption" class="mb-5">
      <swiper-slide>
        <div class="flag-list" :class="{ 'border-primary': activeId === 'all' }" @click="activeId = 'all'" title="All">
          <v-mdi name="mdi-earth" size="40"></v-mdi>
        </div>
      </swiper-slide>
      <swiper-slide v-for="learn in learns" :key="learn.learn_id">
        <div class="flag-list" :class="{ 'border-primary': activeId === learn.learn_id }" @click="activeId = learn.learn_id">
          <flag-ui size="40" :code="learn.learn_id | getLang('country')" style="border-radius: 99px"></flag-ui>
        </div>
      </swiper-slide>
    </swiper>
    <input-ui v-model="search" block icon="mdi-magnify" placeholder="Search word" class="border"></input-ui>
    <word-list :search="search" :active="activeId"></word-list>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import Learn from '~/store/models/Learn';
import 'swiper/dist/css/swiper.css';
import WordList from './WordList.vue';

export default {
  components: { WordList, swiper, swiperSlide },
  data: () => ({
    search: '',
    activeId: 'all',
    swiperOption: {
      slidesPerView: 5,
      mousewheel: true,
      freeMode: true,
      grabCursor: true,
      spaceBetween: 10,
    },
  }),
  watch: {
    activeId(val) {
      this.$store.commit('updateState', {
        key: 'popup',
        data: {
          activeId: val,
        },
      });
    },
  },
  computed: {
    learns() {
      return Learn.all();
    },
  },
};
</script>
<style scoped>
.content {
  transition: all 0.2s ease;
  box-shadow: 0px -20px 25px -5px rgba(0, 0, 0, 0.1), 0 -10px 10px -5px rgba(0, 0, 0, 0.04);
  overflow-y: auto;
}
.flag-list {
  @apply p-1 rounded-full inline-block cursor-pointer bg-light border;
}
</style>
