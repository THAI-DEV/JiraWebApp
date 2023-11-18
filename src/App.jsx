import './App.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AuthContext } from './contexts/AuthContext';
import { useAuth } from './hooks/UseAuth';

import AppRoute from './AppRoute';
import LayoutPage from './pages/common/LayoutPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContext.Provider value={useAuth()}>
          <LayoutPage />
          <AppRoute />
        </AuthContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
