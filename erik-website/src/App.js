import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Education from './components/Education';
import WorkExperience from './components/WorkExperience';
import Portfolio from './components/Portfolio';

const App = () => (
  <Router>
    <Header />
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/education" element={<Education />} />
      <Route path="/work" element={<WorkExperience />} />
      <Route path="/portfolio" element={<Portfolio />} />
    </Routes>
    <Footer />
  </Router>
);

export default App;
