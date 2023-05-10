import axios from "axios";

const $host = axios.create({
    baseURL: 'http://localhost:80/'
})

const $auth_host = axios.create({
    baseURL: 'http://localhost:80/'
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$auth_host.interceptors.request.use(authInterceptor)

export {
    $host,
    $auth_host
}