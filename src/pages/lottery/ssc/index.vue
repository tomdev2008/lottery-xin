<template>
  <div class="lottery_ssc">
    <div class="lottery-con">
      <template v-if="lottery">
        <div class="lottery-half lottery-prev" @click="hisFlag = true">
          <div class="title">
            <span>{{lottery.actionName}}</span>
            <span>{{lottery.actionNo}}</span>期开奖号码
            <svg-icon iconClass="more"></svg-icon>
          </div>
          <div class="bottom">
            <template v-for="num in lottery.data">
              <open-num :num="num.num" :animation="animation" :size="size" :color="num.color"></open-num>
            </template>
          </div>
          <div class="his-wrapper" v-click-outside="closeHis" v-if="hisFlag">
            <table class="his-list" v-if="hisList.length">
              <tr class="his-title">
                <td class="qihao">期号</td>
                <td class="result">开奖号码</td>
                <td>开奖时间</td>
              </tr>
              <tr v-for="(item,index) in hisList">
                <td class="qihao">{{item.number}}</td>
                <td class="result">
                  <template v-for="num in item.data">
                    <open-num style="display: inline-block;" :num="num.num" :color="num.color" :size="size"></open-num>
                  </template>
                </td>
                <td class="time">{{item.kjTime}}</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="lottery-half lottery-next" @click="showDetail">
          <div class="title">
            <span>{{lottery.thisNo}} 期投注截止</span>
          </div>
          <div class="bottom">
            <div class="countdown">
              <clocker v-model="lottery.diffTime" :start="startFlag" @end="countEnd"></clocker>
            </div>
          </div>
        </div>
      </template>
      <img src="../../../assets/placeholder.png" height="100%" class="placeholder" v-else>
    </div>

    <div class="selectNumber">
      selectedXNums:{{selectedXNums}}----selectedLen:{{selectedLen}}----注数{{count}}
      <x-number-list :numbers="xNumbers" :gameType="currentPlay.type" @add="addBasket"></x-number-list>
    </div>



    <section v-transfer-dom>
      <confirm ref="confirm" title="温馨提示" v-if="lottery">
        <p>{{lottery.actionNo}}期已截止</p>
        <p>当前期号<span class="red">{{lottery.thisNo}}</span></p>
        <p>投注时请注意期号</p>
        <div class="footer-tab" slot="footer">
          <div class="tab-item" @click="noTip">不再提示</div>
          <div class="tab-item" @click="closeTip">确定</div>
        </div>
      </confirm>
    </section>

    <transition name="leftIn">
      <detail v-if="visible" @close="visible = false"></detail>
    </transition>

    <footer class="lottery-footer">
      <transition name="slideTop">
        <div class="preview-wrapper" v-show="previewBetArr.length && listShow">
          <div class="title">
            <strong v-if="lottery">{{lottery.actionName}}</strong>
            <span @click="delectAll">清空</span>
          </div>
          <div class="item sticky">
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
        <div class="bet-title" @click.stop>
          <!--{{betDesc}}-->
          <input type="tel" placeholder="每注金额" minlength="1" maxlength="5" v-model="beishu" @focus="listShow = false">
        </div>
      </div>
      <div :class="checkCls" @click="checkout">
        {{checkDesc}}
        <div class="progress" ref="progress"></div>
      </div>
    </footer>
    <shortcut ref="shortcut" @selectMenu="selectMenu" @afterDrop="addPreviewBet" :numbers="xNumbers"></shortcut>
    <transition name="fade">
      <loading v-if="!lottery"></loading>
    </transition>
  </div>
</template>

