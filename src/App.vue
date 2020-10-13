<template>
  <div id="app">
    <Header/>
    <router-view class="layout"></router-view>
  </div>
</template>

<script>

import Header from "./components/Header"

export default {
  name: 'App',
  components: {
    Header,
  }
}
</script>

<style>

.layout {
  position: relative;
  margin-top: 150px;
  font-family: Roboto;
  padding: 0 60px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
button {

  background-color: rgb(88, 167, 187);
  border: none;
  color: white;
  font-family: Roboto;
}
</style>
