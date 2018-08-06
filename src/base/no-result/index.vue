<template>
  <div style="margin: 50px auto">
    <img src="../../assets/sad.png" alt="">
    <div :class="$style.text">{{text}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        default: '暂无记录'
      }
    }
  }
</script>

<style lang="less" module>
  .text {
    text-align: center;
  }
</style>
