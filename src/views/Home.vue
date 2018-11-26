<template>
  <div class="home">
    <stock-table/>
  </div>
</template>

<script>
import StockTable from '@/components/StockTable.vue'

export default {
  name: 'home',
  components: {
    StockTable
  }
}
</script>
