<template>
  <aside class="h-screen sticky top-0">
    <div class="bg-light flex flex-col content h-full" style="width: 300px">
      <div class="flex justify-between items-center pt-10 px-6 w-full">
        <p class="text-light text-lg">Learns</p>
        <v-popover placement="left">
          <button-ui icon v-tooltip.left="'Add language'" class="shadow-xl">
            <v-mdi name="mdi-plus" class="text-primary"></v-mdi>
          </button-ui>
          <card-ui slot="popover" class="shadow-xl border" width="250px">
            <p slot="header">Add learn</p>
            <VuePerfectScrollbar class="overflow-auto" style="max-height: 300px">
              <list-ui v-for="learn in filteredLearns" :key="learn" v-close-popover class="cursor-pointer" dense @click="addLearn(learn)">
                <div class="p-1 rounded-lg bg-light" slot="prefix">
                  <flag-ui :code="learn | getLang('country')" size="40"></flag-ui>
                </div>
                <div>
                  <p class="leading-tight">{{ learn | getLang }}</p>
                  <p class="text-sm leading-tight text-light">{{ learn | getLang('native') }}</p>
                </div>
              </list-ui>
            </VuePerfectScrollbar>
          </card-ui>
        </v-popover>
      </div>
      <VuePerfectScrollbar class="mt-4 pb-6 flex-grow px-6 overflow-auto">
        <router-link :to="`/learn/${learn.learn_id}`" v-for="learn in learns" :key="learn.learn_id">
          <flag-card :id="learn.learn_id" :word-length="learn.words.length" :active="$route.params.id === learn.learn_id"></flag-card>
        </router-link>
      </VuePerfectScrollbar>
    </div>
  </aside>
</template>
<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import FlagCard from '../ui/FlagCard.vue';
import Learn from '~/store/models/Learn';
import saveDataIntoStorage from '~/utils/saveDataIntoStorage';
import { supportedLanguages } from '~/utils/getLang';

export default {
  components: { VuePerfectScrollbar, FlagCard },
  computed: {
    learns() {
      return Learn.query()
        .with('words')
        .get();
    },
    filteredLearns() {
      return supportedLanguages.filter(item => {
        return !this.learns.some(learn => item === learn.learn_id);
      });
    },
  },
  methods: {
    addLearn(id) {
      Learn.insert({
        data: {
          learn_id: id,
        },
      }).then(() => saveDataIntoStorage('learns'));
    },
  },
};
</script>
<style scoped lang="scss">
aside {
  .content {
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
  }
}
</style>
