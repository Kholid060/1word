<template>
  <div class="flex items-center h-full">
    <div class="w-5/12">
      <p class="text-4xl font-bold mb-3">Add language</p>
      <p class="text-xl">Select language that you want to learn</p>
      <button-ui width="200px" type="primary" :disabled="selected.length === 0" @click="addLearn" class="mt-20">Next</button-ui>
    </div>
    <div class="w-7/12">
      <div
        v-for="(learn, idx) in learns"
        :key="learn.id"
        :class="{ 'is-active': learn.selected }"
        @click="learns[idx].selected = !learns[idx].selected"
        :title="learn.id | getLang"
        class="inline-block text-center rounded-lg px-4 border select-learn py-4 mr-5 mb-5"
      >
        <flag-ui :code="learn.id | getLang('country')" class="mx-auto shadow-xl mb-3"></flag-ui>
        <p class="text-base leading-tight font-semibold text-overflow">{{ learn.id | getLang }}</p>
        <p class="text-base leading-tight text-light text-overflow">{{ learn.id | getLang('native') }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import Learn from '~/store/models/Learn';
import { supportedLanguages } from '~/utils/getLang';
import saveDataIntoStorage from '~/utils/saveDataIntoStorage';

const learns = supportedLanguages.map(id => ({ selected: false, id }));

export default {
  data: () => ({
    learns,
  }),
  computed: {
    selected() {
      return this.learns.filter(item => item.selected);
    },
  },
  methods: {
    addLearn() {
      Learn.insert({
        data: this.selected.map(item => ({ learn_id: item.id })),
      }).then(() => {
        saveDataIntoStorage('learns');
        this.$router.push('/');
      });
    },
  },
};
</script>
<style scoped lang="scss">
.select-learn {
  cursor: pointer;
  transition: all 0.2s ease;
  width: 135px;
  &.is-active {
    @apply shadow-xl bg-white border border-primary;
  }
  &:hover {
    @apply shadow-xl bg-white;
  }
}
</style>
