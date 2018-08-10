<template>
  <header :class="$style.lotteryHeader">
    <div :class="$style.headerWrapper">
      <div :class="$style.headerLeft" @click="back">
        <svg-icon iconClass="back" :class="$style.back"></svg-icon>
      </div>
      <div :class="$style.headerCenter">
        <slot></slot>
      </div>
      <div :class="$style.headerRight">
        <slot name="right"></slot>
      </div>
    </div>
  </header>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'l-header',
    methods: {
      back(){
        this.$emit('back')
      },
    },
  }
</script>

<style lang="less" module>
  .lotteryHeader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
    height: 100px;
    background: #ec0022;
    color: #fff;
    text-align: center;
    .headerWrapper {
      display: flex;
      height: 100%;
      .headerLeft {
        width: 120px;
        flex: 0 0 120px;
        display: flex;
        align-items: center;
        justify-content: center;
        .back {
          font-size: 40px;
        }
      }
      .headerCenter {
        position: relative;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 38px;
      }
      .headerRight {
        width: 120px;
        flex: 0 0 120px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
      }
    }
  }
</style>
