export const START_GAME = 'START_GAME'
export const SELECT_CARD = 'SELECT_CARD'

export interface StartGameAction {
	type: 'START_GAME',
}
export interface SelectCardAction {
	type: 'SELECT_CARD',
	payload: number,
}
// For miscellaneous actions, such as the Redux init action.
export interface OtherAction {
	type: string,
	payload?: any,
}

export type Action = StartGameAction | SelectCardAction | OtherAction

export function startGame(): StartGameAction {
	return {type: 'START_GAME'}
}

export function selectCard(index: number): SelectCardAction {
	return {
		type: SELECT_CARD,
		payload: index,
	}
}
