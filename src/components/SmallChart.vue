<template>
<div id="container" style="width:100%; height:400px;"></div>
</template>

<script>
export default {
  data: function () {
    return {}
  },
  methods: {
    createChart: function () {
      this.$chart.chart('container', {
        title: {
          text: 'Monthly temperatures in a random cold place'
        },
        subtitle: {
          text: 'All series should be blue below zero'
        },
        xAxis: {
          type: 'datetime'
        },
        series: [{
          name: 'Area',
          type: 'area',
          data: [3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 0, -1, 0, 1, 2, 3],
          pointStart: Date.UTC(2011, 0),
          pointInterval: 30 * 24 * 36e5,
          color: '#0f0',
          negativeColor: '#f00'
        }],
        plotOptions: {
          series: {
            threshold: 3,
            fillColor: {
              linearGradient: [0, 0, 0, 250],
              stops: [
                [0, 'rgba(0,255,0,1)'],
                [1, 'rgba(0,255,0,0)']
              ]
            },
            negativeFillColor: {
              linearGradient: [0, 0, 0, 250],
              stops: [
                [0, 'rgba(255,0,0,0)'],
                [1, 'rgba(255,0,0,1)']
              ]
            }
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
