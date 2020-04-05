<template>
  <div>
    <p class="text-3xl font-semibold">Settings</p>
    <div class="flex mt-12 items-start">
      <div class="side">
        <card-ui width="320px">
          <router-link v-for="setting in settings" :to="setting.path" :key="setting.path" class="mb-3 block">
            <list-ui class="cursor-pointer" :class="{ 'bg-light text-primary': setting.path === $route.name }">
              <v-mdi :name="setting.icon" slot="prefix"></v-mdi>
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
    settings: [
      { name: 'Blocked website', icon: 'mdi-link-lock', path: 'blocked' },
      { name: 'Preferences', icon: 'mdi-cog', path: 'preferences' },
    ],
  }),
};
</script>
