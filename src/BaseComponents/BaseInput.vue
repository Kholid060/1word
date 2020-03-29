<template>
  <div class="input-ui" @click="$emit('click', $event)" :class="[{ error, large, block }, type]">
    <div class="input-ui--container">
      <mdi-icon :name="icon" v-if="!!icon"></mdi-icon>
      <input
        :type="nativeType"
        :name="name"
        :placeholder="placeholder"
        :value="value"
        :style="{ width }"
        @input="$emit('input', $event.target.value)"
        @change="$emit('change', $event.target.value)"
      />
    </div>
  </div>
</template>
<script>
import '~/assets/scss/components/_input.scss';

export default {
  name: 'input-ui',
  props: {
    name: String,
    value: String,
    error: Boolean,
    icon: String,
    placeholder: String,
    large: Boolean,
    block: Boolean,
    width: [String, Number],
    type: {
      type: String,
      default: 'default',
      validator(value) {
        return ['default', 'outline', 'background'].indexOf(value) !== -1;
      },
    },
    nativeType: {
      type: String,
      default: 'text',
    },
  },
};
</script>
