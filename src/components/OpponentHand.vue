<template>
 <div>
  <div> {{this.player.name}}</div>
  <br/>
  <div class="CardWrap">
    <div class="CardGrid">
    <div v-for="card of playerCards" :key="card">
        <BaseCard :name="card"/>
    </div>
    </div>
    </div>
  </div>
  
</template>

<script>

export default {
  name: 'OpponentHand',
  props: {
      player: Object
  },

  sockets: {

    },
  
  computed: {
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