import React from 'react';

const MusicTaste = () => {
  // Fungsi untuk mengatur toggle navbar
  const toggleNavbar = () => {
    document.getElementById('navbarMenu').classList.toggle('hidden');
  };

  return (
    <div className="bg-gray-100 font-sans">
      {/* Navbar */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between sm:py-2">
          <div className="text-lg font-bold text-purple-600">SPOTIFY5CM</div>
          <button
            id="hamburgerButton"
            className="md:hidden text-purple-600 focus:outline-none"
            aria-label="Toggle Navigation"
            onClick={toggleNavbar}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <nav
            id="navbarMenu"
            className="hidden flex flex-col md:flex md:flex-row md:space-x-4 absolute md:static top-16 left-0 w-full md:w-auto bg-white shadow-lg md:shadow-none px-4 py-4 md:px-0 space-y-4 md:space-y-0 z-10"
          >
            <a href="#" className="font-bold text-gray-400 hover:text-purple-900">Home</a>
            <a href="#" className="font-bold text-gray-400 hover:text-purple-900">Top Popular Artist</a>
            <a href="#" className="font-bold text-gray-400 hover:text-purple-900">Music Taste Matching</a>
          </nav>
        </div>
      </header>

      {/* Main Section */}
      <main className="bg-slate-200 margincontainer mx-auto px-20 py-16 text-center">
        <h2 className="text-3xl font-bold text-purple-700">Taste Matching Analytics</h2>
        <p className="text-gray-600 mt-4">
          🎵 Seberapa Mirip Selera Musik Kamu dengan Temanmu? Temukan sekarang dengan fitur Music Match Taste Analytics!
          Lihat persentase kesamaan dan ketahui lagu-lagu yang kalian sama-sama nikmati. Cocok buat nambah playlist seru! 🎶
        </p>
        <div className="mt-12 max-w-md mx-auto bg-green-500 p-8 rounded-3xl shadow-2xl">
          <h3 className="text-2xl font-bold text-lime-300 mb-6">LET'S MATCH</h3>
          <form>
            <input
              type="text"
              placeholder="Your Spotify ID"
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
            />
            <input
              type="text"
              placeholder="Other Spotify ID"
              className="mt-5 w-full mb-6 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
            />
            <button type="submit" className="mt-4 w-fit bg-purple-700 text-white py-2 px-4 rounded-3xl hover:bg-purple-600 shadow-2xl">Start Matching</button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left">
          <div className="mx-auto md:mx-0 w-36">
            <img src="/src/img/Spotify_Full_Logo_RGB_Green.png" alt="Spotify Logo Green" />
          </div>
          <div className="mt-4 md:mt-0">
            <p>© 2024 Spotify5CM by Kelompok 5CM. All Rights Reserved</p>
            <div className="mt-4 space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">Cookies</a>
              <a href="#" className="text-gray-400 hover:text-white">Privacy and Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MusicTaste;
