<template>
  <div class="confirm">
    <div class="layer-back" v-if="flag"></div>
    <transition name="zoom" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
      <div class="confirm-box" v-if="flag">
        <header class="header" v-if="$slots['title'] || title">
          <div class="title" v-if="title">{{title}}</div>
          <slot name="title"></slot>
        </header>
        <section class="main">
          <slot></slot>
        </section>
        <footer class="footer">
          <slot name="footer" v-if="$slots['footer']"></slot>
          <div class="ok" @click="onOk" v-else>确定</div>
        </footer>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "Confirm",
    props: {
      title: {
        type: String,
      }
    },
    data() {
      return {
        flag: false
      }
    },
    methods: {
      onOk() {
        this.$emit('confirm')
        this.toggle(false)
      },
      toggle(flag) {
        this.flag = flag;
      },
    }
  }
</script>

<style lang="less" scoped>
  .confirm {
    .layer-back {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, .1);
      -webkit-backdrop-filter: blur(10px);
      z-index: 10000;
    }
    .confirm-box {
      position: fixed;
      left: 50%;
      top: 50%;
      z-index: 10001;
      transform: translate(-50%, -50%);
      width: 450px;
      max-width: 80%;
      background: #fff;
      border-radius: 10px;
      .main {
        padding: 30px;
        text-align: center;
      }
      .header {
        border-bottom: 1px solid #ddd;
      }
      .footer {
        border-top: 1px solid #ddd;
        color: #059cff;
      }
      .header, .footer {
        height: 80px;
        line-height: 80px;
        text-align: center;
      }
    }
  }
</style>
