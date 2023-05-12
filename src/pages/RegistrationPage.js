import React, {useContext, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {CHAT_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import Header from "../components/Header/Header";
import styles from "./Auth.module.css";
import {loginUser, registerUser} from "../service/authAPI";
import {AuthContext} from "../index";
import {useAuth} from "../auth";

const RegistrationPage = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const {register} = useAuth()

    const tryRegistration = async() => {
        try {
            await register(login, password)
            navigate(CHAT_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }}

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
                            placeholder=" password"
                            type="password"
                        />
                    </div>
                    <div className={styles.lilTextBlock}>
                        Have account?
                        <NavLink to={LOGIN_ROUTE}>Sign in!</NavLink>
                    </div>
                </div>
                <div>
                    <button className={styles.btn} onClick={() => tryRegistration()}>Registration</button>
                </div>
            </div>
        </>
    );
};

export default RegistrationPage;