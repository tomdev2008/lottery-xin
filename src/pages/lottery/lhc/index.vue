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
            <table class="his-list" v-if="hisList.length">
              <tr>
                <th class="qihao">期号</th>
                <th class="result">开奖号码</th>
                <th class="result">开奖时间</th>
              </tr>
              <tr v-for="(item,index) in hisList">
                <td class="qihao">{{item.number}}</td>
                <td class="result">
                  <template v-for="num in item.data">
                    <open-num
                      style="display: inline-block"
                      :num="num.num"
                      :color="num.color"
                      :ani="num.ani"
                      size="small">
                    </open-num>
                  </template>
                </td>
                <td>{{item.kjTime}}</td>
              </tr>
            </table>
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
    <!--<ellipsis ref="gameTip" :value="gameTip" v-if="gameTip"></ellipsis>-->
    <div class="selectNumber">
      <div>Xlist:{{Xlist}}---count:{{count}}</div>
      <x-number-list :numbers="xNumbers" :gameType="currentPlay.type" @add="addBasket"></x-number-list>
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
    <footer class="lottery-footer credit" v-if="playType == 1">
      <transition name="slideTop">
        <div class="preview-wrapper" v-show="previewBetArr.length && listShow">
          <div class="title">
            <strong v-if="lottery">{{lottery.actionName}}</strong>
            <span @click="delectAll">清空</span>
          </div>
          <div class="item">
            <span class="qihao">期号</span>
            <span>玩法</span>
            <span>投注内容</span>
            <span>注数</span>
            <span class="price">金额 <strong class="total">{{totalPrice}}元</strong></span>
            <span class="edit"></span>
          </div>
          <transition-group name="list" tag="div">
            <div v-for="(item,index) in previewBetArr" :key="index" class="item">
              <span class="qihao">{{item.actionNo}}</span>
              <span>{{item.playType}}</span>
              <span>{{item.actionData}}</span>
              <span>{{item.actionNum}}</span>
              <span class="price">{{item.actionNum * beishu}}</span>
              <span class="edit" @click="delectOne(item,index)"><svg-icon iconClass="remove"></svg-icon></span>
            </div>
          </transition-group>
        </div>
      </transition>
      <div class="bet-content" @click="listShow = !listShow">
        <div class="bet-title">
          {{betDesc}}
        </div>
      </div>
      <div :class="checkCls" @click="checkout">
        {{checkDesc}}
        <div class="progress" ref="progress"></div>
      </div>
    </footer>
    <shortcut ref="shortcut" @selectMenu="selectMenu" @afterDrop="addPreviewBet" :numbers="xNumbers"
              v-if="playType == 1"></shortcut>
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
      {num: '大', odds: '1.980'}, {num: '小', odds: '1.980'}, {num: '单', odds: '1.980'}, {num: '双', odds: '1.980'},
      {num: '大单', odds: '3.960'}, {num: '大双', odds: '3.960'}, {num: '小单', odds: '3.960'}, {num: '小双', odds: '3.960'},
      {num: '合大', odds: '1.980'}, {num: '合小', odds: '1.980'}, {num: '合单', odds: '1.980'}, {num: '合双', odds: '1.980'},
      {num: '尾大', odds: '1.980'}, {num: '尾小', odds: '1.980'}, {num: '家禽', odds: '1.901'}, {num: '野兽', odds: '1.980'},
      {num: '红波', odds: '2.795'}, {num: '绿波', odds: '2.970'}, {num: '蓝波', odds: '2.970'}];
  };
  let bsList1 = () => {
    return [
      {num: '红波', odds: '2.970'}, {num: '绿波', odds: '2.970'}, {num: '蓝波', odds: '2.970'},
    ];
  };
  let bsList2 = () => {
    return [
      {num: '红大', odds: '1.960'}, {num: '绿大', odds: '1.960'}, {num: '蓝大', odds: '1.960'},
      {num: '红小', odds: '1.960'}, {num: '绿小', odds: '1.960'}, {num: '蓝小', odds: '1.960'},
      {num: '红单', odds: '1.960'}, {num: '绿单', odds: '1.960'}, {num: '蓝单', odds: '1.960'},
      {num: '红双', odds: '1.980'}, {num: '绿双', odds: '1.980'}, {num: '蓝双', odds: '1.980'},
    ];
  };
  let bsList3 = () => {
    return [
      {num: '红大单', odds: '1.980'}, {num: '绿大单', odds: '1.980'}, {num: '蓝大单', odds: '1.901'},
      {num: '红大双', odds: '1.980'}, {num: '绿大双', odds: '2.795'}, {num: '蓝大双', odds: '2.970'},
      {num: '红小单', odds: '2.970'}, {num: '绿小单', odds: '2.970'}, {num: '蓝小单', odds: '2.970'},
      {num: '红小双', odds: '2.970'}, {num: '绿小双', odds: '2.970'}, {num: '蓝小双', odds: '2.970'},
    ];
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
  let touList = () => {
    return [{num: '0头', odds: '5.107'}, {num: '1头', odds: '5.107'}, {num: '2头', odds: '5.107'}, {
      num: '3头',
      odds: '5.107'
    }, {num: '4头', odds: '5.107'}];
  };
  let weiList = () => {
    return [{num: '0尾', odds: '5.107'}, {num: '1尾', odds: '5.107'}, {num: '2尾', odds: '5.107'}, {
      num: '3尾',
      odds: '5.107'
    },
      {num: '4尾', odds: '5.107'}, {num: '5尾', odds: '5.107'}, {num: '6尾', odds: '5.107'}, {num: '7尾', odds: '5.107'},
      {num: '8尾', odds: '5.107'}, {num: '9尾', odds: '5.107'}];
  };
  let zongXList1 = () => {
    return [
      {num: '2肖', odds: '14.107'}, {num: '3肖', odds: '14.107'}, {num: '4肖', odds: '14.107'}, {
        num: '5肖',
        odds: '14.107'
      },
      {num: '6肖', odds: '14.107'}, {num: '7肖', odds: '14.107'}
    ]
  };
  let zongXList2 = () => {
    return [
      {num: '总肖单', odds: '1.941'}, {num: '总肖双', odds: '1.812'}
    ]
  };
  let xiaoList = () => {
    return [{num: '鼠', egs: [11, 23, 35, 47], odds: '5.107'}, {num: '牛', egs: [12, 24, 36, 48], odds: '5.107'}, {
      num: '虎', egs: [9, 21, 23, 45], odds: '5.107'
    }, {num: '兔', egs: [8, 20, 32, 44], odds: '5.107'}, {
      num: '龙',
      egs: [7, 19, 31, 43], odds: '5.107'
    }, {num: '蛇', egs: [6, 18, 30, 42], odds: '5.107'}, {num: '马', egs: [5, 17, 29, 41], odds: '5.107'}, {
      num: '羊',
      egs: [4, 16, 26, 40],
      odds: '5.107'
    }, {
      num: '猴',
      egs: [3, 15, 27, 39], odds: '5.107'
    }, {num: '鸡', egs: [2, 14, 26, 38], odds: '5.107'}, {num: '狗', egs: [1, 13, 25, 37], odds: '5.107'}, {
      num: '猪',
      egs: [12, 24, 36, 48],
      odds: '5.107'
    }];
  };
  let balls = () => {
    return [{show: false}, {show: false}, {show: false}, {show: false}, {show: false}]
  }
  let wxList = () => {
    return [
      {num: '金', egs: [2, 3, 16, 17, 24, 25, 32, 33, 46, 47], odds: '5.107'},
      {num: '木', egs: [6, 7, 14, 15, 28, 29, 36, 37, 44, 45], odds: '5.107'},
      {num: '水', egs: [4, 5, 12, 13, 20, 21, 34, 35, 42, 43], odds: '5.107'},
      {num: '火', egs: [1, 8, 9, 22, 23, 30, 31, 38, 39], odds: '5.107'},
      {num: '土', egs: [10, 11, 18, 19, 26, 27, 40, 41, 48, 49], odds: '5.107'},
    ]
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
  import {lhc} from 'common/js/calculate';
  import mixin from 'common/js/mixins/lotteryMixin';
  import XNumberList from 'base/x-number-list/index';
  import Shortcut from 'base/shortcut/index';
  import {addBet} from 'api/bet.js'

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

        xNumbers: [],
        previewBetArr: [],
        listShow: false,
      }
    },
    components: {
      XNumberList, Shortcut,
    },
    watch: {
      Xlist(newVal) {
        //console.log('newVal', newVal)
        let action = this.currentPlay.action;
        let length = this.currentPlay.length;
        try {
          let result = lhc[action](newVal, length);
          this.count = result.actionNum;
          console.log('result',result)
        } catch (e) {
          this.count = 0;
        }
      },
    },
    computed: {
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
    methods: {
      delectOne(item, previewIndex) {
        let i = item.i;
        let index = item.index;
        this.previewBetArr.splice(previewIndex, 1);
        this.$set(this.xNumbers[index].numList[i], 'selected', false);
        this.xNumbers[index].count--;
      },
      delectAll() {
        this.xNumbers = this.copyNumbers;
        this.previewBetArr = [];
      },
      closeBetInfo(e) {
        this.listShow = false;
      },
      addPreviewBet(selectedArr, numbers) {
        this.previewBetArr = selectedArr;
        this.xNumbers = numbers;
        this.listShow = true;
        //console.log(this.previewBetArr, this.xNumbers,)
      },
      addBasket(el, obj, numbers, canDrop, color) {
        console.log(color)
        this.ballColor = color ? color : '';
        //console.log(numbers)  //obj索引
        this.xNumbers = numbers;
        if (canDrop) {
          let ballRect = document.getElementsByClassName('shortcut')[0].getElementsByClassName('current')[0].getBoundingClientRect()
          this.$refs.shortcut._drop(el.target, obj, ballRect, this.ballColorCom)
        } else {
          this.$refs.shortcut._calcCount(this.xNumbers)
        }
        //this.setCheckoutHeight()
      },
      selectMenu(index) {
        let gameTipHeight = this.$refs.gameTip ? this.$refs.gameTip.$el.clientHeight : 0;
        this.$refs.shortcut._scrollTo(gameTipHeight)
      },
      setTpl(playName) {
        switch (playName) {
          case '正码特':
            this.xNumbers = [
              {title: '正一码', numList: numList(), balls: balls()},
              {title: '正二码', numList: numList(), balls: balls()},
              {title: '正三码', numList: numList(), balls: balls()},
              {title: '正四码', numList: numList(), balls: balls()},
              {title: '正五码', numList: numList(), balls: balls()},
              {title: '正六码', numList: numList(), balls: balls()},
              {title: '特码', numList: numList(), balls: balls()},
            ];
            this.copyNumbers = JSON.parse(JSON.stringify(this.xNumbers))
            break;
          case '两面':
            this.xNumbers = [
              {title: '正一', numList: lmList(), balls: balls()},
              {title: '正二', numList: lmList(), balls: balls()},
              {title: '正三', numList: lmList(), balls: balls()},
              {title: '正四', numList: lmList(), balls: balls()},
              {title: '正五', numList: lmList(), balls: balls()},
              {title: '正六', numList: lmList(), balls: balls()},
              {title: '特码', numList: lmList(), balls: balls()}
            ];
            this.copyNumbers = JSON.parse(JSON.stringify(this.xNumbers))
            break;
          case '特肖头尾':
            this.xNumbers = [
              {title: '生肖', numList: lmList(), balls: balls()},
              {title: '头号', numList: lmList(), balls: balls()},
              {title: '尾号', numList: lmList(), balls: balls()},
            ];
            this.copyNumbers = JSON.parse(JSON.stringify(this.xNumbers))
            break;
          case '平特肖尾':
            this.xNumbers = [
              {title: '生肖', numList: xiaoList(), balls: balls()},
              {title: '尾号', numList: weiList(), balls: balls()},
            ];
            this.copyNumbers = JSON.parse(JSON.stringify(this.xNumbers))
            break;
          case '波色':
            this.xNumbers = [
              {title: '三色波', numList: bsList1(), balls: balls()},
              {title: '半波', numList: bsList2(), balls: balls()},
              {title: '半半波', numList: bsList3(), balls: balls()},
            ];
            this.copyNumbers = JSON.parse(JSON.stringify(this.xNumbers))
            break;
          case '总肖':
            this.xNumbers = [
              {title: '总肖数', numList: zongXList1(), balls: balls()},
              {title: '单双', numList: zongXList2(), balls: balls()},
            ];
            this.copyNumbers = JSON.parse(JSON.stringify(this.xNumbers))
            break;
          case '五行':
            this.xNumbers = [
              {title: '五行', numList: wxList(), balls: balls()},
            ];
            this.copyNumbers = JSON.parse(JSON.stringify(this.xNumbers))
            break;
          case '连肖':
            this.xNumbers = [
              {title: '二肖连', numList: xiaoList(), balls: balls(), length: 6},
              {title: '三肖连', numList: xiaoList(), balls: balls(), length: 6},
              {title: '四肖连', numList: xiaoList(), balls: balls(), length: 6},
              {title: '五肖连', numList: xiaoList(), balls: balls(), length: 6},
            ];
            this.copyNumbers = JSON.parse(JSON.stringify(this.xNumbers))
            break;
          case '连尾':
            this.xNumbers = [
              {title: '二尾碰', numList: weiList(), balls: balls(), length: 6},
              {title: '三尾碰', numList: weiList(), balls: balls(), length: 6},
              {title: '四尾碰', numList: weiList(), balls: balls(), length: 6},
              {title: '五尾碰', numList: weiList(), balls: balls(), length: 6},
            ];
            this.copyNumbers = JSON.parse(JSON.stringify(this.xNumbers))
            break;
          case '连码':
            this.xNumbers = [
              {title: '四全中', numList: numList(), balls: balls(), length: 10},
              {title: '三全中', numList: numList(), balls: balls(), length: 10},
              {title: '三中二', numList: numList(), balls: balls(), length: 10},
              {title: '二中二', numList: numList(), balls: balls(), length: 10},
              {title: '二中特', numList: numList(), balls: balls(), length: 10},
              {title: '特串', numList: numList(), balls: balls()},
            ];
            this.copyNumbers = JSON.parse(JSON.stringify(this.xNumbers))
            break;
          case '自选不中':
            this.xNumbers = [
              {title: '五不中', numList: numList(), balls: balls(), length: 5},
              {title: '六不中', numList: numList(), balls: balls(), length: 6},
              {title: '七不中', numList: numList(), balls: balls(), length: 7},
              {title: '八不中', numList: numList(), balls: balls(), length: 8},
              {title: '九不中', numList: numList(), balls: balls(), length: 9},
              {title: '十不中', numList: numList(), balls: balls(), length: 10},
              {title: '十一不中', numList: numList(), balls: balls(), length: 11},
              {title: '十二不中', numList: numList(), balls: balls(), length: 12},
            ];
            this.copyNumbers = JSON.parse(JSON.stringify(this.xNumbers))
            break;
        }
        //获取玩法提示
        this.getGameTip(this.currentPlay.id)
      },
      getRelData(lottery) {
        axios.get('/index/getLotteryInfo', {
          params: {
            type: this.$route.params.id,
            lott_id: lottery.actionNo,
          }
        }).then(resp => {
          if (resp.data.code == 1) {
            //console.log(resp.data.data)

            resp.data.data.data = this.normalLhcList(resp.data.data.data)
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
            item.data = this.normalLhcList(item.data);
          })
        })
      },
      getGameTip(playId) {
        axios.get('/mock/play').then(res => {
          this.gameTip = res.data.data;
          /*this.gameTip = res.data.data.find(item => {
            return item.id == this.currentPlay.id
          }).tip || ''*/
        })
      },

      checkout() {
        //console.log(this.previewBetArr)
        if (!this.count) return;
        addBet(this.previewBetArr).then(res => {
          if (res.code == 200) {
            this.$toast(`${res.message}`)
          }
        })
      },
    },
  }
