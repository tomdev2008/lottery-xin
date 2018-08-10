<template>
  <aside class="shortcut"
         @touchstart="onShortcutTouchStart"
         @touchmove.stop.prevent="onShortcutTouchMove"
         @touchend="onShortcutTouchEnd">
    <ul class="list">
      <li
        v-for="(item,index) in numbers"
        :key="index"
        :css="false"
        :data-index="index"
        class="item shortcut-item-hook"
        :class="{'current':currentIndex === index,'active':currentIndex === index,'prev': currentIndex === index + 1,'next':currentIndex === index - 1}"
        @click="selectMenu(index)"
      >
        {{item.title.substr(0,3)}}
        <transition name="slideLeft">
          <span class="count" v-if="item.count && item.count>0">{{item.count}}</span>
        </transition>
        <div class="ball-container">
          <div v-for="ball in item.balls">
            <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
              <div class="ball" v-show="ball.show">
                <div class="inner inner-hook"></div>
              </div>
            </transition>
          </div>
        </div>
      </li>
    </ul>
  </aside>
</template>

<script>
  import axios from 'axios';
  import {lhc} from 'common/js/calculate';

  export default {
    name: "Shortcut",
    props: {
      numbers: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        scrollY: 0,
        listHeight: [],
        anchorIndex: 0,
        selectedIndex: 0,
        dropBalls: [],
        count: 0,
        transition: '',
        amount: 0,
        selectedArr: [],
      }
    },
    watch: {
      anchorIndex(newVal, oldVal) {
        if (newVal == oldVal) return;
        if (this.scrollTimer) {
          clearTimeout(this.scrollTimer);
        }
        this.scrollTimer = setTimeout(() => {
          window.scrollTo(0, this.listHeight[newVal]);
        }, 50)
        this.scrollY = this.listHeight[newVal];
        //this.$emit('changeAnchorIndex', newVal);
      },
      numbers(newVal, oldVal) {
        if (newVal !== oldVal) this._calculateHeight();
      },
    },
    created() {
      this.touch = {};
    },
    mounted() {
      this.$nextTick(() => {
        this.ANCHOR_HEIGHT = document.getElementsByClassName('shortcut-item-hook')[0].clientHeight
      });//获取每个item的高
      window.addEventListener('scroll', (e) => {
        this.scrollY = e.target.scrollingElement.scrollTop;
      })
      this._calculateHeight();//计算每个层的高度
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
      Xlist() {
        let arr = [];
        this.numbers.forEach((number, index) => {
          arr[index] = [];
          let count = 0
          number.numList.forEach(item => {
            if (item.selected) {
              arr[index].push(item.num);
              count++
            }
          })
          this.$set(number, 'count', count)
        })
        return arr;
      },
    },
    methods: {
      _drop(el, obj, ballRect, ballColor) {
        this.ballColor = ballColor;
        this.ballRect = ballRect;
        this.curIndex = obj.index;
        for (let i = 0; i < this.numbers[this.curIndex].balls.length; i++) {
          let ball = this.numbers[this.curIndex].balls[i];
          if (!ball.show) {
            this.$set(ball, 'show', true)
            //ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeDrop(el) {
        document.getElementsByClassName('shortcut')[0].style.zIndex = 13;
        document.getElementsByClassName('lottery-footer')[0].style.zIndex = 14;
        let fontSize = parseInt(document.documentElement.style.fontSize);
        let count = this.numbers[this.curIndex].balls.length;
        while (count--) {
          let ball = this.numbers[this.curIndex].balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            //console.log(rect.height)
            let x = this.ballRect.left - rect.right + rect.width / 2;
            let y = ''
            this.transition = 'cubic-bezier(0.49, -0.52, 0.75, 0.41)'
            if (this.ballRect.top - rect.top > 0) {
              y = -(Math.abs(this.ballRect.top - rect.top));
              this.transition = 'all .5s cubic-bezier(0.49, -0.52, 0.75, 0.41)';
            } else {
              y = Math.abs(this.ballRect.top - rect.top + (this.ballRect.top - rect.top) / 2)
              this.transition = 'all 0.5s cubic-bezier(0, 1.38, 0.99, 1.72)';
            }
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            el.style.webkitTransition = this.transition;
            el.style.transition = this.transition;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(-${x}px,0,0)`;
            inner.style.transform = `translate3d(-${x}px,0,0)`;
            inner.style.background = this.ballColor;
          }
        }
      },
      dropping(el, done) {
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          el.style.webkitTransition = this.transition;
          el.style.transition = this.transition;
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          el.addEventListener('transitionEnd', done);
          el.addEventListener('webkitTransitionEnd', done);
        });
      },
      afterDrop(el) {
        document.getElementsByClassName('shortcut')[0].style.zIndex = 11;
        document.getElementsByClassName('lottery-footer')[0].style.zIndex = 12;
        this._calcCount(this.numbers);
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      _calculateHeight() {
        this.listHeight = [];
        let List = document.getElementsByClassName('cate-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < List.length; i++) {
          let item = List[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      onShortcutTouchStart(e) {
        let firstTouch = e.touches[0];
        this.touch.y1 = firstTouch.clientY;
        this.touch.anchorIndex = e.target.dataset.index;
      },
      onShortcutTouchMove(e) {
        e.preventDefault();
        let firstTouch = e.touches[0];
        this.touch.y2 = firstTouch.clientY;
        let delta = (this.touch.y2 - this.touch.y1) / this.ANCHOR_HEIGHT | 0;
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta;
        //console.log(anchorIndex)
        this.anchorIndex = anchorIndex;
      },
      onShortcutTouchEnd() {
        let list = [...document.getElementsByClassName('shortcut-item-hook')];
        list.forEach(item => {
          let classList = item.classList;
          setTimeout(() => {
            classList.contains('prev') && classList.remove('prev');
            classList.contains('next') && classList.remove('next');
            classList.contains('active') && classList.remove('active');
          }, 1000)
        })
      },
      selectMenu(index) {
        this.selectedIndex = index;
        this.$emit('selectMenu', index);
      },
      _scrollTo(diff) {
        let diffY = diff ? diff : 0;
        window.scrollTo(0, this.listHeight[this.selectedIndex] + diffY);
      },
      getArrSum(arr) {
        return arr.reduce((p, n) => {
          return p + n;
        })
      },
      _calcCount(numbers) {
        let selectedArr = []
        if (this.$store.getters.calcFun) {
          numbers.forEach((number, index) => {
            if (number.numList.some(item => {
              return item.selected;
            })) {
              let map = {};
              map['index'] = index;
              map['i'] = 0;
              map['beiShu'] = this.$store.getters.beiShu || 1;
              map['playType'] = this.$store.getters.playName;
              map['playId'] = 1;
              map['subPlayType'] = number.title;
              map['subPlayId'] = 83;
              map['bonusProp'] = number.numList[0].odds;
              map['actionCombines'] = number.calcFun ? lhc[number.calcFun](this.Xlist).combines : lhc['tz5xDwei'](this.Xlist).combines;
              map['actionNum'] = number.calcFun ? lhc[number.calcFun](this.Xlist).count : lhc['tz5xDwei'](this.Xlist).count;
              map['actionData'] = number.calcFun ? lhc[number.calcFun](this.Xlist).data || item.num : lhc['tz5xDwei'](this.Xlist).data;
              map['actionAmount'] = map['beiShu'] * map['actionNum'];
              map['actionFun'] = number.calcFun;
              map['betTime'] = new Date().getTime();
              map['gameId'] = this.$route.params.id;
              map['gameName'] = this.$store.getters.currentLottery.actionName;
              map['actionNo'] = this.$store.getters.currentLottery.thisNo;
              map['kjTime'] = this.$store.getters.currentLottery.lastTime;
              if (map['actionNum'] > 0) {
                selectedArr.push(map);
              }
            }
          })
        } else {
          numbers.forEach((number, index) => {
            let count = 0;
            number.numList.forEach((item, i) => {
              let map = {};
              if (item.selected) {
                count++;
                map['index'] = index;
                map['i'] = i;
                map['beiShu'] = this.beiShu || 1;
                map['playType'] = this.$store.getters.playName;
                map['playId'] = 1;
                map['subPlayType'] = number.title;
                map['subPlayId'] = 83;
                map['bonusProp'] = item.odds;
                map['actionNum'] = 1;
                map['actionData'] = item.num;
                map['actionAmount'] = map['beiShu'] * 1;
                map['actionFun'] = 'actionFun';
                map['betTime'] = new Date().getTime();
                map['gameId'] = this.$route.params.id;
                map['gameName'] = this.$store.getters.currentLottery.actionName;
                map['actionNo'] = this.$store.getters.currentLottery.thisNo;
                map['kjTime'] = this.$store.getters.currentLottery.lastTime;
                selectedArr.push(map)
              }
            })
            this.$set(number, 'count', count)
          })
        }

        console.log(selectedArr)
        this.$emit('afterDrop', selectedArr, numbers)
      },
    }
  }
</script>

<style lang="less" scoped>
  @keyframes cartAni {
    0% {
      transform: scale(1)
    }
    25% {
      transform: scale(.8)
    }
    50% {
      transform: scale(1.1)
    }
    75% {
      transform: scale(.9)
    }
    100% {
      transform: scale(1)
    }
  }

  .ball-enter-active, .ball-leave-active {
    transition: all .3s;
  }

  .ball-enter, .ball-leave-active {
    opacity: 0;
  }

  .ball-enter {
    transform: translateY(100%);
  }

  .ball-leave-active {
    transform: translateX(100%);
  }

  .shortcut {
    position: fixed;
    right: 4px;
    top: 50%;
    z-index: 11;
    transform: translateY(-50%);
    border-radius: 36px;
    color: #333;
    text-align: center;
    padding: 72px 16px 0 0;
    .list {
      .item {
        position: relative;
        height: 54px;
        font-size: 18px;
        transition: all .3s;
        color: #444;
        &.prev {
          transform: translateX(-15px);
          opacity: .8;
        }
        &.prever {
          transform: translateX(-8px);
        }
        &.next {
          transform: translateX(-15px);
          opacity: .8;
        }
        &.nexter {
          transform: translateX(-8px);
        }
        &.active {
          transform: translateX(-30px);
        }
        &.current {
          font-weight: bold;
          color: #000;
        }
        .count {
          position: absolute;
          right: -15px;
          top: -10px;
          width: 24px;
          height: 24px;
          line-height: 24px;
          text-align: center;
          background: #d23128;
          color: #fff;
          font-size: 12px;
          border-radius: 50%;
        }
        .ball {
          position: absolute;
          right: -15px;
          top: -10px;
          z-index: 100000;
          border-radius: 50%;
          transition: all .5s cubic-bezier(0.49, -0.52, 0.75, 0.41);
          .inner {
            width: 30px;
            height: 30px;
            font-size: 20px;
            color: #fff;
            background: -webkit-gradient(linear, left top, left bottom, from(#f86469), color-stop(75%, #bf1f24));
            background: linear-gradient(to bottom, #f86469, #bf1f24 75%);
            border-radius: 50%;
            transition: all .5s linear;
          }
        }
      }
    }
  }
</style>
