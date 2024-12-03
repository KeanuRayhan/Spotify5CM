// MainContent.js
import React from 'react';

const MusicTaste = () => {
  return (
    <main className="bg-slate-200 container mx-auto px-20 py-16 text-center">
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
          <button type="submit" className=" font-bold mt-4 w-fit bg-purple-700 text-white py-2 px-4 rounded-3xl hover:bg-purple-600 shadow-2xl">Start Matching</button>
        </form>
      </div>
    </main>
  );
};

export default MusicTaste;
