// import './App.css';

import React from 'react';

import { HashRouter } from 'react-router-dom';

import { AuthContext } from './contexts/AuthContext';
import { useAuth } from './hooks/UseAuth';

import LayoutPage from './pages/common/LayoutPage';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <AuthContext.Provider value={useAuth()}>
          <LayoutPage />
        </AuthContext.Provider>
      </HashRouter>
    </div>
  );
}

export default App;
