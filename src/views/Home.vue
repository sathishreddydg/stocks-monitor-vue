<template>
  <div>
    <v-container grid-list-md ml-0 mr-0>
      <v-layout row wrap>
        <v-flex v-for="stock in stockData" :key="stock.quote.symbol" sm4>
          <v-card>
            <v-layout row wrap>
              <v-flex sm3>
                <span class="headline">{{stock.quote.symbol}}</span> <br>
                <span class="caption">{{stock.quote.companyName.length>20?stock.quote.companyName.substr(0,17)+'...':stock.quote.companyName}}</span>
              </v-flex>
              <v-flex sm3>
                <span class="headline">{{stock.quote.currentPrice}}</span><br>
                <span class="subheading" :class="stock.quote.change<0?'red--text':'green--text'"><b>{{stock.quote.percent}}</b>% </span>
                <span class="body-1" :class="stock.quote.change<0?'red--text':'green--text'">&nbsp;({{stock.quote.change}})</span>
              </v-flex>
              <v-flex sm5>

              </v-flex>
              <v-flex sm1>
                <v-btn icon :href="'https://finance.yahoo.com/chart/'+stock.quote.symbol" target="_blank"><v-icon>send</v-icon></v-btn>
              </v-flex>
            </v-layout>
            <small-chart :chart-data='stock.chartData'></small-chart>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import smallChart from '@/components/SmallChart.vue'
import io from 'socket.io-client'

export default {
  name: 'home',
  components: {
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
      this.symbols = ['aapl', 'msft', 'fb', 'tsla', 'amd', 'amzn', 'goog', 'nflx', 'shop']
      this.$http.get('https://api.iextrading.com/1.0/stock/market/list/gainers').then(({ data }) => {
        this.symbols = this.symbols.concat(data.map(stock => stock.symbol))
        return this.$http.get('https://api.iextrading.com/1.0/stock/market/batch?symbols=' + this.symbols.join(',') + '&types=quote,news,chart&range=1d')
      }).then(({ data }) => {
        this.stockData = Object.keys(data).map((key) => {
          return {
            quote: {
              symbol: data[key].quote.symbol,
              companyName: data[key].quote.companyName,
              currentPrice: data[key].quote.latestPrice,
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
        this.initializeSocket()
      }).catch(err => console.error(err))
    },

    initializeSocket: function () {
      let socket = io('https://ws-api.iextrading.com/1.0/last')
      socket.on('message', data => {
        data = JSON.parse(data)
        const index = this.stockData.findIndex(stock => stock.quote.symbol === data.symbol)
        this.stockData[index].quote.currentPrice = data.price
        this.stockData[index].quote.change = parseFloat(Math.round((data.price - this.stockData[index].quote.previousClose) * 100) / 100).toFixed(2)
        this.stockData[index].quote.percent = this.getPercent(data.price, this.stockData[index].quote.previousClose)
        // this.stockData[index].bid = data.bidPrice + ' x ' + data.bidSize
        // this.stockData[index].ask = data.askPrice + ' x ' + data.askSize
      })
      socket.on('connect', () => {
        socket.emit('subscribe', this.symbols.join(','))
      })
    },

    getPercent: function (current, previous) {
      return parseFloat(Math.round(((current - previous) / previous) * 100 * 100) / 100).toFixed(2)
    }
  },
  created: function () {
    this.setDefaultChartDate()
    this.initialize()
  },
  mounted: function () {
    // this.initializeSocket()
  }
}
</script>

<style scoped>
.container{
  max-width: unset !important;
}
</style>
