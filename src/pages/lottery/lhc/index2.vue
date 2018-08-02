<template>
  <div class="lottery_lhc">
    <div class="lottery-con">
      <template v-if="lottery">
        <div class="lottery-half lottery-prev" @click="hisFlag = true">
          <div class="title">
            <span>{{lottery.actionName}}</span>
            <span>{{lottery.actionNo}}</span>期开奖号码
            <svg-icon iconClass="more"></svg-icon>
          </div>
          <div class="bottom">
            <template v-for="(num,index) in lottery.data">
              <open-num :num="num.num" :animation="animation" :color="num.color" :ani="num.ani"></open-num>
            </template>
          </div>
          <div class="his-wrapper" v-click-outside="closeHis" v-if="hisFlag">
            <dl class="his-list" v-if="hisList.length">
              <dt class="his-title">
                <span class="qihao">期号</span>
                <span class="result">开奖号码</span>
              </dt>
              <dd class="his-item" v-for="(item,index) in hisList">
                <span class="qihao">{{item.number}}<br/>{{item.kjTime}}</span>
                <span class="result">
                  <template v-for="num in item.data">
                    <open-num
                      :num="num.num"
                      :color="num.color"
                      :ani="num.ani"
                      size="small">
                    </open-num>
                  </template>
                </span>
              </dd>
            </dl>
          </div>
        </div>
        <div class="lottery-half lottery-next">
          <div class="title">
            <span>{{lottery.thisNo}} 期</span>
          </div>
          <div class="bottom">
            <p>投注截止</p>
            <div class="countdown">
              <clocker v-model="lottery.diffTime" :start="startFlag" @end="countEnd"></clocker>
            </div>
          </div>
        </div>
      </template>
      <img src="../../../assets/placeholder.png" class="placeholder" v-else>
    </div>
    <!--<div class="game-tip" v-html="curPlayTip.tip"></div>-->
    <!--<ellipsis :value="gameTip" v-if="gameTip"></ellipsis>-->
    <div class="selectNumber">
      <!--<div>selectedNums:{{selectedNums}}-&#45;&#45;list:{{list}}-&#45;&#45;count:{{count}}</div>-->
      <number-list :numbers="numbers" @add="addCart"></number-list>
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
    <footer class="lottery-footer">
      <div ref="cartBox" class="cart-box">
        <template v-if="timer>0">
          {{timer}}
        </template>
        <div ref="progress" class="progress"></div>
      </div>
      <div class="ball-container">
        <div v-for="ball in balls">
          <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook" :style="'background:' +ballColorCom"></div>
            </div>
          </transition>
        </div>
      </div>
      <div class="bet-content">
        <div class="bet-title">
          {{betDesc}}
        </div>
        <transition-group name="list-complete" tag="ul" class="ellipsis">
          <li v-for="(item,index) in selectedNums" :key="item+index" class="list-complete-item" v-if="item">
            {{item}}
          </li>
        </transition-group>
      </div>
      <div :class="checkCls" @click="checkout">{{checkDesc}}</div>
    </footer>
  </div>
</template>

