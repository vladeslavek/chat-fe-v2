import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import AppRouter from './AppRouter'
import {Layout} from './components/Layout.jsx'
function App() {
  return (
      <Layout>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
      </Layout>
  );
}

export default App;
