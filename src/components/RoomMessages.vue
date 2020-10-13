<template>
  <div class="message-box" id = "container" >
    <div v-for="input in messages" :key="input"> 
        <div class="msg sender"> {{ input.sender }}</div>
        <div class="msg">{{ input.message }} </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RoomMessages',
  computed: {

      messages() {
          return this.$store.state.roomMessages
      }
  },
  methods: {

    
  },
  updated: function() {    	
      var container = document.querySelector("#container");
      container.scrollTop = container.scrollHeight;
    },
}
</script>

<style>
.message-box {

  position: fixed;
  display: flex;
  flex-direction: column;
  top: 20px;
  right: 20px;
  height: 200px;
  width: 300px;
  border:  1px solid teal;
  overflow-y: scroll;
  background-color: white;

}
.msg {
    padding: 4px 10px;
    text-align: start;
    font-size: 14px;
}

.msg.sender {
    margin-top: 10px;
    font-size: 10px;
}

</style>