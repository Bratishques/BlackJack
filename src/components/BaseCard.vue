<template>
  <img
     :src="require(`../assets/${name}.svg`)"
     class="BaseCard"
     :id="`card${cardNumber}${tableNumber}`"
     v-bind="$attrs"
     @v-on="$listeners"
  />
</template>
<script>

function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}
export default {
  name: 'BaseCard',

  // Transparent wrapper component
  // https://vuejs.org/v2/guide/components-props.html#Disabling-Attribute-Inheritance
  inheritAttrs: false,

  data: function() {
        return {
          offset: null,
          cardOffset: null
        }
    },
  props: {
    name: {
      type: String,
      required: true,
    },
    tableNumber: Number,
    cardNumber: Number
    
  },

  mounted: function() {
    var self = this
    var id = `card${this.cardNumber}${this.tableNumber}`
    var elem = document.getElementById(id)
    self.offset = getOffset(document.getElementById('deck'))    
    self.cardOffset = getOffset(elem)
    let giveCard = () => {
      var moveY = self.offset.top - this.cardOffset.top 
      var moveX = this.offset.left - this.cardOffset.left
      let start = Date.now()
      elem.style.top = moveY + "px"
      elem.style.left = moveX + "px"
      let timer = setInterval(function () {
        let timePassed = Date.now() - start;
        let approxX = Number(elem.style.top.replace(/px/gi,""))
        let approxY = Number(elem.style.left.replace(/px/gi,""))
        if ((approxX < 2 && approxX > -2) || (approxY < 2 && approxY > -2)) {
          elem.style.top = "0px"
          elem.style.left = "0px"
        clearInterval(timer); 
        return;
        }
        elem.style.top = moveY - (timePassed * (moveY/1400)) + "px"
        elem.style.left = moveX - (timePassed * (moveX/1400)) + "px"
      }, 10)
    }
    if (!document.hidden) {
    giveCard()
    }
  }

 
  
}
</script>

<style scoped>
 .BaseCard {
   width: 60px;
   position: relative;
   animation: appear 1.5s;
   --offtop: 0px;
   --offleft: 0px;
 }

 @keyframes appear {
   0% {
      opacity: 0;
   }
   3% {
     opacity: 0;
   }
   5% {
     opacity: 1;
   }
   100% {
      opacity: 1;

   }
 }

 </style>