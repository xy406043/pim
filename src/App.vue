<template>
  <div id="app">
    <!-- <link href="../public/cursor/default.ico" rel="icon" type="image/x-icon" /> -->
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isRouterAlive: true
    };
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  created() {
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>
<style lang="less">
.size {
  width: 100%;
  height: 100%;
}
html,
body {
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
</style>
