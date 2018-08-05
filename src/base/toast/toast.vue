<template>
  <div>
    <div class="mask" v-if="showMask && show"></div>
    <transition name="zoom" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
      <div class="message-box" v-show="show">
        <svg-icon :iconClass="icon" class="icon" v-if="icon"/>
        <span class="text">{{text}}</span>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    props: {
      show: { // 是否显示此toast
        default: false
      },
      showMask: {
        type: Boolean,
        default: false,
      },
      text: { // 提醒文字
        default: 'loading'
      },
      duration: { // 显示时间
        default: 3000
      },
      icon: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="less" scoped>
  .mask{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 4999;
  }
  .message-box {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 50000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 80%;
    min-width: 200px;
    min-height: 100px;
    padding: 30px 40px;
    transform: translate(-50%, -50%);
    border-radius: 24px;
    background: rgba(0, 0, 0, .85);
    color: #fff;
    .icon {
      font-size: 64px;
      margin-bottom: 20px;
    }
    .text {
      font-size: 28px;
    }
  }
</style>
