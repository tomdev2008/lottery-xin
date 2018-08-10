<template>
  <div class="explain">
    <transition
      name="normal"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave">
      <div class="explainWrapper" v-show="explainFlag">
        <div class="bg-wrapper" v-show="explainFlag"
             :style="'background:rgba(0,0,0,.6) url('+selectedLottery.img+') center/cover'"
             v-if="selectedLottery.img"></div>
        <div class="maskBlack"
             @touchstart.capture="touchStart"
             @touchmove.capture="touchMove"
             @touchend.capture="touchEnd"></div>
        <l-header class="top" @back="hideExplain">{{selectedLottery.name}}</l-header>
        <div ref="cdWrapper" class="logoWrapper"
             :style="'background:rgba(0,0,0,.6) url('+selectedLottery.img+') center/cover'">
        </div>
        <div ref="introduce" class="introduce">
          <p>「11选5」是由国家体育总局发行，体育彩票管理中心承销。每日共开奖 84期、每 10 分钟开奖 1 次。
            每次由1~11个号码随机摇出“5个”数字做为开奖号码；并依据押中的号码个数或玩法获得不同等级的奖金。</p>
          <p>开奖时间：早上 9 点至晚上 11 点。如开奖时间异动以国家体育总局体育彩票管理中心公告为准。</p>
        </div>
      </div>
    </transition>
    <div ref="explainText" class="explainText" v-show="explainFlag">
      <scroll
        :data="[]"
        ref="scroll"
        :scrollbar="false"
        :probeType="3"
        :listenScroll="true"
        @scroll="scroll"
      >
        <div class="main">
          <p class="introduction"> 该游戏的投注时间、开奖时间和开奖号码与官方完全一致跟同步.</p>
          <p class="title"> 第一球~第五球 </p>
          <p class="content"> 第一球、第二球、第三球、第四球、第五球：指下注的每一球与开出之号码其开奖顺序及开奖号码相同，视为中奖，如第一球开出号码 8，下注第一球为 8
            者视为中奖，其余情形视为不中奖。 </p>
          <p class="title"> 单双大小 </p>
          <p class="content"> 根据相应单项投注第一球 ~ 第五球开出的球号，判断胜负。 </p>
          <p class="title"> 大小 </p>
          <p class="content"> 根据相应单项投注的第一球 ~ 第五球开出的球号大于或等于 5 为大，小于或等于 4 为小。 </p>
          <p class="title"> 单双 </p>
          <p class="content"> 根据相应单项投注的第一球 ~ 第五球开出的球号为双数则为双，如 2、6；球号为单数则为单，如 1、3。 </p>
          <p class="title"> 斗牛：开奖号码不分顺序 </p>
          <p class="content"> 牛牛：根据开奖第一球 ~
            第五球开出的球号数字为基础，任意组合三个号码成0或10的倍数，取剩余两个号码之和为点数（大于10时减去10后的数字作为对奖基数，如：00026为牛8，02818为牛9，68628、23500皆为牛10俗称牛牛；26378、15286因任意三个号码都无法组合成0或10的倍数，称为没牛，注：当五个号码相同时，只有00000视为牛牛，其它11111，66666等皆视为没牛）
            大小：牛大(牛6,牛7,牛8,牛9,牛牛)，牛小(牛1,牛2,牛3,牛4,牛5)，若开出斗牛结果为没牛，则投注牛大牛小皆为不中奖。
            单双：牛单(牛1,牛3,牛5,牛7,牛9)，牛双(牛2,牛4,牛6,牛8,牛牛)，若开出斗牛结果为没牛，则投注牛单牛双皆为不中奖。 </p>
          <p class="title"> 梭哈：开奖号码不分顺序 </p>
          <p class="content"> 五条：开奖的五个号码全部相同，例如：22222、66666、88888 投注梭哈：五条 中奖，其它不中奖。
            四条：开奖的五个号码中有四个号码相同，例如：22221、66663、88885 投注梭哈：四条 中奖，其它不中奖。
            葫芦：开奖的五个号码中有三个号码相同(三条)另外两个号码也相同(一对)，例如：22211、66633 投注梭哈：葫芦 中奖，其它不中奖。
            顺子：开奖的五个号码从小到大排列为顺序(号码9、0、1相连)，例如：23456、89012、90123 投注梭哈：顺子 中奖，其它不中奖。
            三条：开奖的五个号码中有三个号码相同另外两个不相同，例如：22231、66623、88895 投注梭哈：三条 中奖，其它不中奖。
            两对：开奖的五个号码中有两组号码相同，例如：22166、66355、82668 投注梭哈：两对 中奖，其它不中奖。
            一对：开奖的五个号码中只有一组号码相同，例如：22168、66315、82968 投注梭哈：一对 中奖，其它不中奖。
            散号：开奖号码不是五条、四条、葫芦、三条、顺子、两对、一对的其它所有开奖号码，例如：23186、13579、21968 投注梭哈：散号 中奖，其它不中奖。 </p>
          <p class="title"> 总和-大小 </p>
          <p class="content"> 根据相应单项投注的第一球 ~ 第五球开出的球号数字总和值大于或等于 23 为总和大，小于或等于 22 为总和小。 </p>
          <p class="title"> 总和-单双 </p>
          <p class="content"> 根据相应单项投注的第一球 ~ 第五球开出的球号数字总和值是双数为总和双，数字总和值是单数为总和单。 </p>
          <p class="title"> 前三-豹子 </p>
          <p class="content"> 开奖号码的万位千位百位数字都相同。如中奖号码为：222XX、666XX、888XX...开奖号码的万位千位百位数字相同，则投注前三豹子者视为中奖，其它视为不中奖。 </p>
          <p class="title"> 前三-顺子 </p>
          <p class="content">
            开奖号码的万位千位百位数字都相连，不分顺序（数字9、0、1相连）。如中奖号码为：123XX、901XX、321XX、798XX...开奖号码的万位千位百位数字相连，则投注前三顺子者视为中奖，其它视为不中奖。 </p>
          <p class="title"> 前三-对子 </p>
          <p class="content">
            开奖号码的万位千位百位任意两位数字相同（不包括豹子）。如中奖号码为：001XX，288XX、696XX...开奖号码的万位千位百位有两位数字相同，则投注前三对子者视为中奖，其它视为不中奖。如果开奖号码为前三豹子，则前三对子视为不中奖。 </p>
          <p class="title"> 前三-半顺 </p>
          <p class="content">
            开奖号码的万位千位百位任意两位数字相连，不分顺序（不包括顺子、对子）。如中奖号码为：125XX、540XX、390XX、160XX...开奖号码的万位千位百位有两位数字相连，则投注前三半顺者视为中奖，其它视为不中奖。如果开奖号码为前三顺子、前三对子，则前三半顺视为不中奖。如开奖号码为：123XX、901XX、556XX、233XX...视为不中奖。 </p>
          <p class="title"> 前三-杂六 </p>
          <p class="content"> 不包括豹子、对子、顺子、半顺的所有开奖号码。如开奖号码为：157XX、268XX...开奖号码位数之间无关联性，则投注前三杂六者视为中奖，其它视为不中奖。 </p>
          <p class="title"> 中三-豹子 </p>
          <p class="content"> 开奖号码的千位百位十位数字都相同。如中奖号码为：X222X、X666X、X888X...开奖号码的千位百位十位数字相同，则投注中三豹子者视为中奖，其它视为不中奖。 </p>
          <p class="title"> 中三-顺子 </p>
          <p class="content">
            开奖号码的千位百位十位数字都相连，不分顺序（数字9、0、1相连）。如中奖号码为：X123X、X901X、X321X、X798X...开奖号码的千位百位十位数字相连，则投注中三顺子者视为中奖，其它视为不中奖。 </p>
          <p class="title"> 中三-对子 </p>
          <p class="content">
            开奖号码的千位百位十位任意两位数字相同（不包括豹子）。如中奖号码为：X001X，X288X、X696X...开奖号码的千位百位十位有两位数字相同，则投注中三对子者视为中奖，其它视为不中奖。如果开奖号码为中三豹子，则中三对子视为不中奖。 </p>
          <p class="title"> 中三-半顺 </p>
          <p class="content">
            开奖号码的千位百位十位任意两位数字相连，不分顺序（不包括顺子、对子）。如中奖号码为：X125X、X540X、X390X、X160X...开奖号码的千位百位十位有两位数字相连，则投注中三半顺者视为中奖，其它视为不中奖。如果开奖号码为中三顺子、中三对子，则中三半顺视为不中奖。如开奖号码为：X123X、X901X、X556X、X233X...视为不中奖。 </p>
          <p class="title"> 中三-杂六 </p>
          <p class="content"> 不包括豹子、对子、顺子、半顺的所有开奖号码。如开奖号码为：X157X、X268X...开奖号码位数之间无关联性，则投注中三杂六者视为中奖，其它视为不中奖。 </p>
          <p class="title"> 后三-豹子 </p>
          <p class="content"> 开奖号码的百位十位个位数字都相同。如中奖号码为：XX222、XX666、XX888...开奖号码的百位十位个位数字相同，则投注后三豹子者视为中奖，其它视为不中奖。 </p>
          <p class="title"> 后三-顺子 </p>
          <p class="content">
            开奖号码的百位十位个位数字都相连，不分顺序（数字9、0、1相连）。如中奖号码为：XX123、XX901、XX321、XX798...开奖号码的百位十位个位数字相连，则投注后三顺子者视为中奖，其它视为不中奖。 </p>
          <p class="title"> 后三-对子 </p>
          <p class="content">
            开奖号码的百位十位个位任意两位数字相同（不包括豹子）。如中奖号码为：XX001，XX288、XX696...开奖号码的百位十位个位有两位数字相同，则投注后三对子者视为中奖，其它视为不中奖。如果开奖号码为后三豹子，则后三对子视为不中奖。 </p>
          <p class="title"> 后三-半顺 </p>
          <p class="content">
            开奖号码的百位十位个位任意两位数字相连，不分顺序（不包括顺子、对子）。如中奖号码为：XX125、XX540、XX390、XX160...开奖号码的百位十位个位有两位数字相连，则投注后三半顺者视为中奖，其它视为不中奖。如果开奖号码为后三顺子、后三对子，则后三半顺视为不中奖。如开奖号码为：XX123、XX901、XX556、XX233...视为不中奖。 </p>
          <p class="title"> 后三-杂六 </p>
          <p class="content"> 不包括豹子、对子、顺子、半顺的所有开奖号码。如开奖号码为：XX157、XX268...开奖号码位数之间无关联性，则投注后三杂六者视为中奖，其它视为不中奖。 </p>
          <p class="title"> 龙 </p>
          <p class="content"> 开奖第一球（万位）的号码 大于 第五球（个位）的号码。如：3XXX2、7XXX6、9XXX8...开奖为龙，投注龙者视为中奖，其它视为不中奖。 </p>
          <p class="title"> 虎 </p>
          <p class="content"> 开奖第一球（万位）的号码 小于 第五球（个位）的号码。如：1XXX2、3XXX6、4XXX8..开奖为虎，投注虎者视为中奖，其它视为不中奖。 </p>
          <p class="title"> 和 </p>
          <p class="content"> 开奖第一球（万位）的号码 等于 第五球（个位）的号码。如：2XXX2、6XXX6、8XXX8...开奖为和，投注和者视为中奖，其它视为不中奖。 </p>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
  import Scroll from 'base/pullRefresh/index'
  import LHeader from 'base/l-header/index'
  import animations from 'create-keyframe-animation'
  import {mapGetters} from 'vuex'

  export default {
    name: "explain",
    computed: {
      ...mapGetters(['explainFlag', 'selectedLottery']),
    },
    components: {
      LHeader, Scroll,
    },
    methods: {
      scroll(pos) {
        if (pos.y >= 90) {
          this.$refs.explainText.style.transform = `translate3d(0,0,0)`;
          this.$refs.explainText.style.transition = `all 300ms`;
          this.$refs.explainText.style.transitionTimingFunction = 'ease-in';
          this.$refs.introduce.style.transform = `translate3d(0,0,0)`;
          this.$refs.cdWrapper.style.transform = `translate3d(0,0,0)`;
          this.$refs.introduce.style.opacity = 1;
          this.$refs.cdWrapper.style.opacity = 1;
          this.$refs.introduce.style.transition = 'all .3s ease-in';
          this.$refs.cdWrapper.style.transition = 'all .3s ease-in';
        }
      },
      touchStart(e) {
        e.preventDefault();
        this.startY = e.touches[0].clientY;
      },
      touchMove(e) {
        this.moveFlag = true;
        e.preventDefault();
        this.moveY = e.touches[0].clientY;
        this.diffY = this.moveY - this.startY;
        if (this.diffY > 0) return
        this.$refs.explainText.style.transform = `translate3d(0,${this.diffY}px,0)`;
        this.$refs.explainText.style.transition = `all 0s`;
        this.$refs.explainText.style.transitionTimingFunction = 'linear';
      },
      touchEnd(e) {
        if (!this.moveFlag) return;
        this.moveFlag = false;
        this.endY = e.changedTouches[0].clientY;
        if (this.startY - this.endY >= 200) {
          this.$refs.explainText.style.transform = `translate3d(0,-100%,0)`;
          this.$refs.explainText.style.transition = `all 300ms`;
          this.$refs.explainText.style.transitionTimingFunction = 'ease-in';
          this.$refs.introduce.style.transform = `translate3d(0,-100px,0)`;
          this.$refs.cdWrapper.style.transform = `translate3d(0,-100px,0)`;
          this.$refs.introduce.style.opacity = 0;
          this.$refs.cdWrapper.style.opacity = 0;
          this.$refs.introduce.style.transition = 'all .3s ease-out';
          this.$refs.cdWrapper.style.transition = 'all .3s ease-out';
        } else {
          this.$refs.explainText.style.transform = `translate3d(0,0,0)`;
          this.$refs.explainText.style.transition = `all 500ms`;
          this.$refs.explainText.style.transitionTimingFunction = `cubic-bezier(0.165, 0.84, 0.44, 1)`;
        }
      },
      enter(el, done) {
        const {x, y, scale} = this._getPosAndScale()
        this.startPos = {x, y, scale};
        let animation = {
          0: {
            transform: `translate3d(${x}px,${y}px,0) scale(${scale})`,
          },
          60: {
            transform: `translate3d(0,0,0) scale(1.15)`
          },
          100: {
            transform: `translate3d(0,0,0) scale(1)`,
          }
        }

        animations.registerAnimation({
          name: 'move',
          animation,
          presets: {
            duration: 500,
            easing: 'cubic-bezier(0.02, 0.38, 0.6, 1.11)'
          }
        })

        animations.runAnimation(this.$refs.cdWrapper, 'move', done)
      },
      afterEnter() {
        animations.unregisterAnimation('move')
        this.$refs.cdWrapper.style.animation = ''
        this.$refs.cdWrapper.style.opacity = 1
      },
      leave(el, done) {
        this.$refs.cdWrapper.style.transition = 'all 0.4s'
        const {x, y, scale} = this.startPos
        this.$refs.cdWrapper.style.transform = `translate3d(${x}px,${y}px,0) scale(${scale})`
        this.$refs.cdWrapper.style.opacity = 0.85
        const timer = setTimeout(done, 400)
        this.$refs.cdWrapper.addEventListener('transitionend', () => {
          clearTimeout(timer)
          done()
        })
      },
      afterLeave() {
        this.$refs.cdWrapper.style.transition = ''
        this.$refs.cdWrapper.style.transform = ''
        this.$refs.cdWrapper.style.opacity = 1
      },
      _getPosAndScale() {
        let cdWrapper = this.$refs.cdWrapper
        let miniWrapper = document.getElementById('miniWrapper')
        let miniRect = miniWrapper.getBoundingClientRect()
        let cdRect = cdWrapper.getBoundingClientRect()
        const wi = miniRect.width
        const he = miniRect.height
        const targetWidth = wi
        const paddingLeft = wi / 2 + 30
        const paddingBottom = window.innerHeight - miniRect.bottom + he / 2
        const paddingTop = cdWrapper.offsetTop
        const width = cdRect.width
        const scale = targetWidth / width
        const x = -(window.innerWidth / 2 - paddingLeft)
        const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
        return {
          x,
          y,
          scale
        }
      },
      hideExplain() {
        this.$store.commit('TOGGLE_EXPLAIN', false)
      },
    },
  }
