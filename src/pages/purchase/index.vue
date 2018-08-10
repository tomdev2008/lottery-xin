<template>
  <div class="purchase-wrapper" id="purchase">
    <l-header>购彩大厅</l-header>
    <div class="purchase">
      <div class="lottery-types-box">
        <ul>
          <li v-for="(item,index) in types" :class="{'selected':cateIndex == index}" @click="selectCate(item,index)">
            <span class="iconfont" :class="item.icon"></span>
            <div>{{item.title}}</div>
          </li>
        </ul>
      </div>
      <ul class="grid">
        <li :key="item.link" class="higntlight" v-for="item in cates" @click="goRoute(item)"
            v-show="item.type == currentType || currentType == 'all'">
          <span class="iconfont" :class="item.icon" v-if="item.icon"></span>
          <img :src="item.img" :alt="item.name" class="logo" v-else>
          <strong class="title">{{item.name}}</strong>
          <small class="info">{{item.info}}</small>
        </li>
      </ul>
    </div>
    <l-footer></l-footer>
  </div>
</template>

<script>
  import axios from 'axios';
  import LHeader from 'base/l-header/index';
  import LFooter from 'base/l-footer/index';
  import Shortcut from 'base/shortcut/index'

  export default {
    name: "Purchase",
    data() {
      return {
        cates: [
          {
            id: '1',
            type: '1',
            name: '重庆时时彩',
            icon: 'L_SSC',
            img: '//www.qzgao.com/cp5/cq_ssc.png',
            info: '全天120期',
            link: '/lottery/ssc/1'
          },
          {
            id: '60',
            type: '1',
            name: '天津时时彩',
            icon: 'L_SSC',
            img: '//www.qzgao.com/cp5/cq_ssc.png',
            info: '全天84期',
            link: '/lottery/ssc/60'
          },
          {
            id: '12',
            type: '1',
            name: '新疆时时彩',
            icon: 'L_SSC',
            img: '//www.qzgao.com/cp5/cq_ssc.png',
            info: '全天96期',
            link: '/lottery/ssc/12'
          },
          {
            id: '92',
            type: '1',
            name: '发发时时彩',
            icon: 'L_SSC',
            img: '//www.qzgao.com/cp5/cq_ssc.png',
            info: '全天1440期',
            link: '/lottery/ssc/92'
          },

          {
            id: '93',
            type: '6',
            name: '大发pk10',
            icon: 'L_PK10',
            img: '//www.qzgao.com/cp5/bjpk10.png',
            info: '全天1440期',
            link: '/lottery/pk10/93'
          },
          {
            id: '20',
            type: '6',
            name: '北京pk10',
            icon: 'L_PK10',
            img: '//www.qzgao.com/cp5/bjpk10.png',
            info: "全天179期",
            link: '/lottery/pk10/20'
          },

          {
            id: '95',
            type: '9',
            name: '湖北快3',
            icon: 'L_K3',
            img: '//www.qzgao.com/cp5/k3.png',
            info: '全天78期',
            link: '/lottery/k3/95'
          },
          {
            id: '91',
            type: '9',
            name: '大发快3',
            icon: 'L_K3',
            img: '//www.qzgao.com/cp5/k3.png',
            info: '全天1440期',
            link: '/lottery/k3/91'
          },
          {
            id: '96',
            type: '9',
            name: '大发快3',
            icon: 'L_K3',
            img: '//www.qzgao.com/cp5/k3.png',
            info: '全天89期',
            link: '/lottery/k3/96'
          },
          {
            id: '97',
            type: '9',
            name: '北京快3',
            icon: 'L_K3',
            img: '//www.qzgao.com/cp5/k3.png',
            info: '全天81期',
            link: '/lottery/k3/97'
          },
          {
            id: '98',
            type: '9',
            name: '甘肃快3',
            icon: 'L_K3',
            img: '//www.qzgao.com/cp5/k3.png',
            info: '全天72期',
            link: '/lottery/k3/98'
          },
          {
            id: '99',
            type: '9',
            name: '上海快3',
            icon: 'L_K3',
            img: '//www.qzgao.com/cp5/k3.png',
            info: '全天82期',
            link: '/lottery/k3/99'
          },
          {
            id: '100',
            type: '9',
            name: '贵州快3',
            icon: 'L_K3',
            img: '//www.qzgao.com/cp5/k3.png',
            info: '全天78期',
            link: '/lottery/k3/100'
          },
          {
            id: '101',
            type: '9',
            name: '吉林快3',
            icon: 'L_K3',
            img: '//www.qzgao.com/cp5/k3.png',
            info: '全天87期',
            link: '/lottery/k3/101'
          },
          {
            id: '81',
            type: '9',
            name: '安徽快3',
            icon: 'L_K3',
            img: '//www.qzgao.com/cp5/k3.png',
            info: '全天78期',
            link: '/lottery/k3/81'
          },
          {
            id: '82',
            type: '9',
            icon: 'L_K3',
            name: '广西快3',
            img: '//www.qzgao.com/cp5/k3.png',
            info: '全天79期',
            link: '/lottery/k3/82'
          },
          {
            id: '79',
            type: '9',
            name: '江苏快3',
            icon: 'L_K3',
            img: '//www.qzgao.com/cp5/k3.png',
            info: '全天82期',
            link: '/lottery/k3/79'
          },

          {
            id: '6',
            type: '2',
            name: '广东11选5',
            icon: 'L_SYX5',
            img: '//www.qzgao.com/cp5/sd_11_5.png',
            info: '全天84期',
            link: '/lottery/syx5/6'
          },
          {
            id: '15',
            type: '2',
            name: '上海11选5',
            icon: 'L_SYX5',
            img: '//www.qzgao.com/cp5/sd_11_5.png',
            info: '全天90期',
            link: '/lottery/syx5/15'
          },
          {
            id: '7',
            type: '2',
            name: '山东11选5',
            icon: 'L_SYX5',
            img: '//www.qzgao.com/cp5/sd_11_5.png',
            info: '全天78期',
            link: '/lottery/syx5/7'
          },
          {
            id: '16',
            type: '2',
            name: '江西11选5',
            icon: 'L_SYX5',
            img: '//www.qzgao.com/cp5/sd_11_5.png',
            info: '全天78期',
            link: '/lottery/syx5/16'
          },

          {
            id: '83',
            type: '10',
            name: '北京28',
            icon: 'L_KL8',
            img: '//www.qzgao.com/cp5/bj_28.png',
            info: '全天179期',
            link: '/lottery/pcdd/83'
          },

          {
            id: '94',
            type: '11',
            name: '发发六合彩',
            icon: 'L_6HC',
            img: '//www.qzgao.com/cp5/xg_lhc.png',
            info: '全天1440期',
            link: '/lottery/lhc/94'
          },
          {
            id: '34',
            type: '11',
            name: '香港六合彩',
            icon: 'L_6HC',
            img: '//www.qzgao.com/cp5/xg_lhc.png',
            info: '一周三期',
            link: '/lottery/lhc/34'
          },

          {
            id: '9',
            type: '3',
            name: '福彩3D',
            icon: 'L_FC3D',
            img: '//www.qzgao.com/cp5/fc_3d.png',
            info: '每天20:30开奖',
            link: '/lottery/fc3d/9'
          },
          {
            id: '10',
            type: '3',
            name: '排列三',
            icon: '',
            img: '//www.qzgao.com/cp5/pl3-01.png',
            info: '每天20:30开奖',
            link: '/lottery/pl3/10'
          },
        ],
        types: [
          {title: '全部彩种', type: 'all', icon: 'A_ALL'},
          {title: '时时彩', type: '1', icon: 'A_SSC'}, {title: '快三', type: '9', icon: 'A_K3'},
          {title: '六合彩', type: '11', icon: 'L_6HC'}, {title: 'PK10', type: '6', icon: 'L_PK10'},
          {title: '十一选五', type: '2', icon: 'A_SYX5'}, {title: 'PC蛋蛋', type: '10', icon: 'A_OTHER'}, {
            title: '福彩3D',
            type: '3',
            icon: 'A_FC3D'
          },
        ],
        cateIndex: 0,
        currentType: 'all',
        scrollY: 0,
        listHeight: [],
      }
    },
    components: {
      LHeader, Shortcut, LFooter
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 - 1 && this.scrollY < height2 - 1)) {
            return i;
          }
        }
        return 0;
      },
    },
    mounted() {
      window.addEventListener('scroll', (e) => {
        this.scrollY = e.target.scrollingElement.scrollTop;
      })
      this._calculateHeight();
    },
    methods: {
      goRoute(item) {
        this.$router.push({path: item.link ? item.link : '/'});
        this.$store.dispatch('setSelectedLottery', item)
      },
      selectCate(item, index) {
        this.cateIndex = index;
        this.currentType = item.type;
      },
      _calculateHeight() {
        let foodList = document.getElementsByClassName('cate-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      selectMenu(index) {
        window.scrollTo(0, this.listHeight[index]);
      },
    },
  }
