import React from 'react';
import styles from './notecard.module.css';

export default function NoteCard({cardData,handleDeleteNote}) {
  return (
    <div className={styles.card}>

      <div className={styles.cardDetails}>
        <h4>{cardData.title}</h4>
        <p>{cardData.description}</p>
      </div>

      <div className={styles.cardActions}>
        <button onClick={ () => handleDeleteNote(cardData.id)}>Delete</button>
      </div>

    </div>
  )
}