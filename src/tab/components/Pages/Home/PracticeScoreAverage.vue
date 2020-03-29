<template>
  <card-ui>
    <p slot="header">Score Average</p>
    <apexchart type="radialBar" :options="chartOptions" :series="scoreAverage"></apexchart>
  </card-ui>
</template>
<script>
import Apexchart from 'vue-apexcharts';

export default {
  props: {
    data: Array,
  },
  components: { Apexchart },
  data: () => ({
    series: [20],
    chartOptions: {
      chart: {
        type: 'radialBar',
        offsetY: -20,
        sparkline: {
          enabled: true,
        },
      },
      noData: {
        text: 'No data',
        style: {
          fontFamily: 'Inter, sans-serif',
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: '#eff5fe',
            strokeWidth: '97%',
            margin: 5,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              offsetY: -2,
              fontSize: '22px',
              formatter: value => value,
            },
          },
        },
      },
      grid: {
        padding: {
          top: -10,
        },
      },
      labels: ['Average Results'],
    },
  }),
  computed: {
    scoreAverage() {
      if (this.data.length === 0) return [0];

      const sum = this.data.reduce((curr, acc) => (curr += acc.score), 0);

      return [Math.floor(sum / this.data.length)];
    },
  },
};
</script>
