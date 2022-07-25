import React from 'react';
// import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';

import SelectCompany from './pages/company/SelectCompany';
import SelectUnity from './pages/units/SelectUnity';
import Routes from './routes';

function App() {
  return (
    <div>
      <Header />
      <Routes />
    </div>
  );
}

export default App;
