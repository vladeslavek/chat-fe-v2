import React, {createContext} from 'react'
import {BrowserRouter} from 'react-router-dom'
import AppRouter from './AppRouter'
import {useDispatch, useSelector} from "react-redux";
import Auth from './auth/index'
function App() {
    return (
            <BrowserRouter>
                <div className={'wrapper'}>
                    <Auth>
                        <AppRouter/>
                    </Auth>
                </div>
            </BrowserRouter>
    );
}
export default App;
