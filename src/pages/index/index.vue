<template>
  <div class="index">
    <section class="slide-wrapper">
      <swiper :options="swiperOption">
        <swiper-slide>
          <img src="./../../assets/slide1.png" alt="">
        </swiper-slide>
        <swiper-slide><img src="./../../assets/slide1.jpg" alt=""></swiper-slide>
        <swiper-slide><img src="./../../assets/slide1.png" alt=""></swiper-slide>
        <swiper-slide><img src="./../../assets/slide2.jpg" alt=""></swiper-slide>
        <swiper-slide><img src="./../../assets/slide3.jpg" alt=""></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </section>
    <section class="main">
      <div class="panel lottery-hot">
        <h3 class="title">
          <svg-icon iconClass="hot"></svg-icon>
          热门彩
        </h3>
        <div class="scrollbar-hide">
          <div class="scroll-wrapper">
            <ul class="hot-list">
              <li class="hot-item">
                <img src="./../../assets/logo1.png" alt="">
                <h1 class="title">福彩3D</h1>
                <div class="desc">每天21:30开奖</div>
              </li>
              <li class="hot-item">
                <img src="./../../assets/logo3.png" alt="">
                <h1 class="title">重庆时时彩</h1>
                <div class="desc">每天21:30开奖</div>
              </li>
              <li class="hot-item">
                <img src="./../../assets/logo4.png" alt="">
                <h1 class="title">分分夺金</h1>
                <div class="desc">每天21:30开奖</div>
              </li>
              <li class="hot-item">
                <img src="./../../assets/logo2.png" alt="">
                <h1 class="title">北京PK10</h1>
                <div class="desc">每天21:30开奖</div>
              </li>
              <li class="hot-item">
                <img src="./../../assets/logo5.png" alt="">
                <h1 class="title">午夜狂欢</h1>
                <div class="desc">每天21:30开奖</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="panel">
        <h5 class="title">
          <strong>高频彩</strong>
          <small>地方特色，简单易中</small>
          <div class="more">
            <span>更多</span>
            <svg-icon iconClass="more"></svg-icon>
          </div>
        </h5>
        <ul class="list">
          <router-link tag="li" to="/lottery" class="item">
            <img src="./../../assets/cq_ssc.png" alt="" class="icon">
            <div class="info">
              <div class="name">重庆时时彩</div>
              <div class="desc">每5或10分钟1期</div>
            </div>
          </router-link>
          <li class="item">
            <img src="./../../assets/15.png" alt="" class="icon">
            <div class="info">
              <div class="name">广东11选5</div>
              <div class="desc">每天120期</div>
            </div>
          </li>
          <li class="item">
            <img src="./../../assets/bj_pk10.png" alt="" class="icon">
            <div class="info">
              <div class="name">北京PK10</div>
              <div class="desc">每5或10分钟1期</div>
            </div>
          </li>
          <li class="item">
            <img src="./../../assets/fflhc.png" alt="" class="icon">
            <div class="info">
              <div class="name">大发六合彩</div>
              <div class="desc">每5或10分钟1期</div>
            </div>
          </li>
          <li class="item">
            <img src="./../../assets/ffks.png" alt="" class="icon">
            <div class="info">
              <div class="name">大发快3</div>
              <div class="desc">每5或10分钟1期</div>
            </div>
          </li>
          <li class="item">
            <img src="./../../assets/sh_11x5.png" alt="" class="icon">
            <div class="info">
              <div class="name">上海11选5</div>
              <div class="desc">每5或10分钟1期</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="panel">
        <h5 class="title">
          <strong>地方彩</strong>
          <small>地方特色，简单易中</small>
          <div class="more">
            <span>更多</span>
            <svg-icon iconClass="more"></svg-icon>
          </div>
        </h5>
        <ul class="list">
          <li class="item">
            <img src="./../../assets/cq_ssc.png" alt="" class="icon">
            <div class="info">
              <div class="name">重庆时时彩</div>
              <div class="desc">每5或10分钟1期</div>
            </div>
          </li>
          <li class="item">
            <img src="./../../assets/15.png" alt="" class="icon">
            <div class="info">
              <div class="name">广东11选5</div>
              <div class="desc">每天120期</div>
            </div>
          </li>
          <li class="item">
            <img src="./../../assets/bj_pk10.png" alt="" class="icon">
            <div class="info">
              <div class="name">北京PK10</div>
              <div class="desc">每5或10分钟1期</div>
            </div>
          </li>
          <li class="item">
            <img src="./../../assets/fflhc.png" alt="" class="icon">
            <div class="info">
              <div class="name">大发六合彩</div>
              <div class="desc">每5或10分钟1期</div>
            </div>
          </li>
          <li class="item">
            <img src="./../../assets/ffks.png" alt="" class="icon">
            <div class="info">
              <div class="name">大发快3</div>
              <div class="desc">每5或10分钟1期</div>
            </div>
          </li>
          <li class="item">
            <img src="./../../assets/sh_11x5.png" alt="" class="icon">
            <div class="info">
              <div class="name">上海11选5</div>
              <div class="desc">每5或10分钟1期</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="loading_container">
        <div class="load_img" :style="{backgroundPositionY: -(positionY%6)*2.5 + 'rem'}"></div>
        <div class="load_ellipse"></div>
      </div>
    </section>

    <l-footer></l-footer>
  </div>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'
  import Pop from '@/base/pop/index'
  import LFooter from 'base/l-footer/index';

  export default {
    name: "index",
    data() {
      return {
        positionY: 0,
        timer: null,
        swiperOption: {
          effect: 'coverflow',
          centeredSlides: true,
          slidesPerView: "auto",
          initialSlide: 2,
          coverflowEffect: {
            rotate: 10,
            stretch: 2,
            depth: 200,
            modifier: 2,
            slideShadows: true
          },
        }
      }
    },
    components: {
      Pop, swiper, swiperSlide, LFooter
    },
    mounted() {
      this.timer = setInterval(() => {
        this.positionY++;
      }, 500)
    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
  }
</script>

<style lang="less" type="text/less" rel="stylesheet/less" scoped>
  @border-color: #eee;

  .index {
    padding-bottom: 100px;
    background: #f9f9f9;

    .main {
      .panel {
        background: #fff;
        margin-bottom: 30px;
        .title {
          position: relative;
          padding: 0 30px;
          font-size: 32px;
          line-height: 70px;
          border-bottom: 1px solid @border-color;
          small {
            font-size: 24px;
            color: #999;
          }
          .more {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #999;
            font-size: 24px;
          }
        }
        &.lottery-hot .title {
          text-align: center;
          border-bottom: 0;
        }
        .list {
          display: flex;
          flex-wrap: wrap;
          .item {
            width: 50%;
            display: flex;
            padding: 16px;
            border-bottom: 1px solid @border-color;
            border-right: 1px solid @border-color;
            &:nth-child(2n) {
              border-right: 0;
            }
            .icon {
              flex: 0 0 90px;
              width: 90px;
              height: 90px;
              margin-right: 20px;
            }
            .info {
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;
              .name {
                margin-bottom: 10px;
                font-size: 28px;
                color: #333;
              }
              .desc {
                font-size: 24px;
                color: #999;
              }
            }
          }
        }
        .hot-list {
          padding: 30px 0;
          display: flex;
          .hot-item {
            flex: 0 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 230px;
            height: 280px;
            border-radius: 10px;
            margin-right: 30px;
            color: #fff;
            &:nth-child(1) {
              border: 1px solid #fd9830;
              background: linear-gradient(to bottom, #f5634c, #fd9830);
              box-shadow: 3px 3px 30px rgba(245, 99, 76, .6);
            }
            &:nth-child(2) {
              border: 1px solid #be84fd;
              background: linear-gradient(to bottom, #6c51f4, #be84fd);
              box-shadow: 3px 3px 30px rgba(108, 81, 244, .6);
            }
            &:nth-child(3) {
              border: 1px solid #fcd730;
              background: linear-gradient(to bottom, #ffa901, #fcd730);
              box-shadow: 3px 3px 30px rgba(255, 169, 1, .6);
            }
            &:nth-child(4) {
              border: 1px solid #fd9830;
              background: linear-gradient(to bottom, #d22a39, #fd5023);
              box-shadow: 3px 3px 30px rgba(210, 42, 57, .6);
            }
            &:nth-child(5) {
              border: 1px solid #4dded9;
              background: linear-gradient(to bottom, #278af2, #4dded9);
              box-shadow: 3px 3px 30px rgba(39, 138, 242, .6);
            }
            img {
              width: 100px;
              height: 100px;
            }
            .title {
              font-size: 32px;
            }
            .desc {
              font-size: 22px;
            }
          }
        }
      }
      .scrollbar-hide {
        padding: 0 30px;
        overflow: hidden;
        .scroll-wrapper {
          padding-bottom: 20px;
          margin-bottom: -20px;
          white-space: nowrap;
          overflow-x: auto;
          overflow-y: hidden;
          -webkit-overflow-scrolling: touch;
        }
      }
    }
  }

  .slide-wrapper {
    background: #fff;
    margin-bottom: 15px;
  }

  .swiper-slide {
    width: 80%;
    margin: 20px 0;
    text-align: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
  }

  .popup-title {
    padding: 12px;
    background: #f3f5f9;
    color: #333;
    font-size: 24px;
  }

  .artist-item {
    height: 90px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f3f5f7;
    .avatar {
      width: 80px;
      height: 80px;
      margin-right: 20px;
    }
  }

  .loading-wrapper {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .menu-wrapper {
    font-size: 28px;
    background: #fff;
    .menu-item {
      position: relative;
      display: flex;
      align-items: center;
      padding: 0 30px;
      .icon {
        width: 50px;
        height: 50px;
        flex: 0 0 50px;
        color: #cf0f06;
      }
      .content {
        flex: 1;
        padding: 30px;
        border-bottom: 1px solid #eee;
        .artist {
          &:not(:last-child):after {
            content: '/';
            margin: 0 4px;
          }
        }
      }
      .icon-link {
        position: absolute;
        right: 30px;
        top: 50%;
        transform: translateY(-50%);
        color: #666;
      }
    }
  }

  .songs {
    background: #fff;
    min-height: 100%;
    min-height: calc(100vh - 385px);
    .loading-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100px;
    }
    .title {
      display: flex;
      align-items: center;
      height: 80px;
      padding-right: 20px;
      .icon {
        width: 80px;
        text-align: center;
        font-size: 36px;
      }
    }
    .list {
      overflow: hidden;
      .item {
        display: flex;
        align-items: center;
        .index {
          width: 80px;
          flex: 0 0 80px;
          text-align: center;
          color: #777;
        }
        .avatar {
          width: 70px;
          height: 70px;
          flex: 0 0 70px;
        }
        .content {
          flex: 1;
          padding: 15px;
          border-top: 1px solid #f3f5f7;
          .intro {
            margin-top: 4px;
            color: #999;
            font-size: 22px;
            .artists {
              _white-space: nowrap;
              line-height: 1.4;
              .artist:not(:last-child) {
                &:after {
                  content: '/';
                  margin: 0 2px;
                }
              }
            }
            .album {
              &:before {
                content: ' - ';
              }
            }
          }
        }
        .operate {
          min-width: 120px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          font-size: 30px;
          color: #666;
          .svg-icon {
            font-size: 32px;
            margin-right: 25px;
          }
        }
      }
    }
  }
</style>
