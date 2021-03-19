import shuffleArray from 'array-shuffle'

import {SELECT_CARD, START_GAME} from './actions'
import type {Action} from './actions'
import {NUM_CARDS} from './constants'

export type StartState = 'not-started' | 'started' | 'finished'

export interface State {
	startState: StartState,
	cardValues: number[],
	faceUpCardIndexes: number[],
	selectedCardIndexes: (number | null)[],
	selectCounter: number,
}

function makeCardValues(): number[] {
	const cards = []
	for (let value = 0; value < NUM_CARDS / 2; value++) {
		cards.push(value)
		cards.push(value)
	}
	return cards
}

const initialState: State = {
	startState: 'not-started',
	cardValues: makeCardValues(),
	faceUpCardIndexes: [],
	selectedCardIndexes: [null, null],
	selectCounter: 0,
}

export default function reducer(state = initialState, action: Action): State {
	switch (action.type) {
		case START_GAME:
			return {
				...initialState,
				startState: 'started',
				cardValues: shuffleArray(state.cardValues),
			}

		case SELECT_CARD:
			const newState = {
				...state,
				selectCounter: state.selectCounter + 1,
			}
			const index = action.payload
			const value = state.cardValues[index]

			// Selecting our first card.
			if (
				state.selectedCardIndexes[0] === null ||
				(state.selectedCardIndexes[0] !== null && state.selectedCardIndexes[1] !== null)
			) {
				// First, flip the previously selected cards down.
				if (state.selectedCardIndexes[0] !== null && state.selectedCardIndexes[1] !== null) {
					newState.faceUpCardIndexes = newState.faceUpCardIndexes.filter(index =>
						!state.selectedCardIndexes.includes(index)
					)
				}

				newState.faceUpCardIndexes = [...newState.faceUpCardIndexes, index]
				newState.selectedCardIndexes = [index, null]
				return newState
			}

			// Selecting our second card.
			if (state.selectedCardIndexes[1] === null) {
				const previouslySelectedIndex = state.selectedCardIndexes[0]
				const previouslySelectedValue = state.cardValues[previouslySelectedIndex]
				newState.faceUpCardIndexes = [...newState.faceUpCardIndexes, index]
				if (value === previouslySelectedValue) {
					newState.selectedCardIndexes = [null, null]
				}
				else {
					newState.selectedCardIndexes = [state.selectedCardIndexes[0], index]
				}
				if (newState.faceUpCardIndexes.length === newState.cardValues.length) {
					newState.startState = 'finished'
				}
				return newState
			}

			throw new Error(
				`\`selectedCardIndexes\` is invalid (${state.selectedCardIndexes}). This should never happen.`
			)
		default:
			return state
	}
}
