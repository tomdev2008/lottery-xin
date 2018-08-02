<template>
  <div class="time-wrapper">
    <span>{{hours}}</span>
    <em>:</em>
    <span>{{minutes}}</span>
    <em>:</em>
    <span>{{seconds}}</span>
    <span>{{timer}}</span>
  </div>
</template>

<script>
  export default {
    name: "Countdown",
    props: {
      difference: {
        type: Number
      },
      startFlag: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
        timer: null
      }
    },
    watch: {
      /*difference(newVal) {
        this.timer && clearInterval(this.timer);
        if (newVal >= 0) {
          let difference = newVal
          this.countdown(difference)
          this.timer = setInterval(() => {
            difference--
            this.countdown(difference)
          }, 1000);
        } else {
          this.$emit('end');
        }
      },*/
      startFlag(newVal) {
        if (newVal) {
          this.timer && clearInterval(this.timer);
          if (this.difference >= 0) {
            let difference = this.difference
            this.countdown(difference)
            this.timer = setInterval(() => {
              difference--
              this.countdown(difference)
            }, 1000);
          } else {
            this.$emit('end');
          }
        }
      },
    },
    mounted() {
      if (!this.startFlag) return;
      let difference = this.difference
      this.countdown(difference)
      this.timer = setInterval(() => {
        difference--
        this.countdown(difference)
      }, 1000);
    },
    beforeRouteLeave() {
      console.log('beforeRouteLeave')
      this.timer && clearInterval(this.timer);
      this.timer = null;
    },
    methods: {
      countdown(difference) {
        if (difference < 0) {
          this.$emit('end');
          this.timer && clearInterval(this.timer);
          return;
        }
        var days = Math.floor(difference / (60 * 60 * 24));
        var hours = Math.floor(difference / (60 * 60)) - (days * 24);
        var minutes = Math.floor(difference / 60) - (days * 24 * 60) - (hours * 60);
        var seconds = Math.floor(difference) - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);
        this.days = days.toString().padStart(2, '0');
        this.hours = hours.toString().padStart(2, '0');
        this.minutes = minutes.toString().padStart(2, '0');
        this.seconds = seconds.toString().padStart(2, '0');
      },
    },
  }
</script>

<style scoped>
  .time-wrapper {
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
