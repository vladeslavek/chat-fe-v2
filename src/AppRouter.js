import React from 'react';
import {Routes, Navigate, Route} from 'react-router-dom'
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ChatPage from "./pages/ChatPage";
import {authRoutes, publicRoutes} from "./utils/routes";
import {LOGIN_ROUTE} from "./utils/consts";

const AppRouter = () => {
    const isAuth = false;
    return (

            <Routes>
                {isAuth && authRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} exact element={<Component />}/>
                )}
                {publicRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} exact element={<Component />}/>
                )}
                <Route path='*' element={<Navigate to={LOGIN_ROUTE} />} />
            </Routes>
    );
}

export default AppRouter;