<script>
  let redArr = ['01', '02', '07', '08', '12', '13', '18', '19', '23', '24', '29', '30', '34', '35', '40', '45', '46'];
  let blueArr = ['03', '04', '09', '10', '14', '15', '20', '25', '26', '31', '36', '37', '41', '42', '47', '48'];
  let greenArr = ['05', '06', '11', '16', '17', '21', '22', '27', '28', '32', '33', '38', '39', '43', '44', '49'];
  let aniArr = {
    '狗': [1, 13, 25, 37, 49],
    '鸡': [2, 14, 26, 38],
    '猴': [3, 15, 27, 39],
    '羊': [4, 16, 28, 40],
    '马': [5, 17, 29, 41],
    '蛇': [6, 18, 30, 42],
    '龙': [7, 19, 31, 43],
    '兔': [8, 20, 32, 44],
    '虎': [9, 21, 33, 45],
    '牛': [10, 22, 34, 46],
    '鼠': [11, 23, 35, 47],
    '猪': [12, 24, 36, 48]
  }

  let numList = () => {
    return copy(redArr, 'red').concat(copy(blueArr, 'blue')).concat(copy(greenArr, 'green')).sort((a, b) => {
      return a.num - b.num
    })
  }

  let lmList = () => {
    return [
      {num: '大',odds:'1.980'}, {num: '小',odds:'1.980'}, {num: '单',odds:'1.980'}, {num: '双',odds:'1.980'},
      {num: '大单',odds:'3.960'}, {num: '大双',odds:'3.960'}, {num: '小单',odds:'3.960'}, {num: '小双',odds:'3.960'},
      {num: '合大',odds:'1.980'}, {num: '合小',odds:'1.980'}, {num: '合单',odds:'1.980'}, {num: '合双',odds:'1.980'},
      {num: '尾大',odds:'1.980'}, {num: '尾小',odds:'1.980'}, {num: '家禽',odds:'1.901'}, {num: '野兽',odds:'1.980'},
      {num: '红波',odds:'2.795'}, {num: '绿波',odds:'2.970'}, {num: '蓝波',odds:'2.970'}];
  };
  let lm2List = () => {
    return [{num: '大', odds: '赔率1.980'}, {num: '小', odds: '赔率1.980'}, {num: '单', odds: '赔率1.980'}, {
      num: '双',
      odds: '赔率1.980'
    },
      {num: '大单', odds: '赔率3.960'}, {num: '大双', odds: '赔率3.960'}, {num: '小单', odds: '赔率3.960'}, {
        num: '小双',
        odds: '赔率3.960'
      },
      {num: '合大', odds: '赔率1.980'}, {num: '合小', odds: '赔率1.980'}, {num: '合单', odds: '赔率1.980'}, {
        num: '合双',
        odds: '赔率1.980'
      },
      {num: '尾大', odds: '赔率1.980'}, {num: '尾小', odds: '赔率1.980'}, {num: '家禽', odds: '赔率1.980'}, {
        num: '野兽',
        odds: '赔率1.980'
      },
      {num: '红波', odds: '赔率2.795'}, {num: '绿波', odds: '赔率2.970'}, {num: '蓝波', odds: '赔率2.970'}];
  };
  let weiList = () => {
    return [{num: '0头',}, {num: '1头'}, {num: '2头'}, {num: '3头'}, {num: '4头',}, {num: '0尾'}, {num: '1尾'}, {num: '2尾'}, {num: '3尾',}, {num: '4尾'}, {num: '5尾'}, {num: '6尾'}, {num: '7尾',}, {num: '8尾'}, {num: '9尾'}];
  };
  let xiaoList = () => {
    return [{num: '鼠', egs: [11, 23, 35, 47]}, {num: '牛', egs: [12, 24, 36, 48]}, {
      num: '虎', egs: [9, 21, 23, 45]
    }, {num: '兔', egs: [8, 20, 32, 44]}, {
      num: '龙',
      egs: [7, 19, 31, 43]
    }, {num: '蛇', egs: [6, 18, 30, 42]}, {num: '马', egs: [5, 17, 29, 41]}, {num: '羊', egs: [4, 16, 26, 40]}, {
      num: '猴',
      egs: [3, 15, 27, 39]
    }, {num: '鸡', egs: [2, 14, 26, 38]}, {num: '狗', egs: [1, 13, 25, 37]}, {num: '猪', egs: [12, 24, 36, 48]}];
  };
  let balls = () => {
    return [{show: false}, {show: false}, {show: false}, {show: false}, {show: false}]
  }

  function copy(arr, color) {
    let arrCopy = [];
    arr.forEach(item => {
      arrCopy.push({
        num: item,
        color: color
      })
    })
    return arrCopy
  }


  import axios from 'axios';
  import {lhc} from 'common/js/calculate'
  import mixin from 'common/js/mixins/lotteryMixin'
  import XNumberList from 'base/x-number-list/index';

  export default {
    name: "LHC",
    mixins: [mixin],
    data() {
      return {
        redArr,
        blueArr,
        greenArr,
        aniArr,
        ballColor: '',
      }
    },
    components:{
      XNumberList
    },
    watch: {
      list(newVal) {
        //console.log('newVal', newVal)
        let action = this.currentPlay.action;
        let length = this.currentPlay.length;
        try {
          let result = lhc[action](newVal, length);
          this.count = result.actionNum;
          console.log(result)
        } catch (e) {
          this.count = 0;
          this.selectTip = e.tip;
          //console.log(result)
        }
      },
    },
    methods: {
      setTpl(playName) {
        switch (playName) {
          case '特码':
            this.numbers = [{title: '直选', numList: numList(), balls: balls()},{title: '两面', numList: lmList(), balls: balls()}];
            break;
        }
        //获取玩法提示
        this.getGameTip(this.currentPlay.id)
      },
      getRelData(lottery) {
        axios.get('/portal/index/getLotteryInfo', {
          params: {
            type: this.$route.params.id,
            lott_id: lottery.actionNo,
          }
        }).then(resp => {
          if (resp.data.code == 1) {
            //console.log(resp.data.data)

            resp.data.data.data = this._normalList(resp.data.data.data)
            setTimeout(() => {
              this.lottery.data = resp.data.data.data;
              this.animation = false;
            }, 1000)
            this.getHisResult();
          } else {
            setTimeout(() => {
              this.getRelData(lottery)
            }, 5000)
          }
        }).catch(() => {
          this.getRelData(lottery)
        })
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
            item.data = this._normalList(item.data);
          })
        })
      },
      getGameTip(playId) {
        axios.get('/mock/play').then(res => {
          this.gameTip = res.data.data;
          this.gameTip = res.data.data.find(item => {
            return item.id == this.currentPlay.id
          }).tip
          console.log(this.gameTip)
        })
      },
      _normalList(data) {
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
        a.splice(-1, 0, {num: '+', color: 'none', ani: '+'})
        return a
      },
      checkout() {
        if(!this.count)return;
        this.$store.commit('TOGGLE_LOGIN', true)
      }
    },
  }
