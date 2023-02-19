<template>
  <div id="app" class="main-content">
    <router-view :key="key" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      key: this.$route.path
    };
  }
  //   computed: {
  //     key() {
  //       return `${this.$route.path}${
  //         this.$route.params ? this.$route.params.tml : Math.random()
  //       }`;
  //     }
  //   },
};
</script>
>
<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
