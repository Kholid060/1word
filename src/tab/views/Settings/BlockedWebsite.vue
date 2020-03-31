<template>
  <div>
    <p class="mb-5">Blocked website</p>
    <div class="flex items-center">
      <div class="p-2 rounded-lg bg-lighter">
        <mdi-icon name="mdi-link"></mdi-icon>
      </div>
      <input-ui class="flex-grow mr-4 ml-2" v-model="website" placeholder="https://example.com" @keyup.enter.native="addWebsite"></input-ui>
      <button-ui type="primary" :disabled="!isValid" @click="addWebsite">Add website</button-ui>
    </div>
    <div class="mt-8 grid grid-cols-2 gap-3">
      <list-ui v-for="(website, index) in $store.state.blockedWebsite" :key="website" :title="website">
        <p class="flex-grow" style="max-width: 500px">{{ website }}</p>
        <mdi-icon name="mdi-delete" class="text-danger cursor-pointer" @click="deleteWebsite(index)"></mdi-icon>
      </list-ui>
    </div>
  </div>
</template>
<script>
import url from 'url';
import isURL from '~/utils/isURL';

export default {
  data: () => ({
    website: '',
  }),
  computed: {
    isValid() {
      return isURL(this.website);
    },
  },
  methods: {
    addWebsite() {
      const { protocol, hostname } = url.parse(this.website);
      const URL = `${protocol}//${hostname}`;

      if (!this.isValid) return;
      if (this.$store.state.blockedWebsite.includes(URL)) return this.$toast.error(`You already add ${hostname}`);

      this.$store.commit('blockedWebsite', {
        type: 'add',
        data: URL,
      });
      this.website = '';
    },
    deleteWebsite(index) {
      this.$store.commit('blockedWebsite', {
        type: 'delete',
        data: index,
      });
    },
  },
};
</script>
