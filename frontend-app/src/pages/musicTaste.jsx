// MainContent.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Cross from "../assets/img/Cancel.png";

const MusicTaste = () => {
  const [spotifyId, setSpotifyId] = useState("");
  const [otherSpotifyId, setOtherSpotifyId] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi form kosong
    if (!spotifyId.trim() || !otherSpotifyId.trim()) {
      setPopupMessage("Fields cannot be empty.");
      setShowPopup(true);
      return;
    }

    // Simulasi validasi Spotify ID
    if (spotifyId === "no_playlist" || otherSpotifyId === "no_playlist") {
      setPopupMessage("No playlist available");
      setShowPopup(true);
    } else if (spotifyId === "invalid_id" || otherSpotifyId === "invalid_id") {
      setPopupMessage("User was not found");
      setShowPopup(true);
    } else {
      setShowPopup(false);

      navigate("/match-taste-result");
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setPopupMessage("");
  };

  return (
    <main className="bg-gray-200 container mx-auto px-20 py-16 text-center">
      <h2 className="text-3xl font-bold text-purple-700">Taste Matching Analytics</h2>
      <p className="text-gray-600 mt-4">
        🎵 Seberapa Mirip Selera Musik Kamu dengan Temanmu? Temukan sekarang dengan fitur Music Match Taste Analytics!
        Lihat persentase kesamaan dan ketahui lagu-lagu yang kalian sama-sama nikmati. Cocok buat nambah playlist seru! 🎶
      </p>
      <div className="mt-12 max-w-md mx-auto bg-green-500 p-8 rounded-3xl shadow-2xl">
        <h3 className="text-2xl font-bold text-lime-300 mb-6">LET'S MATCH</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Spotify ID"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
            onChange={(e) => setSpotifyId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Other Spotify ID"
            className="mt-5 w-full mb-6 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
            onChange={(e) => setOtherSpotifyId(e.target.value)}
          />
          <button 
            type="submit" 
            className=" font-bold mt-4 w-fit bg-purple-700 text-white py-2 px-4 rounded-3xl hover:bg-purple-600 shadow-2xl"
          >
            Start Matching
          </button>
        </form>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-indigo-950 p-8 rounded-lg shadow-xl text-center">
            <img className="mx-auto w-1/2 mb-2" src={Cross} alt="Cross Symbol" />
            <p className="text-lg text-white font-semibold mb-6">{popupMessage}</p>
            <button
              onClick={handleClosePopup}
              className="bg-white text-indigo-950 font-bold py-2 px-6 rounded-3xl w-1/2 hover:bg-purple-600"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default MusicTaste;
