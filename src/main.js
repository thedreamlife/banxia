import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import http from './network/request'

Vue.config.productionTip = false
Vue.prototype.$http = http

new Vue({
    render: h => h(App),
    router
}).$mount('#app')