import React, {useState} from 'react';
import {CHAT_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {NavLink, useNavigate} from "react-router-dom";
import {loginUser} from "../service/authAPI";
import Header from "../components/Header/Header";
import styles from './Auth.module.css'

const LoginPage = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('')

    const tryLogin = async() => {
    try {
        let data;
        data = await loginUser(login, password)
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
                        value={login}
                        onChange={e => setLogin(e.target.value)}
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
                        placeholder=" password"/>
                </div>
                <div className={styles.lilTextBlock}>
                    No account?
                    <NavLink className={styles.lilTextBlock} to={REGISTRATION_ROUTE}>Sign up!</NavLink>
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