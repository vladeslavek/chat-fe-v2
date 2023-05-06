import React from 'react';
import {REGISTRATION_ROUTE} from "../utils/consts";
import {NavLink} from "react-router-dom";

const LoginPage = () => {
    return (
        <div>
            <label>Username</label>
            <input type="text" name="username" placeholder="username" />
            <label>Password</label>
            <input type="password" name="password" placeholder="password" />
            Ещё нет аккаунта?
            <NavLink to={REGISTRATION_ROUTE}> Зарегистрироваться!</NavLink>
        </div>
    );
};

export default LoginPage;