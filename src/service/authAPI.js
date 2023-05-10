import axios from "axios";
import {$host} from "./index";

export const loginUser = async (login, password) => {
    const {data} = await $host.post('user/auth/', {}, {params: {
        login, password
        }})
    localStorage.setItem('token', data)
}

export const registerUser = async (login, password) => {
    const response = await $host.post('user/register/', {}, {params: {login, password}})
    if (response.status === 200) {
        await loginUser({ login, password });
    }
}