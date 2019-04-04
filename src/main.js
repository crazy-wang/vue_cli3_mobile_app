import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './permission' // 路由拦截
import store from './store'

import './utils/rem' // 重要的rem文件；动态设置html根元素来保证移动端适配；手淘插件就不用配置这个了；现在用的其他插件配合webpack就需要
// 引入vant库 有问题啊，有些指令调用的组件不生效。
import Vant from 'vant'
import 'vant/lib/index.css'

// 引入vue-echarts
import Echarts from 'echarts'
import ECharts from 'vue-echarts'

// 引入axios拦截器
import axios from './utils/interceptor'
Vue.use(Vant) // 在 webpack 环境下指向 components/ECharts.vue
// 注册组件后即可使用
Vue.component('v-chart', ECharts)

Vue.prototype.axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
