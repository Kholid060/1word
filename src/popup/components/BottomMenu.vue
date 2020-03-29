<template>
  <div class="bottom-menu h-16 flex items-center justify-evenly">
    <button-ui icon plain @click="openDashboard" v-tooltip.top="'Dashboard'">
      <mdi-icon name="mdi-home"></mdi-icon>
    </button-ui>
    <button-ui icon round type="primary" @click="openPopup" v-tooltip.top="'Add word'" class="shadow-xl -mt-8">
      <mdi-icon name="mdi-plus" size="40"></mdi-icon>
    </button-ui>
    <button-ui icon plain> </button-ui>
  </div>
</template>
<script>
import extTab from '~/utils/extTab';
import Bus from '~/utils/Bus';

export default {
  methods: {
    async openDashboard() {
      extTab().then(() => {
        this.$browser.tabs.create({
          active: true,
          url: this.$browser.runtime.getURL('/tab/tab.html#/'),
        });
      });
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
