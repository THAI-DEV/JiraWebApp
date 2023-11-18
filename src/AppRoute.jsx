import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Progress } from './components/Progress';

const HomePage = lazy(() => import('./pages/common/HomePage'));
const InfoPage = lazy(() => import('./pages/common/InfoPage'));
const Ex001 = lazy(() => import('./pages/ex/Ex001Page'));
const Ex002 = lazy(() => import('./pages/ex/Ex002Page'));

function AppRoute() {
  return (
    <Suspense fallback={<Progress />}>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/Info" element={<InfoPage />} />

        <Route path="/ex001" element={<Ex001 />} />
        <Route path="/ex002" element={<Ex002 />} />

        <Route path="/*" element={<h1>There's nothing here!</h1>} />
      </Routes>
    </Suspense>
  );
}

export default AppRoute;
