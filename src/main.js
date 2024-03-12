import Vue from 'vue'
import App from './App.vue'

import './service-worker'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
