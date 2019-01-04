<template>
<div>
<div :id="chartData.symbol"></div>
</div>
</template>

<script>
export default {
  props: ['chartData'],
  data: function () {
    return {}
  },
  methods: {
    createChart: function () {
      let lastGoodValue
      let data = this.chartData.chart
      let xData = this.chartData.chart.map(quote => quote.minute)
      let symbol = this.chartData.symbol
      let previous = this.chartData.previousClose
      data = this.chartData.chart.map((quote, index) => {
        if (quote.marketClose || quote.close) {
          lastGoodValue = quote.marketClose || quote.close
        }
        for (let i = 0; i < data.length; i++) {
          // Sometimes the first element may be zero
          if (!lastGoodValue) {
            lastGoodValue = data[index + i].marketClose || data[index + i].close
          } else {
            break
          }
        }
        return lastGoodValue
      })
      this.$chart.chart(this.chartData.symbol, {
        title: {
          text: ''
        },
        subtitle: {
          text: ''
        },
        xAxis: {
          visible: false,
          categories: xData,
          crosshair: {
            width: 1,
            color: '#888888',
            dashStyle: 'Dot'
          }
        },
        yAxis: {
          visible: false,
          crosshair: {
            width: 1,
            color: '#888888',
            dashStyle: 'Dot'
          },
          height: 200,
          tickPositioner: function () {
            var maxDeviation = Math.max(this.dataMax - this.threshold, this.threshold - this.dataMin)
            var halfMaxDeviation = maxDeviation / 2
            return [this.threshold - maxDeviation, this.threshold - halfMaxDeviation, this.threshold, this.threshold + halfMaxDeviation, this.threshold + maxDeviation]
          }
        },
        tooltip: {
          positioner: function () {
            console.log(this)
            return { x: 0, y: 40 }
          },
          formatter: function () {
            return '<b>' + symbol + '</b> at ' +
            '<b>' + this.x + '</b><br>' +
            '<b>' + this.y + '</b> (' +
            '<p>' + parseFloat(Math.round(((this.y - previous) / previous) * 100 * 100) / 100).toFixed(2) + '%)</p>'
          },
          shape: 'rect'
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
          name: this.chartData.symbol,
          type: 'area',
          data: data,
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1
            }
          },
          color: '#0f0',
          negativeColor: '#f00'
        }],
        plotOptions: {
          series: {
            marker: {
              enabled: false,
              states: {
                hover: {
                  radius: 1
                }
              }
            },
            threshold: this.chartData.previousClose,
            softThreshold: false,
            fillColor: 'rgba(0,255,0,0.2)',
            negativeFillColor: 'rgba(255,0,0,0.2)'
          }
        }
      })
    }
  },
  mounted: function () {
    this.createChart()
  }
}
</script>
