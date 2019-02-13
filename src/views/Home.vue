<template>
    <v-layout row wrap>
      <v-flex sm12>
        <nav-bar @select="symbols=$event" @chartRange="chartRange=$event"></nav-bar>
      </v-flex>
      <v-flex sm12 v-if="symbols">
        <watchlist-view :symbols="symbols" :chart-range="chartRange"></watchlist-view>
      </v-flex>
    </v-layout>
</template>

<script>
import WatchlistView from '@/components/WatchlistView.vue'
import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    WatchlistView,
    NavBar
  },
  data: function () {
    return {
      symbols: null,
      chartRange: '1d'
    }
  },

  computed: {
  },

  methods: {
  },

  created: function () {
  }
}
</script>

<style scoped>
.container.grid-list-md .layout .flex {
    padding: 6px 4px;
}
.theme--dark.v-card {
    background-color: #0d0d0d;
}
</style>
