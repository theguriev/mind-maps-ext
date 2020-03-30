import Vue from 'vue'
import Antd from 'ant-design-vue'
import VueCompositionApi from '@vue/composition-api'
import App from './App.vue'
import router from './router'
import './mock'
import 'ant-design-vue/dist/antd.css'
import '@/assets/css/reset.css'
import '@/assets/css/variables.css'
import '@/assets/css/style.css'

Vue.config.productionTip = false
Vue.use(Antd)
Vue.use(VueCompositionApi)

const vue = new Vue({
  router,
  render: h => h(App)
}).$mount('#mmb')

/** Important debug notifications */
window.mmb.notify = vue.$notification.error
