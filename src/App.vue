<template>
  <div id="app">
    <!--<keep-alive>
      &lt;!&ndash;<transition name="fade-transform">
        <router-view/>
      </transition>&ndash;&gt;
      <router-view/>
    </keep-alive>-->
    <router-view/>
    <login></login>
  </div>
</template>

<script>
  import Login from 'pages/login/index'

  export default {
    name: 'App',
    components: {
      Login
    }
  }
</script>
