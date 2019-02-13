<template>
    <v-toolbar dense>
      <v-btn-toggle v-model="selectedWatchlist" mandatory  @change="$emit('select', watchlists[selectedWatchlist])">
        <v-btn flat v-for="watchlistName in Object.keys(watchlists)" :key="watchlistName" :value="watchlistName">{{watchlistName}}</v-btn>
      </v-btn-toggle>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
      <v-btn-toggle v-model="selectedChartRange" mandatory @change="$emit('chartRange', selectedChartRange)">
        <v-btn flat v-for="chartRange in chartRanges" :key="chartRange" :value="chartRange">{{chartRange}}</v-btn>
      </v-btn-toggle>
      </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
  data: function () {
    return {
      watchlists: this.$store.state.watchlists,
      selectedWatchlist: Object.keys(this.$store.state.watchlists)[0],
      chartRanges: ['1d', '1m', '3m', '6m', 'ytd', '1y', '2y', '5y'],
      selectedChartRange: '1d'
    }
  },

  created: function () {
    this.$emit('select', this.watchlists[this.selectedWatchlist])
    this.$emit('chartRange', '1d')
  }
}
</script>
