<template>
  <div>
    <!-- <stock-table/> -->
    <v-container grid-list-md ml-0 mr-0>
      <v-layout row wrap>
        <v-flex v-for="symbol in symbols" :key="symbol" xs3 sm3>
          <v-card>
            <small-chart :symbol='symbol'></small-chart>
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
      symbols: []
    }
  },
  methods: {
    getActiveSymbols: function () {
      this.$http.get('https://api.iextrading.com/1.0/stock/market/list/gainers').then(({ data }) => {
        // this.symbols =  ['aapl','msft','fb','tsla','amd','amzn','goog','atvi','shop']
        this.symbols = data.map(stock => stock.symbol)
      }).catch(err => console.error(err))
    }
  },
  created: function () {
    this.getActiveSymbols()
  }
}
</script>

<style scoped>
.container{
  max-width: unset !important;
}
</style>
