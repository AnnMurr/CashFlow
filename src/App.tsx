import React from 'react';
import { MainPage } from './components/ui/mainPage/mainPage';
import { PrivacyPolicy } from './components/ui/privacyPolicyPage/privacyPolicyPage';
import { HashRouter, Route, Routes } from 'react-router-dom';
import "./accets/styles/reset.css";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
