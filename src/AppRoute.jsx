import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Progress } from './components/Progress';

const HomePage = lazy(() => import('./pages/common/HomePage'));
const InfoPage = lazy(() => import('./pages/common/InfoPage'));
const LoginPage = lazy(() => import('./pages/common/LoginPage'));

const Ex001 = lazy(() => import('./pages/ex/Ex001Page'));
const App001 = lazy(() => import('./pages/app/app001/App001Page'));

function AppRoute() {
  return (
    <Suspense fallback={<Progress />}>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* <Route path="/ex001" element={<Ex001 />} /> */}

        <Route path="/app001" element={<App001 />} />

        <Route path="/*" element={<h1>There's nothing here!</h1>} />
      </Routes>
    </Suspense>
  );
}

export default AppRoute;
