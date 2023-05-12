import React from 'react';
import styles from './Header.module.css';
import {useAuth} from "../../auth";
const Header = () => {
    const {logout} = useAuth()
    return (
        <div className={styles.headerBlock}>
            <span className={styles.headerText}>Chat Page</span>
            <span className={styles.exitContainer} onClick={logout}>EXIT</span>
        </div>
    );
};

export default Header;