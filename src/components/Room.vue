<template>
  <div>
      <RoomMessages/>
      <div class="modal"  v-show="setName">
          <div class="modal-wrapper">
              <div class="modal-container">
                <h4>This is modal</h4>
                <input type="text" name="Name" id="name" v-model="name">
                <button @click="sendName" :disabled="!nameValid">Set name</button>
                <div>Please choose your name, the field must contain at least 4 symbols (Sorry, Ian)</div>
            </div>
          </div>
          </div>
          <div>

              List of players
              <div v-for="player of players" :key="player">
                  {{player.name}}
              </div>
              <div>
                  {{this.ReadyPlayers}}
              </div>
          </div>
    <h3>Welcome to the room {{$route.params.id}}!</h3>
    <DealerHand></DealerHand>
    <div class="playersGrid" >
        <div v-for="table of players" :key="table">
        <div v-if="table.name === playerName">
            <PlayerHand :player = table></PlayerHand>

        </div>
        <div v-else>
            <OpponentHand :player = table></OpponentHand>

        </div>
    </div>

    </div>
  </div>
  
</template>

<script>

import PlayerHand from "./PlayerHand"
import OpponentHand from "./OpponentHand"
import DealerHand from "./DealerHand"
import RoomMessages from "./RoomMessages"

export default {
  name: 'Room',
  data() {
    return {
    name: 'Player',
    }
  },

   components: {
       PlayerHand,
       OpponentHand,
       DealerHand,
       RoomMessages
  },

  sockets: {
        connect: function () {
            console.log('socket connected')
        },
        disconnect() {
      console.log('App.vue: client disconnected...');
    }

    },
  
  computed: {
    show() {
          return !this.$store.state.setName
      },
      ReadyPlayers() {
          let counter = 0
          for (let player of this.$store.state.multiPlayers) {
              if (player.isSpectating === false) {
                  counter++
              }
          }
          return `Ready ${counter}/${this.$store.state.multiPlayers.length}`
      },
      playerName() {
          return this.$store.state.name
      },
      players() {
          return this.$store.state.multiPlayers
      },
      nameValid() {
          if (this.name.length < 3) {
              return false
          }
          return true
      },
      id() {
          return this.$route.params.id
      },
      setName() {
          return this.$store.state.setName
      }

  },
  created: function () {
      console.log("Created")
      this.$socket.emit("enterRoom", {id: `${this.id}`}, data => {
          console.log(data)
          this.$store.dispatch('receiveMessages', data)
          if(this.$store.state.name === "") {
          this.$store.dispatch('chooseName')
          return
          }
          this.$socket.emit("nameChosen", {name: this.name}, data => {
               
               this.$store.commit("setStage", data)
               this.$store.commit("setMultiplayers", data)
               console.log(data)

           })
      })
  },
   beforeDestroy() {
       this.$socket.emit('disconnecting')
   },

   methods: {
       sendName() {
           this.$store.dispatch('chooseName')
           this.$socket.emit("nameChosen", {name: this.name}, data => {
               if (data.error) {
                   this.$store.dispatch('chooseName')
                   return
               }
               this.$store.commit("setStage", data)
               this.$store.commit("setMultiplayers", data)
           }),
           this.$store.commit("setName", {name: this.name})
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

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: table;
  transition: opacity .3s ease;

  }

  .modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  background: #fff;
  width: 450px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  margin: 0 auto;
  padding: 20px 30px;
}

.playersGrid {
  margin-top: 20vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>