<script>
  import {sscTpl, syx5Tpl, pk10Tpl, pcddTpl, pl3Tpl} from 'mock/template';
  import {addBet} from 'api/bet.js';
  import {checkLogin} from 'api/sign.js';
  import axios from 'axios';
  import {ssc} from 'common/js/calculate';
  import mixin from 'common/js/mixins/lotteryMixin';
  import XNumberList from 'base/x-number-list/index';
  import Shortcut from 'base/shortcut/index';
  import Detail from '../components/detail'
  import {getToken} from "common/js/utils/auth";

  export default {
    name: "SSC",
    mixins: [mixin],
    components: {
      XNumberList, Shortcut, Detail,
    },
    data() {
      return {
        visible: false,
        xNumbers: [],
        previewBetArr: [],
        listShow: false,
        ballColor: '',
      }
    },
    computed: {
      size() {
        return this.$route.name == 'PK10' ? 'small' : '';
      },
      ballColorCom() {
        if (this.ballColor == 'blue') {
          return '#218ddd'
        } else if (this.ballColor == 'green') {
          return '#38b366'
        } else if (this.ballColor == 'yellow') {
          return '#484848'
        } else {
          return '#f86469'
        }
      },
    },
    watch: {
      Xlist(newVal, oldVal) {
        let action = this.currentPlay.action;
        let length = this.currentPlay.length;
        try {
          let result = ssc[action](newVal, length);
          this.count = result.actionNum;
          console.log(result)
        } catch (e) {
          this.count = 0;
        }
      },
    },
    beforeDestroy() {
      clearTimeout(this.getDataTimer)
    },
    methods: {
      checkout() {
        //console.log(this.previewBetArr)
        if (!this.count) return;
        addBet(this.previewBetArr).then(res => {
          if (res.code == 200) {
            this.$toast(`${res.message}`)
            this.delectAll()
          }
        })
      },
      delectOne(item, previewIndex) {
        let i = item.i;
        let index = item.index;
        this.previewBetArr.splice(previewIndex, 1);
        this.$set(this.xNumbers[index].numList[i], 'selected', false);
        this.xNumbers[index].count--;
      },
      delectAll() {
        this.xNumbers = JSON.parse(JSON.stringify(this.copyNumbers))
        console.log(this.xNumbers)
        this.previewBetArr = [];
      },
      closeBetInfo(e) {
        this.listShow = false;
      },
      addPreviewBet(selectedArr, numbers) {
        this.previewBetArr = selectedArr;
        this.xNumbers = numbers;
        this.listShow = true;
        //console.log(this.previewBetArr, this.xNumbers)
      },
      addBasket(el, obj, numbers, canDrop, color) {
        //console.log(numbers)  //obj索引
        this.ballColor = color ? color : 'red';
        this.xNumbers = numbers;
        if (canDrop) {
          let ballRect = document.getElementsByClassName('shortcut')[0].getElementsByClassName('current')[0].getBoundingClientRect()
          this.$refs.shortcut._drop(el.target, obj, ballRect, this.ballColorCom)
        } else {
          this.$refs.shortcut._calcCount(this.xNumbers)
        }
      },
      selectMenu(index) {
        this.$refs.shortcut._scrollTo()
      },
      setTpl(playName) {
        if (this.$route.name == 'SSC') {
          switch (this.playName) {
            case '整合':
              this.xNumbers = sscTpl().sscZH;
              break;
            case '两面盘':
              this.xNumbers = sscTpl().sscLMP;
              break;
          }
        } else if (this.$route.name == 'FC3D' || this.$route.name == 'PL3') {
          switch (this.playName) {
            case '1-3球':
              this.xNumbers = pl3Tpl().pl31_3
              break;
            case '整合':
              this.xNumbers = pl3Tpl().pl3ZH
              break;
          }
        } else if (this.$route.name == 'PK10') {
          switch (this.playName) {
            case '两面盘':
              this.xNumbers = pk10Tpl().pk10LMP;
              break;
            case '冠亚组合':
              this.xNumbers = pk10Tpl().pk10GY;
              break;
            case '1-5球':
              this.xNumbers = pk10Tpl().pk101_5;
              break;
            case '6-10球':
              this.xNumbers = pk10Tpl().pk101_6_10;
              break;
          }
        } else if (this.$route.name == 'SYX5') {
          switch (this.playName) {
            case '两面盘':
              this.xNumbers = syx5Tpl().syx5LMP;
              break;
            case '1-5球':
              this.xNumbers = syx5Tpl().syx51_5;
              break;
            case '任选':
              this.xNumbers = syx5Tpl().syx5RX;
              break;
            case '组选':
              this.xNumbers = syx5Tpl().syx5ZUX;
              break;
            case '直选':
              this.xNumbers = syx5Tpl().syx5ZHIX;
              break;
          }
        } else if (this.$route.name == 'PCDD') {
          switch (this.playName) {
            case '特码':
              this.xNumbers = pcddTpl().pcddTM;
              break;
            case '混合':
              this.xNumbers = pcddTpl().pcddHH;
              break;
            case '波色':
              this.xNumbers = pcddTpl().pcddBS;
              break;
            case '特码包三':
              this.xNumbers = pcddTpl().pcddTMBS;
              break;
            case '豹子':
              this.xNumbers = pcddTpl().pcddBZ;
              break;
          }
        }
        this.copyNumbers = JSON.parse(JSON.stringify(this.xNumbers))
        //获取玩法提示
        this.getGameTip(this.currentPlay.id);
        this.previewBetArr = [];
      },
      getRelData(lottery) {
        axios.get('/index/getLotteryInfo', {
          params: {
            type: this.$route.params.id,
            lott_id: lottery.actionNo,
          }
        }).then(resp => {
          if (resp.data.code == 1) {
            let data = resp.data;
            data.data.data = data.data.data.split(',');//将开奖数据转成数组
            if (this.$route.name == 'PCDD') {
              data.data.data = this.normalPCDDData(data.data.data)
            } else if (this.$route.name == 'PK10') {
              data.data.data = this.normalPK10Data(data.data.data)
            } else {
              let arr = [];
              data.data.data.forEach(item => {
                arr.push({
                  color: '',
                  num: item,
                })
              })
              data.data.data = arr;
            }
            //resp.data.data.data = this.normalLhcList(resp.data.data.data)
            setTimeout(() => {
              this.lottery.data = data.data.data;
              this.animation = false;
            }, 1000)
            this.getHisResult();
          } else {
            this.getDataTimer = setTimeout(() => {
              this.getRelData(lottery)
            }, 5000)
          }
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
            let data = item.data.split(',')
            if (this.$route.name == 'PCDD') {
              item.data = this.normalPCDDData(data)
            } else if (this.$route.name == 'LHC') {
              item.data = this.normalLhcList(data.join(','))
            } else if (this.$route.name == 'PK10') {
              item.data = this.normalPK10Data(data)
            } else {
              let arr = [];
              data.forEach(item => {
                arr.push({
                  color: '',
                  num: item,
                })
              })
              item.data = arr;
            }
          })
        })
      },
      showDetail() {
        if (!getToken()) {
          this.$store.commit('TOGGLE_LOGIN', true)
          return
        }
        this.visible = true;
      }
    },
  }
