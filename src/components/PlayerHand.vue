<template>
  <div class="playerWrap">
    {{ this.player.name }}
    <br />
    <br />
    <div class="CardWrap">
      <div class="CardGrid">
        <div v-for="(card, index) of playerCards" :key="card">
          <BaseCard :name="card" :cardNumber = index :tableNumber = tableNumber />
        </div>
      </div>
    </div>
    <button @click="ready" :disabled="!notReady">Ready</button>
    <button :disabled="!playStage" @click="pickCard">Pick card</button>
    <button :disabled="!playStage" @click="enough">Enough</button>
    <button :disabled="!acePick" @click="ace" :value="1">1</button>
    <button :disabled="!acePick" @click="ace" :value="11">11</button>
  </div>
</template>

<script>
export default {
  name: "PlayerHand",
  props: {
    player: Object,
    tableNumber: Number,
  },

  sockets: {},

  computed: {
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
      this.$socket.emit("enough", { name: `${this.player.name}` }, (data) => {
        this.$store.commit("setStage", data);
        if (data.stage > 1) {
          this.$socket.emit("countWinners");
        }
      });
    },
    ace(event) {
      console.log(event.target.value);
      this.$socket.emit(
        "ace",
        { name: `${this.player.name}`, value: event.target.value },
        (data) => {
          this.$store.commit("setStage", data);
          if (data.stage > 1) {
            this.$socket.emit("countWinners");
          }
        }
      );
    },
    pickCard() {
      this.$socket.emit("pickCard", { name: `${this.player.name}` }, (data) => {
        this.$store.commit("setStage", data);
        if (data.stage > 1) {
          this.$socket.emit("countWinners");
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
.CardWrap {
  display: flex;
  justify-content: center;
  background-color: green;
  padding: 20px 0;
  border-radius: 20px;
  max-width: 400px;
  margin: auto;
}
</style>
