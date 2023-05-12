import axios from "axios";
import {$auth_host, $host} from "./index";

export const loginUser = async (login, password) => {
    const {data} = await $host.post('user/auth/', {}, {params: {
        login: login, password: password
        }})
    localStorage.setItem('token', data)
}

export const registerUser = async (login, password) => {
    const response = await $host.post('user/register/', {}, {params: {login: login, password: password}})
    if (response.status === 200) {
        await loginUser(login, password);
    }
}

export const fetchLogin = async (id) => {
    const {data} = await $auth_host.get('user/', {params: {
        sender_id: id
        }})
    return data;
}