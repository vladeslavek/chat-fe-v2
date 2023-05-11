import {
    useState,
    useEffect,
    createContext,
    useContext
} from 'react';
import { loginUser, registerUser } from "../service/authAPI";
import axios from "axios";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

function Auth({ children }) {
    const [isAuth, setIsAuth] = useState(false);
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const [currentUser, setCurrentUser] = useState('');

    const getSessionFromStorage = () => 'Bearer ' + localStorage.getItem('token');

    const login = async (login, password) => {
        await loginUser(login, password);

        setIsAuth(true);
        setCurrentUser(login);
    };

    const register = async (login, password) => {
        await registerUser(login, password);

        setIsAuth(true);
        setCurrentUser(login);
    };

    const logout = () => {
        localStorage.removeItem('token');

        setIsAuth(false);
        setCurrentUser('');
    };

    useEffect(() => {
        (async () => {
            if (localStorage.getItem('token')) {
                try {
                    const { data } = await axios.post('http://localhost:8080/token/validate', { token: getSessionFromStorage() });
                    setCurrentUser(data.username);
                    setIsAuth(true);
                } catch (e) {
                    logout();
                }
            }
            setIsAuthChecked(true);
        })();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, currentUser, register, login, logout }}>
            {isAuthChecked && children}
        </AuthContext.Provider>
    )
}

export default Auth;