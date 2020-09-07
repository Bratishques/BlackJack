<template>
  <div v-if="dealerScore != 0"> 
  <h3>Dealer</h3>
  <div class="CardWrap">
    <div class="CardGrid">
  <div v-for="dealercard of dealerCards" :key="dealercard">
        
        <BaseCard :name="dealercard"/>
    </div>
     </div>
      </div>

  </div>
  
</template>

<script>

export default {
  name: 'DealerHand',
  props: {

  },

  sockets: {

    },
  
  computed: {
    dealerScore() {
        return this.$store.state.multiDealerScore
    },
    dealerCards() {
        return this.$store.state.multiDealerCards
    }

  },
    
   methods: {
       
    }
}
</script>