</script>

<style lang="less" scoped>

  .explainWrapper {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    &.normal-enter-active, &.normal-leave-active {
      transition: all .3s;
      .top, .introduce {
        transition: all 0.3s ease-out
      }
    }
    &.normal-enter, &.normal-leave-to {
      opacity: 0;
      .top {
        transform: translate3d(0, -100px, 0)
      }
      .introduce {
        transform: translate3d(0, 100px, 0);
        opacity: 0;
      }
    }
    .top {
      z-index: 16;
      background: none;
    }
    .logoWrapper {
      position: fixed;
      left: 50%;
      top: 140px;
      z-index: 16;
      width: 300px;
      height: 300px;
      margin-left: -150px;
      border: 10px solid rgba(255, 255, 255, .85);
      border-radius: 50%;
    }
    .introduce {
      position: fixed;
      left: 10%;
      top: 480px;
      width: 80%;
      color: #fff;
      text-indent: 2em;
      line-height: 1.5;
      font-size: 24px;
    }

    .bg-wrapper {
      position: absolute;
      left: 50%;
      z-index: -2;
      transform: translateX(-50%) scale(1.2);
      width: 100%;
      height: 100%;
    }

    .maskBlack {
      position: absolute;
      left: 50%;
      z-index: -1;
      transform: translateX(-50%) scale(1.2);
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .82);
    }
  }

  .explainText {
    position: fixed;
    left: 0;
    right: 0;
    top: 100%;
    height: 100%;
    background: #fff;
    overflow: hidden;
    z-index: 101;
    .main {
      padding: 30px;
      .title {
        font-size: 32px;
        font-weight: 500;
        color: #dc3b40;
        line-height: 90px;
      }
      .content {
        line-height: 1.6;
      }
    }
  }
</style>
