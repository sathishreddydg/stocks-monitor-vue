<template>
  <div class="home">
    <stock-table/>
    <v-layout>
      <v-flex>
        <v-card>
          <v-container v-bind="{ [`grid-list-md`]: true }" fluid>
            <v-layout row wrap>
              <v-flex v-for="symbol in symbols" :key="symbol" xs3>
                <v-card flat tile>
                  <small-chart :symbol='symbol'></small-chart>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import stockTable from '@/components/StockTable.vue'
import smallChart from '@/components/SmallChart.vue'

export default {
  name: 'home',
  components: {
    stockTable,
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
        this.symbols = ['fb', 'tsla']// ['aapl','msft','fb','tsla','amd','amzn','goog','atvi','shop']//data.map(stock=>stock.symbol)
      }).catch(err => console.error(err))
    }
  },
  created: function () {
    this.getActiveSymbols()
  }
}
</script>
