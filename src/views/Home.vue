<template>
  <div>
    <v-container grid-list-md ml-0 mr-0>
      <v-layout row wrap>
        <v-flex v-for="stock in stockData" :key="stock.quote.symbol" sm12 md6 xl4>
          <v-card>
            <card-header :quote="stock.quote"></card-header>
            <small-chart :chart-data='stock.chartData'></small-chart>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import smallChart from '@/components/SmallChart.vue'
import CardHeader from '@/components/CardHeader'
import io from 'socket.io-client'
import { setInterval, setTimeout } from 'timers'

export default {
  name: 'home',
  components: {
    smallChart,
    CardHeader
  },
  data: function () {
    return {
      symbols: [],
      chartRange: '1d',
      stockData: [],
      socket: null
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
      this.symbols = ['aapl', 'msft', 'fb', 'tsla', 'amd', 'amzn', 'goog', 'nflx', 'shop']
      this.$http.get('https://api.iextrading.com/1.0/stock/market/list/gainers').then(({ data }) => {
        this.symbols = this.symbols.concat(data.map(stock => stock.symbol))
        return this.$http.get('https://api.iextrading.com/1.0/stock/market/batch?symbols=' + this.symbols.join(',') + '&types=quote,news,chart&range=1d')
      }).then(({ data }) => {
        this.stockData = Object.keys(data).map((key) => {
          return {
            quote: {
              ...data[key].quote,
              symbol: data[key].quote.symbol,
              companyName: data[key].quote.companyName,
              change: parseFloat(Math.round((data[key].quote.latestPrice - data[key].quote.previousClose) * 100) / 100).toFixed(2),
              percent: this.getPercent(data[key].quote.latestPrice, data[key].quote.previousClose),
              previousClose: data[key].quote.previousClose
            },
            chartData: {
              symbol: data[key].quote.symbol,
              previousClose: data[key].quote.previousClose,
              chart: data[key].chart
            }
          }
        })
        if (!(this.socket || {}).connected) { this.initializeSocket() }
      }).catch(err => console.error(err))
    },

    initializeSocket: function () {
      this.socket = io('https://ws-api.iextrading.com/1.0/last')
      this.socket.on('message', data => {
        data = JSON.parse(data)
        const index = this.stockData.findIndex(stock => stock.quote.symbol === data.symbol)
        this.stockData[index].quote.latestPrice = data.price
        this.stockData[index].quote.change = parseFloat(Math.round((data.price - this.stockData[index].quote.previousClose) * 100) / 100).toFixed(2)
        this.stockData[index].quote.percent = this.getPercent(data.price, this.stockData[index].quote.previousClose)
      })
      this.socket.on('connect', () => {
        this.socket.emit('subscribe', this.symbols.join(','))
      })
    },

    getPercent: function (current, previous) {
      return parseFloat(Math.round(((current - previous) / previous) * 100 * 100) / 100).toFixed(2)
    }
  },
  created: function () {
    this.initialize()
    this.setDefaultChartDate()
    let interval = 60 * 1000 // 1 minute
    let delay = (interval - new Date() % interval) + 2000 // Every Minute and 2 seconds
    setTimeout(() => {
      this.initialize()
      setInterval(() => this.initialize(), interval)
    }, delay)
  }
}
</script>

<style scoped>
.container{
  max-width: unset !important;
  padding: 8px
}
.container.grid-list-md .layout .flex {
    padding: 6px 4px;
}
.theme--dark.v-card {
    background-color: #0d0d0d;
}
</style>
