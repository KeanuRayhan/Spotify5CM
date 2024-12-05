import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ArtistPopularity() {
    const [artists, setArtists] = useState([]);
    const [region, setRegion] = useState('');
    const [country, setCountry] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Fungsi untuk mengambil data dari backend dengan filter
    const fetchArtists = async () => { 
        try {
            const response = await axios.get('/apidua/artists/popularity', {
                params: { region, country },
            });
            setArtists(response.data);
        } catch (error) {
            console.error("Error fetching artists:", error);
        }
    };

    useEffect(() => { 
        fetchArtists();
    }, [region, country]);

    const handleRegionChange = (e) => {
        setRegion(e.target.value);
        setCountry(''); // Reset country saat region berubah
        setCurrentPage(1); // Reset halaman ke 1
    };

    const handleCountryChange = (e) => {
        setCountry(e.target.value);
        setRegion(''); // Reset region saat country berubah
        setCurrentPage(1); // Reset halaman ke 1
    };

    // Pagination logic
    const indexOfLastArtist = currentPage * rowsPerPage;
    const indexOfFirstArtist = indexOfLastArtist - rowsPerPage;
    const currentArtists = artists.slice(indexOfFirstArtist, indexOfLastArtist);

    const totalPages = Math.ceil(artists.length / rowsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="mb-4 mt-4">
            <div className="flex">
                {/* Bagian Kiri dengan Background Ungu */}
                <div className="bg-violet-400 container px-5 w-1/2 p-3">
                    <p className="text-sm text-slate-700 font-bold">You can pick artist popularity by region or country—no need to stick to regions when choosing a country.</p>
                    <div className="flex space-x-4 mt-4">
                        <div className="w-1/2">
                            <label htmlFor="continent" className="block text-m font-bold text-black">Region</label>
                            <select
                                id="continent"
                                className="mt-1 block w-full bg-violet-900 text-white font-bold px-4 py-2 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                                value={region}
                                onChange={handleRegionChange}
                            >
                                <option value="">Select Region</option>
                                <option value="Asia Tenggara">Asia Tenggara</option>
                                <option value="Eropa">Eropa</option>
                                <option value="Amerika">Amerika</option>
                                <option value="Asia Timur">Asia Timur</option>
                            </select>
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="country" className="block text-m font-bold text-black">Country</label>
                            <select
                                id="country"
                                className="mt-1 block w-full bg-violet-900 text-white font-bold px-4 py-2 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                                value={country}
                                onChange={handleCountryChange}
                            >
                                <option value="">Select Country</option>
                                <option value="Amerika Serikat">Amerika Serikat</option>
                                <option value="Jepang">Jepang</option>
                                <option value="Korea Selatan">Korea Selatan</option>
                                <option value="Filipina">Filipina</option>
                                <option value="Malaysia">Malaysia</option>
                                <option value="Indonesia">Indonesia</option>
                                <option value="Singapura">Singapura</option>
                                <option value="Inggris">Inggris</option>
                                <option value="Belanda">Belanda</option>
                                <option value="Perancis">Perancis</option>
                                <option value="Spanyol">Spanyol</option>
                                <option value="Denmark">Denmark</option>
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

            {/* Table with Pagination */}
            <div className="mx-auto overflow-x-auto max-w-screen-lg m-4 bg-white shadow rounded-xl">
                <table className="table-auto w-full text-left text-white">
                    <thead className="bg-indigo-950 text-white">
                        <tr>
                            <th className="px-4 py-2">No</th>
                            <th className="px-4 py-2">Artist</th>
                            <th className="px-4 py-2">Monthly Listeners</th>
                            <th className="px-4 py-2">Popularity</th>
                            <th className="px-4 py-2">Artist Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentArtists.map((artist, index) => (
                            <tr key={artist.id} className={index % 2 === 0 ? "bg-blue-950" : "bg-indigo-950"}>
                                <td className="px-4 py-2">{indexOfFirstArtist + index + 1}</td>
                                <td className="px-4 py-2">
                                    <div className="flex items-center space-x-2">
                                        <img className="w-12 h-12 rounded-lg" src={artist.images} alt="album-cover" />
                                        <span>{artist.artist_name}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-2">{artist.monthly_listener}</td>
                                <td className="px-4 py-2">{artist.popularity}</td>
                                <td className="px-4 py-2">{artist.artist_score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination Buttons */}
                <div className="flex justify-center mt-4 space-x-2 items-center">
                    <button
                        onClick={() => setCurrentPage(1)}
                        className="px-4 py-2 rounded font-bold text-white bg-indigo-500 hover:bg-indigo-700"
                        disabled={currentPage === 1}
                    >
                        {"<<"}
                    </button>
                    <button
                        onClick={prevPage}
                        className="px-4 py-2 rounded font-bold text-white bg-indigo-500 hover:bg-indigo-700"
                        disabled={currentPage === 1}
                    >
                        {"<"}
                    </button>
                    <div className="flex space-x-2">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => paginate(i + 1)}
                                className={`px-4 py-2 rounded font-bold text-white ${currentPage === i + 1 ? 'bg-indigo-700' : 'bg-indigo-500'} hover:bg-indigo-700`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={nextPage}
                        className="px-4 py-2 rounded font-bold text-white bg-indigo-500 hover:bg-indigo-700"
                        disabled={currentPage === totalPages}
                    >
                        {">"}
                    </button>
                    <button
                        onClick={() => setCurrentPage(totalPages)}
                        className="px-4 py-2 rounded font-bold text-white bg-indigo-500 hover:bg-indigo-700"
                        disabled={currentPage === totalPages}
                    >
                        {">>"}
                    </button>
                </div>
            </div>
        </div>
    );
}
