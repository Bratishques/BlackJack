<template>
  <div class="header">

    <div class="routes">
    <router-link to="/" class="link">Home</router-link>
    <router-link to="/multiplayer" class="link">Multiplayer</router-link>
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

.link {
  color: rgb(255, 255, 255);
  text-decoration: none;
  font-family: Roboto;
  transition: all 0.2s ease-in-out;

}

.link:hover{
  color: rgb(43, 43, 43);
}

.header {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 200px;
    background-color: rgb(88, 167, 187);
    width: 100%;
    top:0;
    left: 0;
    }

.routes {
    font-size: 20px;
    width: 20vw;
    display: flex;
    justify-content: space-between;


}
</style>
