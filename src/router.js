import Vue from 'vue'
import VueRouter from 'vue-router'
import BlackJack from "./components/BlackJack"
import Multiplayer from "./components/Multiplayer"
import Room from "./components/Room"

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
    {
      path: "/blackjack", 
      component: BlackJack, 
      props: 
        {msg: "Hello There!"}
    },
    {
     path: "/multiplayer",
     component: Multiplayer
    },
    {
      path: "/room/:id",
    component: Room,
    }
    ]
 })