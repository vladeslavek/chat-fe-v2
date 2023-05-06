import {CHAT_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "./consts";
import ChatPage from "../pages/ChatPage";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";

export const authRoutes = [
    {
        path: CHAT_ROUTE,
        Component: ChatPage,
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: LoginPage,
    },
    {
        path: REGISTRATION_ROUTE,
        Component: RegistrationPage,
    },
]