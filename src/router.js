import Vue from 'vue'
import VueRouter from 'vue-router'
import Multiplayer from "./components/Multiplayer"
import Room from "./components/Room"

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
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