</script>

<style lang="less" scoped>
  .lottery_ssc {
    background: #f5f1e4;
    .lottery-con {
      position: fixed;
      top: 100px;
      left: 0;
      z-index: 12;
      width: 100%;
      height: 120px;
      display: flex;
      background: #e1d9ba;
      &.pk10 {
        .lottery-half.lottery-prev {
          flex: 1;
          .number {
            width: 36px;
            height: 36px;
            line-height: 36px;
            font-size: 24px;
            margin: 0 2px;
          }
        }
        .lottery-half.lottery-next {
          width: 270px;
          min-width: 35%;
        }
      }
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
              font-size: 28px;
              padding: 0 10px;
              tr {
                td, th {
                  padding: 10px 0;
                  border-top: 1px solid #eeebda;
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
          .countdown {
            font-size: 50px;
          }
        }
        .title {
          height: 40px;
          font-size: 26px;
          margin-top: 10px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .bottom {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 66px;
        }
      }
      .placeholder {
        position: absolute;
        left: 50%;
        top: 50%;
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
      .bet-content {
        position: relative;
        z-index: 1;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        padding-left: 20px;
        font-size: 28px;
        background: #575858;
        color: #fff;
        .bet-title {
          width: 200px;
          font-size: 32px;
          input[type="tel"] {
            -webkit-appearance: none;
            background: none;
            outline: 0;
            border: 0;
            height: 100px;
            width: 100%;
            padding: 0 20px;
            font-size: 32px;
            color: #fff;
            &::-webkit-input-placeholder {
              color: rgba(255, 255, 255, .5);
            }
          }
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
          padding: 0 20px;
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
          align-items: center;
          width: 100%;
          padding: 0 20px;
          height: 70px;
          border-top: 1px solid #eee;
          background: #fff;
          font-size: 24px;
          span {
            flex: 1;
            &.edit {
              flex: 0 0 40px;
            }
            &.qihao {
              flex: 0 0 180px;
            }
            &.price {
              flex: 0 0 160px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              .total {
                color: #d22a39;
              }
            }
          }
          &.list-enter-active, &.list-leave-active {
            transition: height .2s;
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
    .footer-tab {
      height: 100%;
      display: flex;
      .tab-item {
        flex: 1;
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
