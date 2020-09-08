import Vue from 'vue'
import Vuex from 'vuex'
import {deck} from "./deck"
import {shuff} from "./shuff"
import {blackJack} from "./blackJack"
import {defaultState} from "./defaultState"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      multiDealerCards: [],
      multiDealerScore: 0,
      name: "",
      room: false,
      roomMessages: [],
      setName: false,
      stage: 0,
      messages: [],
      multiPlayers: [],
      playerEnded: false,
      dealerCards: [],
      hasStarted: false,
      deck: [...deck],
      players: {
          "human1": {cards:[], isEnough: false, turns: 0, overDrafted: false, pickedCard: [], ownScore: 0},
          "human2": {cards:[], isEnough: false, turns: 0, overDrafted: false, pickedCard: [], ownScore: 0},
          "human3": {cards:[], isEnough: false, turns: 0, overDrafted: false, pickedCard: [], ownScore: 0},
        },

  },
  mutations: {
    setPlayerCard: (state,payload) => {
      for (let player of state.multiPlayers) {
        if (payload.name === player.name) {
          if (payload.card) {
          player.cards.push(payload.card)
        }
          player.isEnough = payload.isEnough
          player.ownScore = payload.ownScore
          player.overDrafted = payload.overDrafted
          player.turn = payload.turn
          player.isSpectating = payload.isSpectating
          player.acePick = payload.acePick
        }
      }

    },
    setMultiDealer: (state, payload) => {
      state.multiDealerCards = payload.cards
      state.multiDealerScore = payload.score
    },
    setStage: (state, payload) => {
      state.stage = payload.stage
    },
    setMultiplayers: (state, payload) => {
      state.multiPlayers = payload.players
    },
    setNaming: (state) => {
      state.setName = !state.setName
    },
    setName: (state, payload) => {
      state.name = payload.name
    },
      setRoom: (state, payload) => {
        state.room = payload.id
      },
      newMessage: (state, payload) => {
        state.roomMessages = [...state.roomMessages, payload.msg]
      },
      setMessages: (state, payload) => {
        state.roomMessages = [...payload.msgs]
      },
      increaseCount: (state, payload) => {
        state.players[payload.player].cards.push(state.players[payload.player].pickedCard.pop())
        console.log(payload.value)
        state.players[payload.player].ownScore += Number(payload.value)
        state.players[payload.player].turns += 1
      },
      dealerPick: (state) => {
        state.dealerCards = [...state.dealerCards,state.deck.pop()]
      },
      enough: (state,payload) => {
        state.players[payload.player].turns = 1337
        state.players[payload.player].isEnough = true
      },
      shuffle: state => state.deck = shuff(state.deck),
      pickCard: (state,payload) => {
          //[...state.playerCards, state.deck.pop()]
          state.players[payload.player].pickedCard = [...state.players[payload.player].pickedCard, state.deck.pop()]
        },
      start: (state) => {
        state.hasStarted = true
      },
      reset: (state) => {
          let s = defaultState()
          Object.keys(s).forEach(key => {
            state[key] = s[key]
          })
      },
      countOverdraft: (state, payload) => {
        if (payload.score > 21) {
          state.players[payload.player].overDrafted = true
          state.players[payload.player].turns = 1337
        }
      },
      playerEnded: (state) => {
        let holdPlayers = []
        for (let elem in state.players) {
          if (state.players[elem].isEnough || state.players[elem].overDrafted) {
            holdPlayers.push(true)
          }
          else {
            holdPlayers.push(false)
          }
        }
        console.log(holdPlayers)
        if (holdPlayers.indexOf(false) == -1) {
          state.playerEnded = true
          return
        }
        state.playerEnded = false
  
      },
      sendMsg: (state,payload) => {
        state.messages.push({sender: "System", message: payload.message})
      },
      setWins: (state, payload) => {
        if (state.playerEnded) {
          let messages = []
          for (let elem in payload.scores) {
            if (payload.dealerCount > 21) {
              let msg = {sender:"System", message: `The Dealer has been busted!`}
              messages.push(msg)
              state.messages = [...state.messages, ...messages]
              state.hasStarted = false
              return
            }
            if (payload.scores[elem] < payload.dealerCount || payload.scores[elem] > 21) {
              let msg = {sender:"System", message: `Player ${elem} has lost to the Dealer`}
              messages.push(msg)
            }
            else if (payload.scores[elem] == payload.dealerCount) {
              console.log(payload.dealerCount)
              let msg = {sender:"System", message: `Player ${elem} has earned a draw`}
              messages.push(msg)
            }
            else if (payload.scores[elem] > payload.dealerCount) {
              let msg = {sender:"System", message: `Player ${elem} has won`}
              messages.push(msg)
            }
          }
          state.messages = [...state.messages, ...messages]
          state.hasStarted = false
        }
      }
     
      

  },
  actions: {
    SOCKET_changeDealer({commit}, data) {
      commit('setMultiDealer', data)
    },
    SOCKET_changePlayers({commit}, data) {
      console.log("Changed the players array")
      commit("setMultiplayers", data)
    },
    SOCKET_changeStage({commit}, data) {
      commit("setStage", data)
    },
    SOCKET_changePlayerCard({commit}, data) {
      commit('setPlayerCard', data)
    },

    chooseName({commit}) {
      console.log("Request for name received")
      commit("setNaming")
    },
    SOCKET_newMessage( {commit}, data) {
      console.log('Message received' + data.text)
      commit('setRoom', data)
    },
    receiveMessages({commit}, data) {
      console.log(data)
      commit("setMessages", data)
    },
    SOCKET_receiveMessage({commit}, data) {
      console.log(data)
      commit("newMessage", data)

    },
      pickStart ({commit,dispatch}, payload) {
        commit('pickCard', payload)
        dispatch('countAce', payload)
        commit('pickCard', payload)
        dispatch('countAce', payload)
      },
      pickTemplate ({commit, dispatch}, payload) {
        commit('pickCard', payload)
        payload.message = `${payload.player} picked a card!`
        commit('sendMsg', payload)
        dispatch('countAce', payload)
        
     
      },
      countAce ({commit, state, getters}, payload) {
        for (let card of state.players[payload.player].pickedCard) {

            if (!/a[htcp]/ig.test(card)) {

              let value = blackJack([card])
              console.log(value)
              payload.value = value
              commit('increaseCount', payload)
              payload.score = getters.playerCount[payload.player]
              payload.scores = getters.playerCount
              payload.dealerCount = getters.dealerCount
              commit('countOverdraft', payload)
              commit('playerEnded', payload)
            }
            else {
              payload.message = `${payload.player} picked an Ace, choose it's worth!`
              commit('sendMsg', payload)
            }
        }
      },
      pickAndCount ({ commit, getters, dispatch, state }, payload  ) {
         dispatch('pickTemplate', payload)
          payload.score = getters.playerCount[payload.player]
          payload.scores = getters.playerCount
          payload.dealerCount = getters.dealerCount
          commit('countOverdraft', payload)
          commit('playerEnded', payload)
          if (state.playerEnded) {
            dispatch('countWinners', payload)
          }
          

      },
      startGame ({commit, state, dispatch}, payload) {
        commit('reset')
        commit("shuffle")
        commit('start')
        commit('dealerPick')
        commit('dealerPick')
        for (let player in state.players) {
          payload.player = player
          dispatch('pickStart', payload)
        }
        payload.message = "A game has started!"
        commit('sendMsg', payload)
      },
      enoughAndCount ({ commit, getters, state, dispatch}, payload  ) {
        payload.dealerCount = getters.dealerCount
        payload.scores = getters.playerCount
        commit('enough', payload)
        payload.message = `${payload.player} had enough!`
        commit('sendMsg', payload)
        commit('playerEnded', payload)
        if (state.playerEnded) {
          dispatch('countWinners', payload)
        }

    },
      countWinners ({commit, getters}, payload) {
        
        payload.dealerCount = getters.dealerCount
        payload.scores = getters.playerCount
        while (getters.dealerCount < 17) {
          commit('dealerPick')
        }
        payload.dealerCount = getters.dealerCount
        console.log(payload)
        commit('setWins', payload)
      }


  },
  getters: {
    playerCount: (state) => {
        let scores = {}
        for (let elem in state.players) {
            let score = state.players[elem].ownScore
            scores = {...scores, [elem]: score}
        }
        return scores
        
      },
      ifAces: (state) => {
        let obj = {}
        for (let player in state.players) {
          if (/a[htcp]/ig.test(state.players[player].pickedCard[0]) && state.players[player].pickedCard[0]) {
            obj[player] = true
          }
          else obj[player] = false
      }
        return obj
      },
    turnCounter: (state) => {
        let turnObj = {}
        let turnsArr = []
        Object.keys(state.players).map(a => {
          turnObj[a] = false
          turnsArr.push(state.players[a].turns)
          return
        })
        var min = Math.min.apply(Math, turnsArr)
        let turnPlayer = Object.keys(state.players)[turnsArr.indexOf(min)]
        turnObj[turnPlayer] = true
        return turnObj
    },
   dealerCount: (state) => {
     if (state.playerEnded) {
       return blackJack(state.dealerCards)
     }
     else {
       if (state.dealerCards[1]) {
         console.log(blackJack(state.dealerCards[1]))
       return ("x" + ` ${blackJack([state.dealerCards[1]])}`)
       }
       return "No cards"
     }
   }
    
  }
})