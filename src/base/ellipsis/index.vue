<template>
  <div class="ellipsis" :class="{'k3':gameType=='k3'}">
    <span v-html="curPlayTip"></span>
    <span @click="showMore" class="more"
          v-show="value.length > gameTipLen && gameTipLen !== 0 && gameTipLen == 47">更多</span>
    <span @click="hideMore" class="retract" v-show="value.length > gameTipLen && gameTipLen == 0"><svg-icon
      iconClass="retract"></svg-icon>收起</span>
  </div>
</template>

<script>
  export default {
    name: "ellipsis",
    data() {
      return {
        gameTipLen: 47,
      }
    },
    props: {
      value: {
        type: String,
        default: '',
      },
      gameType: {
        type: String,
      },
    },
    computed: {
      curPlayTip() {
        if (this.gameTipLen > 0 && this.value.length > this.gameTipLen) {
          return this.value.substr(0, this.gameTipLen) + '...';
        } else {
          return this.value;
        }
      },
    },
    methods: {
      showMore() {
        this.gameTipLen = 0;
      },
      hideMore() {
        this.gameTipLen = 47;
      },
    },
  }
</script>

<style lang="less" scoped>
  .ellipsis {
    white-space: normal;
    padding: 30px;
    font-size: 26px;
    word-break: break-all;
    &.k3 {
      color: #fff;
      .more, .retract {
        color: #ffed00;
      }
    }
    .more, .retract {
      color: rgb(33, 141, 221);
      .svg-icon {
        font-size: 16px;
        margin-right: 2px;
        margin-bottom: 4px;
      }
    }
  }
</style>
