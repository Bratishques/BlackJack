<template>
  <div class="Player">
    <h3>{{dealerCount}}</h3>
    <div id="playerDeck">
      <div v-for="item of dealerCards" :key="item">
        {{ item }}
      </div>
    </div>
    <button @click="pickAndCount" v-bind:value="player()">Pick Card</button>
  </div>
</template>

<script>

export default {
  name: 'BlackJackDealer',


  computed: {

    deck() {
      return this.$store.state.deck
    },
    dealerCards() {
      return this.$store.state.dealerCards
    },
    dealerCount() {
      return this.$store.getters.dealerCount
    }
  },

   methods: {
       player () {
        return "ai"
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