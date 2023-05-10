import React, {useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {CHAT_ROUTE, LOGIN_ROUTE} from "../utils/consts";

const RegistrationPage = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    return (
        <div>
            <label>Username</label>
            <input
                value={login}
                onChange={e => setLogin(e.target.value)}
                placeholder="username" />
            <label>Password</label>
            <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="password" />
            Уже есть аккаунт?
            <NavLink to={LOGIN_ROUTE}> Войти!</NavLink>
            <button onClick={() => navigate(CHAT_ROUTE)}>Зарегистрироваться</button>
        </div>
    );
};

export default RegistrationPage;