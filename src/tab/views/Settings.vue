<template>
  <div>
    <p class="text-3xl font-semibold">Settings</p>
    <div class="flex mt-12 items-start">
      <div class="side">
        <card-ui width="320px">
          <router-link v-for="setting in settings" :to="setting.path" class="mt-3 first:mt-0">
            <list-ui class="cursor-pointer" :class="{ 'bg-light text-primary': setting.path === $route.name }">
              <mdi-icon :name="setting.icon" slot="prefix"></mdi-icon>
              <span>{{ setting.name }}</span>
            </list-ui>
          </router-link>
        </card-ui>
      </div>
      <card-ui class="relative flex-grow ml-6">
        <router-view></router-view>
      </card-ui>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    settings: [{ name: 'Blocked website', icon: 'mdi-link-lock', path: 'blocked' }],
  }),
  mounted() {
    if (this.$route.query.name) this.$router.push(`settings/${this.$route.query.name}`);
    else if (this.$route.name === 'settings') this.$router.push(`settings/${this.settings[0].path}`);
  },
};
</script>
