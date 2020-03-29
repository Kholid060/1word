<template>
  <div v-lazy:background-image="src" class="img-ui" :class="{ 'is-contain': contain }" :style="$attrs">
    <slot />
  </div>
</template>
<script>
import '~/assets/scss/components/_img.scss';

export default {
  name: 'img-ui',
  props: {
    src: String,
    contain: Boolean,
  },
};
</script>
