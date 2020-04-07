<template>
  <div class="bottom-menu h-16 flex items-center justify-evenly">
    <button-ui icon plain @click="openDashboard" v-tooltip.top="'Dashboard'">
      <v-mdi name="mdi-home"></v-mdi>
    </button-ui>
    <button-ui icon round type="primary" @click="openPopup" v-tooltip.top="'Add word'" class="shadow-xl -mt-8">
      <v-mdi name="mdi-plus" size="40"></v-mdi>
    </button-ui>
    <button-ui icon plain v-tooltip.top="'Settings'" @click="openSettings">
      <v-mdi name="mdi-cog"></v-mdi>
    </button-ui>
  </div>
</template>
<script>
import url from 'url';
import Bus from '~/utils/Bus';

export default {
  methods: {
    async extTab(path = '/') {
      const { hostname: extId } = url.parse(browser.runtime.getURL('/'));
      const tabs = await browser.tabs.query({});
      const getExtTab = tabs.find(tab => url.parse(tab.url).hostname === extId);

      if (getExtTab) {
        browser.tabs.update(getExtTab.id, {
          active: true,
          url: `tab/tab.html#${path}`,
        });
      } else {
        this.$browser.tabs.create({
          active: true,
          url: this.$browser.runtime.getURL(`/tab/tab.html#/${path}`),
        });
      }
      window.close();
    },
    openDashboard() {
      this.extTab();
    },
    openSettings() {
      this.extTab('/settings/preferences');
    },
    openPopup() {
      Bus.$emit('openWordPopup', { learnId: this.$store.state.popup.activeId, type: 'add' });
    },
  },
};
</script>
<style lang="scss">
.bottom-menu {
  width: 100%;
  box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, 0.1), 0 -1px 2px 0 rgba(0, 0, 0, 0.06);
  @apply rounded-tr-lg rounded-tl-lg;
  background-color: white;
  position: fixed;
  bottom: 0;
}
</style>
