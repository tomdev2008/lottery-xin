<template>
  <form action="" @submit.prevent="doReg">
    <div class="form-wrapper">
      <div class="form-item">
        <svg-icon icon-class="user"></svg-icon>
        <input type="text" name="username" class="input"
               placeholder="6位字符"
               v-model="reg.username"
               v-validate="{ required: true, min:6, max:12}"
               @focus="changeFace('greeting')"
               @blur="changeFace">
        <div class="error" v-show="errors.has('username')">{{ errors.first('username') }}</div>
      </div>
      <div class="form-item">
        <svg-icon icon-class="password"></svg-icon>
        <input :type="pwdType" name="password1" class="input"
               ref="password1"
               placeholder="请输入密码"
               v-model="reg.password1"
               v-validate="{ required: true, min:6 }"
               @focus="changeFace('blindfold')"
               @blur="changeFace">
        <svg-icon :icon-class="eyeIcon" class="eye-close" @click.native="changeType"></svg-icon>
        <div class="error" v-show="errors.has('password1')">{{ errors.first('password1') }}</div>
      </div>
      <div class="form-item">
        <svg-icon icon-class="password"></svg-icon>
        <input :type="pwdType" name="password2" class="input"
               ref="password2"
               placeholder="确认密码"
               v-model="reg.password2"
               v-validate="{ required: true,  min:6, confirmed:'password1' }"
               @focus="changeFace('blindfold')"
               @blur="changeFace">
        <svg-icon :icon-class="eyeIcon" class="eye-close" @click.native="changeType"></svg-icon>
        <div class="error" v-show="errors.has('password2')">{{ errors.first('password2') }}</div>
      </div>
      <div class="form-item">
        <input type="submit" value="注 册" class="login-form-button"/>
      </div>
    </div>
    <div class="other-wrapper">
      <span class="register-text" @click="toggleSign('signIn')">已有账号?去登录</span>
    </div>
  </form>
</template>

<script>
  import mixin from 'common/js/mixins/signMixin';

  export default {
    name: "signUp",
    mixins: [mixin],
    data() {
      return {
        reg: {
          username: '',
          password1: '',
          password2: '',
        },
      }
    },
    methods: {
      doReg() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            console.log(result)
          } else {
            this.changeFace('sad')
          }
        });
      },
    },
  }
</script>
