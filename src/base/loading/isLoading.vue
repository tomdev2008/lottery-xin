<template>
  <div class="loadMore">
    <div class="load-wrapper">
      <div class="icon-wrap">
        <div class="loadimg loadimg1"><img src="../../assets/pl3-01.png"></div>
        <div class="loadimg loadimg2"><img src="../../assets/fc_3d.png"></div>
        <div class="loadimg loadimg3"><img src="../../assets/k3.png"></div>
        <div class="loadimg loadimg4"><img src="../../assets/bjpk10-09.png"></div>
      </div>
      <div class="loadbox">
        <div class="line line-l"></div>
        <div class="line line-r"></div>
        <img src="../../assets/loadbox.png">
      </div>
      <div class="loadshadow"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'isLoading',
    props: {
      loading: {
        type: Object
      }
    },
    methods:{
      loadMore(){
        this.$emit('loadMore')
      }
    }
  }
</script>

<style type="text/css" scoped>
  .loadMore {

  }
  .load-wrapper {
    position: relative;
    height: 80px;
    margin: 0 auto;
  }
  .loadbox {
    animation: scaleY 0.35s infinite 1s
  }
  .line {
    position: absolute;
    top: 0;
    z-index: 1;
    width: 48%;
    height: 8px;
    border-radius: 8px;
    background: #3393EB;
  }
  .line-l {
    left: 4px;
    animation: line-l 0.5s ease-out 0s 1 forwards;
  }
  .line-r {
    right: 4px;
    animation: line-r 0.5s ease-out 0s 1 forwards;
  }
  .loadMore .icon-wrap {
    position: relative;
    width: 48px;
    margin: auto;
    height: 36px;
    z-index: 3;
  }
  .loadbox {
    position: absolute;
    left: 50%;
    bottom: 0;
    margin-left: -24px;
    width: 48px;
    height: 36px;
    z-index: 3
  }
  .loadshadow {
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
    bottom: -18px;
    z-index: 1;
    margin-left: -25px;
    transform: translate(0, 34px);
  }
  .loadimg img {
    width: 50px;
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
      transform: translate(0, 36px);
      opacity: 0
    }
    5% {
      opacity: 1
    }
    80% {
      opacity: 1
    }
    50% {
      transform: translate(36px, -30px) rotate(15deg);
    }
    100% {
      transform: translate(48px, 56px) rotate(40deg);
      opacity: 0
    }
  }
  @keyframes path2 {
    0% {
      transform: translate(0, 36px);
      opacity: 0
    }
    5% {
      opacity: 1
    }
    80% {
      opacity: 1
    }
    50% {
      transform: translate(30px, -20px) rotate(45deg);
    }
    100% {
      transform: translate(40px, 40px) rotate(80deg);
      opacity: 0
    }
  }
  @keyframes path3 {
    0% {
      transform: translate(0, 36px);
      opacity: 0
    }
    5% {
      opacity: 1
    }
    80% {
      opacity: 1
    }
    50% {
      transform: translate(-50px, -20px) rotate(-40deg);
    }
    100% {
      transform: translate(-60px, 44px) rotate(-70deg);
      opacity: 0
    }
  }
  @keyframes path4 {
    0% {
      transform: translate(0, 36px);
      opacity: 0
    }
    5% {
      opacity: 1
    }
    80% {
      opacity: 1
    }
    50% {
      transform: translate(-40px, -24px) rotate(-10deg);
    }
    100% {
      transform: translate(-50px, 24px) rotate(-60deg);
      opacity: 0
    }
  }
  @keyframes line-l {
    0% {
      transform: rotate(0deg);
      transform-origin: 0 50%
    }
    100% {
      transform: rotate(-220deg);
      transform-origin: 0 50%
    }
  }
  @keyframes line-r {
    0% {
      transform: rotate(0deg);
      transform-origin: 100% 50%
    }
    100% {
      transform: rotate(220deg);
      transform-origin: 100% 50%
    }
  }
</style>
