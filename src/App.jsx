// import './App.css';

import React from 'react';

import { HashRouter } from 'react-router-dom';

import LayoutPage from './pages/common/LayoutPage';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <LayoutPage />
      </HashRouter>
    </div>
  );
}

export default App;
