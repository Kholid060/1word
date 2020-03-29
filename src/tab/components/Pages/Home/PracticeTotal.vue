<template>
  <card-ui>
    <p slot="header">Practice Total</p>
    <apexchart ref="donutChart" type="donut" width="280" :options="chartOptions" :series="series"></apexchart>
  </card-ui>
</template>
<script>
import Apexchart from 'vue-apexcharts';

export default {
  components: { Apexchart },
  props: {
    data: Array,
  },
  data: () => ({
    chartOptions: {
      chart: {
        width: 380,
        type: 'pie',
      },
      dataLabels: {
        enabled: false,
      },
      noData: {
        text: 'No data',
        style: {
          fontFamily: 'Inter, sans-serif',
        },
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
                fontFamily: 'Inter, sans-serif',
                formatter: function(w) {
                  return w.globals.seriesTotals.reduce((a, b) => {
                    return a + b;
                  }, 0);
                },
              },
            },
          },
        },
      },
      labels: ['Team A', 'Team B'],
      legend: {
        show: false,
        position: 'bottom',
      },
    },
  }),
  watch: {
    data: {
      handler(value) {
        console.log(value);
      },
      deep: true,
    },
  },
  methods: {
    updateLabels() {
      const labels = Array.from(new Set(this.data.map(item => item.learn_id)))
        .sort()
        .map(id => this.$options.filters.getLang(id));

      this.$refs.donutChart.updateOptions({ labels });
    },
  },
  computed: {
    series() {
      const dataObj = {};

      this.data.forEach(({ learn_id }) => {
        if (!dataObj[learn_id]) dataObj[learn_id] = 1;
        else dataObj[learn_id] += 1;
      });

      return Object.keys(dataObj)
        .sort()
        .map(item => dataObj[item]);
    },
  },
  mounted() {
    this.updateLabels();
  },
};
</script>
