<template>
  <div>
    <h2>Multiplayer</h2>
    <button @click="clickButton" :disabled="roomCreated" class="create-room-button">New Room</button>

  </div>
</template>

<script>

export default {
  name: 'Multiplayer',
  props: {

  },

 

  sockets: {
        connect: function () {
            console.log('socket connected')
        },

    },
  
  computed: {

  },

  created: function () {
      this.$store.commit("setRoom",{id: ""})
  },
   methods: {

       clickButton() {
            this.$socket.emit('createRoom', {
                text: "From Client"
            }, data => {
                this.$router.push({path: `room/${data.id}`})
            })
        }
    }
}
</script>

<style>
.multiplayer-wrap {
    text-align: start;
}

.create-room-button {
    padding: 10px 20px;
    border-radius: 5px;
}

</style>