</script>

<style lang="less" scoped>
  @split: '|';
  .lottery_lhc {
    min-height: 100%;
    padding-top: 250px !important;
    background: #f5f1e4;
    .lottery-con {
      position: fixed;
      top: 100px;
      left: 0;
      width: 100%;
      height: 150px;
      display: flex;
      background: #e1d9ba;
      .lottery-half {
        padding: 0 10px;
        text-align: center;
        &.lottery-prev {
          width: 65%;
          border-right: 1px solid #bdb48b;
          .his-wrapper {
            position: absolute;
            left: 0;
            right: 0;
            top: 100%;
            min-height: 200px;
            max-height: 600px;
            overflow: auto;
            box-shadow: 0 10px 10px rgba(41, 41, 41, .08);
            background: #e1d9bb;
            font-size: 24px;
            .his-list {
              border-top: 1px solid #c3bba2;
              font-size: 26px;
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
                    width: 220px;
                    flex: 0 0 220px;
                    justify-content: start;
                  }
                  &.result {
                    flex: 1;
                    justify-content: start;
                  }
                }
              }
              .his-title {
                font-weight: bold;
                border-bottom: 1px solid #c3bba2;
              }
              .his-item {
                color: #666;
                &:not(:last-child) {
                  border-bottom: 1px solid #c3bba2;
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
          width: 35%;
          .bottom {
            flex-direction: column;
            .countdown {
              font-size: 46px;
            }
          }
        }
        .title {
          height: 40px;
          font-size: 28px;
          margin-top: 10px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .bottom {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100px;
        }
      }
      .placeholder {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 100%;
        height: auto;
        transform: translate(-50%, -50%);
        animation: placeholder 2s infinite both;
      }
    }
    .game-tip {
      padding: 30px;
      font-size: 26px;
      word-break: break-all;
    }
    .lottery-footer {
      position: fixed;
      height: 100px;
      left: 0;
      bottom: 0;
      z-index: 5;
      background: #575858;
      width: 100%;
      display: flex;
      .ball {
        position: absolute;
        left: 60px;
        bottom: 40px;
        z-index: 2000;
        border-radius: 50%;
        transition: all .5s cubic-bezier(0.49, -0.52, 0.75, 0.41);
        .inner {
          width: 44px;
          height: 44px;
          background: -webkit-gradient(linear, left top, left bottom, from(#f86469), color-stop(75%, #bf1f24));
          background: linear-gradient(to bottom, #f86469, #bf1f24 75%);
          border-radius: 50%;
          transition: all .5s linear;
        }
      }
      .cart-box {
        position: absolute;
        left: 28px;
        top: -20px;
        width: 110px;
        height: 110px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 10px solid #474848;
        border-radius: 50%;
        background: #bbb59c;
        background-clip: content-box;
        color: #fff;
        overflow: hidden;
        box-sizing: border-box;
        &.zoom {
          animation: zoom .5s;
        }
        .progress {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          background: #ffb400;
          height: 0;
          transition: height .3s ease-out;
        }
      }
      .bet-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        padding-left: 170px;
        font-size: 28px;
        color: #fff;
        .bet-title {
          font-size: 32px;
          & + ul {
            width: 320px;
          }
        }
        .list-complete-item {
          display: inline-block;
          margin-right: 6px;
          height: 30px;
          line-height: 30px;
          transition: all .5s;
          font-size: 24px;
          color: rgba(255, 255, 255, .9);
          &:not(:last-child):after {
            content: @split;
            position: relative;
            display: inline-flex;
            align-items: center;
          }
        }
        .list-complete-enter, .list-complete-leave-to {
          opacity: 0;
          transform: translateY(30px);
        }
        .list-complete-leave-active {
          position: absolute;
        }
      }
      .checkout {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 200px;
        flex: 0 0 200px;
        height: 100px;
        padding: 0 20px;
        background: #ffb400;
        color: #333;
        font-size: 30px;
        &.disabled {
          background: #333;
          color: #999;
          font-size: 24px;
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
