<template>
  <div class="selectNumber">
    <number-list :numbers="numbers"></number-list>
  </div>
</template>

<script>
  import NumberList from '../../../../base/number-list/number-list';
  import {mapGetters} from 'vuex';

  export default {
    name: "SSCZX",
    data() {
      return {
        numbers: []
      }
    },
    components:{
      NumberList
    },
    mounted(){
      this.setTpl(this.playName)
    },
    computed: {
      ...mapGetters(['playName'])
    },
    methods:{
      setTpl(newName){
        if (newName == '组选60' || newName == '组选30') {
          this.numbers = [
            {
              title: '二重号',
              num: 10
            },
            {
              title: '单号',
              num: 10
            },
          ]
        } else if (newName == '组选20') {
          this.numbers = [
            {
              title: '三重号',
              num: 10
            },
            {
              title: '单号',
              num: 10
            },
          ]
        } else if (newName == '组选10') {
          this.numbers = [
            {
              title: '三重号',
              num: 10
            },
            {
              title: '二重号',
              num: 10
            },
          ]
        } else if (newName == '组选5') {
          this.numbers = [
            {
              title: '四重号',
              num: 10
            },
            {
              title: '单号',
              num: 10
            },
          ]
        } else {
          this.numbers = [
            {
              title: '组选120',
              num: 10
            }
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
