<template>
  <div class="pagination mt-6 flex justify-end items-center">
    <template v-if="!hideSelect">
      <span class="mr-2">Rows per page: </span>
      <select-ui @input="$emit('changePerPage', $event)" :value="perPage" :list="perPageList"></select-ui>
    </template>
    <div v-else>
      <p>Page {{ currentPage + 1 }} of {{ pageCount }}</p>
    </div>
    <div class="ml-8">
      <button-ui icon @click="$emit('changePage', 'prev')" :disabled="currentPage <= 0">
        <mdi-icon name="mdi-chevron-down" rotate="90"></mdi-icon>
      </button-ui>
      <button-ui icon class="ml-2" @click="$emit('changePage', 'next')" :disabled="currentPage >= pageCount - 1">
        <mdi-icon name="mdi-chevron-down" rotate="270"></mdi-icon>
      </button-ui>
    </div>
  </div>
</template>
<script>
export default {
  name: 'paginate-ui',
  props: {
    hideSelect: Boolean,
    perPageList: {
      type: Array,
      default: () => [5, 10, 25, 100],
    },
    perPage: {
      type: Number,
      default: 10,
    },
    currentPage: Number,
    pageCount: Number,
  },
};
</script>