</script>

<style lang="less" scoped>
  @keyframes bounce-in {
    0% {
      transform: translate3d(0, 0%, 0)
    }
    100% {
      transform: translate3d(0, -100%, 0)
    }
  }

  @keyframes bounce-out {
    0% {
      transform: translate3d(0, -100%, 0)
    }
    100% {
      transform: translate3d(0, 0, 0)
    }
  }

  .bounce-enter-active {
    animation: bounce-in .3s;
  }

  .bounce-leave-active {
    animation: bounce-out .3s;
  }

  .lottery_lhc {
    min-height: 100%;
    padding-top: 250px !important;
    background: #f5f1e4;
    .lottery-con {
      position: fixed;
      top: 100px;
      left: 0;
      z-index: 12;
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
              width: 100%;
              border-top: 1px solid #c3bba2;
              font-size: 26px;
              tr {
                td,th {
                  padding: 10px 0;
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
        max-width: 100%;
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
      z-index: 12;
      background: #575858;
      width: 100%;
      display: flex;
      &.credit {
        .bet-content {
          padding-left: 30px;
        }
      }
      .bet-content {
        position: relative;
        z-index: 1;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        padding-left: 170px;
        font-size: 28px;
        background: #575858;
        color: #fff;
        .bet-title {
          font-size: 32px;
        }
      }
      .preview-wrapper {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 100px;
        max-height: 476px;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        background: #fff;
        color: #333;
        z-index: -1;
        .title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 56px;
          padding: 0 30px;
          background: #f3f5f9;
          font-size: 24px;
        }
        strong {
          font-weight: 600;
        }
        .svg-icon {
          font-size: 40px;
          color: #ff444a;
        }
        .item {
          display: flex;
          width: 100%;
          padding: 0 30px;
          height: 70px;
          line-height: 70px;
          border-top: 1px solid #eee;
          font-size: 24px;
          span {
            flex: 1;
            &.edit {
              flex: 0 0 40px;
            }
            &.qihao {
              flex: 0 0 200px;
            }
          }
          &.list-enter-active, &.list-leave-active {
            transition: height 0.2s
          }
          &.list-enter, &.list-leave-to {
            height: 0;
            font-size: 0;
            .svg-icon {
              font-size: 0;
            }
          }
        }
      }
      .checkout {
        position: relative;
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
        .progress {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: -1;
          background: #ffb400;
          transition: all .3s;
        }
      }
      .bet-info {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 100px;
        z-index: -1;
        background: #fff;
        .list2 {
          .item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
            border-top: 1px solid #ddd;
          }
        }
      }
    }
  }

  .footer-tab {
    display: flex;
    align-items: center;
    .tab-item {
      flex: 1;
    }
  }
</style>
