<template>
  <v-layout row wrap>
    <v-flex sm3>
      <span class="subheading">{{quote.symbol}}</span> <br>
      <!--TODO: make it tool tip-->
      <span class="caption">{{quote.companyName.length>20?quote.companyName.substr(0,17)+'...':quote.companyName}}</span>
    </v-flex>
    <v-flex sm3>
      <span class="subheading">{{quote.latestPrice}}</span><br>
      <span class="subheading" :class="quote.change<0?'red--text':'green--text'">{{quote.percent}}% </span>
      <span class="body-1" :class="quote.change<0?'red--text':'green--text'">&nbsp;({{quote.change}})</span>
    </v-flex>
    <v-flex sm5>
    </v-flex>
    <v-flex sm1>
      <v-btn icon :href="'https://finance.yahoo.com/chart/'+quote.symbol" target="_blank">
        <v-icon>send</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ['quote'],
  data: function () {
    return {

    }
  }
}
</script>
