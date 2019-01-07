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
  watch: {
    chartData: function () {
      this.createChart()
    }
  },
  methods: {
    createChart: function () {
      let lastGoodValue
      let data = this.chartData.chart
      let xData = this.chartData.chart.map(quote => quote.label)
      // let symbol = this.chartData.symbol
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
          followPointer: true,
          positioner: function (width, height, point) {
            return { x: point.plotX < width + 10 ? this.chart.plotSizeX - width : 0, y: point.plotY < this.chart.plotSizeY / 2 ? this.chart.plotSizeY - height : 0 }
          },
          formatter: function () {
            return '<small style="color: white">' + this.x + '</small><br>' +
            '<b style="color: white ;font-weight:bold">' + this.y + '</b><br>' +
            '<p style="color:  ' + (this.y - previous < 0 ? '#f00' : '#0f0') + ';">' + parseFloat(Math.round(((this.y - previous) / previous) * 100 * 100) / 100).toFixed(2) + '%</p> '
          },
          shape: 'rect',
          shadow: false,
          borderWidth: 0,
          backgroundColor: 'rgba(0,0,0,0.6)'
        },
        chart: {
          margin: 0,
          backgroundColor: '#0d0d0d',
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
