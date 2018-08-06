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
    <transition name="fade" v-if="$store.getters.ajaxLoading">
      <loading></loading>
    </transition>
  </div>
</template>

<script>
  import Login from 'pages/login/index'
  import Loading from 'base/loading/index'

  export default {
    name: 'App',
    components: {
      Login, Loading
    },

  }
</script>
