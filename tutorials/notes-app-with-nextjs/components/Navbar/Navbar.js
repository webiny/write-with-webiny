import React from 'react';
import styles from './navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <h4 className={styles.navHeading}>
        Notes App
      </h4>
    </nav>
  )
}
