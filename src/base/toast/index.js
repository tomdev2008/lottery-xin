import Vue from 'vue';
import toast from './toast.vue';
const ToastConstructor = Vue.extend(toast);
let removeDom = event => {
  console.log('removeDom')
  if (event.target.parentNode) {
    event.target.parentNode.removeChild(event.target);
  }
};

ToastConstructor.prototype.close = function () {
  this.show = false;
  this.$el.addEventListener('transitionend', removeDom);
  this.$el.addEventListener('animate', removeDom);
  this.closed = true;
};
let Toast = (options = {}) => {
  let duration = options.duration || 2000;

  let instance = new ToastConstructor();
  Object.assign(instance, options)
  instance.closed = false;
  clearTimeout(instance.timer);
  instance.text = typeof options === 'string' ? options : options.text;
  instance.position = options.position || 'center';
  let tpl = instance.$mount().$el
  if (document.getElementById('toast-box')) {
    document.getElementById('toast-box').appendChild(tpl)
  } else {
    var toastBox = document.createElement('div')
    toastBox.setAttribute('id', 'toast-box')
    toastBox.appendChild(tpl)
    document.body.appendChild(toastBox)
  }

  instance.show = true // 显示toast
  Vue.nextTick(function () {
    instance.show = true;
    instance.$el.removeEventListener('transitionend', removeDom);
    if (duration) {
      instance.timer = setTimeout(function () {
        if (instance.closed) return;
        instance.close();
      }, duration)
    }
  });
  return instance;
};
export default Toast;
