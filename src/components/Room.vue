<template>
    <div>
         <div class="modal"  v-show="setName">
          <div class="modal-wrapper">
              <div class="modal-container">
                <h4>Please choose your nickname</h4>
                <div class="modal-input-wrap">
                <input type="text" name="Name" id="name" v-model="name">
                <button @click="sendName" :disabled="!nameValid" class="room-button">Set name</button>
                </div>
                <div v-if="!this.namingError">Please choose your name, the field must contain at least 4 symbols (Sorry, Ian)</div>
                <div v-else> {{this.namingError}} </div>
            </div>
          </div>
          </div>
  <div v-if="!error" class="room-wrap">
      <div v-if="players.length > 0">
      <RoomMessages/>
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
    <Deck/>
    <div class="playersGrid" >
        <div v-for="(table, index) of players" :key="index">
        <div v-if="table.name === playerName">
            <PlayerHand :player = table :tableNumber = index :id = $route.params.id></PlayerHand>
        </div>
        <div v-else>
            <OpponentHand :player = table :tableNumber = index></OpponentHand>

        </div>
    </div>

    </div>
   
  </div>
     <div v-else> {{error}}</div>
  </div>
  
  
</template>

<script>
import Deck from "./Deck"
import PlayerHand from "./PlayerHand"
import OpponentHand from "./OpponentHand"
import DealerHand from "./DealerHand"
import RoomMessages from "./RoomMessages"

export default {
  name: 'Room',
  data() {
    return {
    name: 'Player',
    namingError: ""

    }
  },

   components: {
       PlayerHand,
       OpponentHand,
       DealerHand,
       RoomMessages,
       Deck
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
      error() {
          let error = ""
          if (!this.$store.state.error) {
              error = this.$store.state.roomError
          }
          return error
      },
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
          if (this.name.length < 4) {
              return false
          }
          return true
      },
      id() {
          return this.$route.params.id
      },

      setName() {
          return this.$store.state.setName
      },
      messages() {
          return this.$store.state.roomMessages
      }

  },
  created: function () {
    this.$store.commit("setName", {name: ""})
     this.$store.commit("setMultiDealer", {score:0, cards: []})
     this.$store.commit("setMultiplayers", {players: []})
      console.log("Created")
      this.$socket.emit("enterRoom", {id: `${this.id}`}, data => {
          if (data.error) {
              this.$store.commit("setRoomError", data)
              return
          }
          this.$store.dispatch('receiveMessages', data)
          if(this.$store.state.name === "") {
          this.$store.dispatch('chooseName')
          return
          }

      })
  },
   beforeDestroy() {
        this.$socket.emit('disconnecting', {id : this.id})
        this.$store.commit("setRoomError", {error: ""})
   },

   methods: {
       sendName() {
           this.$store.dispatch('chooseName')
           this.$socket.emit("nameChosen", {name: this.name, id: this.id}, data => {
               if (data.error) {
                   this.$store.dispatch('chooseName')
                   this.namingError = "Please choose different name, this one is taken"
                   return
               }
               this.$store.commit("setMultiDealer", data)
               this.$store.commit("setStage", data)
               this.$store.commit("setMultiplayers", data)
               return
           }),
           this.$store.commit("setName", {name: this.name})
       },
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

.room-wrap {
    text-align: center;
}

.playersGrid {
  margin-top: 20vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.modal-input-wrap {
    display: grid;
    grid-template-columns: 150px 100px;
    column-gap: 20px;
    margin-bottom: 20px;
}


</style>