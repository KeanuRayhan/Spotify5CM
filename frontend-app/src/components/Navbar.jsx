import React, { useState } from 'react';

export default function Navbar() {
    const [isNavbarVisible, setNavbarVisible] = useState(false);

    const toggleNavbar = () => {
        setNavbarVisible(!isNavbarVisible);
    };

    return (
        <>
            {/* Navbar */}
            <header className="bg-white drop-shadow-xl">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between sm:py-2">
                    {/* Logo */}
                    <img className = "w-20" src="./src/assets/img/5cm.jpg" alt="Logo" />
                    {/* <div className="text-lg font-bold text-purple-600">SPOTIFY5CM</div> */}

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
                        <a href="#" className="font-bold text-gray-400 hover:text-purple-900 px-3">
                            Home
                        </a>
                        <a href="#" className="font-bold text-gray-400 hover:text-purple-900 px-3">
                            Top Popular Artist
                        </a>
                        <a href="#" className="font-bold text-gray-400 hover:text-purple-900 px-3">
                            Music Taste Matching
                        </a>
                    </nav>
                </div>
            </header>
        </>
    );
};