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
      // let xData = this.chartData.chart.map(quote => quote.label)
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
          // TODO: only if intraday
          max: 390,
          // categories: xData,
          categories: [ '09:30 AM', '09:31 AM', '09:32 AM', '09:33 AM', '09:34 AM', '09:35 AM', '09:36 AM', '09:37 AM', '09:38 AM', '09:39 AM', '09:40 AM', '09:41 AM', '09:42 AM', '09:43 AM', '09:44 AM', '09:45 AM', '09:46 AM', '09:47 AM', '09:48 AM', '09:49 AM', '09:50 AM', '09:51 AM', '09:52 AM', '09:53 AM', '09:54 AM', '09:55 AM', '09:56 AM', '09:57 AM', '09:58 AM', '09:59 AM', '10 AM', '10:01 AM', '10:02 AM', '10:03 AM', '10:04 AM', '10:05 AM', '10:06 AM', '10:07 AM', '10:08 AM', '10:09 AM', '10:10 AM', '10:11 AM', '10:12 AM', '10:13 AM', '10:14 AM', '10:15 AM', '10:16 AM', '10:17 AM', '10:18 AM', '10:19 AM', '10:20 AM', '10:21 AM', '10:22 AM', '10:23 AM', '10:24 AM', '10:25 AM', '10:26 AM', '10:27 AM', '10:28 AM', '10:29 AM', '10:30 AM', '10:31 AM', '10:32 AM', '10:33 AM', '10:34 AM', '10:35 AM', '10:36 AM', '10:37 AM', '10:38 AM', '10:39 AM', '10:40 AM', '10:41 AM', '10:42 AM', '10:43 AM', '10:44 AM', '10:45 AM', '10:46 AM', '10:47 AM', '10:48 AM', '10:49 AM', '10:50 AM', '10:51 AM', '10:52 AM', '10:53 AM', '10:54 AM', '10:55 AM', '10:56 AM', '10:57 AM', '10:58 AM', '10:59 AM', '11 AM', '11:01 AM', '11:02 AM', '11:03 AM', '11:04 AM', '11:05 AM', '11:06 AM', '11:07 AM', '11:08 AM', '11:09 AM', '11:10 AM', '11:11 AM', '11:12 AM', '11:13 AM', '11:14 AM', '11:15 AM', '11:16 AM', '11:17 AM', '11:18 AM', '11:19 AM', '11:20 AM', '11:21 AM', '11:22 AM', '11:23 AM', '11:24 AM', '11:25 AM', '11:26 AM', '11:27 AM', '11:28 AM', '11:29 AM', '11:30 AM', '11:31 AM', '11:32 AM', '11:33 AM', '11:34 AM', '11:35 AM', '11:36 AM', '11:37 AM', '11:38 AM', '11:39 AM', '11:40 AM', '11:41 AM', '11:42 AM', '11:43 AM', '11:44 AM', '11:45 AM', '11:46 AM', '11:47 AM', '11:48 AM', '11:49 AM', '11:50 AM', '11:51 AM', '11:52 AM', '11:53 AM', '11:54 AM', '11:55 AM', '11:56 AM', '11:57 AM', '11:58 AM', '11:59 AM', '12 PM', '12:01 PM', '12:02 PM', '12:03 PM', '12:04 PM', '12:05 PM', '12:06 PM', '12:07 PM', '12:08 PM', '12:09 PM', '12:10 PM', '12:11 PM', '12:12 PM', '12:13 PM', '12:14 PM', '12:15 PM', '12:16 PM', '12:17 PM', '12:18 PM', '12:19 PM', '12:20 PM', '12:21 PM', '12:22 PM', '12:23 PM', '12:24 PM', '12:25 PM', '12:26 PM', '12:27 PM', '12:28 PM', '12:29 PM', '12:30 PM', '12:31 PM', '12:32 PM', '12:33 PM', '12:34 PM', '12:35 PM', '12:36 PM', '12:37 PM', '12:38 PM', '12:39 PM', '12:40 PM', '12:41 PM', '12:42 PM', '12:43 PM', '12:44 PM', '12:45 PM', '12:46 PM', '12:47 PM', '12:48 PM', '12:49 PM', '12:50 PM', '12:51 PM', '12:52 PM', '12:53 PM', '12:54 PM', '12:55 PM', '12:56 PM', '12:57 PM', '12:58 PM', '12:59 PM', '1 PM', '1:01 PM', '1:02 PM', '1:03 PM', '1:04 PM', '1:05 PM', '1:06 PM', '1:07 PM', '1:08 PM', '1:09 PM', '1:10 PM', '1:11 PM', '1:12 PM', '1:13 PM', '1:14 PM', '1:15 PM', '1:16 PM', '1:17 PM', '1:18 PM', '1:19 PM', '1:20 PM', '1:21 PM', '1:22 PM', '1:23 PM', '1:24 PM', '1:25 PM', '1:26 PM', '1:27 PM', '1:28 PM', '1:29 PM', '1:30 PM', '1:31 PM', '1:32 PM', '1:33 PM', '1:34 PM', '1:35 PM', '1:36 PM', '1:37 PM', '1:38 PM', '1:39 PM', '1:40 PM', '1:41 PM', '1:42 PM', '1:43 PM', '1:44 PM', '1:45 PM', '1:46 PM', '1:47 PM', '1:48 PM', '1:49 PM', '1:50 PM', '1:51 PM', '1:52 PM', '1:53 PM', '1:54 PM', '1:55 PM', '1:56 PM', '1:57 PM', '1:58 PM', '1:59 PM', '2 PM', '2:01 PM', '2:02 PM', '2:03 PM', '2:04 PM', '2:05 PM', '2:06 PM', '2:07 PM', '2:08 PM', '2:09 PM', '2:10 PM', '2:11 PM', '2:12 PM', '2:13 PM', '2:14 PM', '2:15 PM', '2:16 PM', '2:17 PM', '2:18 PM', '2:19 PM', '2:20 PM', '2:21 PM', '2:22 PM', '2:23 PM', '2:24 PM', '2:25 PM', '2:26 PM', '2:27 PM', '2:28 PM', '2:29 PM', '2:30 PM', '2:31 PM', '2:32 PM', '2:33 PM', '2:34 PM', '2:35 PM', '2:36 PM', '2:37 PM', '2:38 PM', '2:39 PM', '2:40 PM', '2:41 PM', '2:42 PM', '2:43 PM', '2:44 PM', '2:45 PM', '2:46 PM', '2:47 PM', '2:48 PM', '2:49 PM', '2:50 PM', '2:51 PM', '2:52 PM', '2:53 PM', '2:54 PM', '2:55 PM', '2:56 PM', '2:57 PM', '2:58 PM', '2:59 PM', '3 PM', '3:01 PM', '3:02 PM', '3:03 PM', '3:04 PM', '3:05 PM', '3:06 PM', '3:07 PM', '3:08 PM', '3:09 PM', '3:10 PM', '3:11 PM', '3:12 PM', '3:13 PM', '3:14 PM', '3:15 PM', '3:16 PM', '3:17 PM', '3:18 PM', '3:19 PM', '3:20 PM', '3:21 PM', '3:22 PM', '3:23 PM', '3:24 PM', '3:25 PM', '3:26 PM', '3:27 PM', '3:28 PM', '3:29 PM', '3:30 PM', '3:31 PM', '3:32 PM', '3:33 PM', '3:34 PM', '3:35 PM', '3:36 PM', '3:37 PM', '3:38 PM', '3:39 PM', '3:40 PM', '3:41 PM', '3:42 PM', '3:43 PM', '3:44 PM', '3:45 PM', '3:46 PM', '3:47 PM', '3:48 PM', '3:49 PM', '3:50 PM', '3:51 PM', '3:52 PM', '3:53 PM', '3:54 PM', '3:55 PM', '3:56 PM', '3:57 PM', '3:58 PM', '3:59 PM' ],
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
            animation: false,
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
            fillColor: 'rgba(0,255,0,0.1)',
            negativeFillColor: 'rgba(255,0,0,0.1)'
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
