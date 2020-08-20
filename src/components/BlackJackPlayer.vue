<template>
  <div class="Player">
    <h3>{{playerCount}}</h3>
    <div id="playerDeck">
      <div v-for="item of playerCards" :key="item">
        {{ item }}
      </div>
    </div>
    <button @click="pickAndCount" :disabled="disabled">Pick Card</button>
    <button @click="enough" :disabled="disabled">Enough!</button>
    <button @click="aceHandler" :disabled="aceSituation" value="1">1</button>
    <button @click="aceHandler" :disabled="aceSituation" value="11">11</button>
  </div>
</template>

<script>

export default {
  name: 'BlackJackPlayer',
  props: {
    player: String
  },
  
  computed: {

    disabled(){
      return (!this.$store.state.hasStarted || this.$store.state.players[this.player].overDrafted || this.$store.state.players[this.player].isEnough || !this.$store.getters.turnCounter[this.player])
    },
    aceSituation() {
      return (!this.$store.getters.turnCounter[this.player] || !this.$store.getters.ifAces[this.player])
    },

    deck() {
      return this.$store.state.deck
    },
    playerCards() {
      return this.$store.state.players[this.player].cards
    },
    playerCount() {
      return this.$store.getters.playerCount[this.player]
    }
  },

   methods: {
    aceHandler(event) {
      return this.$store.commit('increaseCount', {player: this.player, value: event.target.value})
    },
    playerId () {
        return this.player
    },
    enough() {
      this.$store.dispatch('enoughAndCount', {player: this.player})
    },
    countCards () {
      this.$store.commit('countCards')
    },
    shuffle() {
      this.$store.commit('shuffle')
    },
    pickCard() {
      this.$store.commit('pickCard')
    },
    pickAndCount() {
      this.$store.dispatch("pickAndCount", {player: this.player})
    }
    }
}
</script>