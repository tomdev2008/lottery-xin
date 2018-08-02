<template>
  <div>
    <div class="selectNumber">
      Xlist:{{Xlist}}---selectedNums:{{selectedNums}}---list:{{list}}---allSelectedLen:{{selectedLen}}---shouldSelectedLen:{{shouldSelectedLen}}----注数{{count}}
      <x-number-list :numbers="xNumbers" @add="addBasket"></x-number-list>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Credit"
  }
</script>

<style scoped>

</style>
