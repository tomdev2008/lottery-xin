import * as types from './mutation-types'//

const mutations = {
  [types.SET_AJAX_LOADING](state, status) {
    state.ajaxLoading = status;
  },
  [types.SET_PLAY_TPL](state, name) {
    state.playTpl = name;
  },
  [types.SET_PLAY_NAME](state, name) {
    state.playName = name;
  },

  [types.SET_CURRENT_PLAY_NAME](state, play) {
    state.currentPlay = play;
  },
  [types.SET_DROPPING](state, status) {
    state.dropping = status;
  },
  [types.SET_DROP_EL](state, el) {
    state.dropEl = el;
  },
  [types.TOGGLE_LOGIN](state, flag) {
    state.showLogin = flag;
  },
  [types.SET_PLAY_TYPE](state) {
    state.playType == 0 ? state.playType = 1 : state.playType = 0;
  },
  [types.SET_CURRENT_LOTTERY](state, lottery) {
    state.currentLottery = lottery;
  },
}

export default mutations
