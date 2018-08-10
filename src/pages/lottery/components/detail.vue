<template>
  <div class="detail">
    <l-header @back="close">
      投注记录
      <svg-icon iconClass="edit" slot="right"></svg-icon>
    </l-header>
    <div class="detailWrapper">
      <scroll ref="scrollList"
              :data="data"
              :scrollbar="false"
              :pullDownRefresh="pullDownRefresh"
              :probeType="3"
              :click="true"
              @pullingDown="onPullingDown">
        <div style="min-height: 100vh;">
          <transition-group
            apear
            name="list"
            tag="ul"
            @beforeEnter="beforeEnter"
            @enter="enter"
          >
            <li v-for="(item, index) in data" class="js-hook-item" :key="item._id" :data-index="index" data-type="0"
                @click="skip(index)">
              <div class="content" @touchstart.capture="touchStart" @touchend.capture="touchEnd">
                <div class="left">
                  <div class="gameName"><span>{{item.gameName}}</span> - <span>{{item.playType}}</span></div>
                  <div class="actionData"><span v-if="item.subPlayType">{{item.subPlayType}} - </span>{{item.actionData}}
                  </div>
                </div>
                <div class="right">
                  <div class="actionNo">第{{item.actionNo}}期</div>
                  <div class="status">未开奖</div>
                </div>
              </div>
              <div class="action" :data-index="index" @click="delectOne(item._id, index)">撤单</div>
            </li>
          </transition-group>
        </div>
        <div v-show="data.length == 0" style="min-height: 100vh;" class="noResult">
          <no-result></no-result>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
  import {getBet, delBet, searchBet,} from 'api/bet.js'
  import Swiper from 'base/swiper/index'
  import LHeader from 'base/l-header/index'
  import noResult from 'base/no-result/index'
  import Scroll from './../../../base/pullRefresh/index'

  export default {
    name: "detail",
    data() {
      return {
        loading: false,
        pullDownRefresh: true,
        data: [],
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
      }
    },
    mounted() {
      this._searchBet()
    },
    components: {Scroll, LHeader, Swiper, noResult,},
    methods: {
      beforeEnter(el) {
        el.style.opacity = 0;
      },
      enter(el, done) {
        let iDelay = el.dataset.index * 70;
        setTimeout(function () {
          Velocity(el, {opacity: 1}, {complete: done})
        }, iDelay)
        done()
      },
      leave(el, done) {
        var delay = el.dataset.index * 1000
        setTimeout(function () {
          Velocity(
            el,
            {height: 0},
            {complete: done}
          )
        }, delay)
      },
      touchStart(e) {
        this.startX = e.touches[0].clientX;
        this.startY = e.touches[0].clientY;
        this.restSlide()
      },
      touchEnd(e) {
        let parentElement = e.currentTarget.parentElement;
        this.endX = e.changedTouches[0].clientX;
        this.endY = e.changedTouches[0].clientY;
        const p1 = {x: this.startX, y: this.startY}
        const p2 = {x: this.endX, y: this.endY}
        //console.log(this.getAngle(p1, p2))
        if ((this.getAngle(p1, p2) >= 90 && this.getAngle(p1, p2) <= 160) || (this.getAngle(p1, p2) >= -160 && this.getAngle(p1, p2) <= -90)) return
        if (parentElement.dataset.type == 0 && this.startX - this.endX > 30) {
          //this.restSlide();
          parentElement.dataset.type = 1;
        }
        if (parentElement.dataset.type == 1 && this.startX - this.endX < -30) {
          //this.restSlide();
          parentElement.dataset.type = 0;
        }
        this.startX = 0;
        this.startY = 0;
        this.endX = 0;
        this.endY = 0;
      },
      getAngle(p1, p2) {
        var r = Math.atan2(p2.y - p1.y, p2.x - p1.x);
        var a = r * 180 / Math.PI;
        return a;
      },
      skip(e) {
        console.log(this.checkSlide())
        if (this.checkSlide()) {
          this.restSlide();
        } else {
          this.$toast('todo')
        }
      },
      delectOne(id, index) {
        delBet(id).then(res => {
          if (res.code == 200) {
            this.$toast(res.message)
            this.data.splice(index, 1)
          }
        })
      },
      refresh() {
        this.$nextTick(() => {
          this.$refs.scrollList.refresh();
        })
      },
      close() {
        this.$emit('close', false)
      },
      onPullingDown() {
        this._searchBet()
      },
      checkSlide(e) {
        let listItems = document.querySelectorAll('.js-hook-item');
        var status = false
        for (let i = 0; i < listItems.length; i++) {
          if (listItems[i].dataset.type == 1) {
            status = true;
          }
        }
        return status;
      },
      restSlide() {
        let listItems = document.querySelectorAll('.js-hook-item');
        for (let i = 0; i < listItems.length; i++) {
          listItems[i].dataset.type = 0;
        }
      },
      _searchBet() {
        const username = this.$store.getters.user;
        const gameName = this.$store.getters.currentLottery.actionName;
        this.$store.commit('SET_AJAX_LOADING', true)
        searchBet({username, gameName}).then(res => {
          this.data = res.data;
        })
      },
    },
  }
</script>

<style lang="less" scoped>
  .detail {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 200;
    overflow: hidden;
    background: #fff;
    .detailWrapper {
      position: fixed;
      left: 0;
      right: 0;
      top: 100px;
      bottom: 0;
      z-index: 201;
      overflow: hidden;
      .noResult {
        height: 100%;
        display: flex;
        justify-content: center;
      }
      ul {
        li {
          position: relative;
          height: 110px;
          transition: all 0.2s;
          &[data-type="0"] {
            transform: translate3d(0, 0, 0);
          }
          &[data-type="1"] {
            transform: translate3d(-200px, 0, 0);
          }
          &.listLeave {
            height: 0;
            transition: height 1s;
          }
          &.list-enter-active, &.list-leave-active {
            transition: all .2s;
          }
          &.list-enter, &.list-leave-to {
            height: 0;
          }
          .content {
            display: flex;
            background: #fff;
            height: 80px;
            padding: 15px 30px;
            border-bottom: 1px solid #f3f5f7;
            box-sizing: content-box;
            .left {
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .gameName {
                color: #333;
                span {
                  color: #333;
                }
              }
              .actionData {
                color: #666;
                font-size: 25px;
              }
            }
            .right {
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              text-align: right;
              .actionNo {
                font-size: 24px;
              }
              .status {

              }
            }
          }
          .action {
            position: absolute;
            top: 0;
            right: -200px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 200px;
            height: 100%;
            background: #ec0022;
            background: linear-gradient(90deg, #ff3737, #ec0022);
            color: #fff;
            font-size: 32px;
          }
        }
      }
    }
  }
</style>
