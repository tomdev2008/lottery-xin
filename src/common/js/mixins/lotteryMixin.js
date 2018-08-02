import {mapGetters} from 'vuex';
import axios from 'axios';
import Loading from 'base/loading/index.vue';
import Confirm from 'base/confirm/index';
import OpenNum from 'base/open-num/index';
import Clocker from 'base/clocker/index';
import Ellipsis from 'base/ellipsis/index';

import NumberList from 'base/number-list/number-list';

export default {
  data() {
    return {
      numbers: [],
      gameTip: '',
      //小球动画相关
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: [],
      count: 0,
      beishu: 1,
      selectTip: '',//选择错误提示
      lottery: null,//来讲数据
      startFlag: false,//倒计时开关
      hisFlag: false,
      hisList: [],
      animation: false,//开奖号码动画开关
    }
  },
  components: {
    NumberList, Loading, Confirm, OpenNum, Clocker, Ellipsis,
  },
  created() {
    this.getLottery(this.$route.params.id);
    this.setTpl(this.playName);
  },
  computed: {
    ...mapGetters(['playName', 'currentPlay', 'playType', 'currentLottery']),
    selectedXNums() {
      let arr = [];
      this.xNumbers.forEach((number, index) => {
        arr[index] = [];
        number.numList.forEach(item => {
          if (item.selected) {
            arr[index].push(item.num);
          }
        })
      })
      return arr;
    },
    betDesc() {
      return `共 ${this.count} 注 , ${this.count * this.beishu} 元`;
    },
    checkDesc() {
      if (this.count > 0) {
        return '投注';
      } else {
        return `按规则选择${this.shouldSelectedLen ? this.currentPlay.length - this.shouldSelectedLen : this.currentPlay.length}个号码`
      }
    },
    checkCls() {
      return this.count > 0 ? 'checkout' : 'checkout disabled';
    },
    totalPrice() {
      let total = 0;
      let beishu = this.beishu > 0 ? this.beishu : 1
      this.previewBetArr.forEach(item => {
        total += item.count * beishu
      })
      return total
    },
    Xlist() {
      let arr = [];
      this.xNumbers.forEach((number, index) => {
        arr[index] = [];
        number.numList.forEach(item => {
          if (item.selected) {
            arr[index].push(item.num);
          }
        })
      })
      return arr;
    },
    selectedLen() {
      let len = 0;
      this.Xlist.forEach(item => {
        len += item.length;
      })
      return len;
    },
    shouldSelectedXLen() {
      let len = 0;
      if (this.Xlist.length == 1) {
        len = this.Xlist[0].length;
      } else {
        this.Xlist.forEach(item => {
          item.length >= 1 ? len++ : '';
        })
      }
      return len;
    },
    ballColorCom() {
      if (this.ballColor == 'blue') {
        return '#218ddd'
      } else if (this.ballColor == 'green') {
        return '#38b366'
      } else {
        return '#f86469'
      }
    },
  },
  watch: {
    $route(newRoute) {
      if (!newRoute.params.id) {
        return;
      } else {
        this.lottery = null;
        this.startFlag = false;
        this.getLottery(newRoute.params.id);
        this.setTpl(this.playName);
      }
    },
    playName(newName) {
      this.setTpl(newName)
    },
    hisFlag: {
      handler(newFlag) {
        if (newFlag && !this.hisList.length) {
          this.getHisResult()
        }
      },
    },
  },
  methods: {
    /*setCheckoutHeight() {
      this.H = this.shouldSelectedXLen / this.currentPlay.length * 100;
      this.$refs.progress.style.height = this.H > 100 ? '100%' : this.H + '%';
    },*/
    //获取开奖数据相关
    getLottery(type) {
      if (this.lottery && !window.sessionStorage.getItem('_oldConfirmDate_')) {
        this.$refs.confirm.toggle(true);
      }
      this.startFlag = false;
      this.animation = true;
      axios.get('/game/getData', {
        params: {
          type
        }
      }).then(res => {
        let data = res.data;
        data.data = data.data.split(',');//将开奖数据转成数组
        if (data.actionName == '北京28') {
          let sum = data.data.reduce((p, v) => {
            return (p - 0) + (v - 0);
          })
          data.data.splice(1, 0, '+')
          data.data.splice(3, 0, '+')
          data.data.splice(5, 0, '=', sum)
        } else if (data.actionName == '六合彩') {
          data.data = this.normalLhcList(data.data.join(','))
        }

        this.lottery = data;
        this.$store.commit('SET_CURRENT_LOTTERY', data)
        this.startFlag = true;
        this.getRelData(data);
      })
    },
    normalLhcList(data) {
      let a = []
      data.split(',').forEach(item => {
        let map = {}
        map['num'] = item;
        Object.keys(this.aniArr).forEach(ani => {
          if (this.aniArr[ani].includes(parseInt(item))) {
            map['ani'] = ani;
          }
        })
        if (this.redArr.includes(item)) {
          map['color'] = 'red';
        }
        if (this.blueArr.includes(item)) {
          map['color'] = 'blue';
        }
        if (this.greenArr.includes(item)) {
          map['color'] = 'green';
        }
        a.push(map)
      })
      a.splice(6, 0, {num: '+', color: 'none', ani: '+'})
      return a
    },
    countEnd() {
      this.getLottery(this.$route.params.id);
    },
    //对话框不在提示
    noTip() {
      this.closeTip();
      window.sessionStorage.setItem('_oldConfirmDate_', new Date().getTime());
    },
    //关闭对话框
    closeTip() {
      this.$refs.confirm.toggle(false);
    },
    //收起开奖记录
    closeHis(e) {
      e.stopPropagation();
      this.hisFlag = false;
    },
    checkout() {
      if (!this.count) return;
      this.$store.commit('TOGGLE_LOGIN', true)
    }
  },

}
