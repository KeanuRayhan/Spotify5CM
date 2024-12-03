import React from 'react';
import SpotifyGreen from '../assets/img/Spotify_Full_Logo_RGB_Green.png';

export default function Footer() {
    return (
            <footer className="bg-gray-800 text-white py-8">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left">
                    <div className="mx-auto md:mx-0 w-36">
                        <img
                            src={SpotifyGreen}
                            alt="Spotify Logo Green"
                        />
                    </div>
                    <div className="mt-4 md:mt-0">
                        <p>© 2024 Spotify5CM by Kelompok 5CM. All Rights Reserved</p>
                        <div className="mt-4 space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white">
                                Cookies
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                Privacy and Policy
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
    );
};