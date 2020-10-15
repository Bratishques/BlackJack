<template>
<div >
  <img
     :src="require(`../assets/x.svg`)"
     class="deck"
     :id="`deck`"
     v-bind="$attrs"
     @v-on="$listeners"
  />
  </div>
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
    padding: 10px;
    background-color: green;
    border-radius: 5px;
 }

 .deck-wrap {
    width: 60px;
  
 }

 </style>