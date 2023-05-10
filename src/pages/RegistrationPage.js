import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {CHAT_ROUTE, LOGIN_ROUTE} from "../utils/consts";

const RegistrationPage = () => {
    const navigate = useNavigate()
    return (
        <div>
            <label>Username</label>
            <input type="text" name="username" placeholder="username" />
            <label>Password</label>
            <input type="password" name="password" placeholder="password" />
            Уже есть аккаунт?
            <NavLink to={LOGIN_ROUTE}> Войти!</NavLink>
            <button onClick={() => navigate(CHAT_ROUTE)}>Зарегистрироваться</button>
        </div>
    );
};

export default RegistrationPage;