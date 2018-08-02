<template>
  <header class="lottery-header">
    <div class="header-wrapper">
      <div class="header-left">

      </div>
      <div class="header-center">
        <slot></slot>
      </div>
      <div class="header-right"></div>
    </div>
  </header>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: 'l-header',
    }
</script>

<style lang="less" scoped>
  .lottery-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
    height: 100px;
    background: #ec0022;
    color: #fff;
    text-align: center;
    .header-wrapper {
      display: flex;
      height: 100%;
      .header-left {
        width: 120px;
        flex: 0 0 120px;
      }
      .header-center {
        position: relative;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 38px;
      }
      .header-right {
        width: 120px;
        flex: 0 0 120px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
</style>
