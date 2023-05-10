import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import AppRouter from './AppRouter'
import {useDispatch, useSelector} from "react-redux";
function App() {

    return (
      <BrowserRouter>
          <AppRouter/>
      </BrowserRouter>
  );
}

export default App;
