<template>
  <div id="app">
    <NavigationBar />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue';

export default {
  name: 'App',
  components: {
    NavigationBar,
  },
};
</script>

<style>
#app {
  min-height: 100vh;
  background-color: #f5f5f5;
}

main {
  min-height: calc(100vh - 60px);
}
</style>
