<template>
  <div class="lottery_k3">
    {{selectedNums}}
    <div class="lottery-con">
      <template v-if="lottery">
        <div class="lottery-half lottery-prev" @click="hisFlag = true">
          <div class="title">
            <span>{{lottery.actionName}}</span>
            <span>{{lottery.actionNo.substr(4)}} 期</span>
            <svg-icon iconClass="more"></svg-icon>
          </div>
          <div class="bottom">
            <k3-result :result="lottery.data" :animation="animation"></k3-result>
          </div>
          <div class="his-wrapper" v-click-outside="closeHis" v-if="hisFlag">
            <dl class="his-list" v-if="hisList.length">
              <dt class="his-title">
                <span class="qihao">期号</span>
                <span class="result">开奖号码</span>
                <span>和值</span>
                <span>单双</span>
                <span>大小</span>
                <span class="time">开奖时间</span>
              </dt>
              <dd class="his-item" v-for="(item,index) in hisList">
                <span class="qihao">{{item.number}}</span>
                <span class="result">
                  <k3-result :result="item.data"></k3-result>
                </span>
                <span>{{item.sum}}</span>
                <span>{{item.isEven ? '双' : '单'}}</span>
                <span>{{item.isLarge ? '大' : '小'}}</span>
                <span class="time">{{item.kjTime}}</span>
              </dd>
            </dl>
          </div>
        </div>
        <div class="lottery-half lottery-next">
          <div class="title">
            <span>{{lottery.thisNo.substr(4)}} 期投注截止</span>
          </div>
          <div class="bottom">
            <div class="countdown">
              <clocker v-model="lottery.diffTime" :start="startFlag" @end="countEnd"></clocker>
            </div>
          </div>
        </div>
      </template>
    </div>
    <ellipsis :value="gameTip" gameType="k3" v-if="gameTip"></ellipsis>
    <div class="selectNumber">
      <k3-list :numbers="numbers" @add="add"></k3-list>
    </div>

    <div v-transfer-dom>
      <confirm ref="confirm" title="温馨提示" v-if="lottery">
        <p>{{lottery.actionNo}}期已截止</p>
        <p>当前期号<span class="red">{{lottery.thisNo}}</span></p>
        <p>投注时请注意期号</p>
        <div class="footer-tab" slot="footer">
          <div class="tab-item" @click="noTip">不再提示</div>
          <div class="tab-item" @click="closeTip">确定</div>
        </div>
      </confirm>
    </div>

    <transition name="fade" v-if="!lottery">
      <loading></loading>
    </transition>
  </div>
</template>

