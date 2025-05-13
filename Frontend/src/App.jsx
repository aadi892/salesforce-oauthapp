import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Edit from './pages/Edit';
import './styles/App.css';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path="/edit/:id" element={<Edit />} />

    </Routes>
  );
};



export default App;
