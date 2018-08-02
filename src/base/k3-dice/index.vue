<template>
  <li :class="'Dice rDice'+num"></li>
</template>

<script>
  export default {
    name: "Dice",
    props: {
      num: {
        type: [Number, String]
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
    -webkit-box-reflect: below -14px -webkit-linear-gradient(top, rgba(250, 250, 250, 0), rgba(250, 250, 250, 0) 30%, rgba(250, 250, 250, 0.15));
    &.rDice1 {
      background-position: 0 0
    }

    &.rDice2 {
      background-position: 0 -100%
    }

    &.rDice3 {
      background-position: 0 -200%
    }

    &.rDice4 {
      background-position: 0 -300%
    }

    &.rDice5 {
      background-position: 0 -400%
    }

    &.rDice6 {
      background-position: 0 -500%
    }
  }

</style>
