export default {
  data() {
    return {
      pwdType: 'password',
    }
  },
  computed: {
    eyeIcon() {
      return this.pwdType == 'password' ? 'eye' : 'eye-o';
    }
  },
  methods:{
    changeType() {
      this.pwdType == 'password' ? this.pwdType = 'text' : this.pwdType = 'password';
      if (this.pwdType == 'password') {
        this.blindfoldFlag = true;
        this.normalFlag = this.greetingFlag = this.sadFlag = false;
      } else {
        this.normalFlag = true;
        this.blindfoldFlag = this.greetingFlag = this.sadFlag = false;
      }
    },
    changeFace(flag) {
      this.$emit('changeFace', flag)
    },
    toggleSign(flag) {
      this.$emit('toggleSign', flag);
      this.changeFace();
    }
  },
}
