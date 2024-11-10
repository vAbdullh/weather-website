import React from 'react';
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Docs from './pages/Docs';
import DataProvider from './context/DataProvider';
export default function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}
