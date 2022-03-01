import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
App.mpType = 'app'

// 全局挂载
import * as toPage from './utils/router.js'
Vue.prototype.$toPage = toPage;

const app = new Vue({
    ...App
})
app.$mount()
