<template>
  <div class="w-20 h-screen">
    <nav class="w-20 fixed h-full py-10 flex items-center flex-col text-white bg-primary">
      <img :src="getImage('icon')" class="rounded-lg mb-12" />
      <router-link :to="item.path" v-for="item in navs" class="mb-8" :key="item.name">
        <button-ui type="secondary" icon :plain="$route.name !== item.name" v-tooltip.right="item.name">
          <v-mdi :name="item.icon" size="26" fill="white"></v-mdi>
        </button-ui>
      </router-link>
    </nav>
  </div>
</template>
<script>
export default {
  data: () => ({
    navs: [
      { name: 'home', icon: 'mdi-home', path: '/' },
      { name: 'read', icon: 'mdi-newspaper-variant', path: '/read' },
      { name: 'settings', icon: 'mdi-cog', path: '/settings' },
    ],
  }),
  methods: {
    getImage(name) {
      return require(`../../../assets/images/${name}.png`).default;
    },
  },
};
</script>
