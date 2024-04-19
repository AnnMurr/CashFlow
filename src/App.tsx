import React from 'react';
import { MainPage } from './components/ui/mainPage/mainPage';
import { PrivacyPolicyPage } from './components/ui/privacyPolicyPage/privacyPolicyPage';
import { HashRouter, Route, Routes } from 'react-router-dom';
import "./accets/styles/reset.css";
import { AboutPage } from './components/ui/aboutPage/aboutPage';
import { ContactsPage } from './components/ui/contactsPage/contactsPage';
import { ContactUsPage } from './components/ui/contactUsPage/contactUsPage';
import { SignUpPage } from './components/ui/signUpPage/signUpPage';
import { SignInPage } from './components/ui/signInPage/signInPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/contacts-us" element={<ContactUsPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
