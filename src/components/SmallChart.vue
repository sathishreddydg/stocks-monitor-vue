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
      this.$http.get('https://api.iextrading.com/1.0/stock/aapl/chart/1d').then(({ data }) => {
        data = data.map(quote => quote.close)
        this.$chart.chart('container', {
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
            visible: false
          },
          chart: {
            backgroundColor: 'rgab(0,0,0,1)'
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
            name: 'Area',
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
              fillColor: {
                linearGradient: [0, 0, 0, 240],
                stops: [
                  [0, 'rgba(0,255,0,1)'],
                  [1, 'rgba(0,255,0,0)']
                ]
              },
              negativeFillColor: {
                linearGradient: [0, 0, 0, 350],
                stops: [
                  [0.1, 'rgba(255,0,0,0)'],
                  [1, 'rgba(255,0,0,1)']
                ]
              }
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
