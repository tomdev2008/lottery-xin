<template>
  <div class="selectNumber">
    <number-list :numbers="numbers"></number-list>
  </div>
</template>

<script>
  import NumberList from '../../../../base/number-list/number-list';
  import {mapGetters} from 'vuex';

  export default {
    name: "SSC4XFS",
    data() {
      return {
        numbers: []
      }
    },
    components:{
      NumberList
    },
    mounted() {
      this.setTpl(this.playName)
    },
    computed: {
      ...mapGetters(['playName'])
    },
    methods: {
      setTpl(newName) {
        if (newName == "后四复式") {
          this.numbers = [
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
        } else {
          this.numbers = [
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
          ]
        }
      }
    },
    watch: {
      playName(newName) {
        this.setTpl(newName)
      }
    },
  }
</script>
