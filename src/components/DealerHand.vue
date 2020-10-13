<template>
  <div v-if="dealerScore != 0"> 
  <h3>Dealer</h3>
  <div class="card-wrap">
    <div class="CardGrid">
  <div v-for="(dealercard, index) of dealerCards" :key="dealercard">
        
        <BaseCard :name="dealercard" :tableNumber="1337" :cardNumber=index />
    </div>
     </div>
      </div>
      <div>{{dealerScore}}</div>

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