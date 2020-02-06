<template>

  <div id="app">
    <!-- <link href="../public/cursor/default.ico" rel="icon" type="image/x-icon" /> -->
    <router-view />
  </div>
</template>

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
