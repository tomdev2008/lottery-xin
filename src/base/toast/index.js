import ToastTemplate from './toast.vue' // 引入vue模板
var Toast = {} // 定义插件对象
Toast.install = function (Vue, options) { // vue的install方法，用于定义vue插件
  // 如果toast还在，则不再执行
  if (document.getElementsByClassName('toastBox').length) {
    return
  }
  let toastTpl = Vue.extend(ToastTemplate) // 创建vue构造器
  let instance = new toastTpl() // 实例化vue实例
  // 用$el来访问元素，并插入到body中
  let tpl = instance.$mount().$el

  Vue.prototype.$toast = { // 在Vue的原型上添加实例方法，以全局调用
    show(options) { // 控制toast显示的方法
      return new Promise((resolve,reject)=>{
        document.body.appendChild(tpl)
        if (typeof options === 'string') { // 对参数进行判断
          instance.text = options // 传入props
        }
        else if (typeof options === 'object') {
          Object.assign(instance, options) // 合并参数与实例
        }
        instance.show = true // 显示toast
        setTimeout(function () {
          instance.show = false;
          setTimeout(() => {
            resolve(instance)
          }, 0);
        }, instance.duration)
      })
    },
    hide() { // 控制toast隐藏的方法
      instance.show = false
    }
  }
}
if (typeof window !== 'undefined' && window.Vue) {
    Toast.install(window.Vue);
}
export default Toast;
