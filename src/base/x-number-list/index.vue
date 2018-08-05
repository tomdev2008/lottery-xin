<template>
  <div class="number-wrapper">
    <div v-for="(item, index) in numbers" class="cate-list-hook" :data-length="item.length">
      <h5 class="title">{{item.title}}</h5>

      <ul class="ball-list lhc" v-if="gameType == 'ball'">
        <li class="ball-item"
            :class="{'selected':num.selected}"
            v-for="(num,i) in item.numList"
            @click="selectNum($event, index, i, num, item)">
          <span class="ball" :class="num.color">
            {{num.num}}
          </span>
        </li>
      </ul>

      <template v-else>
        <!--appear 特性设置节点在初始渲染的过渡-->
        <transition-group
          appear
          name="staggered-fade"
          tag="ul"
          class="list"
          :class="{'noTab':tabs == 1}"
          :css="false"
          @before-enter="beforeEnter"
          @enter="enter"
        >
          <li
            v-for="(num, i) in item.numList"
            class="item"
            :key='num.num'
            :class="{'selected':num.selected,'clicked':num.clicked}"
            :data-i="i"
            :data-index="index"
            @click="selectNum($event, index, i,num,item)">
            <div class="top">
              <span class="value">{{num.num}}</span>
              <div class="odds" v-if="num.odds">赔率{{num.odds}}</div>
            </div>
            <div class="egs" v-if="num.egs">
              <span class="eg" v-for="eg in num.egs">{{eg}}</span>
            </div>
          </li>
        </transition-group>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: "XNumberList",
    data() {
      return {
        clicked: false,
        clickTimer: null,
      }
    },
    props: {
      numbers: {
        type: Array,
        default: []
      },
      gameType: {
        type: String,
        default: ''
      },
    },
    computed: {
      tabs() {
        return this.numbers.length
      }
    },
    methods: {
      selectNum(el, index, i, num, item) {
        let selectedCount = item.numList.filter(v => {
          return v.selected;
        }).length;
        let maxLength = this.numbers[index].length;
        let canDrop;
        if (this.numbers[index].numList[i].selected) {
          this.$set(this.numbers[index].numList[i], 'selected', false);
          canDrop = false;
        } else {
          if (selectedCount >= maxLength) {
            this.$toast({
              text: `${this.numbers[index].title}最多选择${maxLength}个`,
              showMask: true,
            })
            return
          }
          this.$set(this.numbers[index].numList[i], 'selected', true);
          this.$set(this.numbers[index].numList[i], 'clicked', true);
          this.clickTimer && clearTimeout(this.clickTimer);
          this.clickTimer = setTimeout(() => this.$set(this.numbers[index].numList[i], 'clicked', false), 500);
          canDrop = true;
        }
        let color = this.numbers[index].numList[i].color
        this.$emit('add', el, {index, i}, this.numbers, canDrop, color)
      },
      beforeEnter(el) {
        el.style.opacity = 0.01;
        //el.style.transform="rotateY(90deg)"
      },
      enter(el, done) {
        let iDelay = el.dataset.i * 100;
        let indexDelay = iDelay + (el.dataset.index + 1) * 60;
        setTimeout(function () {
          Velocity(el, {opacity: 1, rotateY: '0deg'}, {complete: done})
        }, iDelay)
        done()
      },
    },
  }
</script>

<style lang="less" scoped>
  @keyframes buttonEffect {
    to {
      opacity: 0;
      top: -12px;
      left: -12px;
      bottom: -12px;
      right: -12px;
      border-width: 12px;
    }
  }

  @keyframes titleAni {
    0% {
      opacity: 0;
      transform: translateX(-4%) rotateX(90deg);
    }
    1000% {
      transform: translateX(-4%) rotateX(0);
    }
  }

  @acticeColor: #dc3b40;

  .number-wrapper {
    margin-bottom: 100px;
    .title {
      margin-bottom: 20px;
      font-size: 35px;
      font-weight: 500;
      color: @acticeColor;
      line-height: 80px;
      text-align: center;
      transform: translateX(-4%);
      transform-origin: bottom;
      animation: titleAni .3s ease-out;
    }
    .list {
      display: flex;
      flex-wrap: wrap;
      width: 90%;
      margin-left: 5%;
      color: #fff;
      transform: translateX(-4%);
      &.noTab {
        .item {
          flex: 1;
        }
      }
      .item {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        min-width: 22%;
        min-height: 100px;
        margin: 1%;
        padding: 10px 0 0 0;
        border: 1px solid #dfdfdf;
        border-radius: 4px;
        background: #faf9f6;
        color: @acticeColor;
        transition: all .3s;
        &.selected {
          background: @acticeColor;
          color: #fff;
          border-color: @acticeColor;
          .top {
            .odds {
              color: #fff;
            }
          }
          .egs {
            color: #fff;
            border-top-color: #f56368;
          }
        }
        &.clicked:after {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          bottom: -2px;
          right: -2px;
          border-radius: inherit;
          border: 0 solid @acticeColor;
          opacity: .9;
          animation: buttonEffect .4s;
          display: block;
        }
        .top {
          padding: 4px 0;
          flex: 1;
          flex-direction: column;
          display: flex;
          align-items: center;
          justify-content: space-around;
          .value {
            line-height: 1;
            font-size: 34px;
          }
          .odds {
            margin: 10px 0;
            line-height: 1;
            font-size: 24px;
            color: #333;
          }
        }
        .egs {
          width: 100%;
          line-height: 1.5;
          text-align: center;
          border-top: 1px solid #dfdfdf;
          color: #666;
          font-size: 20px;
          word-break: break-word;
          .eg {
            margin: 0 4px;
          }
        }
      }
    }
    .ball-list {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      width: 90%;
      margin-left: 5%;
      transform: translateX(-4%);
      .ball-item {
        min-width: 20%;
        margin-bottom: 40px;
        text-align: center;
        &.selected .ball {
          background: #dc3b40;
          color: #fff;
          border-color: #dc3b40;
          &.red {
            background: #dc3b40;
            background: linear-gradient(0deg, #f87b7e 0, #dc3b40 75%);
            color: #fff;
          }
          &.blue {
            background: #218ddd;
            background: linear-gradient(0deg, #6ebefa 0, #218ddd 75%);
            color: #fff;
          }
          &.green {
            background: #38b366;
            background: linear-gradient(0deg, #69d893 0, #38b366 75%);
            color: #fff;
          }
          &.yellow {
            background: #484848;
            background: linear-gradient(0deg, #8c8c8c 0, #484848 75%);
            color: #fff;
          }
        }
        .ball {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 66px;
          height: 66px;
          color: #dc3b40;
          background: #faf9f6;
          border-radius: 50%;
          border: 1px solid #dfdfdf;
          font-size: 30px;
          transition: background .3s, border-color .3s;
          .odds {
            color: #666;
          }
          &.red {
            color: #dc3b40;
            border-color: #dc3b40;
          }
          &.blue {
            color: #218ddd;
            border-color: #218ddd;
          }
          &.green {
            color: #38b366;
            border-color: #38b366;
          }
          &.yellow {
            color: #484848;
            border-color: #484848;
          }
          &.longHu {
            flex-direction: column;
            width: 140px;
            height: 90px;
            margin-left: 20px;
            margin-right: 30px;
            border-radius: 0;
            .odds {
              margin-top: 6px;
              font-size: 22px;
            }
          }
        }
      }
    }
  }
</style>
