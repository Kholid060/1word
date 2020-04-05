<template>
  <div>
    <p class="mb-5">Preferences</p>
    <div>
      <list-ui>
        <switch-ui :value="settings.ctrlClick" slot="prefix" @change="updateSettings('ctrlClick', $event)" class="mt-1 mr-3"></switch-ui>
        <p>Use <kbd>Ctrl</kbd> + <kbd>Double click</kbd> to add word on website</p>
      </list-ui>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    settings() {
      return this.$store.state.settings;
    },
  },
  methods: {
    updateSettings(key, value) {
      this.$store.commit('updateSettings', {
        key,
        value,
      });
    },
  },
};
</script>
