import React from 'react';
import styles from './Header.module.css';
const Header = () => {
    return (
        <div className={styles.headerBlock}>
            <span className={styles.headerText}>Chat Page</span>
            <span className={styles.exitContainer}>EXIT</span>
        </div>
    );
};

export default Header;