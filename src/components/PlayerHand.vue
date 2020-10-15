<template>
  <div class="playerWrap">
    {{ this.player.name }}
    <br />
    <br />
    <div class="card-wrap">
      <div class="CardGrid">
        <div v-for="(card, index) of playerCards" :key="card">
          <BaseCard :name="card" :cardNumber = index :tableNumber = tableNumber />
        </div>
      </div>
    </div>
    <div class="room-button-wrap" v-if="!acePick">
    <button class="room-button ready-button" @click="ready" :disabled="!notReady">Ready</button>
    <button class="room-button pick-button" :disabled="!playStage" @click="pickCard">Pick card</button>
    <button class="room-button enough-button" :disabled="!playStage" @click="enough">Enough</button>
    </div>
    <div class="room-button-wrap" v-else>
    <button class="room-button one-button" :disabled="!acePick" @click="ace" :value="1">1</button>
    <button class="room-button eleven-button" :disabled="!acePick" @click="ace" :value="11">11</button>
     </div>
    <div class="player-status">
      <div>{{score}}</div>
      <div>{{status}}</div>
    </div>
   
  </div>
</template>

<script>
export default {
  name: "PlayerHand",
  props: {
    player: Object,
    tableNumber: Number,
    id: String
  },

  sockets: {},

  computed: {
    status() {
      let status = ""
      for (let player of this.$store.state.multiPlayers) {
        if (player.name === this.player.name) {
          if (player.overDrafted) {
          status = "Player had too much!";

          }
          else if (player.isEnough) {
          status = "Player holds";

          }
          else if (player.acePick) {
          status = "Choose Ace value";

          }
        }
      }
        return status
    },
    score() {
      let score = 0
      for (let player of this.$store.state.multiPlayers) {
        if (player.name === this.player.name) {
          if (player.ownScore) {
          score = player.ownScore;
          }
        }
      }
      return score
    },
    acePick() {
      let acePick = false;
      for (let player of this.$store.state.multiPlayers) {
        if (player.name === this.player.name) {
          acePick = player.acePick;
        }
      }
      return acePick;
    },
    notReady() {
      const readyFunc = () => {
        for (let player of this.$store.state.multiPlayers) {
          if (player.name === this.player.name) {
            return player.isSpectating;
          }
        }
      };
      if (this.$store.state.stage > 0) {
        return false;
      }
      return readyFunc();
    },
    playStage() {
      if (this.$store.state.stage != 1) {
        return false;
      }
      for (let player of this.$store.state.multiPlayers) {
        if (player.name === this.player.name) {
          return (
            !player.isSpectating &&
            !player.overDrafted &&
            !player.isEnough &&
            !player.acePick
          );
        }
      }

      return true;
    },
    playerCards() {
      let cards = [];
      for (let player of this.$store.state.multiPlayers) {
        if (player.name === this.player.name) {
          cards = [...player.cards, ...player.pickedCard];
        }
      }
      return cards;
    },
  },

  methods: {
    enough() {
      this.$socket.emit("enough", { name: `${this.player.name}`, id: this.id }, (data) => {
        this.$store.commit("setStage", data);
        if (data.stage > 1) {
          this.$socket.emit("countWinners", {id: this.id});
        }
      });
    },
    ace(event) {
      console.log(event.target.value);
      this.$socket.emit(
        "ace",
        { name: `${this.player.name}`, value: event.target.value, id: this.id },
        (data) => {
          this.$store.commit("setStage", data);
          if (data.stage > 1) {
            this.$socket.emit("countWinners", {id: this.id});
          }
        }
      );
    },
    pickCard() {
      this.$socket.emit("pickCard", { name: `${this.player.name}`, id: this.id }, (data) => {
        this.$store.commit("setStage", data);
        if (data.stage > 1) {
          this.$socket.emit("countWinners", {id: this.id});
        }
      });
    },

    ready() {
      // $socket is socket.io-client instance
      this.$socket.emit(
        "Ready",
        {
          text: `${this.player.name} is ready`,
          name: `${this.player.name}`,
          id: this.id 
        },
        (data) => {
          if (data.players) {
            this.$store.commit("setMultiplayers", data);
          }
          if (data.stage) {
            this.$store.commit("setStage", data);
          }
          if (data.cards && data.score) {
            this.$store.dispatch("SOCKET_changeDealer", data);
          }
        }
      );
    },
  },
};
</script>

<style>
.CardGrid {
  display: grid;
  grid-template-columns: repeat(3, 60px);
  grid-auto-rows: minmax(100px, auto);
  column-gap: 5px;
}
.card-wrap {
  display: flex;
  justify-content: center;
  background-color: green;
  padding: 20px 0;
  border-radius: 20px;
  max-width: 400px;
  margin: auto;
}

.player-status {
  padding: 10px 0;
  font-size: 20px;
}

.room-button {
  padding: 8px 8px;
  cursor: pointer;
  border-radius: 5px;
}

.room-button:disabled{
  opacity: 0.5;
  cursor:not-allowed;
}

.room-button-wrap {

  display: grid;
  grid-template-columns: repeat(3, 1fr) ;
  column-gap: 10px;
  padding: 5px 10px;
  justify-content: space-around;
}
</style>
