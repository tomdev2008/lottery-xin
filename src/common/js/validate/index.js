import Vue from 'vue'
import VeeValidate, {Validator} from 'vee-validate';
import zh from 'vee-validate/dist/locale/zh_CN';

const dictionary = {
  zh: {
    messages: {
      email: () => '无效邮箱',
      required: (field) => `${field}不能为空`,
      username: () => '无效用户名',
      phone: () => '必须是11位手机号码',
      confirmed: () => '密码不一致',
    },
    attributes: {
      email: '邮箱',
      username: '用户名',
      password: '密码',
      password1: '密码',
      password2: '密码',
      name: '账号',
      phone: '手机号码',
    }
  },
}
Validator.localize('zh', zh);
Validator.localize('zh', dictionary.zh);
Validator.extend('phone', {
  validate: value => {
    return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  }
});
Validator.extend('username', {
  getMessage: field => field + '不正确',
  /*messages: {
    zh: '请输入大于15小于200'
  },*/
  validate: value => {
    return /^1[6-9]$|^[2-9]\d$|^1\d{2}$/.test(value)
  }
})

const config = {};
Vue.use(VeeValidate, config);


