import React from 'react';
import { MainPage } from './components/ui/mainPage/mainPage';
import { HashRouter, Route, Routes } from 'react-router-dom';
import "./accets/styles/reset.css";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
