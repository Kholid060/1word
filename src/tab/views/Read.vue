<template>
  <div class="read-now">
    <p class="text-3xl font-semibold">Read now</p>
    <div class="categories mb-12 mt-6 flex items-center">
      <p class="category" :class="{ 'is-active': activeCat === 'all' }" @click="activeCat = 'all'">All</p>
      <div class="h-10 mx-4" style="width: 1px; background-color: #e2e8f0"></div>
      <template v-for="category in categories">
        <p class="category mr-2 capitalize" :class="{ 'is-active': activeCat === category }" @click="activeCat = category">{{ category }}</p>
      </template>
    </div>
    <div class="flex items-center mb-5" v-for="item in sources">
      <flag-ui :code="item.id | getLang('country')" size="60" class="inline-block shadow-xl mr-5"></flag-ui>
      <swiper class="swiper py-6 px-5" :options="swiperOption" style="width: calc(100vw - 15rem); margin: 0">
        <swiper-slide v-for="website in filterByCategory(item.sources)" :key="website.url">
          <a :href="website.url" target="_blank" rel="noreferrer">
            <card-ui class="inline-block cursor-pointer" hover>
              <template slot="header">
                <div class="p-2 rounded-lg bg-light">
                  <img :src="`https://www.google.com/s2/favicons?domain=${website.url}`" height="16" width="16" />
                </div>
                <div class="flex-grow"></div>
                <p class="text-light">#{{ website.category }}</p>
              </template>
              <p class="text-lg font-semibold">{{ website.name }}</p>
            </card-ui>
          </a>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { categories, sources } from '~/utils/readSources';
import 'swiper/dist/css/swiper.css';
import Learn from '~/store/models/Learn';

export default {
  components: {
    swiper,
    swiperSlide,
  },
  data: () => ({
    activeCat: 'all',
    categories,
    swiperOption: {
      slidesPerView: 5,
      mousewheel: true,
      freeMode: true,
      grabCursor: true,
      spaceBetween: 30,
    },
  }),
  computed: {
    sources() {
      const learns = Learn.all().map(learn => learn.learn_id);

      return sources.filter(source => learns.includes(source.id) && source.sources.length !== 0);
    },
  },
  methods: {
    filterByCategory(websites) {
      return websites.filter(website => {
        if (this.activeCat === 'all') return true;

        return website.category === this.activeCat;
      });
    },
  },
};
</script>
<style scoped lang="scss">
.category {
  @apply py-1 px-4 rounded-full;
  cursor: pointer;
  &.is-active {
    @apply bg-primary text-white;
  }
  &:hover {
    @apply bg-primary text-white;
  }
}
</style>
