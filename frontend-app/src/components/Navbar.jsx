import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
    const [isNavbarVisible, setNavbarVisible] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); // Untuk mendapatkan path saat ini

    const toggleNavbar = () => {
        setNavbarVisible(!isNavbarVisible);
    };

    // Fungsi untuk navigasi dan set halaman aktif
    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <>
            {/* Navbar */}
            <header className="bg-white drop-shadow-xl">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between sm:py-2">
                    {/* Logo yang dapat diklik */}
                    <img
                        className="w-20 cursor-pointer"
                        src="/src/assets/img/5cm.jpg"
                        alt="Logo"
                        onClick={() => handleNavigation('/home')}
                    />

                    {/* Hamburger Icon */}
                    <button
                        onClick={toggleNavbar}
                        className="md:hidden text-purple-600 focus:outline-none"
                        aria-label="Toggle Navigation"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>

                    {/* Navigation Menu */}
                    <nav
                        className={`${
                            isNavbarVisible ? "flex" : "hidden"
                        } flex-col md:flex md:flex-row md:space-x-4 absolute md:static top-16 left-0 w-full md:w-auto bg-white shadow-lg md:shadow-none px-4 py-4 md:px-0 space-y-4 md:space-y-0 z-10`}
                    >
                        <a
                            onClick={() => handleNavigation('/home')}
                            className={`font-bold px-3 cursor-pointer ${
                                location.pathname === '/home' ? 'text-purple-900' : 'text-gray-400 hover:text-purple-900'
                            }`}
                        >
                            Home
                        </a>
                        <a
                            onClick={() => handleNavigation('/artist-popularity')}
                            className={`font-bold px-3 cursor-pointer ${
                                location.pathname === '/artist-popularity' ? 'text-purple-900' : 'text-gray-400 hover:text-purple-900'
                            }`}
                        >
                            Top Popular Artist
                        </a>
                        <a
                            onClick={() => handleNavigation('/music-taste')}
                            className={`font-bold px-3 cursor-pointer ${
                                location.pathname === '/music-taste' ? 'text-purple-900' : 'text-gray-400 hover:text-purple-900'
                            }`}
                        >
                            Music Taste Matching
                        </a>
                    </nav>
                </div>
            </header>
        </>
    );
}
