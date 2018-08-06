import {getToken} from "../common/js/utils/auth";
import storage from 'good-storage'

const state = {
  loading: false,
  ajaxLoading: false,
  playTpl: 'Sss5xFs',
  currentPlay: {},
  dropping: false,
  dropEl: null,
  showLogin: false,
  playType: 1,
  currentLottery: null,
  user: getToken() ? storage.get('username') : null,
}

export default state
