import Vue from 'vue'
import SvgIcon from '@/base/SvgIcon'// svg组件

// 注册一个全局组件svg-icon
Vue.component('svg-icon', SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)
