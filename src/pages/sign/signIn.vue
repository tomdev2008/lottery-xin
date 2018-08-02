<template>
  <form action="" @submit.prevent="doLogin">
    <div class="form-wrapper">
      <div class="form-item">
        <svg-icon icon-class="user"></svg-icon>
        <input type="text" name="username" class="input"
               placeholder="用户名/手机号/邮箱"
               v-model="login.username"
               v-validate="{ required: true, min:6, max:12 }"
               @focus="changeFace('greeting')"
               @blur="changeFace">
        <div class="error" v-show="errors.has('username')">{{ errors.first('username') }}</div>
      </div>
      <div class="form-item">
        <svg-icon icon-class="password"></svg-icon>
        <input :type="pwdType" name="password" class="input"
               placeholder="请输入密码"
               v-model="login.password"
               @focus="changeFace('blindfold')"
               @blur="changeFace">
        <svg-icon :icon-class="eyeIcon" class="eye-close" @click.native="changeType"></svg-icon>
      </div>
      <div class="form-item">
        <input type="submit" value="登 录" class="login-form-button">
      </div>
    </div>
    <div class="other-wrapper">
      <div>
        <svg-icon icon-class="wechat" class="icon-other icon-wechat"></svg-icon>
        <svg-icon icon-class="github" class="icon-other icon-github"></svg-icon>
        <svg-icon icon-class="qq" class="icon-other icon-qq"></svg-icon>
      </div>
      <span class="register-text" @click="toggleSign('signUp')">注册账户</span>
    </div>
  </form>
</template>

<script>
  import mixin from 'common/js/mixins/signMixin';

  export default {
    name: "signIn",
    mixins: [mixin],
    data() {
      return {
        login: {
          username: '',
          password: '',
        },
      }
    },
    methods: {
      doLogin() {
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
