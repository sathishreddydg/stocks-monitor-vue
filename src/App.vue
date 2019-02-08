<template>
  <v-app dark id="app">
    <v-card v-if="!isValid">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="id" :rules="[v => !!v || 'ID is required']" label="Please enter your ID" required></v-text-field>
        <v-btn :disabled="!valid" color="success" @click="initializeStore">Submit</v-btn>
      </v-form>
    </v-card>
    <v-container grid-list-md ml-0 mr-0 v-else>
      <router-view/>
    </v-container>
  </v-app>
</template>
<script>
export default {
  data: function () {
    return {
      valid: true,
      id: null,
      isValid: false
    }
  },

  methods: {
    initializeStore: function () {
      this.isValid = false
      if (this.$refs.form.validate()) {
        this.$store.dispatch('initializeStore', this.id).then(res => {
          this.isValid = true
        }).catch(err => {
          this.isValid = false
          console.error(err)
        })
      }
    },
    resetForm: function () {
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #000000;
}
</style>

<style scoped>
.container{
  max-width: unset !important;
  padding: 8px
}
</style>
