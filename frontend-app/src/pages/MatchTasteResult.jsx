import React, {useEffect, useRef } from "react";
import Chart from "chart.js/auto";

import Avatar from "../assets/img/avatar.png";

export default function MatchTasteResult() {
    const matchingPercentageRef = React.useRef(null);
    const genreChartUser1Ref = React.useRef(null);
    const genreChartUser2Ref = React.useRef(null);

    useEffect(() => {
        // Function to create charts
        const createChart = (ctx, type, data, options) => new Chart(ctx, { type, data, options });

        // Matching Percentage Chart
        const ctxPercentage = matchingPercentageRef.current.getContext("2d");
        const percentageValue = 90; // Persentase kecocokan
        const percentageChart = createChart(ctxPercentage, "doughnut", {
            datasets: [
                {
                    data: [percentageValue, 100 - percentageValue],
                    backgroundColor: ["#6B21A8", "#E5E7EB"],
                    borderWidth: 0,
                },
            ],
        }, {
            cutout: "80%",
            plugins: { tooltip: { enabled: false } },
        });
        document.getElementById("percentageText").innerText = `${percentageValue}%`;

        // Genre Match Charts
        const genreDataUser1 = [25, 20, 15, 40];
        const genreDataUser2 = [30, 25, 20, 25];
        const genreColors = ["#6B21A8", "#9D4EDD", "#B983FF", "#D8B4FE"];

        const ctxUser1 = genreChartUser1Ref.current.getContext("2d");
        const user1Chart = createChart(ctxUser1, "pie", {
            labels: ["Pop", "Rock", "Jazz", "Hip-Hop"],
            datasets: [
                {
                    data: genreDataUser1,
                    backgroundColor: genreColors,
                    hoverOffset: 4,
                },
            ],
        }, {
            responsive: true,
            plugins: { legend: { position: "bottom" } },
        });

        const ctxUser2 = genreChartUser2Ref.current.getContext("2d");
        const user2Chart = createChart(ctxUser2, "pie", {
            labels: ["Pop", "Rock", "Jazz", "Hip-Hop"],
            datasets: [
                {
                    data: genreDataUser2,
                    backgroundColor: genreColors,
                    hoverOffset: 4,
                },
            ],
        }, {
            responsive: true,
            plugins: { legend: { position: "bottom" } },
        });

        // Cleanup charts on unmount
        return () => {
            percentageChart.destroy();
            user1Chart.destroy();
            user2Chart.destroy();
        };
    }, []);

    return (
        <div className="bg-gray-100 font-sans">
            {/* Match Result Section */}
            <section className="bg-purple-100 py-12">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl font-bold text-purple-900 mb-6">MATCH RESULT</h1>
                    <div className="flex justify-center items-center mb-8 space-x-8">
                        <div className="w-1/4">
                            <img
                                className="mx-auto w-52 rounded-full"
                                src={Avatar}
                                alt="User 1"
                            />
                            <p className="mt-4 text-lg font-semibold">rere.fps</p>
                        </div>
                        <div className="w-1/4">
                            <div className="relative">
                                <canvas ref={matchingPercentageRef}></canvas>
                                <p
                                    id="percentageText"
                                    className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-purple-900"
                                ></p>
                            </div>
                        </div>
                        <div className="w-1/4">
                            <img
                                className="mx-auto w-52 rounded-full"
                                src={Avatar}
                                alt="User 2"
                            />
                            <p className="mt-4 text-lg font-semibold">meureun</p>
                        </div>
                    </div>

                    <p className="text-xl font-medium text-gray-900 mb-8">
                        You both have matching tastes in music
                    </p>
                    <button className="bg-purple-900 text-white font-bold text-lg px-6 py-3 rounded-3xl hover:bg-purple-700 mb-12">
                        Try Another Match
                    </button>

                    {/* Genre Match */}
                    <div className="flex flex-row justify-around gap-8 mb-12">
                        <div className="w-2/5">
                            <h3 className="text-xl font-semibold text-purple-900 mb-4">rere.fps</h3>
                            <canvas ref={genreChartUser1Ref}></canvas>
                        </div>
                        <div className="w-2/5">
                            <h3 className="text-xl font-semibold text-purple-900 mb-4">meureun</h3>
                            <canvas ref={genreChartUser2Ref}></canvas>
                        </div>
                    </div>

                    {/* Recommended Songs Table */}
                    <p className="text-xl font-medium text-gray-900 mb-8">
                        Here Recommendation Songs for You
                    </p>
                    <div className="mx-auto overflow-x-auto max-w-screen-lg bg-white shadow rounded-lg">
                        <table className="table-auto w-full text-left text-white">
                            <thead>
                                <tr className="bg-indigo-950">
                                <th className="px-4 py-2">No</th>
                                <th className="px-4 py-2">Track</th>
                                <th className="px-4 py-2">Artist</th>
                                <th className="px-4 py-2">Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Table Rows */}
                                <tr className="bg-blue-950">
                                    <td className="px-4 py-2">1</td>
                                    <td className="px-4 py-2">
                                        <div className="flex items-center space-x-2">
                                            <img className="w-12 h-12 rounded-lg" src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" alt="album-cover" />
                                            <span>Talking to the moon</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">Bruno Mars</td>
                                    <td className="px-4 py-2">02:15</td>
                                </tr>
                                <tr className="bg-indigo-950">
                                    <td className="px-4 py-2">2</td>
                                    <td className="px-4 py-2">
                                        <div className="flex items-center space-x-2">
                                            <img className="w-12 h-12 rounded-lg" src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" alt="album-cover" />
                                            <span>Don't look back in anger</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">Oasis</td>
                                    <td className="px-4 py-2">03:33</td>
                                </tr>
                                <tr className="bg-blue-950">
                                    <td className="px-4 py-2">3</td>
                                    <td className="px-4 py-2">
                                        <div className="flex items-center space-x-2">
                                            <img className="w-12 h-12 rounded-lg" src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" alt="album-cover" />
                                            <span>Bad Liar</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">Imagine Dragon</td>
                                    <td className="px-4 py-2">04:00</td>
                                </tr>
                                <tr className="bg-indigo-950">
                                    <td className="px-4 py-2">4</td>
                                    <td className="px-4 py-2">
                                        <div className="flex items-center space-x-2">
                                            <img className="w-12 h-12 rounded-lg" src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" alt="album-cover" />
                                            <span>Wait a minute</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">Pamungkas</td>
                                    <td className="px-4 py-2">02:50</td>
                                </tr>
                                <tr className="bg-blue-950">
                                    <td className="px-4 py-2">5</td>
                                    <td className="px-4 py-2">
                                        <div className="flex items-center space-x-2">
                                            <img className="w-12 h-12 rounded-lg" src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" alt="album-cover" />
                                            <span>Blinding Lights</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">The Weekend</td>
                                    <td className="px-4 py-2">03:38</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
};