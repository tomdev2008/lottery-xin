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
              <open-num :num="num" :animation="animation" :size="size" :color="num.color" :gameType="currentPlay.type"></open-num>
            </template>
          </div>
          <div class="his-wrapper" v-click-outside="closeHis" v-if="hisFlag">
            <dl class="his-list" v-if="hisList.length">
              <dt class="his-title">
                <span class="qihao">期号</span>
                <span class="result">开奖号码</span>
                <span class="time" v-if="$route.name !== 'PK10'">开奖时间</span>
              </dt>
              <dd class="his-item" v-for="(item,index) in hisList">
                <span class="qihao">{{item.number}}<br/><template
                  v-if="$route.name == 'PK10'">{{item.kjTime}}</template></span>
                <span class="result">
                  <template v-for="num in item.data">
                    <open-num :num="num" :size="size"></open-num>
                  </template>
                </span>
                <span class="time" v-if="$route.name !== 'PK10'">{{item.kjTime}}</span>
              </dd>
            </dl>
          </div>
        </div>
        <div class="lottery-half lottery-next">
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
    <ellipsis ref="gameTip" :value="gameTip" v-if="gameTip"></ellipsis>

    <div class="selectNumber">
      selectedXNums:{{selectedXNums}}----注数{{count}}
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

    <transition name="fade" v-if="!lottery">
      <loading></loading>
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
              <span>{{item.title}}</span>
              <span>{{item.content}}</span>
              <span>{{item.count}}</span>
              <span class="price">{{item.amount * beishu}}</span>
              <span class="edit" @click="delectOne(item,index)"><svg-icon iconClass="remove"></svg-icon></span>
            </div>
          </transition-group>
        </div>
      </transition>
      <div class="bet-content" @click="listShow = !listShow">
        <div class="bet-title">
          {{betDesc}}
          <input type="number" minlength="1" maxlength="4" v-model="beishu" @click.stop>
        </div>
      </div>
      <div :class="checkCls" @click="checkout">
        {{checkDesc}}
        <div class="progress" ref="progress"></div>
      </div>
    </footer>
    <shortcut ref="shortcut" @selectMenu="selectMenu" @afterDrop="addPreviewBet" :numbers="xNumbers"></shortcut>
  </div>
</template>

<script>
  import {sscTpl, syx5Tpl, pk10Tpl, pcddTpl, pl3Tpl} from 'mock/template';


  import axios from 'axios';
  import {ssc} from 'common/js/calculate';
  import mixin from 'common/js/mixins/lotteryMixin';
  import XNumberList from 'base/x-number-list/index';
  import Shortcut from 'base/shortcut/index';


  export default {
    name: "SSC",
    mixins: [mixin],
    components: {
      XNumberList, Shortcut
    },
    data() {
      return {
        xNumbers: [],
        previewBetArr: [],
        listShow: false,
      }
    },
    computed: {
      size() {
        return this.$route.name == 'PK10' ? 'small' : '';
      }
    },
    watch: {
      Xlist(newVal) {
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
    beforeDestroy(){
      clearTimeout(this.getDataTimer)
    },
    methods: {
      checkout() {
        console.log(this.previewBetArr)
      },
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
        console.log(this.previewBetArr, this.xNumbers)
      },
      addBasket(el, obj, numbers, canDrop) {
        //console.log(numbers)  //obj索引
        this.xNumbers = numbers;
        if (canDrop) {
          let ballRect = document.getElementsByClassName('shortcut')[0].getElementsByClassName('current')[0].getBoundingClientRect()
          this.$refs.shortcut._drop(el.target, obj, ballRect)
        } else {
          this.$refs.shortcut._calcCount(this.xNumbers)
        }
      },
      selectMenu(index) {
        let gameTipHeight = this.$refs.gameTip ? this.$refs.gameTip.$el.clientHeight : 0;
        this.$refs.shortcut._scrollTo(gameTipHeight)
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
        }else if (this.$route.name == 'PCDD') {
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
        axios.get('/portal/index/getLotteryInfo', {
          params: {
            type: this.$route.params.id,
            lott_id: lottery.actionNo,
          }
        }).then(resp => {
          if (resp.data.code == 1) {
            setTimeout(() => {
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
            item.data = item.data.split(',')
          })
        })
      },
      getGameTip(playId) {
        axios.get('/index/playExplain', {
          params: {
            playId
          }
        }).then(res => {
          if (res.data) {
            this.gameTip = res.data.simpleInfo;
          }
        })
      },
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
              border-top: 1px solid #c3bba2;
              font-size: 28px;
              .his-title, .his-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px;
                span {
                  display: flex;
                  justify-content: center;
                  &.qihao {
                    width: 250px;
                    flex: 0 0 250px;
                    justify-content: start;
                  }
                  &.result {
                    flex: 0 0 auto;
                    justify-content: start;
                  }
                  &.time {
                    width: 180px;
                    flex: 0 0 180px;
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
            .svg-icon{
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
  .footer-tab{
    display: flex;
    align-items: center;
    .tab-item{
      flex: 1;
    }
  }
</style>
