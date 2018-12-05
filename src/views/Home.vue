<template>
  <div class="home">
    <stock-table/>
    <small-chart></small-chart>
  </div>
</template>

<script>
import stockTable from '@/components/StockTable.vue'
import smallChart from '@/components/SmallChart.vue'

export default {
  name: 'home',
  components: {
    stockTable,
    smallChart
  }
}
</script>
