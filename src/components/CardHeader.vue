<template>
  <v-layout row wrap pl-1 pt-1 pr-1>
    <v-flex sm3>
      <span class="subheading">{{quote.symbol}}&nbsp;&nbsp;&nbsp;</span>
      <!--TODO: make it tool tip-->
      <!-- <span class="caption">{{quote.companyName.length>20?quote.companyName.substr(0,17)+'...':quote.companyName}}</span> -->
      <span class="subheading">{{quote.latestPrice}}</span><br>
      <span class="subheading" :class="quote.change<0?'red--text':'green--text'">{{quote.percent}}% </span>
      <span class="body-1" :class="quote.change<0?'red--text':'green--text'">&nbsp;({{quote.change}})</span>
    </v-flex>
    <v-flex sm2 class="vertical-flex">
      <div class="outer">
        <div class="inner rotate caption">Today</div>
      </div>
      <div class="outer">
        <div class="vertical-right">
          <v-layout align-center>
            <v-icon color="#0f0" small>keyboard_arrow_up</v-icon>
            <span class="body-1 green--text">{{quote.high}}</span><br>
          </v-layout>
          <v-layout align-center>
            <v-icon color="#f00" small>keyboard_arrow_down</v-icon>
            <span class="body-1 red--text">{{quote.low}}</span>
          </v-layout>
        </div>
      </div>
    </v-flex>
    <v-flex sm2 class="vertical-flex">
      <div class="outer">
        <div class="inner rotate caption">52wks</div>
      </div>
      <div class="outer">
        <div class="vertical-right">
          <v-layout align-center>
            <v-icon color="#0f0" small>keyboard_arrow_up</v-icon>
            <span class="body-1 green--text">{{quote.week52High}}</span><br>
          </v-layout>
          <v-layout align-center>
            <v-icon color="#f00" small>keyboard_arrow_down</v-icon>
            <span class="body-1 red--text">{{quote.week52Low}}</span>
          </v-layout>
        </div>
      </div>
    </v-flex>
    <v-flex sm2>
      <span class="caption">Vol: </span>
      <span class="body-1">{{nFormatter(quote.latestVolume,2)}}</span><br>
      <span class="caption">Avg: </span>
      <span class="body-1">{{nFormatter(quote.avgTotalVolume,2)}}</span>
    </v-flex>
    <v-flex sm2>
      <span class="caption">Cap: </span>
      <span class="body-1">{{nFormatter(quote.marketCap,2)}}</span><br>
      <span class="caption">P/E: </span>
      <span class="body-1">{{quote.peRatio}}</span>
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
  },
  methods: {
    nFormatter: function (num, digits) {
      var si = [{
        value: 1,
        symbol: ''
      },
      {
        value: 1E3,
        symbol: 'K'
      },
      {
        value: 1E6,
        symbol: 'M'
      },
      {
        value: 1E9,
        symbol: 'B'
      },
      {
        value: 1E12,
        symbol: 'T'
      }]
      var rx = /\.0+$|(\.[0-9]*[1-9])0+$/
      var i
      for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
          break
        }
      }
      return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol
    }
  }
}
</script>

<style scoped>
  .red--text {
    color: #f00 !important
  }

  .green--text {
    color: #0f0 !important
  }

  .outer {
    width: 25px;
    position: relative;
    display: inline-block;
  }

  .inner {
    position: absolute;
    top: 43%;
    left: 50%;
  }

  .vertical-right {
    position: absolute;
    top: 10%;
  }

  .rotate {
    -moz-transform: translateX(-50%) translateY(-50%) rotate(-90deg);
    -webkit-transform: translateX(-50%) translateY(-50%) rotate(-90deg);
    transform: translateX(-50%) translateY(-50%) rotate(-90deg);
  }

  .vertical-flex {
    display: flex
  }

  .subheading {
    font-weight: 800
  }

  .body-1,
  .caption {
    font-weight: 500
  }

  .caption {
    color: #b9c0c7
  }
</style>
