<template>
  <div>
    <!-- <stock-table/> -->
    <v-container grid-list-md ml-0 mr-0>
      <v-layout row wrap>
        <v-flex v-for="stock in stockData" :key="stock.quote.symbol" xs6 sm6>
          <v-card>
            <span>{{stock.quote.symbol}} {{stock.quote.currentPrice}} {{stock.quote.percent}}</span>
            <small-chart :chart-data='stock.chartData'></small-chart>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// import stockTable from '@/components/StockTable.vue'
import smallChart from '@/components/SmallChart.vue'

export default {
  name: 'home',
  components: {
    // stockTable,
    smallChart
  },
  data: function () {
    return {
      symbols: [],
      chartRange: '1d',
      stockData: []
    }
  },

  computed: {
    canItBatch: function () {
      return (new Date()).toISOString().split('T')[0].split('-').join('') === this.chartRange
    }
  },

  methods: {
    // TODO: useful on market closing days
    setDefaultChartDate: function () {
      this.$http.get('https://api.iextrading.com/1.0/stock/aapl/quote').then(({ data }) => {
        this.chartRange = (new Date(data.closeTime)).toISOString().split('T')[0].split('-').join('')
      }).catch(err => console.error(err))
    },

    initialize: function () {
      this.symbols = ['aapl', 'msft', 'fb', 'tsla', 'amd', 'amzn', 'goog', 'atvi', 'shop']
      this.$http.get('https://api.iextrading.com/1.0/stock/market/list/gainers').then(({ data }) => {
        this.symbols = this.symbols.concat(data.map(stock => stock.symbol))
        return this.$http.get('https://api.iextrading.com/1.0/stock/market/batch?symbols=' + this.symbols.join(',') + '&types=quote,news,chart&range=1d')
      }).then(({ data }) => {
        this.stockData = Object.keys(data).map((key) => {
          return {
            quote: {
              symbol: data[key].quote.symbol,
              currentPrice: data[key].quote.latestPrice,
              percent: this.getPercent(data[key].quote.latestPrice, data[key].quote.previousClose)
            },
            chartData: {
              symbol: data[key].quote.symbol,
              previousClose: data[key].quote.close,
              chart: data[key].chart
            }
          }
        })
        console.log(this.stockData)
      }).catch(err => console.error(err))
    },

    getPercent: function (current, previous) {
      return parseFloat(Math.round(((current - previous) / previous) * 100 * 100) / 100).toFixed(2)
    }
  },
  created: function () {
    this.setDefaultChartDate()
    this.initialize()
  }
}
</script>

<style scoped>
.container{
  max-width: unset !important;
}
</style>
