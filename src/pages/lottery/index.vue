<template>
  <div class="lottery">
    <header class="lottery-header">
      <div class="header-wrapper">
        <div class="header-left" @click="$router.back()">
          <svg-icon iconClass="back"></svg-icon>
        </div>
        <div class="header-center">
          <div class="title-wrapper" @click="toggleMenu">
            <p>玩法</p>
            <strong class="ellipsis">
              {{currentTitle}}
            </strong>
            <svg-icon iconClass="more"></svg-icon>
          </div>
          <div v-transfer-dom>
            <div class="menu-wrapper" v-show="menuFlag">
              <div class="mask" @click="closeMenu"></div>
              <div style="background: white" v-if="cates.length">
                <div class="menu-k3" v-if="k3Flag">
                  <ul class="menu-k3-list">
                    <li class="menu-k3-item" v-for="(item,index) in cates" @click="selectCate(item)"
                        :class="{'active':currentCateId == item.id}">
                      <h5>{{item.title}}</h5>
                      <p>{{item.odds}}</p>
                      <div class="legend">
                        <k3-dice :num="num" :key="Math.random()" v-for="num in item.legend"></k3-dice>
                      </div>
                    </li>
                  </ul>
                </div>
                <ul class="menu" v-else>
                  <li v-for="(cate,index) in cates" @click="selectCate(cate)"
                      :class="{'active':currentCateId==cate.id}">
                    {{cate.title}}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="header-right" @click="show =! show">
          <svg-icon iconClass="expand"></svg-icon>
        </div>
      </div>
    </header>

    <router-view class="lottery-main" :key="$route.fullpath"></router-view>

    <div v-transfer-dom>
      <pop v-model="show">
        <ul class="menu-list">
          <li class="menu-item" @click="show2 = true;show = false">
            <svg-icon iconClass="similar"></svg-icon>
            <div class="text">相似彩种</div>
          </li>
          <li class="menu-item">
            <svg-icon iconClass="explain"></svg-icon>
            <div class="text">玩法说明</div>
          </li>
          <li class="menu-item">
            <svg-icon iconClass="record"></svg-icon>
            <div class="text">购彩记录</div>
          </li>
        </ul>
      </pop>
    </div>

    <div v-transfer-dom>
      <pop @on-first-show="getRelate(1)" v-model="show2">
        <ul class="relate-wrapper" v-if="relateList.length">
          <router-link tag="li" :to="'/lottery/k3/'+item.id" class="relate-item" :key="item.id"
                       v-for="item in relateList"
                       @click.native="show=false">
            {{item.title}}
            <small>{{item.info}}</small>
          </router-link>
        </ul>
        <div class="loading-wrapper" v-else>
          <is-loading></is-loading>
        </div>
      </pop>
    </div>

  </div>
</template>

<script>
  let cate = [
    {
      "id": "1",
      "type": "9",
      "name": "快三",
      "children": [
        {
          "id": "12",
          "type": "9",
          "name": "北京快三",
          "children": [
            {
              "id": "12",
              "type": "9",
              "name": "北京快三1"
            },
            {
              "id": "13",
              "type": "9",
              "name": "吉林快三2"
            },
            {
              "id": "14",
              "type": "9",
              "name": "广东快三3"
            }
          ]
        },
        {
          "id": "13",
          "type": "9",
          "name": "吉林快三"
        },
        {
          "id": "14",
          "type": "9",
          "name": "广东快三"
        }
      ]
    },
    {
      "id": "2",
      "type": "29",
      "name": "时时彩",
      "children": [
        {
          "id": "22",
          "type": "29",
          "name": "北京时时彩"
        },
        {
          "id": "23",
          "type": "29",
          "name": "吉林时时彩"
        },
        {
          "id": "24",
          "type": "29",
          "name": "广东时时彩"
        }
      ]
    }
  ]
  import k3Dice from 'base/k3-dice/index';
  import Pop from 'base/pop/index.vue';
  import Drawer from 'base/drawer/index';
  import isLoading from 'base/loading/isLoading';
  import {pk10_menu, syx5_menu, k3_menu, ssc_menu, pcdd_menu, lhc_menu, pl3_menu} from 'mock/menu.js'
  import axios from 'axios';
  import {getSimLottery} from 'api/lottery.js';

  export default {
    name: "Lottery",
    data() {
      return {
        cate,
        currentCateId: 1,
        cates: [],
        menuFlag: false,

        diffTime: 3,
        kjdTime: 0,
        isOpening: false,//是否正在开奖

        type: 93,//彩种id
        lottery: null,
        relateList: [],

        currentTitle: '',
        show: false,
        show2: false,
      }
    },
    components: {
      k3Dice, Pop, isLoading, Drawer
    },
    computed: {
      k3Flag() {
        return this.$route.name == 'K3' ? true : false;
      },
    },
    watch: {
      cates(newCates) {
        if (newCates.length) {
          this.currentTitle = newCates[0].title;
        }
      },
    },
    activated() {
      this.setCates(this.$route);
    },
    created() {
      this.setCates(this.$route);
    },
    beforeRouteLeave(from, to, next) {
      this.menuFlag ? this.closeMenu() : '';
      next()
    },
    methods: {
      setCates(newRoute) {
        if (newRoute.name == "PK10") {//pk10
          this.cates = pk10_menu
        } else if (newRoute.name == "SYX5") {//11选5
          this.cates = syx5_menu
        } else if (newRoute.name == "K3") {//快3
          this.cates = k3_menu
        } else if (newRoute.name == "SSC") {//时时彩
          this.cates = ssc_menu
        } else if (newRoute.name == "PCDD") {//时时彩
          this.cates = pcdd_menu
        } else if (newRoute.name == "LHC") {//六合彩
          this.cates = lhc_menu
        } else if (newRoute.name == "PL3" || newRoute.name == "FC3D") {//福彩3D,排列三
          this.cates = pl3_menu
        }
        //设置第一个分类为当前分类,
        this.currentCateId = this.cates[0].id;
        let currentPlay = this.cates[0];
        this.$store.commit('SET_CURRENT_PLAY_NAME', currentPlay);
      },
      selectCate(item) {
        this.currentCateId = item.id;
        this.currentTitle = item.title;
        if (this.$route.name == 'K3') {
          this.$store.commit('SET_CURRENT_PLAY_NAME', item);
          this.closeMenu()
          return
        }
        this.$store.commit('SET_CURRENT_PLAY_NAME', item);
        this.closeMenu();
      },
      getRelate(type) {
        getSimLottery(type).then(res=>{
          setTimeout(() => {
            this.relateList = res;
          }, 3000)
        })
      },
      toggleMenu() {
        this.menuFlag = !this.menuFlag;
      },
      openMenu() {
        this.menuFlag = true;
      },
      closeMenu() {
        this.menuFlag = false;
      },
    },
  }
