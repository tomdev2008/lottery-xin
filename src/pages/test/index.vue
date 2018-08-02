<template>
  <div id="list-demo" class="demo">
    <button v-on:click="add">Add</button>
    <button v-on:click="remove">Remove</button>
    <transition-group name="list" tag="p">
    <span v-for="item in items" v-bind:key="item" class="list-item">
      {{ item }}
    </span>
    </transition-group>
  </div>
</template>

<script>
  import LFooter from 'base/l-footer/index'

  export default {
    name: "index",
    data(){
      return {
        items: [1,2,3,4,5,6,7,8,9],
        nextNum: 10
      }
    },
    components: {
      LFooter
    },
    methods: {
      randomIndex: function () {
        return Math.floor(Math.random() * this.items.length)
      },
      add: function () {
        this.items.splice(this.randomIndex(), 0, this.nextNum++)
      },
      remove: function () {
        this.items.splice(this.randomIndex(), 1)
      },
    }
  }
</script>

<style scoped>
  .demo{
    display: flex;
    flex-wrap: wrap;
    border-top: 1px solid #f3f5f7;
    background: #fff;
  }
  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to{
    opacity: 0;
    transform: translateY(30px);
  }
</style>
