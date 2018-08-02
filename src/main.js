import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './common/style/index.less'
import './config/rem'
import {directive} from './directives'
const FastClick = require('fastclick')
FastClick.attach(document.body)
import './icons'
import SvgIcon from './base/SvgIcon'
import Toast  from './base/toast/index'
Vue.use(Toast)
Vue.component('svg-icon', SvgIcon)

var VueScrollTo = require('vue-scrollto');
Vue.use(VueScrollTo)

import './common/js/validate/index.js'

Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
