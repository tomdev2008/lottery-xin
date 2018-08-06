import "babel-polyfill";
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './common/style/index.less'
import './config/rem'
import {getToken} from "./common/js/utils/auth";
import {directive} from './directives'
const FastClick = require('fastclick')
FastClick.attach(document.body)
import './icons'
import SvgIcon from './base/SvgIcon'
import Toast  from './base/toast/index.js'
Vue.$toast = Vue.prototype.$toast = Toast;
Vue.component('svg-icon', SvgIcon)

import './common/js/validate/index.js'
/*router.beforeEach((to, from, next) => {
  if(getToken()){
    //拉取用户信息
    const id = storage.get('userId')
    //console.log(id)
    if (id) {
      store.dispatch('getUserInfo', id)
      next()
    } else {
      next(false)//中断路由
      store.commit('SHOW_LOGIN', true)//显示登录框
      store.commit('SET_REDIRECT', to.fullPath)//保存目标路径
      Cookies.remove('__csrf');
    }
  }
})*/
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
