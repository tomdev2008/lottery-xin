/* 组合算法*/
function combine(arr, num) {
  var r = [];
  (function f(t, a, n) {
    if (n == 0) return r.push(t);
    for (var i = 0, l = a.length; i <= l - n; i++) {
      f(t.concat(a[i]), a.slice(i + 1), n - 1);
    }
  })([], arr, num);
  return r;
}

/* 排列算法*/
function permutation(arr, num) {
  var r = [];
  (function f(t, a, n) {
    if (n == 0) return r.push(t);
    for (var i = 0, l = a.length; i < l; i++) {
      f(t.concat(a[i]), a.slice(0, i).concat(a.slice(i + 1)), n - 1);
    }
  })([], arr, num);
  return r;
}

/* 交集 */
function getIntersection(arr1, arr2) {
  let a = new Set(arr1);
  let b = new Set(arr2);
  let intersectionSet = new Set([...a].filter(x => b.has(x)));
  return [...intersectionSet];
}

export const tz5xDwei = function (numbers, codeLen) {
  let len = 0;
  let dLen = 0;
  let flag = numbers.some(number => {
    if (number.length) {
      dLen += number.length;
    }
    return number.length >= 1
  })
  if (!flag) {
    return
  } else {
    numbers.forEach((number, index) => {
      if (number.length == 0) {
        numbers[index] = '';
      } else {
        len += number.length;
        numbers[index] = numbers[index].join('')
      }
    })
    return {actionData: numbers.join(','), actionNum: len};
  }

}

export const tzAllSelect = function (numbers, codeLen) {
  let code = [], len = 1;
  numbers.forEach((number, index) => {
    len *= number.length;
  })
  return {actionData: code.join(','), actionNum: len};
}


export const lhcFun = function (numbers, codeLen) {
  let arr = numbers[0];
  if (arr.length < codeLen) {
    throw({
      tip: `至少选${codeLen}位数`,
      selectedLen: arr.length
    });
  } else {
    let len = combine(arr, codeLen).length;
    return {actionData: arr.join(','), actionNum: len};
  }
}

export const lian2xiao = function (numbers) {
  let arr = numbers[0];
  let data = arr.join(',');
  let combines = combine(arr, 2)
  let count = combines.length;
  return {data, combines, count}
}

export const lian3xiao = function (numbers) {
  let arr = numbers[1];
  let data = arr.join(',');
  let combines = combine(arr, 3)
  let count = combines.length;
  return {data, combines, count}
}

export const lian4xiao = function (numbers) {
  let arr = numbers[2];
  let data = arr.join(',');
  let combines = combine(arr, 4)
  let count = combines.length;
  return {data, combines, count}
}

export const lian5xiao = function (numbers) {
  let arr = numbers[3];
  let data = arr.join(',');
  let combines = combine(arr, 5)
  let count = combines.length;
  return {data, combines, count}
}


export const ssc = {
  tzAllSelect,
  tz5xDwei,
}

export const lhc = {
  lhcFun, tzAllSelect, tz5xDwei, lian2xiao, lian3xiao, lian4xiao, lian5xiao,
}


