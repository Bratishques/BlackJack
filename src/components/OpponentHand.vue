<template>
 <div>
  <div> {{this.player.name}}</div>
  <br/>
  <div class="card-wrap">
    <div class="CardGrid">
    <div v-for="(card, index) of playerCards" :key="card">
        <BaseCard :name="card" :cardNumber = index :tableNumber = tableNumber />
    </div>
    
    </div>
    </div>
    <div class="player-status">
      <div>{{score}}</div>
      <div>{{status}}</div>
    </div>
  </div>
  
</template>

<script>

export default {
  name: 'OpponentHand',
  props: {
      player: Object,
      tableNumber: Number,
  },

  sockets: {

    },
  
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
          status = "Player has to choose Ace's value";

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
    playerCards() {
        let cards = []
        for (let player of this.$store.state.multiPlayers) {
            if (player.name === this.player.name) {
                cards = player.cards
              }
        }
        return cards
    }

  },
    
   methods: {
       
    }
}
</script>