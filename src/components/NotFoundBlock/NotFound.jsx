import React from 'react'

import styles from './NotFoundBlock.module.scss'

export const NotFound = () => {
  return (
    <div className={styles.root}>
        <h1>Вы прошли по ошибочной ссылке !!!!</h1>
        <p className={styles.description}>Вернитесь на главную страницу кликнув по картинке </p>
        <b className={styles.description}>React-pizza!!!</b>
    </div>
  )
}
