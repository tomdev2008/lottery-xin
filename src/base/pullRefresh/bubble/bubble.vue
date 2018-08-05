<template>
  <div class="loadMore">
    <div class="load-wrapper">
      <div class="icon-wrap">
        <div class="loadimg" ref="loadimg1"><img src="../../../assets/pl3-01.png"></div>
        <div class="loadimg" ref="loadimg2"><img src="../../../assets/fc_3d.png"></div>
        <div class="loadimg" ref="loadimg3"><img src="../../../assets/k3.png"></div>
        <div class="loadimg" ref="loadimg4"><img src="../../../assets/bjpk10-09.png"></div>
      </div>
      <div class="loadbox" ref="loadbox">
        <div class="line line-l" ref="lineL"></div>
        <div class="line line-r" ref="lineR"></div>
        <img src="../../../assets/loadbox.png">
      </div>
      <div class="loadshadow"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'isLoading',
    props: {
      y: {
        type: Number,
        default: 0
      },
      pulling: {
        type: Boolean,
        default: false,
      }
    },
    watch: {
      y(newY) {
        console.log(newY)
        if(this.pulling)return
        const deg = Math.min(newY, 220)
        this.$refs.lineL.style.transition = 'all 0s'
        this.$refs.lineR.style.transition = 'all 0s'
        this.$refs.lineL.style.transform = `rotate(-${deg}deg)`
        this.$refs.lineR.style.transform = `rotate(${deg}deg)`
      },
      pulling(newVal, oldVal) {
        if (newVal && newVal !== oldVal) {
          this.$refs.loadimg1.classList.add('loadimg1')
          this.$refs.loadimg2.classList.add('loadimg2')
          this.$refs.loadimg3.classList.add('loadimg3')
          this.$refs.loadimg4.classList.add('loadimg4')
          this.$refs.loadbox.classList.add('start')
          this.$refs.lineL.style.transform = 'rotate(-' + 220 + 'deg)'
          this.$refs.lineL.style.transition = 'all 0.3s'
          this.$refs.lineR.style.transform = 'rotate(' + 220 + 'deg)'
          this.$refs.lineR.style.transition = 'all 0.3s'
        } else {
          this.$refs.loadimg1.classList.remove('loadimg1')
          this.$refs.loadimg2.classList.remove('loadimg2')
          this.$refs.loadimg3.classList.remove('loadimg3')
          this.$refs.loadimg4.classList.remove('loadimg4')
          this.$refs.loadbox.classList.remove('start')
          this.$refs.lineL.style.transform = 'rotate(-' + 0 + 'deg)'
          this.$refs.lineL.style.transition = 'all 0.3s'
          this.$refs.lineR.style.transform = 'rotate(' + 0 + 'deg)'
          this.$refs.lineR.style.transition = 'all 0.3s'
        }
      }
    },
    mounted() {

    },
    methods: {}
  }
</script>

<style type="text/css" scoped>
  .load-wrapper {
    position: relative;
    height: 80px;
    margin: 0 auto;
  }

  .loadbox.start {
    animation: scaleY 0.35s infinite 1s
  }

  .line {
    position: absolute;
    top: 0;
    z-index: 1;
    width: 50%;
    height: 8px;
    border-radius: 8px;
    background: #3393EB;
  }

  .line-l {
    left: 4px;
    transform-origin: 0 50%;
  }

  .line-r {
    right: 4px;
    transform-origin: 100% 50%
  }

  .loadMore .icon-wrap {
    position: absolute;
    left: 50%;
    margin-left: -27px;
    bottom: 0;
    width: 54px;
    z-index: 3;
  }

  .loadbox {
    position: absolute;
    left: 50%;
    bottom: 0;
    margin-left: -27px;
    width: 54px;
    height: 40px;
    z-index: 3
  }

  .loadshadow {
    display: none;
    position: absolute;
    left: 50%;
    bottom: -10px;
    z-index: 2;
    margin-left: -25px;
    width: 50px;
    height: 20px;
    background: rgba(0, 0, 0, .3);
    border-radius: 50%/50%
  }

  .loadshadow img, .loadbox img {
    width: 100%
  }

  .loadimg {
    position: absolute;
    left: 50%;
    bottom: 0;
    z-index: 1;
    width: 50px;
    height: 50px;
    margin-left: -25px;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translate(0, 7px);
  }

  .loadimg img {
    width: 46px;
  }

  .loadimg1 {
    animation: path1 .7s cubic-bezier(0, 0, 0, 0) infinite .4s both;
  }

  .loadimg2 {
    animation: path2 .7s cubic-bezier(0, 0, 0, 0) infinite .6s both;
  }

  .loadimg3 {
    animation: path3 .7s cubic-bezier(0, 0, 0, 0) infinite .5s both;
  }

  .loadimg4 {
    animation: path4 .7s cubic-bezier(0, 0, 0, 0) infinite .8s both;
  }
  .loadimg5{
    animation: path5 .7s cubic-bezier(0, 0, 0, 0) infinite .1s both;
  }

  @keyframes scaleY {
    0% {
      transform: scaleY(0.8);
    }
    50% {
      transform: scaleY(1);
    }
    100% {
      transform: scaleY(0.8);
    }
  }

  @keyframes path1 {
    0% {
      transform: translate(0, 0);
      opacity: 0
    }
    5% {
      opacity: 1
    }
    80% {
      opacity: 1
    }
    50% {
      transform: translate(36px, -35px) rotate(15deg);
    }
    100% {
      transform: translate(48px, 16px) rotate(40deg);
      opacity: 0
    }
  }

  @keyframes path2 {
    0% {
      transform: translate(0, 0);
      opacity: 0
    }
    5% {
      opacity: 1
    }
    80% {
      opacity: 1
    }
    50% {
      transform: translate(30px, -30px) rotate(45deg);
    }
    100% {
      transform: translate(40px, 20px) rotate(80deg);
      opacity: 0
    }
  }

  @keyframes path3 {
    0% {
      transform: translate(0, 0px);
      opacity: 0
    }
    5% {
      opacity: 1
    }
    80% {
      opacity: 1
    }
    50% {
      transform: translate(-50px, -34px) rotate(-40deg);
    }
    100% {
      transform: translate(-60px, 24px) rotate(-70deg);
      opacity: 0
    }
  }

  @keyframes path4 {
    0% {
      transform: translate(0, 4px);
      opacity: 0
    }
    5% {
      opacity: 1
    }
    50% {
      transform: translate(-40px, -40px) rotate(-40deg);
    }
    80% {
      opacity: 1
    }
    100% {
      transform: translate(-50px, 24px) rotate(-80deg);
      opacity: 0
    }
  }
  @keyframes path5 {
    0% {
      transform: translate(0, 4px);
      opacity: 0
    }
    5% {
      opacity: 1
    }
    50% {
      transform: translate(35px, -30px) rotate(30deg);
    }
    80% {
      opacity: 1;
    }
    100% {
      transform: translate(60px, 4px) rotate(60deg);
      opacity: 0
    }
  }
</style>
