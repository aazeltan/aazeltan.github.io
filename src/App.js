// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import About from './pages/About';
import Playground from './pages/Playground';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <>
      <div className="app-navbar-wrapper">
        <Navbar />
      </div>
      <ScrollToTop />
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/about" element={<About />} />
         <Route path="/playground" element={<Playground />} />
      </Routes>
      <div className="app-footer-wrapper">
        <Footer />
      </div>
    </>
  );
}

export default App;
