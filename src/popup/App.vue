<template>
  <div class="text-default app flex flex-col" v-if="show">
    <Header :small="small"></Header>
    <Content :style="{ height: small ? '490px' : '430px' }"></Content>
    <bottom-menu></bottom-menu>
    <add-word></add-word>
  </div>
</template>
<script>
import url from 'url';
import Header from './components/Header.vue';
import Content from './components/Content.vue';
import BottomMenu from './components/BottomMenu.vue';
import AddWord from './components/AddWord.vue';

import retrieveData from '~/utils/retrieveData';

export default {
  components: { Header, Content, BottomMenu, AddWord },
  data: () => ({
    show: true,
    small: false,
  }),
  async created() {
    try {
      const [activeTab] = await this.$browser.tabs.query({ active: true });
      const { hostname } = url.parse(this.$browser.runtime.getURL('/'));
      const { hostname: currentHost } = url.parse(activeTab.url);

      if (hostname === currentHost) return (this.show = false);

      const data = await retrieveData();

      if (data.learns.length === 0) {
        return this.$browser.tabs.create({
          active: true,
          url: this.$browser.runtime.getURL('tab/tab.html#/welcome'),
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
  mounted() {
    const contentEl = document.getElementById('content');
    contentEl.addEventListener('scroll', event => {
      this.small = contentEl.scrollTop >= 50;
    });
  },
};
</script>
<style>
html,
body {
  overflow: hidden;
}
.app {
  height: 600px;
  width: 320px;
}
</style>
