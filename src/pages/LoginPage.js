import React, {useState} from 'react';
import {CHAT_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {NavLink, useNavigate} from "react-router-dom";
import {loginUser} from "../service/authAPI";

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
        <div>
            <div>
                <label>Username</label>
                <input
                    value={login}
                    onChange={e => setLogin(e.target.value)}
                    placeholder="Введите имя пользователя"/>
                <label>Password</label>
                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="password"/>
                Ещё нет аккаунта?
                <NavLink to={REGISTRATION_ROUTE}> Зарегистрироваться!</NavLink>
            </div>
            <div>
                <button onClick={() => tryLogin()}>Войти</button>
            </div>
        </div>

    );
};

export default LoginPage;