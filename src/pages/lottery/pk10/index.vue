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
              <open-num :num="num" :animation="animation" size="small"></open-num>
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
                    <open-num :num="num" size="small"></open-num>
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
      <x-number-list gameType="pk10" :numbers="xNumbers" @add="addBasket"></x-number-list>
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
      lotteryCls() {
        let cls = 'lottery-con ';
        if (this.$route.name == 'PK10') {
          cls += 'pk10';
        }
        return cls;
      },
      size() {
        return this.$route.name == 'PK10' ? 'small' : '';
      },
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
    beforeRouteLeave(from, to, next) {
      next()
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
      addBasket(el, obj, numbers, canDrop) {
        //console.log(numbers)  //obj索引
        this.xNumbers = numbers;
        if (canDrop) {
          let ballRect = document.getElementsByClassName('shortcut')[0].getElementsByClassName('current')[0].getBoundingClientRect()
          this.$refs.shortcut._drop(el.target, obj, ballRect)
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
            setTimeout(() => {
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
