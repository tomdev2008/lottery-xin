import * as types from './mutation-types'
import storage from 'good-storage'
import {lhc} from 'common/js/calculate';

export const ajaxEnd = function ({commit}, status) {
  commit(types.SET_AJAX_LOADING, status)
}
export const saveUser = function ({commit}, username) {
  commit(types.SAVE_USER, username)
  storage.set('username', username)
  commit('TOGGLE_LOGIN', false)
}
export const setSelectedLottery = function ({commit}, lottery) {
  commit(types.SET_SELECTED_LOTTERY, lottery)
  storage.set('selectedLottery', lottery)
}

export const calcCount = function ({commit, state}, {calcFun, numbers}) {
  commit(types.SET_CALC_FUN, calcFun)
  let arr = [];
  numbers.forEach((number, index) => {
    arr[index] = [];
    number.numList.forEach(item => {
      if (item.selected) {
        arr[index].push(item.num);
      }
    })
  })
  //console.log(arr, lhc[calcFun](arr), state.beishu)
  let count = state.totalCount;
  count += lhc[calcFun](arr).count;
  commit('SET_TOTAL_COUNT', count)
}
