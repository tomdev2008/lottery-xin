export function hasClass(el, className) {
  return el.classList.contains(className)
}

export function addClass(el, className) {
  el.classList.add(className)
}

export function removeClass(el, className) {
  if (!el) {
    return
  }
  if (el.classList) {
    el.classList.remove(className)
  } else if (this.hasClass(el, className)) {
    el.className = el.className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), ' ').replace(/^\s+|\s+$/g, '')
  }
}


let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

export function debounce(func, delay) {
  let timer

  return function (...args) {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
