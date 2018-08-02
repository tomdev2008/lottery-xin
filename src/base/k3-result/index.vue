<template>
  <ul class="k3-result DiceImg" v-if="animation">
    <li :class="itemCls" v-for="item in result"></li>
  </ul>
  <ul class="k3-result DiceImg" v-else>
    <k3-dice :num="num" :key="Math.random()" v-for="num in result"></k3-dice>
  </ul>
</template>

<script>
  import k3Dice from 'base/k3-dice/index'

  export default {
    name: "index",
    data() {
      return {
        sequence: 0,
        interval: null,
      }
    },
    components: {
      k3Dice
    },
    props: {
      result: {
        type: Array,
        default: []
      },
      animation: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      itemCls() {
        return `Dice Dice${this.sequence}`
      }
    },
    watch: {
      animation(newVal, oldVal) {
        if (newVal === true && oldVal === false) {
          this.tick()
        }
        if (newVal === false && oldVal === true) {
          this.stop()
        }
      },
      /*animation(newStatus) {
        if (newStatus) {
          this.timer = setInterval(() => {
            this.addSequence()
          }, 70)
        } else {
          this.timer && clearInterval(this.timer)
        }
      }*/
    },
    mounted(){
      this.tick()
    },
    methods: {
      addSequence() {
        this.sequence > 2 ? this.sequence = 0 : this.sequence++;
      },
      tick() {
        this.interval = setInterval(() => {
          this.addSequence()
        }, 60)
      },
      stop() {
        this.sequence = 0
        clearInterval(this.interval)
      }
    },
  }
</script>

<style lang="less" scoped>
  .Dice {
    display: inline-block;
    width: 50px;
    height: 50px;
    background-image: url('../../assets/diceK3.png');
    background-size: 200% 600%;
    vertical-align: middle;
    background-position: -100% 100%;
    &.Dice0 {
      background-position: -100% 0
    }

    &.Dice1 {
      background-position: -100% -100%
    }

    &.Dice2 {
      background-position: -100% -200%
    }

    &.Dice3 {
      background-position: -100% -300%
    }
  }
</style>
