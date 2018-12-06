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
            text: 'Monthly temperatures in a random cold place'
          },
          subtitle: {
            text: 'All series should be blue below zero'
          },
          xAxis: {
            type: 'datetime',
            lineWidth: 0,
            minorGridLineWidth: 0,
            lineColor: 'transparent',

            labels: {
              enabled: false
            },
            minorTickLength: 0,
            tickLength: 0
          },
          yAxis: {
            type: 'datetime',
            lineWidth: 0,
            gridLineWidth: 0,
            lineColor: 'transparent',

            labels: {
              enabled: false
            },
            minorTickLength: 0,
            tickLength: 0
          },
          chart: {
            backgroundColor: 'rgab(0,0,0,1)'
          },
          credits: {
            enabled: false, // Whether to show the credits text.
            href: 'http://www.highcharts.com', // The URL for the credits label.
            position: null, // Position configuration for the credtis label.
            style: null, // CSS styles for the credits label.
            text: 'Highcharts.com.' // The text for the credits label.
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
                linearGradient: [0, 0, 0, 200],
                stops: [
                  [0, 'rgba(0,255,0,1)'],
                  [1, 'rgba(0,255,0,0)']
                ]
              },
              negativeFillColor: {
                linearGradient: [0, 0, 0, 200],
                stops: [
                  [0.7, 'rgba(255,0,0,0)'],
                  [1, 'rgba(255,0,0,0.7)']
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
