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
  selectedLottery: storage.get('selectedLottery') ? storage.get('selectedLottery') : null,
  user: getToken() ? storage.get('username') : null,
  explainFlag: false,
  beishu: '',
  calcFun: null,
  totalCount: 0,
}

export default state
