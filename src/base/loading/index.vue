<template>
  <div class="loading_container">
    <div class="load_img" :style="{ backgroundPositionY: -(positionY % 6) * 2.5 + 'rem' }"></div>
    <div class="load_ellipse"></div>
  </div>
</template>

<script>
  export default {
    name: "Loading",
    data() {
      return {
        positionY: 0,
        timer: null,
      }
    },
    mounted() {
      this.timer = setInterval(() => {
        this.positionY++;
      }, 500)
    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
  }
</script>

<style lang="less" scoped>
  @keyframes load {
    0% {
      transform: translateY(0) rotate(0);
    }
    50% {
      transform: translateY(-100px);
    }
    100% {
      transform: translateY(0) rotate(360deg);
    }
  }

  @keyframes ellipse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.4);
    }
    100% {
      transform: scale(1);
    }
  }

  .loading_container {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 1000000;
    transform: translate(-50%, -50%);
    width: 2.5rem;
    height: 2.5rem;/*'~/assets/img/open_num.png'*/
    .load_img {
      position: relative;
      width: 100%;
      height: 100%;
      z-index: 11;
      background: url(../../assets/open_num.png) no-repeat 0 0;
      background-size: 2.5rem auto;
      transform: translateY(0);
      animation: load .5s infinite ease-in;
    }
    .load_ellipse {
      position: absolute;
      width: 2.3rem;
      height: 1.2rem;
      bottom: 0;
      left: .1rem;
      z-index: 10;
      background: rgba(0, 0, 0, .6);
      border-radius: 100%;
      animation: ellipse .5s infinite ease-in-out;
    }
  }
</style>
