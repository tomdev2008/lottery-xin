<template>
  <div :class="$style.detail">
    <l-header @back="close">投注记录</l-header>
    <div :class="$style.detailWrapper">
      <scroll ref="scrollList"
              :data="data"
              :scrollbar="false"
              :pullDownRefresh="pullDownRefresh"
              :probeType="3"
              @pullingDown="onPullingDown">
        <div>
          <ul style="min-height: 100vh">
            <li v-for="item in data" @click="close">
              <div :class="$style.left">
                <div :class="$style.gameName"><span>{{item.gameName}}</span> - <span>{{item.playType}}</span></div>
                <div :class="$style.actionData"><span v-if="item.subPlayType">{{item.subPlayType}} - </span>{{item.actionData}}</div>
              </div>
              <div :class="$style.right">
                <div :class="$style.actionNo">第{{item.actionNo}}期</div>
                <div :class="$style.status">未开奖</div>
              </div>
            </li>
          </ul>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
  import {getBet} from 'api/bet.js'
  import Swiper from 'base/swiper/index'
  import LHeader from 'base/l-header/index'
  import Scroll from './../../../base/pullRefresh/index'


  export default {
    name: "detail",
    data() {
      return {
        loading: false,
        pullDownRefresh: true,
        data: [],
      }
    },
    watch: {},
    mounted() {
      getBet().then(res => {
        if (res.code == 200) {
          this.data = res.data
          //this.$refs.scrollList.refresh();
        }
      })
    },
    components: {Scroll, LHeader, Swiper,},
    methods: {
      refresh() {
        this.$nextTick(() => {
          this.$refs.scrollList.refresh();
        })
      },
      close() {
        this.$emit('close', false)
      },
      onPullingDown() {
        this.loading = true
        setTimeout(() => {
          this.loading = false;
          for (let i = 0; i <= 10; i++) {
            this.data.unshift(i)
          }
        }, 3000)
      },
    },
  }
</script>

<style lang="less" module>
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
    }
    li {
      padding: 30px;
      display: flex;
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
        .actionData{
          margin-top: 20px;
          color: #666;
          font-size: 25px;
        }
      }
      .right{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: right;
        .actionNo{
          font-size: 24px;
        }
      }
    }
  }
</style>
