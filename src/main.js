import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store/store"
import VueSocketIO from 'vue-socket.io'
import BaseCard from './components/BaseCard'



Vue.component('BaseCard', BaseCard)
Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  debug: true,
  //connection: 'https://afternoon-island-59031.herokuapp.com/',
  connection: "http://localhost:5000/",
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  }, 
}))

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
