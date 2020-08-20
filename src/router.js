import Vue from 'vue'
import VueRouter from 'vue-router'
import BlackJack from "./components/BlackJack"

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
      {path: "/blackjack", 

      component: BlackJack, 

      props: 
        {msg: "Hello There!"
        
      }
    }
    ]
 })