</script>

<style lang="less" scoped>
  .purchase-wrapper {
    padding-top: 100px;
    padding-bottom: 100px;
    min-height: 100%;
    .lottery-types-box {
      position: sticky;
      top: 0;
      z-index: 1;
      width: 100%;
      height: 160px;
      background: #21292b;
      overflow: auto;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      ul {
        width: 100%;
        height: 100%;
        white-space: nowrap;
        overflow-y: hidden;
        -webkit-overflow-scrolling: auto;
        li {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 200px;
          height: 100%;
          color: #5c5f60;
          &.selected {
            background-color: #151b1d;
            color: #f2f2f2;
            .iconfont {
              &.L_PK10, &.L_6HC {
                &:before {
                  color: #f2f2f2 !important;
                }
                &:after {
                  opacity: 1;
                }
              }
            }
          }
          .iconfont {
            font-size: 80px;
            &.L_PK10, &.L_6HC {
              position: relative;
              transform: translateY(-6px);
              &:before {
                color: #5c5f60;
                font-size: 58px;
              }
              &:after {
                content: '';
                position: absolute;
                left: -8px;
                top: 13px;
                width: 70px;
                height: 70px;
                border: 2px solid #fff;
                opacity: .15;
                border-radius: 50%;
              }
            }
          }
        }
      }
    }
  }
</style>
