<template>
  <span style="overflow: hidden">
    <ul class="drawer-wrapper">
      <li class="item" v-for="(item,index) in data" @click="itemClick(item)">
        {{item.name}}
      </li>
    </ul>
    <drawer v-if="sublist.length" :data="sublist"></drawer>
  </span>
</template>

<script>
  export default {
    name: "Drawer",
    props: {
      data: {
        type: Array,
        default: [],
      }
    },
    data() {
      return {
        sublist: []
      }
    },
    watch:{
      data(){
        this.$children.forEach(child => {
          console.log('child.data', child)
          if (child.sublist.length) {
            child.sublist = [];
          }
        })
      }
    },
    methods: {
      itemClick(item) {
        if (item.children && item.children.length) {
          this.sublist = item.children;
        }
      },
      clear(children) {

      }
    },
  }
</script>

<style lang="less" scoped>
  .drawer-wrapper {
    float: left;
    background: #fff;
    display: inline-block;
    min-width: 200px;
    margin: 0;
    vertical-align: top;
    list-style: none;
    overflow: auto;
    .item {
      display: flex;
      align-items: center;
      padding: 20px 30px;
      &:not(:last-child) {
        border-bottom: 1px solid #ddd;
      }
    }
  }
</style>
