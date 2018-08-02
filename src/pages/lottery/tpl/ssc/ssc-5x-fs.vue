<template>
  <div class="selectNumber">
    <number-list :numbers="numbers"></number-list>
  </div>
</template>

<script>
  import NumberList from '../../../../base/number-list/number-list';
  import {mapGetters} from 'vuex'

  export default {
    name: "SSC",
    data() {
      return {
        numbers: [
          {
            title: '万位',
            num: 10
          },
          {
            title: '千位',
            num: 10
          },
          {
            title: '百位',
            num: 10
          },
          {
            title: '十位',
            num: 10
          },
          {
            title: '个位',
            num: 10
          },
        ]
      }
    },
    components:{
      NumberList
    },
    computed: {
      ...mapGetters(['playName'])
    },
    watch: {
      playName(newName) {
        console.log(newName)
      }
    },
  }
</script>

