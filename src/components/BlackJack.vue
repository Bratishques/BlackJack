

<template>
  <div class="hello">
    <Messages></Messages>
    <h1>This is BlackJack</h1>
    <BlackJackDealer></BlackJackDealer>
    <h2>{{msg}}</h2>
    <div class = "players">
    <BlackJackPlayer player = "human1"></BlackJackPlayer>
    <BlackJackPlayer player = "human2"></BlackJackPlayer>
    <BlackJackPlayer player = "human3"></BlackJackPlayer>
    </div>
    <button  @click="startGame" :disabled="hasStarted">Start Game</button>
  </div>
</template>

<script>
import BlackJackPlayer from "./BlackJackPlayer"
import Messages from "./Messages"
import BlackJackDealer from "./BlackJackDealer"

export default {
  name: 'BlackJack',

  components: {
      BlackJackPlayer,
      Messages,
      BlackJackDealer
  },
  props: {
    msg: String,
  },
  methods: {
    startGame() {
     this.$store.dispatch("startGame", {})
  }
  },
  computed: {
    hasStarted() {
      return this.$store.state.hasStarted
    }
  }

  }
</script>

<style scoped>

.hello {
}
.players {
  margin-top: 20vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>

