<template>
    <v-toolbar dense>
      <v-btn-toggle v-model="selectedWatchlist" mandatory  @change="$emit('select', watchlists[selectedWatchlist])">
        <v-btn flat v-for="watchlistName in Object.keys(watchlists)" :key="watchlistName" :value="watchlistName">{{watchlistName}}</v-btn>
      </v-btn-toggle>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
      </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
  data: function () {
    return {
      watchlists: this.$store.state.watchlists,
      selectedWatchlist: Object.keys(this.$store.state.watchlists)[0]
    }
  },

  created: function () {
    this.$emit('select', this.watchlists[this.selectedWatchlist])
  }
}
</script>
