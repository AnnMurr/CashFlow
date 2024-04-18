import React from 'react';
import { MainPage } from './components/ui/mainPage/mainPage';
import { PrivacyPolicyPage } from './components/ui/privacyPolicyPage/privacyPolicyPage';
import { HashRouter, Route, Routes } from 'react-router-dom';
import "./accets/styles/reset.css";
import { AboutPage } from './components/ui/aboutPage/aboutPage';
import { ContactsPage } from './components/ui/contactsPage/contactsPage';
import { ContactUsPage } from './components/ui/contactUsPage/contactUsPage';
import { LoginPage } from './components/ui/loginPage/loginPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/contacts-us" element={<ContactUsPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
