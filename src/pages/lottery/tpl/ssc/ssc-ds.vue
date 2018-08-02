<template>
  <div class="selectNumber">
    {{str}}--{{codes}}
    <textarea id="textarea-code" v-model="str"></textarea>
  </div>
</template>

<script>
  export default {
    name: "SSC",
    data() {
      return {
        str: '',
        codes: []
      }
    },
    watch: {
      str(newStr) {
        console.log(newStr, newStr.length % 5)
        if (newStr.length && newStr.length % 5 == 0) {
          this.codes = this.codes.concat(newStr.match(new RegExp('\\d{' + 5 + '}', 'g')));
        } else {
          console.log('输入号码不正确1')
        }
      }
    },
  }
</script>

<style lang="less" scoped>
  .selectNumber {
    padding: 20px;
    #textarea-code {
      width: 100%;
      height: 300px;
      padding: 20px;
    }
  }
</style>
