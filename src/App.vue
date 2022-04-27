<template>
  <div>
    <router-view v-if="isShow"></router-view>
  </div>
</template>

<script>

import Index from "./views/Index";
export default {
  name: 'app',
  components: {
  Index
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isShow: true
    }
  },
  methods: {
    reload() {
      this.isShow = false
      this.$nextTick(function () {
        this.isShow = true
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
html, body, #app {
  font-family: 'Helvetica Neue', 'Hiragino Sans GB', 'WenQuanYi Micro Hei', 'Microsoft Yahei', sans-serif;
  height: 100%;
  padding: 0;
  margin: 0;
  font-size: 15px;
}
.router-link{
  text-decoration: none;
}
</style>
