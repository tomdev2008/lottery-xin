<template>
  <div>
    <div class="selectNumber">
      Xlist:{{Xlist}}---selectedNums:{{selectedNums}}---list:{{list}}---allSelectedLen:{{selectedLen}}---shouldSelectedLen:{{shouldSelectedLen}}----注数{{count}}
      <number-list :numbers="numbers" @add="addCart"></number-list>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Official"
  }
</script>

<style scoped>

</style>
