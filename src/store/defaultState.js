import {deck} from "./deck"

export const defaultState = () => {

    return {
    playerEnded: false,
    dealerCards: [],
    hasStarted: false,
    deck: [...deck],
    players: {
        "human1": {cards:[], isEnough: false, turns: 0, overDrafted: false, pickedCard: [], ownScore: 0},
        "human2": {cards:[], isEnough: false, turns: 0, overDrafted: false, pickedCard: [], ownScore: 0},
        "human3": {cards:[], isEnough: false, turns: 0, overDrafted: false, pickedCard: [], ownScore: 0}
      },
    }
}
