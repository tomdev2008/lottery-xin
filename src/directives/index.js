import Vue from 'vue'
import transferDom from './transfer-dom'
//自定义指令
export const directive = {
    clickOutside: Vue.directive('clickOutside', {
        bind(el, binding){
            el.__vueClickOutside__ = function documentHandle(e) {
                if (el.contains(e.target)) {
                    return false;
                }
                if (binding.expression) {
                    binding.value(e);
                }
            }
            document.addEventListener('click', el.__vueClickOutside__, true);
        },
        unbind (el){
            document.removeEventListener('click', el.__vueClickOutside__, true);
            delete el.__vueClickOutside__;
        }
    }),

    focus: Vue.directive('focus', {
        // 当绑定元素插入到 DOM 中。
        inserted: function (el) {
            // 聚焦元素
            el.focus()
        }
    }),

    transferDom: Vue.directive('transferDom', {
        inserted: transferDom.inserted,
        componentUpdated: transferDom.componentUpdated,
        unbind: transferDom.unbind,
    })

}

