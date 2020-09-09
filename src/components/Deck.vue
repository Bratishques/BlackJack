<template>
  <img
     :src="require(`../assets/x.svg`)"
     class="deck"
     :id="`deck`"
     v-bind="$attrs"
     @v-on="$listeners"
  />
</template>

<script>
 

export default {
    
  name: 'Deck',

  // Transparent wrapper component
  // https://vuejs.org/v2/guide/components-props.html#Disabling-Attribute-Inheritance
  inheritAttrs: false,

  

  props: {
  
  },

   computed: {

    },


}
</script>

<style>
 .deck {
   width: 60px;
 }

 </style>