<template>
  <div>
    <v-layout row wrap>
      <v-flex v-for="stock in stockData" :key="stock.quote.symbol" sm12 md6 xl4>
        <v-card :class="stock.quote.change<0?'card-theme-red':'card-theme-green'">
          <card-header :quote="stock.quote"></card-header>
          <small-chart :chart='stock.chartData' :quote="stock.quote"></small-chart>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import smallChart from '@/components/SmallChart.vue'
import CardHeader from '@/components/CardHeader'
import io from 'socket.io-client'
import { setInterval, setTimeout } from 'timers'

export default {
  components: {
    smallChart,
    CardHeader
  },
  props: ['symbols', 'chartRange'],
  data: function () {
    return {
      stockData: [],
      socket: null
    }
  },

  watch: {
    symbols: function () {
      this.initialize()
    },

    chartRange: function () {
      this.initialize()
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
      // this.$http.get('https://api.iextrading.com/1.0/stock/market/list/gainers').then(({ data }) => {
      // this.symbols = this.symbols.concat(data.map(stock => stock.symbol))
      // })
      this.$http.get('https://api.iextrading.com/1.0/stock/market/batch?symbols=' + this.symbols.join(',') + '&types=quote,news,chart&range=' + this.chartRange).then(({ data }) => {
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
        // TODO: The index of key may not be found if the the gainers is changed, bcz, the symbolds won't be subscribed
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
    // this.setDefaultChartDate()
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
.container.grid-list-md .layout .flex {
    padding: 6px 4px;
}
.card-theme-green {
    background-color: #0b2610;
}
.card-theme-red {
    background-color: #280c0f;
}
</style>
