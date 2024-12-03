import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Icon from '../assets/img/Icon.png';
import MusicMatchImg from '../assets/img/music-match-taste.png';
import TopPopularArtistImg from '../assets/img/top-popular-artist.png';
import Rectangle1 from '../assets/img/Rectangle 1.png';
import Rectangle2 from '../assets/img/Rectangle 2.png';
import SpotifyBlack from '../assets/img/Spotify_Full_Logo_RGB_Black.png';

export default function Home() {
    const musicMatchRef = useRef(null);
    const topPopularArtistRef = useRef(null);
    const navigate = useNavigate();

    const scrolltoSection = (ref) => {
        ref.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="bg-gray-100 font-sans">
            {/* Hero Section */}
            <section className="bg-gray-200 py-20">
                <div className="container mx-auto flex flex-col lg:flex-row items-center">
                    <div className="flex-1 px-4 text-center lg:text-left">
                        <h1 className="text-4xl lg:text-6xl font-bold text-purple-900 mb-4">
                            SPOTIFY<span className="text-purple-600">5CM</span>
                        </h1>
                        <p className="text-gray-900 text-base lg:text-lg mb-8">
                            SPOTIFY5CM is a fun web application for checking your music habits
                            on Spotify! Here, you can get cool insights about the popularity of
                            artists in various regions and see who has similar musical tastes
                            to you.
                        </p>
                        <button 
                            className="bg-purple-900 text-white font-bold text-lg px-6 py-3 rounded-3xl hover:bg-purple-700"
                            onClick={() => scrolltoSection(musicMatchRef)}
                        >
                            Getting Started
                        </button>
                    </div>
                    <div className="flex-1 self-center mt-8 lg:mt-0">
                        <img
                            className="mx-auto w-1/2 lg:w-auto"
                            src={Icon}
                            alt="icon"
                        />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            {/* Music Taste Matching */}
            <section 
                ref={musicMatchRef}
                className="bg-lime-400 flex flex-col lg:flex-row items-center shadow"
            >
                <div className="flex-1 p-4 lg:p-8 self-center">
                    <img
                        className="mx-auto w-1/2 lg:w-auto"
                        src={MusicMatchImg}
                        alt="music-match-taste-icon"
                    />
                </div>
                <div className="flex-1 p-4 lg:p-8 text-center">
                    <h2 className="text-4xl font-bold text-purple-900 mb-4">
                        Music Taste Matching
                    </h2>
                    <p className="text-gray-900 text-base lg:text-lg mb-6">
                        Check how well your music tastes match those of other people and find
                        song recommendations that match your preferences!
                    </p>
                    <button className="bg-purple-900 text-white font-bold text-lg px-6 py-3 rounded-3xl hover:bg-purple-700">
                        Try Now
                    </button>
                </div>
            </section>

            {/* Top Popular Artist */}
            <section
                ref={topPopularArtistRef} 
                className="bg-purple-400 flex flex-col-reverse lg:flex-row items-center shadow"
            >
                <div className="flex-1 p-4 lg:p-8 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-purple-900 mb-4">Top Popular Artist</h2>
                    <p className="text-gray-900 text-base lg:text-lg mb-6">
                        Discover and know the popularity rankings of top artists from various countries and regions.
                    </p>
                    <button 
                        className="bg-purple-900 text-white font-bold text-lg px-6 py-3 rounded-3xl hover:bg-purple-700"
                        onClick={() => navigate('/artist-popularity')}
                    >
                        Try Now
                    </button>
                </div>
                <div className="flex-1 p-4 lg:p-8 self-center mt-2 lg:mt-0">
                    <img 
                        className="mx-auto w-1/2 lg:w-auto" 
                        src={TopPopularArtistImg} 
                        alt="top-popular-artist-icon" 
                    />
                </div>
            </section>

            {/* Integration Section */}
            <section className="bg-gray-100 p-10">
                <div className="container mx-auto p-10 text-center flex flex-col lg:flex-row items-center">
                    <div className="flex-1 p-8 self-end">
                        <img className="mx-auto w-72 rounded-lg shadow-xl" src={Rectangle1} alt="person-listening-to-music-1" />
                    </div>
                    <div className="flex-1 px-4 text-center">
                        <h2 className="text-2xl font-bold text-purple-900 mb-4">Integrated with</h2>
                        <img src={SpotifyBlack} alt="Spotify Logo" className="mx-auto w-96 mb-4 my-8" />
                    </div>
                    <div className="flex-1 p-8 self-start mt-8 lg:mt-0">
                        <img className="mx-auto w-72 rounded-lg shadow-xl" src={Rectangle2} alt="person-listening-to-music-2" />
                    </div>
                </div>
            </section>
        </div>
    );
};