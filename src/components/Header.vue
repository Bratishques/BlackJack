<template>
  <div class="header">
    <router-link to="/"><h1>Logo</h1></router-link>
    <div class="routes">
    <router-link to="/blackjack">Blackjack</router-link>
    
    </div>
    
    <div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {

  }
}
</script>

<style scoped>

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 120px;
    border-bottom: 2px solid skyblue;
    }
</style>
