import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import CamperDetailPage from './pages/CamperDetailPage';
import Header from './components/Header';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<CamperDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