</script>

<style lang="less" scoped>
  .menu-wrapper {
    position: fixed;
    left: 0;
    top: 100px;
    right: 0;
    z-index: 12; //大于shortcut层级11
    color: #333;
    font-size: 26px;
    .mask {
      position: fixed;
      left: 0;
      top: 100px;
      right: 0;
      bottom: 0;
      z-index: -1;
      background: rgba(0, 0, 0, .3);
      -webkit-filter: blur(10px);
    }
    .menu {
      display: flex;
      flex-wrap: wrap;
      padding: 20px;
      box-shadow: 0 4px 10px rgba(41, 41, 41, .08);
      li {
        height: 54px;
        margin: 2%;
        width: 29%;
        border: 1px solid #ddd;
        border-radius: 4px;
        line-height: 54px;
        text-align: center;
        color: #222;
        &.active {
          background: #dc3b40;
          border-color: #dc3b40;
          color: #fff;
        }
      }
    }
    .menu-k3 {
      position: fixed;
      left: 0;
      top: 100px;
      bottom: 0;
      right: 0;
      background: #317455;
      color: #fff;
      padding: 2%;
      .menu-k3-list {
        display: flex;
        flex-wrap: wrap;
        .menu-k3-item {
          width: 29%;
          margin: 2%;
          padding: 10px 20px;
          text-align: center;
          border: 1px solid #fff;
          &.active {
            border-color: #f4c829;
          }
          h5 {
            line-height: 50px;
            font-size: 32px;
          }
          p {
            line-height: 60px;
            font-size: 24px;
          }
          .legend {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
  }

  .lottery {
    height: 100%;
    .lottery-header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 1;
      height: 100px;
      background: #000;
      color: #fff;
      text-align: center;
      .header-wrapper {
        display: flex;
        height: 100%;
        .header-left {
          width: 120px;
          flex: 0 0 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          .svg-icon {
            font-size: 40px;
          }
        }
        .header-center {
          position: relative;
          z-index: 2;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          .title-wrapper {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 200px;
            max-width: 400px;
            height: 62px;
            border: 1px solid #fff;
            border-radius: 10px;
            font-size: 32px;
            padding: 0 20px;
            .svg-icon {
              font-size: 28px;
              flex: 0 0 28px;
            }
            strong {
              font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
              font-size: 35px;
            }
            p {
              position: absolute;
              right: 100%;
              font-size: 22px;
              margin-right: 10px;
            }
          }
        }
        .header-right {
          width: 120px;
          flex: 0 0 120px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }

    .lottery-main {
      min-height: 100%;
      padding: 220px 0 100px;
    }
  }

  .relate-wrapper {
    height: 100%;
    padding: 30px 0;
    background: #fff;
    .relate-item {
      display: flex;
      align-items: center;
      padding: 30px;
      small {
        margin: 0 10px;
        font-size: 80%;
        color: #999;
        &:not(:last-child) {
          border-bottom: 1px solid #ddd;
        }
      }
    }
  }

  .loading-wrapper {
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
  }

  .menu-list {
    background: #fff;
    .menu-item {
      display: flex;
      align-items: center;
      height: 100px;
      padding: 0 30px;
      .svg-icon {
        color: #dc3b40;
        font-size: 40px;
      }
      .text {
        flex: 1;
        display: flex;
        align-items: center;
        height: 100%;
        margin-left: 20px;
        border-bottom: 1px solid #eee;
      }
    }
  }
</style>
