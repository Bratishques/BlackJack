<template>
  <div>
    <h3>Multiplayer</h3>
    <button @click="clickButton" :disabled="roomCreated">New Room</button>

    <div v-if="roomCreated">
        <a @click="goTo">Room link</a> 
    </div>
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
      roomCreated() {
          return !!this.$store.state.room
      },
      room() {
          return this.$store.state.room
      }
  },
    
   methods: {
       goTo() {
           this.$router.push({path: `room/${this.room}`})
       },
       clickButton() {
            // $socket is socket.io-client instance
            this.$socket.emit('createRoom', {
                text: "From Client"
            })
        }
    }
}
</script>