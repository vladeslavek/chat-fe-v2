import React from 'react';
import {CHAT_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {NavLink, useNavigate} from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate()
    return (
        <div>
            <label>Username</label>
            <input type="text" name="username" placeholder="username" />
            <label>Password</label>
            <input type="password" name="password" placeholder="password" />
            Ещё нет аккаунта?
            <NavLink to={REGISTRATION_ROUTE}> Зарегистрироваться!</NavLink>
            <button onClick={() => navigate(CHAT_ROUTE)}>Войти</button>
        </div>
    );
};

export default LoginPage;