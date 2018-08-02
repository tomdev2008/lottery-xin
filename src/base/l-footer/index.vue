<template>
  <footer class="l-footer">
    <section>
      <transition name="fade">
        <div class="mask" @click="flag=false" v-show="flag"></div>
      </transition>
    </section>

    <ul class="list">
      <router-link tag="li" to="/" class="item">
        <svg-icon icon-class="lottery"></svg-icon>
        <div class="title">首页</div>
      </router-link>
      <router-link tag="li" to="/purchase" class="item">
        <svg-icon icon-class="cart"></svg-icon>
        <div class="title">购彩</div>
      </router-link>
      <li to="/lottery" class="item" @click="showLottery">
        <svg-icon icon-class="gift"></svg-icon>
        <div class="title">活动</div>
        <transition-group
          tag="nav"
          class="icon-wrapper"
          @before-enter="beforeEnter"
          @enter="enter"
          @leave="leave"
          :css="false"
        >
          <router-link to="/" class="icon" v-for="(item,index) in icons" :key="item.icon" :data-index="index"
                       v-show="flag">
            <img src="./../../assets/icon1.png">
          </router-link>
        </transition-group>
      </li>
      <router-link tag="li" to="/trend" class="item">
        <svg-icon icon-class="trend"></svg-icon>
        <div class="title">走势图</div>
      </router-link>
      <router-link tag="li" to="/user" class="item">
        <svg-icon icon-class="user"></svg-icon>
        <div class="title">我的</div>
      </router-link>
    </ul>
  </footer>
</template>

<script>
  export default {
    name: "LFooter",
    data() {
      return {
        flag: false,
        icons: [
          {
            icon: 'icon1.png'
          },
          {
            icon: 'icon2.png'
          },
          {
            icon: 'icon3.png'
          },
          {
            icon: 'icon4.png'
          },
          {
            icon: 'icon5.png'
          },
          {
            icon: 'icon6.png'
          }
        ]
      }
    },
    computed: {
      iconCls() {
        return this.flag ? 'icon show' : 'icon';
      }
    },
    methods: {
      showLottery() {
        this.flag = true;
      },
      beforeEnter: function (el) {
        el.style.opacity = 0

        this.animateArr = [];
        let index = el.getAttribute('data-index');
        let animate = {opacity: 1};
        switch (index) {
          case "0":
            animate.translateY = '-300%';
            animate.translateX = '-200%';
            this.animateArr[index] = animate;
            break;
          case "1":
            animate.translateY = '-300%';
            animate.translateX = '0';
            this.animateArr[index] = animate;
            break;
          case "2":
            /*animate.translateY='-300%';
            animate.translateX='0';
            this.animateArr[index]=animate;
            break;*/
            animate.translateY = '-300%';
            animate.translateX = '200%';
            this.animateArr[index] = animate;
            break;
          case "3":
            animate.translateY = '-100%';
            animate.translateX = '-200%';
            this.animateArr[index] = animate;
            break;
          case "4":
            animate.translateY = '-100%';
            animate.translateX = '0';
            this.animateArr[index] = animate;
            break;
          case "5":
            animate.translateY = '-100%';
            animate.translateX = '200%';
            this.animateArr[index] = animate;
            break;
        }
      },
      enter: function (el, done) {
        let index = el.getAttribute('data-index');
        Velocity(el, this.animateArr[index], {duration: 150, delay: 60 * index}, {complete: done})
      },
      leave: function (el, done) {
        let index = el.getAttribute('data-index');
        Velocity(el, {translateX: '0', translateY: '0', opacity: 0}, {
          duration: 150,
          delay: 50 * index,
          ease: 'swing'
        }, {complete: done})
      }
    }
  }
</script>

<style lang="less" scoped>
  @keyframes line1 {
    0% {
      opacity: .2;
      transform: translateY(400%);
    }
    100% {
      opacity: .8;
      transform: translateY(0);
    }
  }

  @keyframes line2 {
    0% {
      opacity: .2;
      transform: translateY(200%);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .l-footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100px;
    z-index: 100;
    .mask {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 9;
      background: rgba(255, 255, 255, .8);
      -webkit-backdrop-filter: blur(10px);
    }

    .list {
      height: 100%;
      display: flex;
      background: #fff;
      .item {
        position: relative;
        width: 20%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        &.router-link-exact-active {
          color: #8762f7;
        }
        .title {
          font-size: 20px;
        }
        .svg-icon {
          font-size: 40px;
        }
        .icon-wrapper {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 50px;
          z-index: 100;
          height: 100px;
          .icon {
            position: absolute;
            left: 50%;
            width: 100px;
            margin-left: -50px;
            &.show {
              animation: line1 .4s cubic-bezier(0.67, -0.05, 0.35, 1.34) both;
              &:nth-child(2) {
                animation-delay: .1s;
              }
              &:nth-child(3) {
                animation-delay: .2s;
              }
              &:nth-child(4) {
                animation-delay: .3s;
              }
              &:nth-child(5) {
                animation-delay: .4s;
              }
              &:nth-child(6) {
                animation-delay: .5s;
              }
            }
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
</style>
