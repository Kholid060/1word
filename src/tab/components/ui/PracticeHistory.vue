<template>
  <card-ui>
    <p slot="header">Practice History</p>
    <table class="table-auto table-ui">
      <thead>
        <tr>
          <th v-show="!hideName"></th>
          <th style="width: 150px" class="text-left">{{ !hideName ? 'Name' : 'Date' }}</th>
          <th>Wrong</th>
          <th>Correct</th>
          <th>Questions</th>
          <th>Score</th>
          <th v-show="showDelete"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in paginateData" class="text-center">
          <template v-if="!hideName">
            <td style="width: 100px">
              <flag-ui size="40" :code="item.learn_id | getLang('country')"></flag-ui>
            </td>
            <td class="text-left" :title="formatDate(item.timestamp, 'DD MMMM YYYY')">
              <p>{{ item.learn_id | getLang }}</p>
              <p class="text-sm text-light">{{ formatDate(item.timestamp) }}</p>
            </td>
          </template>
          <template v-else>
            <td class="text-left" :title="formatDate(item.timestamp, 'DD MMMM YYYY')">
              <p>{{ formatDate(item.timestamp) }}</p>
            </td>
          </template>
          <td class="text-danger">{{ item.wrong }}</td>
          <td style="color: var(--green)">{{ item.correct }}</td>
          <td>{{ item.question_length }}</td>
          <td>
            <p class="inline-block text-white rounded-lg" style="padding: 5px 7px; width: 34px" :class="[getScoreBackground(item.score)]">{{ item.score }}</p>
          </td>
          <td v-if="showDelete">
            <mdi-icon name="mdi-delete" @click="$emit('delete', item)" class="text-danger cursor-pointer"></mdi-icon>
          </td>
        </tr>
      </tbody>
    </table>
    <p class="py-5 text-center text-light" v-if="data.length === 0">No data</p>
    <paginate-ui
      v-if="showPagination"
      :current-page="currentPage"
      :page-count="pageCount"
      :perPage="perPage"
      @changePerPage="perPage = $event"
      @changePage="pageChangeHandler"
    ></paginate-ui>
  </card-ui>
</template>
<script>
import dayjs from 'dayjs';

export default {
  props: {
    hideName: Boolean,
    showDelete: Boolean,
    showPagination: Boolean,
    data: Array,
  },
  data: () => ({
    currentPage: 0,
    perPage: 10,
  }),
  computed: {
    pageCount() {
      return Math.ceil(this.data.length / this.perPage);
    },
    paginateData() {
      const start = this.currentPage * this.perPage;
      const end = start + this.perPage;

      return this.data.slice(start, end);
    },
  },
  methods: {
    pageChangeHandler(type) {
      type === 'next' ? (this.currentPage += 1) : (this.currentPage -= 1);
    },
    getScoreBackground(score) {
      if (score <= 40) {
        return 'bg-danger';
      }
      if (score >= 41 && score <= 75) {
        return 'bg-warning';
      }
      if (score >= 76) {
        return 'bg-primary';
      }
    },
    formatDate(date, format = 'DD MMMM') {
      return dayjs(date).format(format);
    },
  },
};
</script>
