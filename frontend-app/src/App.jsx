import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop';

import Test from './pages/test'
import Home from './pages/Home'
import ArtistPopularity from './pages/ArtistPopularity';
import MatchTasteResult from './pages/MatchTasteResult';
import MusicTaste from './pages/musicTaste';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path='/test' element={<Test />} />
        <Route path='/' element={<Home />} />
        <Route path='/artist-popularity' element={<ArtistPopularity />} />
        <Route path='/music-taste' element={<MusicTaste />} />
        <Route path='/match-taste-result' element={<MatchTasteResult />} />
      </Routes>

      <Footer />
    </Router>
  )
}

export default App
