import React from 'react';
import {Routes, Navigate, Route} from 'react-router-dom'
import PageOne from './pages/PageOne';
import PageTwo from './pages/PageTwo';
import PageThree from './pages/PageThree';

const AppRouter = () => {
    return (
            <Routes>
                <Route path="/" exact element={<PageOne />} />
                <Route path="/page-two" exact element={<PageTwo />} />
                <Route path="/page-three" exact element={<PageThree />} />
            </Routes>
    );
}

export default AppRouter;
