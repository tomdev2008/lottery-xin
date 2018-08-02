<template>
  <div class="number-wrapper">
    <transition-group
      name="staggered-fade"
      tag="ul"
      class="list"
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
    >
      <li class="item"
          v-for="(item,index) in numbers"
          :key="item.num"
          :class="{'selected':item.selected,'clicked':item.clicked}"
          :data-index="index"
          @click="selectNum($event,index)">
        <div class="value">{{item.num}}</div>
        <div class="odds" v-if="item.odds">赔率{{item.odds}}</div>
      </li>
    </transition-group>
  </div>
</template>

<script>
  export default {
    name: "k3List",
    data() {
      return {
        clicked: false,
        clickTimer: null,
      }
    },
    props: {
      numbers: {
        type: Array,
        default: []
      }
    },
    methods: {
      selectNum(el, index) {
        if (this.numbers[index].selected) {
          this.$set(this.numbers[index], 'selected', false);
        } else {
          this.$set(this.numbers[index], 'selected', true);
          this.$set(this.numbers[index], 'clicked', true);
          if (this.clickTimer) clearTimeout(this.clickTimer);
          this.clickTimer = setTimeout(() => this.$set(this.numbers[index], 'clicked', false), 500);
        }

        this.$emit('add', el, this.numbers);
      },
      beforeEnter(el) {
        el.style.opacity = 0;
      },
      enter(el, done) {
        var delay = el.dataset.index * 90;
        setTimeout(function () {
          Velocity(el, {opacity: 1}, {complete: done})
        }, delay)
      },
    },
  }
</script>

<style lang="less" scoped>
  @keyframes buttonEffect {
    to {
      opacity: 0;
      top: -12px;
      left: -12px;
      bottom: -12px;
      right: -12px;
      border-width: 12px;
    }
  }

  @acticeColor: #f4c829;
  .number-wrapper {
    .list {
      display: flex;
      flex-wrap: wrap;
      width: 90%;
      margin-left: 5%;
      color: #fff;
      .item {
        position: relative;
        min-width: 23%;
        margin: 1%;
        padding: 15px;
        text-align: center;
        border: 1px solid #fff;
        &.selected {
          color: @acticeColor;
          border-color: @acticeColor;
          .odds {
            color: @acticeColor;
          }
        }
        &.clicked:after {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          bottom: -2px;
          right: -2px;
          border-radius: inherit;
          border: 0 solid @acticeColor;
          opacity: .9;
          animation: buttonEffect .4s;
          display: block;
        }
        .value {
          line-height: 1;
          font-size: 34px;
          margin-bottom: 4px;
        }
        .odds {
          line-height: 1;
          font-size: 24px;
          color: rgba(255, 255, 255, .9);
        }
      }
    }
  }
</style>
