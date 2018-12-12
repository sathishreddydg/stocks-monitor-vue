<template>
<div>
  <span>{{symbol}}</span>
<div :id="symbol"></div>
</div>
</template>

<script>
export default {
  props: ['symbol'],
  data: function () {
    return {}
  },
  methods: {
    createChart: function () {
      this.$http.get(`https://api.iextrading.com/1.0/stock/${this.symbol}/chart/1d`).then(({ data }) => {
        let lastGoodValue
        data = data.map((quote, index) => {
          if (quote.marketClose || quote.close) {
            lastGoodValue = quote.marketClose || quote.close
          }
          for (let i = 0; i < data.length; i++) {
            if (!lastGoodValue) {
              lastGoodValue = data[index + i].marketClose || data[index + i].close
            } else {
              break
            }
          }
          return lastGoodValue
        })
        this.$chart.chart(this.symbol, {
          title: {
            text: ''
          },
          subtitle: {
            text: ''
          },
          xAxis: {
            visible: false
          },
          yAxis: {
            visible: false,
            height: 200,
            tickPositioner: function () {
              var maxDeviation = Math.max(this.dataMax - this.threshold, this.threshold - this.dataMin)
              var halfMaxDeviation = maxDeviation / 2
              return [this.threshold - maxDeviation, this.threshold - halfMaxDeviation, this.threshold, this.threshold + halfMaxDeviation, this.threshold + maxDeviation]
            }
          },
          chart: {
            margin: 0,
            backgroundColor: 'rgab(1,1,1,0)',
            height: 200
          },
          credits: {
            enabled: false
          },
          legend: {
            enabled: false
          },
          navigation: {
            buttonOptions: {
              enabled: false
            }
          },
          series: [{
            name: this.symbol,
            type: 'area',
            data: data,
            // TODO: make it time
            pointStart: Date.UTC(2011, 0),
            pointInterval: 30 * 24 * 36e5,
            lineWidth: 1,
            color: '#0f0',
            negativeColor: '#f00'
          }],
          plotOptions: {
            series: {
              marker: {
                enabled: false
              },
              threshold: data[0],
              softThreshold: false,
              fillColor: 'rgba(0,255,0,0.2)',
              negativeFillColor: 'rgba(255,0,0,0.2)'
            }
          }
        })
      }).catch(err => console.error(err))
    }
  },
  mounted: function () {
    this.createChart()
  }
}
</script>
