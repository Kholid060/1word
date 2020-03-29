<template>
  <img :src="require(`./flag-icon-css/${code}.svg`).default" class="rounded-lg flag" :width="size" :height="size" />
</template>
<script>
export default {
  name: 'flag-ui',
  props: {
    code: String,
    size: {
      type: [Number, String],
      default: '50',
    },
  },
};
</script>
