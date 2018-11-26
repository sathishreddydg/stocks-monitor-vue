<template>
  <div>

  </div>
</template>

<script>
import io from 'socket.io-client'
let socket = io('https://ws-api.iextrading.com/1.0/deep')

export default {
  data: function () {
    return {
      headers: [
        {
          text: 'Ticker',
          align: 'left',
          value: 'ticker'
        },
        { text: 'Quote', value: 'quote' },
        { text: 'Volume', value: 'volume' },
        { text: 'Bid', value: 'bid' },
        { text: 'Ask', value: 'ask' },
        { text: '52 Week', value: '52week' },
        { text: 'Today range', value: 'todayRange' }
      ]
    }
  },

  methods: {
    updateData: function (data) {
      console.log(data)
    }
  },

  mounted: function () {
    socket.on('message', data => console.log(data))
    socket.on('connect', () => {
      socket.emit('subscribe', JSON.stringify({
        symbols: ['aapl'],
        channels: ['deep']
      }))
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
