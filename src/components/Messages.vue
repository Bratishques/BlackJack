<template>
  <div>
    <div class="message-box" v-for="input in messages" :key="input"> 
        <div> {{ input.sender }}</div>
        <div>{{ input.message }} </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Messages',
  computed: {
      messages() {
          return this.$store.state.messages
      }
  }
}
</script>

<style scoped>
.message-box {
  position: relative;
  display: contents;
    height: 200px;
    border:  1px solid teal;
}
</style>