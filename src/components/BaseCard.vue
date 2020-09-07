<template>
  <img
     :src="require(`../assets/${name}.svg`)"
     class="BaseCard"
     v-bind="$attrs"
     @v-on="$listeners"
  />
</template>

<script>
export default {
  name: 'BaseCard',

  // Transparent wrapper component
  // https://vuejs.org/v2/guide/components-props.html#Disabling-Attribute-Inheritance
  inheritAttrs: false,

  props: {
    name: {
      type: String,
      required: true,
    },
  },
}
</script>

<style>
 .BaseCard {
   width: 60px;
   animation: appear 0.5s;
 }

 @keyframes appear {
     0% {
         opacity: 0;
     }
     100% {
         opacity: 1;
     }
 }
 </style>