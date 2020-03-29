<template>
  <card-ui hover class="mt-4 learn-card cursor-pointer first:mt-0" :class="{ 'border border-primary': active }">
    <div class="flex items-center">
      <div class="bg-lighter flag-container p-1 rounded-lg">
        <flag-ui :code="id | getLang('country')" size="41"></flag-ui>
      </div>
      <div class="pl-3">
        <p class="leading-snug font-semibold">{{ id | getLang }}</p>
        <p class="leading-snug text-sm text-light">{{ wordLength }} words</p>
      </div>
    </div>
  </card-ui>
</template>
<script>
export default {
  props: {
    id: String,
    active: Boolean,
    wordLength: [String, Number],
  },
};
</script>
<style scoped lang="scss">
.flag-container {
  transition: transform 0.3s ease;
}
.learn-card:hover {
  .flag-container {
    transform: translateY(-3px);
  }
}
</style>
