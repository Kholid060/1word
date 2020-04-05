<template>
  <transition name="slide">
    <div class="modal-ui fixed h-full w-full" v-if="value">
      <div class="modal-ui--overlay" @click="closeModal"></div>
      <div class="modal-ui--inner px-5 py-4">
        <div class="modal-ui--header flex items-center justify-between">
          <slot name="header"></slot>
          <button-ui plain icon @click="closeModal">
            <v-mdi name="mdi-close"></v-mdi>
          </button-ui>
        </div>
        <div class="modal-ui--content mt-5">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'modal-ui',
  props: {
    value: Boolean,
  },
  methods: {
    closeModal() {
      this.$emit('close');
      this.$emit('input', false);
    },
  },
};
</script>
<style lang="scss">
.modal-ui {
  z-index: 12;
  &--overlay {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.21);
    animation: opacity 1s ease;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  &--inner {
    position: absolute;
    width: 100%;
    bottom: 0;
    z-index: 1;
    background-color: white;
    min-height: 100px;
    @apply rounded-tl-lg rounded-tr-lg;
  }
}
.slide-enter-active {
  transition: all 0.3s ease;
}
.slide-leave-active {
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(100px);
}
.slide-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(100px);
}
</style>
