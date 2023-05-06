import React from 'react';
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/consts";

const RegistrationPage = () => {
    return (
        <div>
            <label>Username</label>
            <input type="text" name="username" placeholder="username" />
            <label>Password</label>
            <input type="password" name="password" placeholder="password" />
            Уже есть аккаунт?
            <NavLink to={LOGIN_ROUTE}> Войти!</NavLink>
        </div>
    );
};

export default RegistrationPage;