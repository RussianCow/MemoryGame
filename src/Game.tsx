import classNames from 'classnames'
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import * as actions from './actions'
import * as selectors from './selectors'

import styles from './Game.scss'

function Card(
	{
		value,
		faceUp,
		solved,
		invalid,
		selectable,
		onClick,
	}: {
		value: number,
		faceUp: boolean,
		solved: boolean,
		invalid: boolean,
		selectable: boolean,
		onClick: () => void,
	}
) {
	return (
		<div
			onClick={selectable ? (() => onClick()) : undefined}
			className={classNames(
				styles.card,
				faceUp ? styles.up : styles.down,
				{
					[styles.selectable]: selectable,
					[styles.solved]: solved,
					[styles.invalid]: invalid,
				},
			)}
		>
			{faceUp && value}
		</div>
	)
}

export default function Game() {
	const dispatch = useDispatch()
	const cardValues = useSelector(selectors.cardValues)
	const faceUpIndexes = useSelector(selectors.faceUpCardIndexes)
	const selectedCardIndexes = useSelector(selectors.selectedCardIndexes)
	const selectCard = (index: number) => dispatch(actions.selectCard(index))
	return (
		<div className={styles.game}>
			{cardValues.map((value, index) => {
				const faceUp = faceUpIndexes.includes(index)
				return (
					<Card
						value={value}
						faceUp={faceUp}
						solved={faceUp && !selectedCardIndexes.includes(index)}
						invalid={
							faceUp &&
							selectedCardIndexes.includes(index) &&
							selectedCardIndexes[1] !== null
						}
						selectable={
							(!faceUp && !selectedCardIndexes.includes(index)) ||
							// If both cards have been selected, either of them
							//   is fair game to start the next selection.
							(selectedCardIndexes[0] !== null && selectedCardIndexes[1] !== null)
						}
						onClick={() => selectCard(index)}
						key={index}
					/>
				)
			})}
		</div>
	)
}
