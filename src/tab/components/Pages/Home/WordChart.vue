<template>
  <card-ui>
    <p slot="header">Words</p>
    <apexchart height="350" :options="chartOptions" :series="series"></apexchart>
  </card-ui>
</template>
<script>
import Apexchart from 'vue-apexcharts';
import dayjs from 'dayjs';
import Word from '~/store/models/Word';

import Learn from '~/store/models/Learn';

export default {
  components: { Apexchart },
  data: () => ({
    chartOptions: {
      chart: {
        height: 350,
        type: 'area',
        fontFamily: 'Inter, sans-serif',
        toolbar: {
          show: false,
          offsetY: 10,
          tools: {
            download: false,
            selection: false,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: false,
            reset: true,
          },
        },
        zoom: {
          enabled: false,
        },
      },
      markers: {
        size: 5,
      },
      grid: {
        color: '#e2e8f0',
        padding: {
          left: 0,
          right: 0,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          show: false,
          labels: {
            show: false,
          },
          lines: {
            show: true,
          },
        },
      },
      legend: {
        position: 'top',
        fontFamily: 'Inter, sans-serif',
        fontSize: '15px',
      },
      dataLabels: {
        enabled: false,
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
      xaxis: {
        labels: {
          formatter(value) {
            return dayjs(value).format('MMMM DD');
          },
        },
      },
      tooltip: {
        shared: true,
        x: {
          formatter(value) {
            return dayjs(value).format('MMMM DD, YYYY');
          },
        },
      },
      fill: {
        type: 'solid',
      },
      noData: {
        text: 'No data',
        style: {
          fontFamily: 'Inter, sans-serif',
        },
      },
    },
  }),
  computed: {
    series() {
      return this.fetchSeries();
    },
  },
  methods: {
    fetchSeries(formatDate = 'YYYY-MM-DD') {
      return Learn.query()
        .with('words')
        .get()
        .map(({ learn_id, words }) => {
          const data = [];
          const sortedWords = words.sort((a, b) => a.timestamp - b.timestamp);

          sortedWords.forEach(word => {
            const date = dayjs(word.timestamp).format(formatDate);
            const index = data.findIndex(item => item[0] === date);

            if (index !== -1) {
              data[index][1] += 1;
            } else {
              data.push([date, 1]);
            }
          });

          return {
            name: this.$options.filters.getLang(learn_id),
            data: data.map(item => [new Date(item[0]).getTime(), item[1]]),
          };
        });
      // const data = []
      // const sortedWords = Word.all().sort((a, b) => a.timestamp - b.timestamp)

      // sortedWords.forEach(({timestamp}) => {
      //   const date = dayjs(timestamp).format(formatDate);
      //   const index = data.findIndex(item => item.x === date);

      //   if(index !== -1){
      //     data[index].y += 1
      //   }else{
      //     data.push({ x: date, y: 1 })
      //   }
      // })

      // return [{name: 'words', data}]
    },
  },
};
</script>
<style>
.apexcharts-legend-series {
  margin: 20px 15px 0 0 !important;
  text-transform: capitalize;
}
.apexcharts-legend.position-top.apexcharts-align-center {
  justify-content: flex-start !important;
}
</style>
