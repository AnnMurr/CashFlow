import React from 'react';
import { MainPage } from './components/ui/mainPage/mainPage';
import { PrivacyPolicyPage } from './components/ui/privacyPolicyPage/privacyPolicyPage';
import { HashRouter, Route, Routes } from 'react-router-dom';
import "./accets/styles/reset.css";
import { AboutPage } from './components/ui/aboutPage/aboutPage';
import { ContactsPage } from './components/ui/contactsPage/contactsPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
