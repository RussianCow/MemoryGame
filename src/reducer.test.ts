import * as actions from './actions'
import {NUM_CARDS} from './constants'
import reducer from './reducer'

const initialState = reducer(undefined, {type: ''})
const startedState = {
	...reducer(undefined, actions.startGame()),
	// Unshuffle the cards to make it easier.
	cardValues: initialState.cardValues,
}

test('starting the game sets the start state and shuffles the cards', () => {
	const state = reducer(initialState, actions.startGame())
	expect(state.startState).toBe('started')
	// NOTE: This doesn't technically make sure the cards are shuffled, since
	//   there's randomness involved, but it checks to make sure the array of
	//   card values is new and that every value is accounted for correctly.
	expect(initialState.cardValues.length).toBe(state.cardValues.length)
	expect(initialState.cardValues).not.toBe(state.cardValues)
	for (let value = 0; value < NUM_CARDS / 2; value++) {
		const valueCount = state.cardValues.filter(val => val === value).length
		expect(valueCount).toBe(2)
	}
})

test('selecting incorrect cards', () => {
	let state = reducer(startedState, actions.selectCard(0))
	expect(state.selectedCardIndexes).toStrictEqual([0, null])
	state = reducer(state, actions.selectCard(2))
	expect(state.selectedCardIndexes).toStrictEqual([0, 2])
	state = reducer(startedState, actions.selectCard(1))
	expect(state.selectedCardIndexes).toStrictEqual([1, null])
	state = reducer(state, actions.selectCard(3))
	expect(state.selectedCardIndexes).toStrictEqual([1, 3])
})

test('selecting correct cards', () => {
	let state = reducer(startedState, actions.selectCard(0))
	expect(state.selectedCardIndexes).toStrictEqual([0, null])
	state = reducer(state, actions.selectCard(1))
	expect(state.selectedCardIndexes).toStrictEqual([null, null])
	expect(state.faceUpCardIndexes).toContain(0)
})

test('selecting cards increases the counter', () => {
	expect(startedState.selectCounter).toBe(0)
	let state = reducer(startedState, actions.selectCard(0))
	state = reducer(state, actions.selectCard(1))
	state = reducer(state, actions.selectCard(2))
	state = reducer(state, actions.selectCard(3))
	expect(state.selectCounter).toBe(4)
})

test('selecting all cards finishes the game', () => {
	let state = startedState
	for (let index = 0; index < NUM_CARDS; index++) {
		state = reducer(state, actions.selectCard(index))
	}
	expect(state.startState).toBe('finished')
	expect(state.faceUpCardIndexes.length).toBe(state.cardValues.length)
})
