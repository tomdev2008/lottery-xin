<template>
  <ul class="number-wrapper">
    <li class="number-list" v-for="(item,index) in numbers">
      <h5 class="title" v-if="item.title">{{item.title}}</h5>
      <ul class="ball-list" :class="{'lhc':$store.getters.currentPlay.type == 'lhc'}">
        <li class="ball-item"
            :class="{'selected':num.selected}"
            v-for="(num,i) in item.numList"
            @click="selectNum($event,index,i,num)">
          <!--时时彩龙虎斗-->
          <div class="ball longHu" v-if="$store.getters.currentPlay.type == 'longHu'">
            <span>{{num.num}}</span><em class="odds">{{num.odds ? num.odds : '赔率 2.88'}}</em>
          </div>
          <!--六合彩-->
          <div class="ball" v-else-if="$store.getters.currentPlay.type == 'lhc'">
            <div class="top">
              <span>{{num.num}}</span>
              <em class="odds">{{num.odds ? num.odds : '赔率 2.000'}}</em>
            </div>
            <p class="egs" v-if="num.egs && num.egs.length">
              <i v-for="eg in num.egs">{{eg<10?'0'+eg:eg}}</i>
            </p>
          </div>
          <span class="ball" :class="num.color" v-else>
            {{num.num}}
          </span>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "numberList",
    props: {
      numbers: {
        type: Array,
        default: []
      },
      color: {
        type: String,
        default: ''
      }
    },
    computed: {
      ballCls() {
        return `ball`
      }
    },
    methods: {
      selectNum(el, index, i, num) {
        let canDrop;
        if (this.numbers[index].numList[i].selected) {
          this.$set(this.numbers[index].numList[i], 'selected', false);
          canDrop = false;
        } else {
          this.$set(this.numbers[index].numList[i], 'selected', true);
          canDrop = true;
        }
        if (this.$store.getters.currentPlay.type == 'lhc') canDrop = false;
        this.$emit('add', el, el.target.innerHTML, this.numbers, canDrop, num.color)
      },
      reset(){
        this.numbers=[]
      },
    },
  }
</script>

<style lang="less" scoped>
  .number-wrapper {
    .number-list {
      display: flex;
      align-items: start;
      padding: 20px 20px 0;
      margin-bottom: 20px;
      &:not(:last-child) {
        border-bottom: 1px solid #dfdfda;
      }
      .title {
        width: 98px;
        margin: 10px 20px;
        padding: 10px 20px;
        font-size: 28px;
        color: #bbb39c;
        background: #eeebda;
        border: 1px solid #e3decf;
        border-radius: 6px;
        line-height: 1;
      }
      .ball-list {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        &.lhc {
          .ball-item {
            min-width: 23%;
            margin: 1% 1% 2%;
            height: auto;
            &.selected {
              .ball {
                .odds{
                  color: #fff;
                }
                .egs {
                  color: #fff;
                  border-top-color: #faa0a3;
                }
              }
            }
            .ball {
              width: 100%;
              height: auto;
              min-height: 120px;
              flex-direction: column;
              justify-content: space-between;
              border-radius: 8px;
              font-size: 34px;
              .top{
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
              }
              .odds {
                margin: 6px 0;
                font-size: 22px;
              }
              .egs {
                display: flex;
                align-items: center;
                justify-content: space-around;
                width: 100%;
                height: 32px;
                padding: 0 20px;
                color: #999;
                border-top: 1px solid #dfdfdf;
                font-size: 20px;
                .eg {
                  margin: 0 4px;
                }
              }
            }
          }
        }
        .ball-item {
          min-width: 20%;
          margin-bottom: 40px;
          text-align: center;
          &.selected .ball {
            background: #dc3b40;
            color: #fff;
            border-color: #dc3b40;
            &.red {
              background: #dc3b40;
              background: linear-gradient(0deg, #f87b7e 0, #dc3b40 75%);
              color: #fff;
            }
            &.blue {
              background: #218ddd;
              background: linear-gradient(0deg, #6ebefa 0, #218ddd 75%);
              color: #fff;
            }
            &.green {
              background: #38b366;
              background: linear-gradient(0deg, #69d893 0, #38b366 75%);
              color: #fff;
            }
          }
          .ball {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 66px;
            height: 66px;
            color: #dc3b40;
            background: #faf9f6;
            border-radius: 50%;
            border: 1px solid #dfdfdf;
            font-size: 30px;
            transition: background .3s, border-color .3s;
            .odds{
              color: #666;
            }
            &.red {
              color: #dc3b40;
              border-color: #dc3b40;
            }
            &.blue {
              color: #218ddd;
              border-color: #218ddd;
            }
            &.green {
              color: #38b366;
              border-color: #38b366;
            }
            &.longHu {
              flex-direction: column;
              width: 140px;
              height: 90px;
              margin-left: 20px;
              margin-right: 30px;
              border-radius: 0;
              .odds {
                margin-top: 6px;
                font-size: 22px;
              }
            }
          }
        }
      }
    }
  }
</style>
