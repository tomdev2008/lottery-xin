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
  [types.SET_SELECTED_LOTTERY](state, lottery) {
    state.selectedLottery = lottery;
  },
  [types.SAVE_USER](state, user) {
    state.user = user;
  },
  [types.TOGGLE_EXPLAIN](state, flag) {
    state.explainFlag = flag;
  },
  [types.SET_BEISHU](state, beishu) {
    state.beishu = beishu;
  },
  [types.SET_CALC_FUN](state, calcFun) {
    state.calcFun = calcFun;
  },
  [types.SET_TOTAL_COUNT](state, count) {
    state.totalCount = count;
  },
}

export default mutations
