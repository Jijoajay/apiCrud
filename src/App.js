import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Main } from './components/Main';
import { Deletepage } from './components/Deletepage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import 'aos/dist/aos.css';

function App() {
  return (
    <Router>
      <ToastContainer /> 
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path="/Deletepage/:id" element={<Deletepage />} />
      </Routes>
    </Router>
  );
}

export default App;
