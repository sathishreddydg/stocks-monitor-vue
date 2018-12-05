<template>
  <div>
<v-data-table
    :headers="headers"
    :items="stockData"
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.symbol }}</td>
      <td>{{ props.item.price }}</td>
      <td>{{ props.item.volume }}</td>
      <td>{{ props.item.bid }}</td>
      <td>{{ props.item.ask }}</td>
      <td>{{ props.item.week52 }}</td>
      <td>{{ props.item.todayRange }}</td>
    </template>
  </v-data-table>
  </div>
</template>

<script>
import io from 'socket.io-client'
let socket = io('https://ws-api.iextrading.com/1.0/tops')

export default {
  data: function () {
    return {
      headers: [
        {
          text: 'Symobl',
          align: 'left',
          value: 'symbol',
          class: 'tbl-column'
        },
        { text: 'Price', value: 'price' },
        { text: 'Volume', value: 'volume' },
        { text: 'Bid', value: 'bid' },
        { text: 'Ask', value: 'ask' },
        { text: '52 Week', value: '52week' },
        { text: 'Today range', value: 'todayRange' }
      ],
      stockData: []
    }
  },

  methods: {
    updateData: function (data) {
      console.log(data)
    }
  },

  mounted: function () {
    socket.on('message', data => {
      data = JSON.parse(data)
      const index = this.stockData.findIndex(stock => stock.symbol === data.symbol)
      if (index > -1) {
        this.stockData[index].price = data.lastSalePrice
        this.stockData[index].bid = data.bidPrice + ' x ' + data.bidSize
        this.stockData[index].ask = data.askPrice + ' x ' + data.askSize
      } else {
        this.stockData.push({
          symbol: data.symbol,
          price: data.lastSalePrice,
          volume: 'FromAPI',
          bid: data.bidPrice + ' x ' + data.bidSize,
          ask: data.askPrice + ' x ' + data.askSize,
          week52: 'FromAPI',
          todayRange: 'From API'
        })
      }
    })
    socket.on('connect', () => {
      socket.emit('subscribe', 'aapl')
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.tbl-column{
  width: 100px;
}
</style>
