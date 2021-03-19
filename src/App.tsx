import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import * as actions from './actions'
import Game from './Game'
import Modal from './Modal'
import * as selectors from './selectors'

import styles from './App.scss'

export default function App() {
	const dispatch = useDispatch()
	const startState = useSelector(selectors.startState)
	const selectCounter = useSelector(selectors.selectCounter)
	const startGame = () => dispatch(actions.startGame())
	return (
		<React.Fragment>
			<Game />
			{startState === 'not-started' && (
				<Modal className={styles.modal}>
					<h2>Welcome to the Memory Game!</h2>
					<p>
						Click on a card to reveal its value, then click on
						another card to see if they match; if they don't, the
						cards are flipped back down. The goal is to match every
						card to its identical twin.
					</p>
					<p>Have fun!</p>
					<button onClick={startGame}>Start Game</button>
				</Modal>
			)}
			{startState === 'finished' && (
				<Modal className={styles.modal}>
					<h2>You win!</h2>
					<p>It only took {selectCounter} clicks!</p>
					<p>Play again?</p>
					<button onClick={startGame}>New Game</button>
				</Modal>
			)}
		</React.Fragment>
	)
}
