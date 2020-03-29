<template>
  <div class="px-12 overflow-hidden relative" style="height: calc(100vh - 5rem)">
    <component :is="activePage" @next="nextPage"></component>
  </div>
</template>
<script>
import AddWord from '../components/Pages/Welcome/AddWord.vue';
import AddLearn from '../components/Pages/Welcome/AddLearn.vue';

export default {
  components: { AddWord, AddLearn },
  data: () => ({
    activePage: 'add-word',
  }),
  methods: {
    nextPage(id) {
      this.activePage = id;
      localStorage.setItem('welcome', true);
    },
  },
  created() {
    console.log(localStorage.getItem('welcome'));
    if (this.$route.query.id && localStorage.getItem('welcome')) this.activePage = this.$route.query.id;
  },
};
</script>
<style>
.illustration {
  position: absolute;
  top: 0;
  right: -250px;
  width: 900px;
  @apply rounded-lg;
}
</style>
