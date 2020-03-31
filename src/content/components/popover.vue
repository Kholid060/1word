<template>
  <div class="oneWord-popover--instance">
    <p class="oneWord-popover--title" v-show="data.type === 'AddWord'">Add word</p>
    <component :is="data.type"></component>
  </div>
</template>
<script>
import AddWord from './AddWord.vue';
import WordMeaning from './WordMeaning.vue';

export default {
  components: { AddWord, WordMeaning },
};
</script>
<style scoped lang="scss">
@import '~/assets/scss/base/variables';

.oneWord-popover--instance {
  background-color: white;
  width: 100%;
  box-sizing: border-box;
  min-height: 100px;
  border-radius: 13px;
  padding: 12px 16px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border: 1px solid $n30;
}
</style>
