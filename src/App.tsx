import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HousePlants from './components/HousePlants';

function App() {
  return (
    <div className="App">
<BrowserRouter>
        <Routes>
          <Route path="/" element={<HousePlants  />} />
        </ Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
