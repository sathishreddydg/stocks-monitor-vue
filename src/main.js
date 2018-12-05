import '@babel/polyfill'
import Vue from 'vue'
import axios from 'axios'

import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
var Highcharts = require('highcharts')
// Load module after Highcharts is loaded
require('highcharts/modules/exporting')(Highcharts)

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.$chart = Highcharts

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
