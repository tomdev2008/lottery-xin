<template>
  <transition name="slideTop">
    <div class="sign"
         ref="sign"
         @touchstart.capture="touchStart"
         @touchmove.capture="touchMove"
         @touchend.capture="touchEnd"
         v-if="$store.getters.showLogin">
      <div class="login-wrapper">
        <div class="panfish">
          <img src="../../assets/normal.png" class="normal" v-show="normalFlag" alt="">
          <img src="../../assets/greeting.png" class="greeting" v-show="greetingFlag" alt="">
          <img src="../../assets/blindfold.png" class="blindfold" v-show="blindfoldFlag" alt="">
          <img src="../../assets/sad.png" class="normal" v-show="sadFlag" alt="">
        </div>
        <transition name="slideLeft">
          <component :key="loginFlag" :is="loginFlag" @changeFace="changeFace" @toggleSign="toggleSign"></component>
        </transition>

      </div>
      <svg-icon icon-class="close" class="icon-close" @click.native="toggleLogin(false)"></svg-icon>
    </div>
  </transition>
</template>

<script>
  import SignIn from '../sign/signIn';
  import SignUp from '../sign/signUp';

  export default {
    name: "Login",
    components: {
      SignIn, SignUp
    },
    data() {
      return {
        normalFlag: true,
        greetingFlag: false,
        blindfoldFlag: false,
        sadFlag: false,

        startY: 0,
        endY: 0,

        loginFlag: 'SignIn'
      }
    },
    methods: {
      touchStart(e) {
        if (e.target.tagName == 'INPUT') {
          return
        }
        e.preventDefault();
        this.startY = e.touches[0].clientY;
      },
      touchMove(e) {
        if (e.target.tagName == 'INPUT') {
          return
        }
        e.preventDefault();
        this.moveY = e.touches[0].clientY;
        this.diffY = this.moveY - this.startY;
        if (this.diffY < 0) return
        this.$refs.sign.style.transform = `translateY(${this.diffY}px)`;
        this.$refs.sign.style.transition = `all 0s`;
        this.$refs.sign.style.transitionTimingFunction = 'linear';
      },
      touchEnd(e) {
        if (e.target.tagName == 'INPUT') {
          console.log('touchEnd', e.target.tagName)
          return
        }
        this.endY = e.changedTouches[0].clientY;
        //console.log(e.target.tagName)
        if (e.target.tagName == 'use' || e.target.tagName == 'svg') return
        if (this.endY - this.startY > 100) {
          this.$refs.sign.style.transform = `translateY(100%)`;
          this.$refs.sign.style.transition = `all 300ms`;
          this.$refs.sign.style.transitionTimingFunction = 'ease-in';
          this.$refs.sign.addEventListener('transitionend', () => {
            this.toggleLogin(false)
          })
        } else {
          this.$refs.sign.style.transform = `translateY(0px)`;
          this.$refs.sign.style.transition = `all 500ms`;
          this.$refs.sign.style.transitionTimingFunction = `cubic-bezier(0.165, 0.84, 0.44, 1)`;
        }
      },
      toggleLogin(flag) {
        this.$store.commit('TOGGLE_LOGIN', flag)
      },
      toggleSign(flag) {
        this.loginFlag = flag;
      },
      changeFace(flag) {
        if (flag == 'sad') {
          this.sadFlag = true;
          this.normalFlag = this.greetingFlag = this.blindfoldFlag = false;
        } else if (flag == 'greeting') {
          this.greetingFlag = true;
          this.normalFlag = this.sadFlag = this.blindfoldFlag = false;
        } else if (flag == 'blindfold') {
          this.blindfoldFlag = true;
          this.normalFlag = this.sadFlag = this.greetingFlag = false;
        } else {
          this.normalFlag = true;
          this.sadFlag = this.greetingFlag = this.blindfoldFlag = false;
        }
      },
    }
  }
</script>

<style lang="less">
  .sign {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 10000;
    background: linear-gradient(0deg, #f3f5f9, #fff);
    .icon-close {
      position: fixed;
      bottom: 60px;
      left: 50%;
      transform: translateX(-50%);
      color: #333;
      font-size: 70px;
    }
    .login-wrapper {
      position: absolute;
      left: 0;
      right: 0;
      top: 300px;
      .panfish {
        img {
          position: absolute;
          top: 0;
          left: 50%;
          z-index: 1;
          -webkit-box-reflect: below 0 -webkit-linear-gradient(top, rgba(250, 250, 250, 0), rgba(250, 250, 250, .0) 30%, rgba(250, 250, 250, .15));
          &.normal {
            width: 250px;
            transform: translate(-50%, -83%);
          }
          &.greeting {
            width: 250px;
            transform: translate(-50%, -75.8%);
          }
          &.blindfold {
            width: 200px;
            transform: translate(-50%, -75%);

          }
        }

      }
      form {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        .form-wrapper {
          border-top: 1px solid #ddd;
          .form-item {
            position: relative;
            display: flex;
            align-items: center;
            margin: 46px 30px 0;
            &:not(:last-child) {
              border-bottom: 1px solid #ddd;
            }
            .error {
              position: absolute;
              left: 0;
              top: 100%;
              font-size: 24px;
              color: #d22a39;
              padding-left: 60px;
            }
            .svg-icon {
              font-size: 32px;
              color: #999;
              &.eye-close {
                font-size: 48px;
              }
            }
            .input {
              width: 100%;
              height: 80px;
              padding: 0 30px;
              font-size: 28px;
              background: none;
            }
            .login-form-button {
              width: 100%;
              height: 80px;
              margin-bottom: 30px;
              border: none;
              border-radius: 10px;
              background: linear-gradient(0deg, #273247, #404f6b);;
              color: #fff;
              font-size: 34px;
            }
          }
        }
        .other-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 30px;
          margin-top: 10px;
          .icon-other {
            font-size: 60px;
            margin-right: 10px;
            &.icon-qq {
              color: #009bff;
              font-size: 62px;
            }
            &.icon-github {
              color: #333;
            }
            &.icon-wechat {
              color: #00cc4e;
            }
          }
          .register-text {
            color: #666;
            text-decoration: none;
          }
        }
      }

    }
  }
</style>
