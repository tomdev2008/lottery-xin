<template>
  <div class="time-wrapper">
    <span>{{hours}}</span>
    <em>:</em>
    <span>{{minutes}}</span>
    <em>:</em>
    <span>{{seconds}}</span>
  </div>

</template>

<script>
  export default {
    name: 'Clocker',
    mounted() {
      if (this.start) {
        this.tick()
      }
    },
    data() {
      return {
        interval: null,
        index: 0,
        currentTime: 60,
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
      }
    },
    props: {
      value: Number,
      start: {
        type: Boolean,
        default: true
      }
    },
    created() {
      //this.currentTime = this.time
      if (this.value) this.currentTime = this.value
    },
    destroyed() {
      clearInterval(this.interval);
      this.interval = null;
    },
    methods: {
      tick() {
        this.interval = setInterval(() => {
          if (this.currentTime > 0) {
            this.currentTime--;
            var days = Math.floor(this.currentTime / (60 * 60 * 24));
            var hours = Math.floor(this.currentTime / (60 * 60));
            var minutes = Math.floor(this.currentTime / 60) - (days * 24 * 60) - ((hours-(days * 24)) * 60);
            var seconds = Math.floor(this.currentTime) - (days * 24 * 60 * 60) - ((hours-(days * 24)) * 60 * 60) - (minutes * 60);
            this.days = days.toString().padStart(2, '0');
            this.hours = hours.toString().padStart(2, '0');
            this.minutes = minutes.toString().padStart(2, '0');
            this.seconds = seconds.toString().padStart(2, '0');
          } else {
            this.stop();
            this.index++;
            this.$emit('end', this.index);
          }
        }, 1000)
      },
      stop() {
        clearInterval(this.interval)
      }
    },
    watch: {
      value(val) {
        this.currentTime = val
      },
      currentTime(val) {
        this.$emit('input', val)
      },
      start(newVal, oldVal) {
        if (newVal === true && oldVal === false) {
          this.tick()
        }
        if (newVal === false && oldVal === true) {
          this.stop()
        }
      }
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
