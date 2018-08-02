<template>
  <footer class="lottery-footer">
    <transition name="slideTop">
      <div class="preview-wrapper" v-show="previewBetArr.length && listShow">
        <div class="title">
          <strong v-if="footerData.lottery">{{footerData.lottery.actionName}}</strong>
          <span @click="delectAll">清空</span>
        </div>
        <div class="item">
          <span class="qihao">期号</span>
          <span>玩法</span>
          <span>投注内容</span>
          <span>注数</span>
          <span class="price">金额 <strong class="total">{{totalPrice}}元</strong></span>
          <span class="edit"></span>
        </div>
        <transition-group name="list" tag="div">
          <div v-for="(item,index) in previewBetArr" :key="index" class="item">
            <span class="qihao">{{item.actionNo}}</span>
            <span>{{item.title}}</span>
            <span>{{item.content}}</span>
            <span>{{item.count}}</span>
            <span class="price">{{item.amount * beishu}}</span>
            <span class="edit" @click="delectOne(item,index)"><svg-icon iconClass="remove"></svg-icon></span>
          </div>
        </transition-group>
      </div>
    </transition>
    <div class="bet-content" @click="listShow = !listShow">
      <div class="bet-title">
        {{betDesc}}
        <input type="number" minlength="1" maxlength="4" v-model="beishu" @click.stop>
      </div>
    </div>
    <div :class="checkCls" @click="checkout">
      {{footerData.checkDesc}}
      <div class="progress" ref="progress"></div>
    </div>
  </footer>

</template>

<script>
  export default {
    props:{
      previewBetArr: {
        type:Array,
        default:[]
      },
      footerData:{
        type:Object
      },
    },
    data(){
      return {
        listShow: false,
        beishu: 1,
        count: 0,
      }
    },
    computed: {
      totalPrice() {
        let total = 0;
        let beishu = this.beishu > 0 ? this.beishu : 1
        this.previewBetArr.forEach(item => {
          total += item.count * beishu
        })
        return total
      },
      checkCls() {
        return this.count > 0 ? 'checkout' : 'checkout disabled';
      },
      betDesc() {
        return `共 ${this.count} 注 , ${this.count * this.beishu} 元`;
      },
    },
    methods:{
      delectOne(item, previewIndex) {
        let i = item.i;
        let index = item.index;
        this.previewBetArr.splice(previewIndex, 1);
        this.$set(this.xNumbers[index].numList[i], 'selected', false);
        this.xNumbers[index].count--;
      },
      delectAll() {
        this.xNumbers = this.copyNumbers;
        this.previewBetArr = [];
      },
      togglePreview(flag) {
        this.listShow = flag;
      },
      checkout() {
        console.log(this.previewBetArr)
      },
    },
  }
</script>

<style lang="less" scoped>
  .preview-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 100px;
    max-height: 476px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    background: #fff;
    color: #333;
    z-index: -1;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 56px;
      padding: 0 20px;
      background: #f3f5f9;
      font-size: 24px;
    }
    strong {
      font-weight: 600;
    }
    .svg-icon {
      font-size: 40px;
      color: #ff444a;
    }
    .item {
      display: flex;
      width: 100%;
      padding: 0 20px;
      height: 70px;
      line-height: 70px;
      border-top: 1px solid #eee;
      font-size: 24px;
      span {
        position: relative;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &.edit {
          flex: 0 0 40px;
        }
        &.qihao {
          flex: 0 0 180px;
        }
        &.price {
          flex: 0 0 160px;
          .total {
            color: #ff444a;
            font-weight: normal;
          }
        }
      }
      &.list-enter-active, &.list-leave-active {
        transition: height 0.2s
      }
      &.list-enter, &.list-leave-to {
        height: 0
      }
    }
  }
</style>
