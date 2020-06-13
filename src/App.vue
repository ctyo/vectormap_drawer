<template>
  <div id="app">
    <a
      class="forkme-line"
      href="https://github.com/ctyo/vectormap_drawer"
    ><img
        width="149"
        height="149"
        src="https://github.blog/wp-content/uploads/2008/12/forkme_left_darkblue_121621.png?resize=149%2C149"
        class="attachment-full size-full"
        alt="Fork me on GitHub"
        data-recalc-dims="1"
      ></a>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
html,
body,
#app {
  height: 100%;
}
.forkme-line {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99;
}
</style>