<script>
  let hzList = () => {
    return [
      {num: '大', odds: 3.8}, {num: '小', odds: 3.8}, {num: '单', odds: 3.8}, {num: '双', odds: 3.8},
      {num: 3, odds: 189}, {num: 4, odds: 63}, {num: 5, odds: 31.5}, {num: 6, odds: 18.9}, {num: 7, odds: 12.6},
      {num: 8, odds: 9}, {num: 9, odds: 7.56}, {num: 10, odds: 7}, {num: 11, odds: 7}, {num: 12, odds: 7.56},
      {num: 13, odds: 9}, {num: 14, odds: 12.6}, {num: 15, odds: 18.9}, {num: 16, odds: 31.5}, {num: 17, odds: 63},
      {num: 18, odds: 189}
    ];
  };
  let numList = () => {
    return [{num: 1}, {num: 2}, {num: 3}, {num: 4}, {num: 5}, {num: 6}];
  };
  let sameList = (number) => {
    if (number == 3) {
      return [{num: 111}, {num: 222}, {num: 333}, {num: 444}, {num: 555}, {num: 666}];
    } else if (number == 2) {
      return [{num: 11}, {num: 22}, {num: 33}, {num: 44}, {num: 55}, {num: 66}];
    }
  };

  import K3List from 'base/k3-list/index';
  import K3Result from 'base/k3-result/index';
  import Countdown from 'base/countdown/index';
  import Clocker from 'base/clocker/index';
  import Loading from 'base/loading/index.vue';
  import Confirm from 'base/confirm/index';
  import Ellipsis from 'base/ellipsis/index';
  import {mapGetters} from 'vuex';
  import axios from 'axios';

  //获取当前期号   /portal/logic/getNo/type/91
  export default {
    name: "K3",
    data() {
      return {
        simplexFlag: false,
        numbers: [],
        gameTip: '',

        startFlag: false,
        lottery: null,
        animation: false,

        hisFlag: false,
        hisList: []
      }
    },
    components: {
      K3List, Countdown, K3Result, Loading, Confirm, Clocker, Ellipsis
    },
    computed: {
      ...mapGetters(['playName', 'currentPlay']),
      selectedNums() {
        let arr = [];
        this.numbers.forEach((number, index) => {
          let map = {};
          if (number.selected) {
            map.num = number.num;
            map.odds = number.odds;
            arr.push(map);
          }
        })
        return arr;
      },
    },
    mounted() {
      if (!this.$route.params.id) {
        this.$toast('参数错误').then(res => {
          this.$router.push({path: '/'});
        })
      } else {
        this.getLottery(this.$route.params.id);
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.setTpl(vm.playName);
      })
    },
    beforeRouteLeave(to, from, next) {
      this.numbers = [];
      next()
    },
    watch: {
      $route(newRoute) {
        if (!newRoute.params.id) {
          return;
        } else {
          this.lottery = null;
          this.startFlag = false;
          this.getLottery(newRoute.params.id);
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
      }
    },
    methods: {
      setTpl(playName) {
        switch (this.playName) {
          case '三同号单选':
            this.numbers = sameList(3)
            break;
          case '三同号通选':
            this.numbers = [{num: '111,222,333,444,555,666'}]
            break;
          case '三连号通选':
            this.numbers = [{num: '123,234,345,456'}]
            break;
          case '三不同号':
            this.numbers = numList()
            break;
          case '二同号复选':
            this.numbers = sameList(2)
            break;
          case '二同号单选':
            this.numbers = sameList(2)
            break;
          case '二不同号':
            this.numbers = numList()
            break;
          default:
            this.numbers = hzList()
        }
        //获取玩法提示
        this.getGameTip(this.currentPlay.id)
      },
      //获取开奖记录
      getHisResult() {
        axios.get('/game/CurrentData', {
          params: {
            id: this.$route.params.id
          }
        }).then(res => {
          this.hisList = res.data;
          this.hisList.forEach(item => {
            item.data = item.data.split(',')
            let sum = this.getSum(item.data);
            item.sum = sum
            if (sum >= 11 && sum <= 18) {
              item.isLarge = true
            }
            if (sum % 2 == 0) {
              item.isEven = true
            }
          })
        })
      },
      //获取游戏玩法提示
      getGameTip(playId) {
        axios.get('/index/playExplain', {
          params: {
            playId
          }
        }).then(res => {
          this.gameTip = res.data.simpleInfo;
        })
      },
      //获取开奖数据
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
          this.lottery = data;
          this.startFlag = true;
          this.getRelData(this.lottery)
        })
      },
      getRelData(lottery) {
        axios.get('/portal/index/getLotteryInfo', {
          params: {
            type: this.$route.params.id,
            lott_id: lottery.actionNo,
          }
        }).then(resp => {
          if (resp.data.code == 1) {
            console.log(resp.data.data)
            setTimeout(() => {
              this.animation = false;
            }, 1000)
            this.getHisResult();
          } else {
            setTimeout(() => {
              this.getRelData(lottery)
            }, 3000)
          }
        })
      },
      countEnd() {
        //倒计时请求结束
        this.startFlag = false;
        this.getLottery(this.$route.params.id);
      },
      kjEnd() {
        console.log('开奖结束');
        this.animation = false;
      },
      add(el, numbers) {
        this.numbers = numbers;
      },
      noTip() {
        this.closeTip();
        window.sessionStorage.setItem('_oldConfirmDate_', new Date().getTime());
      },
      closeTip() {
        this.$refs.confirm.toggle(false);
      },
      closeHis(e) {
        e.stopPropagation();
        this.hisFlag = false;
      },
      getSum(arr) {
        var s = 0;
        arr.reduce((preValue, curValue) => {
          return s = preValue + curValue;
        });
        return s;
      },
    },
  }
</script>

<style lang="less" scoped>
  .lottery_k3 {
    background: #317455;
    .lottery-con {
      position: fixed;
      top: 100px;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 120px;
      display: flex;
      background-color: #22563f;
      color: #fff;
      .lottery-half {
        padding: 0 10px;
        text-align: center;
        &.lottery-prev {
          flex: 1;
          border-right: 1px solid #164630;
          .number {
            display: inline-block;
            width: 50px;
            height: 50px;
            line-height: 50px;
            margin: 0 4px;
            color: #fff;
            border-radius: 50%;
            text-align: center;
            font-size: 28px;
          }
          .his-wrapper {
            position: absolute;
            left: 0;
            right: 0;
            top: 100%;
            min-height: 200px;
            max-height: 600px;
            overflow: auto;
            background-color: #22563f;
            font-size: 24px;
            .his-list {
              border-top: 1px solid #164630;
              .his-title, .his-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px;
                span {
                  display: flex;
                  width: 80px;
                  justify-content: center;
                  &.qihao {
                    width: 170px;
                    flex: 0 0 170px;
                    justify-content: start;
                  }
                  &.result {
                    width: 180px;
                    flex: 0 0 180px;
                    justify-content: start;
                  }
                  &.time {
                    width: 100px;
                    flex: 0 0 100px;
                  }
                }
              }
              .his-title {
                font-weight: bold;
                border-bottom: 1px solid #164630;
              }
              .his-item {
                color: rgba(255, 255, 255, .8);
                &:not(:last-child) {
                  border-bottom: 1px solid #164630;
                }
              }
            }
            .loading-wrapper {
              position: absolute;
              left: 0;
              top: 0;
              bottom: 0;
              right: 0;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
        }
        &.lottery-next {
          flex: 1;
          .countdown {
            font-size: 50px;
          }
        }
        .title {
          height: 40px;
          font-size: 24px;
          margin-top: 10px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .bottom {
          display: flex;
          justify-content: center;
          align-items: baseline;
          height: 66px;
        }
      }
    }
  }

  .footer-tab {
    height: 100%;
    display: flex;
    .tab-item {
      flex: 1;
    }
  }
</style>
