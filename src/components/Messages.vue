<template>
  <div class="message-box">
    <div v-for="input in messages" :key="input"> 
        <div class="msg sender"> {{ input.sender }}</div>
        <div class="msg">{{ input.message }} </div>
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

<style>
.message-box {

  position: absolute;
  display: grid;
  grid-template-rows: "a";
  height: 200px;
  width: 300px;
  border:  1px solid teal;
  overflow-y: scroll;

}
.msg {
    padding: 5px 10px;
    text-align: start;
    font-size: 14px;
}

.msg.sender {
    font-size: 10px;
}

</style>