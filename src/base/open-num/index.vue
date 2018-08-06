<template>
  <div v-if="$route.name=='LHC'" :class="{'animating':animation,'lhc':$route.name=='LHC'}">
    <div :class="[cls,{'plus' : num == '+'}]">
      {{animation && num!='+' ? normalAniNum : num}}
    </div>
    <div class="ani" :class="{'plus' : ani == '+'}">
      {{animation ? normalAniText : ani}}
    </div>
  </div>

  <div v-else-if="$route.name=='PCDD'" :class="{'animating':animation,'pcdd':$route.name=='PCDD'}">
    <div :class="[cls,{'plus' : num == '+','equity' : num == '='}]">
      {{animation && num!='+' && num!='=' ? normalAniNum : num}}
    </div>
  </div>

  <div v-else>
    <span :class="cls">{{animation ? normalAniNum : num}}</span>
  </div>
</template>

<script>
  let aniArr = ['狗', '鸡', '猴', '羊', '马', '蛇', '龙', '兔', '虎', '牛', '鼠', '猪']
  export default {
    name: "OpenNum",
    data() {
      return {
        aniNum: 1,
        timer: null,
        aniArr,
      }
    },
    props: {
      num: {
        type: [Number, String],
      },
      ani: {},//生肖
      animation: {
        type: Boolean,
        default: false
      },
      color: {
        type: String,
        default: ''
      },
      shadow: {
        type: Boolean,
        default: true
      },
      size: {}
    },
    computed: {
      normalAniNum() {
        return this.$route.name == 'SSC' || this.$route.name == 'PL3' || this.$route.name == 'PCDD' ? this.aniNum : parseInt(this.aniNum) > 9 ? this.aniNum : '0' + this.aniNum;
      },
      normalAniText() {
        return this.aniArr[this.aniNum - 1]
      },
      cls() {
        if (this.animation) {
          if (this.$route.name == 'LHC') {
            return `number shadow gray`;
          } else {
            return `number shadow ${this.size == 'small' ? 'small' : ''}`;
          }
        } else {
          return `number ${this.color} ${this.shadow && this.color !== 'none' ? 'shadow' : ''} ${this.size == 'small' ? 'small' : ''}`;
        }
      }
    },
    watch: {
      animation(newVal) {
        if (newVal) {
          this.numAnimate();
        } else {
          this.timer && clearInterval(this.timer);
        }
      }
    },
    mounted() {
      this.numAnimate()
    },
    methods: {
      numAnimate() {
        let maxNum = this.$route.name == 'LHC' ? 11 : 9;
        this.timer = setInterval(() => {
          if (this.aniNum < maxNum) {
            this.aniNum++;
          } else {
            this.aniNum = 1;
          }
        }, 70)
      }
    },
    beforeDestroy() {
      this.timer && clearInterval(this.timer);
      this.timer = null;
    }
  }
</script>

<style lang="less" scoped>
  .animating {

  }

  .ani {
    margin-top: 4px;
    font-size: 95%;
    &.plus {
      opacity: 0;
    }
  }

  .number {
    display: inline-block;
    width: 50px;
    height: 50px;
    line-height: 50px;
    margin: 0 4px;
    background: #dc3b40;
    _background: linear-gradient(90deg, #f86469, #bf1f24 75%);
    color: #fff;
    border-radius: 50%;
    text-align: center;
    font-size: 28px;
    &.small {
      width: 40px;
      height: 40px;
      line-height: 40px;
      font-size: 22px;
    }
    &.none {
      background: none;
      box-shadow: none;
      color: #333;
    }
    &.red {
      background: #dc3b40;
      background: linear-gradient(90deg, #f87b7e 0, #dc3b40 75%);
      color: #fff;
    }
    &.blue {
      background: #218ddd;
      background: linear-gradient(90deg, #6ebefa 0, #218ddd 75%);
      color: #fff;
    }
    &.green {
      background: #38b366;
      background: linear-gradient(90deg, #69d893 0, #38b366 75%);
      color: #fff;
    }
    &.yellow {
      background: #484848;
      background: linear-gradient(90deg, #8c8c8c 0, #484848 75%);
      color: #fff;
    }
    &.gray {
      background: #bbb59c;
      background: linear-gradient(90deg, #bbb59c 0, #bbb59c 75%);
    }
    &.shadow {
      box-shadow: 0 6px 2px #bbb59c;
    }
    &.plus, &.equity {
      width: 24px;
      background: none;
      box-shadow: none;
      color: #333;
    }
  }
</style>
