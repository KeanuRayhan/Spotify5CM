import React from 'react';

export default function ArtistPopularity() {
    return (
        <div className="mb-4 mt-4">
            <div className="flex">
                {/* Bagian Kiri dengan Background Ungu */}
                <div className="bg-violet-400 container px-5 w-1/2 p-3">
                    <p className="text-sm text-slate-700 font-bold">You can pick artist popularity by region or country—no need to stick to regions when choosing a country.</p>
                    <div className="flex space-x-4 mt-4">
                        <div className="w-1/2">
                            <label for="continent" className="block text-m font-bold text-black">Region</label>
                            <select id="continent" className="mt-1 block w-full bg-violet-900 text-white font-bold px-4 py-2 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600">
                                <option value="">Select Region</option>
                                <option value="Asia">Asia</option>
                                <option value="Europe">Europe</option>
                                <option value="America">America</option>
                                <option value="Africa">Africa</option>
                            </select>
                        </div>
                        <div className="w-1/2">
                            <label for="country" className="block text-m font-bold text-black">Country</label>
                            <select id="country" className="mt-1 block w-full bg-violet-900 text-white font-bold px-4 py-2 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600">
                                <option value="">Select Country</option>
                                <option value="USA">USA</option>
                                <option value="UK">UK</option>
                                <option value="Brazil">Brazil</option>
                                <option value="Indonesia">Indonesia</option>
                            </select>
                        </div>
                    </div>
                </div>          
                {/* Bagian Kanan (gambar) */}
                <div className="bg-violet-400 text-center container w-1/2 p-4">
                    <div className="p-8">  
                        <p className="text-slate-700 text-md font-bold">Discover the top artists trending across different countries and regions! See who's making waves and topping the charts around the world.</p>
                    </div>  
                </div>
            </div>

            <div className="mx-auto overflow-x-auto max-w-screen-lg m-4 bg-white shadow rounded-xl">
                <table className="table-auto w-full text-left text-white">
                    <thead className="bg-indigo-950 text-white">
                        <tr className="">
                            <th className="px-4 py-2">No</th>
                            <th className="px-4 py-2">Artist</th>
                            <th className="px-4 py-2">Monthly Listeners</th>
                            <th className="px-4 py-2">Popularity</th>
                            <th className="px-4 py-2">Artist Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-blue-950">
                            <td className="px-4 py-2">1</td>
                            <td className="px-4 py-2">
                                <div className="flex items-center space-x-2">
                                    <img className="w-12 h-12 rounded-lg" src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" alt="album-cover" />
                                    <span>Bruno Mars</span>
                                </div>
                            </td>
                            <td className="px-4 py-2">23423423432</td>
                            <td className="px-4 py-2">80</td>
                            <td className="px-4 py-2">100</td>
                        </tr>
                        <tr className="bg-indigo-950">
                            <td className="px-4 py-2">2</td>
                            <td className="px-4 py-2">
                                <div className="flex items-center space-x-2">
                                    <img className="w-12 h-12 rounded-lg" src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" alt="album-cover" />
                                    <span>Ariana Grande</span>
                                </div>  
                            </td>
                            <td className="px-4 py-2">24234535</td>
                            <td className="px-4 py-2">78</td>
                            <td className="px-4 py-2">89,90</td>
                        </tr>
                        <tr className="bg-blue-950">
                            <td className="px-4 py-2">3</td>
                            <td className="px-4 py-2">
                                <div className="flex items-center space-x-2">
                                    <img className="w-12 h-12 rounded-lg" src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" alt="album-cover" />
                                    <span>Imagine Dragon</span>
                                </div>
                            </td>
                            <td className="px-4 py-2">123123123</td>
                            <td className="px-4 py-2">88</td>
                            <td className="px-4 py-2">77</td>
                        </tr>
                        <tr className="bg-indigo-950">
                            <td className="px-4 py-2">4</td>
                            <td className="px-4 py-2">
                                <div className="flex items-center space-x-2">
                                    <img className="w-12 h-12 rounded-lg" src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" alt="album-cover" />
                                    <span>Ed-Sheeran</span>
                                </div>
                            </td>
                            <td className="px-4 py-2">213342</td>
                            <td className="px-4 py-2">99</td>
                            <td className="px-4 py-2">89</td>
                        </tr>
                        <tr className="bg-blue-950">
                            <td className="px-4 py-2">5</td>
                            <td className="px-4 py-2">
                                <div className="flex items-center space-x-2">
                                    <img className="w-12 h-12 rounded-lg" src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" alt="album-cover" />
                                    <span>Pamungkas</span>
                                </div>
                            </td>
                            <td className="px-4 py-2">213332423</td>
                            <td className="px-4 py-2">90</td>
                            <td className="px-4 py-2">88</td>
                        </tr>
                        <tr className="bg-indigo-950">
                            <td className="px-4 py-2">6</td>
                            <td className="px-4 py-2">
                                <div className="flex items-center space-x-2">
                                    <img className="w-12 h-12 rounded-lg" src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" alt="album-cover" />
                                    <span>Bruno Major</span>
                                </div>
                            </td>
                            <td className="px-4 py-2">23423423432</td>
                            <td className="px-4 py-2">80</td>
                            <td className="px-4 py-2">100</td>
                        </tr>
                        <tr className="bg-blue-950">
                            <td className="px-4 py-2">7</td>
                            <td className="px-4 py-2">
                                <div className="flex items-center space-x-2">
                                    <img className="w-12 h-12 rounded-lg" src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" alt="album-cover" />
                                    <span>Kotak</span>
                                </div>
                            </td>
                            <td className="px-4 py-2">24234535</td>
                            <td className="px-4 py-2">78</td>
                            <td className="px-4 py-2">89,90</td>
                        </tr>
                        <tr className="bg-indigo-950">
                            <td className="px-4 py-2">8</td>
                            <td className="px-4 py-2">
                            <div className="flex items-center space-x-2">
                                <img className="w-12 h-12 rounded-lg" src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" alt="album-cover" />
                                <span>Noah</span>
                            </div>
                            </td>
                            <td className="px-4 py-2">123123123</td>
                            <td className="px-4 py-2">88</td>
                            <td className="px-4 py-2">77</td>
                        </tr>
                        <tr className="bg-blue-950">
                            <td className="px-4 py-2">9</td>
                            <td className="px-4 py-2">
                                <div className="flex items-center space-x-2">
                                    <img className="w-12 h-12 rounded-lg" src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" alt="album-cover" />
                                    <span>Geisha</span>
                                </div>
                            </td>
                            <td className="px-4 py-2">213342</td>
                            <td className="px-4 py-2">99</td>
                            <td className="px-4 py-2">89</td>
                        </tr>
                        <tr className="bg-indigo-950">
                            <td className="px-4 py-2">10</td>
                            <td className="px-4 py-2">
                                <div className="flex items-center space-x-2">
                                    <img className="w-12 h-12 rounded-lg" src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" alt="album-cover" />
                                    <span>Changcuters</span>
                                </div>
                            </td>
                            <td className="px-4 py-2">213332423</td>
                            <td className="px-4 py-2">90</td>
                            <td className="px-4 py-2">88</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};