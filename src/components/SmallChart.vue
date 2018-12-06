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
            height: 200
          },
          chart: {
            margin: 0,
            backgroundColor: 'rgab(1,1,1,0)',
            height: 200,
            width: 450
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
        }, chart => {
          var ext = chart.yAxis[0].getExtremes()
          console.log(chart.yAxis[0])
          var dMax = Math.abs(ext.dataMax)
          var dMin = Math.abs(ext.dataMin)
          var dExt = dMax >= dMin ? dMax : dMin
          var min = 2 * chart.yAxis[0].threshold - dExt
          console.log(min, chart.yAxis[0].threshold, dExt)
          chart.yAxis[0].setExtremes(min, dExt)
        })
      }).catch(err => console.error(err))
    }
  },
  mounted: function () {
    this.createChart()
  }
}
</script>
