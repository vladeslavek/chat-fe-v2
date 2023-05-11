import React from 'react';
import {Routes, Navigate, Route} from 'react-router-dom'
import {authRoutes, publicRoutes} from "./utils/routes";
import {LOGIN_ROUTE} from "./utils/consts";
import {useAuth} from "./auth"

const AppRouter = () => {
    const {isAuth} = useAuth()
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
