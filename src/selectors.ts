import {State} from './reducer'

export const startState = (state: State) => state.startState
export const cardValues = (state: State) => state.cardValues
export const faceUpCardIndexes = (state: State) => state.faceUpCardIndexes
export const selectedCardIndexes = (state: State) => state.selectedCardIndexes
export const selectCounter = (state: State) => state.selectCounter
