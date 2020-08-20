<template>
  <div class="Player">
    <h3>{{playerCount}}</h3>
    <div id="playerDeck">
      <div v-for="item of playerCards" :key="item">
        {{ item }}
      </div>
    </div>
    <button @click="pickAndCount" v-bind:value="playerId()">Pick Card</button>
  </div>
</template>

<script>

export default {
  name: 'BlackJackOpponent',
  props: {
    player: String
  },
  
  computed: {

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
    playerId () {
        return this.player
    },
    enough() {
      this.$store.commit('enough', {player: this.props.player})
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
    pickAndCount(event) {
      this.$store.dispatch("pickAndCount", {player: event.target.value})
    }
    }
}
</script>