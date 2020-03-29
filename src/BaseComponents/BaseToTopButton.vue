<template>
  <button-ui round icon class="scroll-button fixed shadow-xl z-10 homepage" :class="[scrollPosition > 250 ? '' : 'animate']" @click="scrollTo">
    <fontawesome-icon size="2x" icon="chevron-left" :rotation="scrollPosition > 250 ? 90 : 270"></fontawesome-icon>
  </button-ui>
</template>
<script>
import scrollPosition from '~/mixins/scrollPosition';
export default {
  mixins: [scrollPosition],
  name: 'to-top-button',
  props: {
    goDown: [Number, String],
  },
  methods: {
    scrollTo() {
      this.$scrollInto(this.scrollPosition > 250 ? 0 : this.goDown);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~/assets/scss/animation/bounce.scss';

.scroll-button {
  bottom: 50px;
  right: 55px;
  &.animate {
    animation: bounce 2.5s ease;
    animation-iteration-count: infinite;
    transform-origin: bottom;
  }
}
</style>
