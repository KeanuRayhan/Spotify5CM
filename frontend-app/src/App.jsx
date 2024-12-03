import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Test from './pages/test'
import Home from './pages/Home'
import ArtistPopularity from './pages/ArtistPopularity';
import MusicTaste from './pages/musicTaste';

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path='/test' element={<Test />} />
        <Route path='/' element={<Home />} />
        <Route path='/artist-popularity' element={<ArtistPopularity />} />
        <Route path='/music-taste' element={<MusicTaste />} />
      </Routes>

      <Footer />
    </Router>
  )
}

export default App
