import {
    useState,
    useEffect,
    createContext,
    useContext
} from 'react';
import {fetchLogin, loginUser, registerUser} from "../service/authAPI";
import axios from "axios";
import jwt_decode from 'jwt-decode'

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

function Auth({ children }) {
    const [isAuth, setIsAuth] = useState(false);
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const [currentUser, setCurrentUser] = useState('');
    const [currentUserId, setCurrentUserId] = useState()
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
                    setIsAuth(true)
                    const id = jwt_decode(localStorage.getItem('token'))
                    const login = await fetchLogin(id.sub)
                    setCurrentUser(login)
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