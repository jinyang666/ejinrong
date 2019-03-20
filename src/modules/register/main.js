import Vue from 'vue'

import Router from 'vue-router'

import App from './index.vue'

import urls from '../../components/Urls.vue'

import router from './router.js'

import '../../assets/reset.css'

import '../../assets/font/iconfont.css'

import axios from 'axios'

import layer from 'vue2-layer-mobile'

Vue.use(Router)

Vue.prototype.$axios = axios

Vue.prototype.URLS = urls;

Vue.use(layer)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')