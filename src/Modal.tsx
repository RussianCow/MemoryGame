import classNames from 'classnames'
import React from 'react'

import styles from './Modal.scss'

export default function Modal(
	{children, className}: {children: React.ReactNode, className?: string},
) {
	return (
		<div className={styles.modal}>
			<div className={classNames(styles.contents, className)}>
				{children}
			</div>
		</div>
	)
}
