// import './App.css';

import React from 'react';

import { HashRouter } from 'react-router-dom';

// import { DevTools } from 'jotai-devtools';

import LayoutPage from './pages/common/LayoutPage';

function App() {
  return (
    <div className="App">
      {/* <DevTools /> */}
      <HashRouter>
        <LayoutPage />
      </HashRouter>
    </div>
  );
}

export default App;
