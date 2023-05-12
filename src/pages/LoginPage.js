import React, {useContext, useState} from 'react';
import {CHAT_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {NavLink, useNavigate} from "react-router-dom";
import {loginUser} from "../service/authAPI";
import Header from "../components/Header/Header";
import styles from './Auth.module.css'
import {AuthContext} from "../index";
import {useAuth} from "../auth";

const LoginPage = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('')
    const {login} = useAuth()
    const tryLogin = async() => {
    try {
        await login(user, password)
        navigate(CHAT_ROUTE)
    } catch (e) {
        alert(e.response.data.message)
    }}
    const navigate = useNavigate();
    return (
        <>
            <Header/>
        <div className={styles.contentBlock}>
            <div>
                <div>
                    <label className={styles.textBlock}>Login</label>
                </div>
                <div>
                    <input
                        className={styles.inputBlock}
                        value={user}
                        onChange={e => setUser(e.target.value)}
                        placeholder=" login"/>
                </div>
                <div>
                    <label className={styles.textBlock}>Password</label>
                </div>
                <div>
                    <input
                        className={styles.inputBlock}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder=" password"
                        type="password"
                    />
                </div>
                <div className={styles.lilTextBlock}>
                    No account?
                    <NavLink to={REGISTRATION_ROUTE}>Sign up!</NavLink>
                </div>
            </div>
            <div>
                <button className={styles.btn} onClick={() => tryLogin()}>Login</button>
            </div>
        </div>
        </>
    );
};

export default LoginPage;