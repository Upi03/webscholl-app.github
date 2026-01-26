"use client";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function LeaderboardPage() {
    const students = [
        { rank: 1, name: "Siti Aminah", class: "XI-A", points: 2500, avatar: "👩‍🎓", badge: "🏆 Siswa Teladan" },
        { rank: 2, name: "Budi Santoso", class: "XI-B", points: 2350, avatar: "👨‍🎓", badge: "⚡ Rajin Hadir" },
        { rank: 3, name: "Dewi Lestari", class: "X-C", points: 2200, avatar: "👩‍🏫", badge: "📚 Kutu Buku" },
        { rank: 4, name: "Andi Wijaya", class: "XII-A", points: 2100, avatar: "🧑‍💻", badge: "" },
        { rank: 5, name: "Rina Kartika", class: "XI-A", points: 1950, avatar: "👩‍🔬", badge: "" },
        { rank: 6, name: "Doni Pratama", class: "X-B", points: 1800, avatar: "👨‍🚀", badge: "" },
    ];

    const topThree = students.slice(0, 3);
    const rest = students.slice(3);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50 dark:bg-gray-900">
                    <div className="max-w-5xl mx-auto space-y-10">
                        <header className="text-center mb-8">
                            <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">🏆 Hall of Fame</h1>
                            <p className="text-gray-500 dark:text-gray-400">Siswa berprestasi dengan poin keaktifan tertinggi bulan ini.</p>
                        </header>

                        {/* Top 3 Podium */}
                        <div className="flex flex-col md:flex-row justify-center items-end gap-4 md:gap-8 min-h-[300px]">
                            {/* Rank 2 */}
                            <div className="order-2 md:order-1 flex flex-col items-center w-full md:w-1/3">
                                <div className="mb-4 text-center">
                                    <div className="text-4xl mb-2">{topThree[1].avatar}</div>
                                    <p className="font-bold text-gray-900 dark:text-white truncate max-w-[150px]">{topThree[1].name}</p>
                                    <p className="text-xs text-blue-500 font-bold">{topThree[1].points} Poin</p>
                                </div>
                                <div className="w-full h-40 bg-gradient-to-t from-gray-300 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-t-3xl flex items-start justify-center pt-4 relative shadow-lg">
                                    <span className="text-4xl font-black text-white/50">2</span>
                                </div>
                            </div>

                            {/* Rank 1 */}
                            <div className="order-1 md:order-2 flex flex-col items-center w-full md:w-1/3 z-10 md:-mt-10">
                                <div className="mb-4 text-center relative">
                                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-4xl animate-bounce">👑</div>
                                    <div className="text-6xl mb-2">{topThree[0].avatar}</div>
                                    <p className="font-bold text-xl text-gray-900 dark:text-white truncate max-w-[180px]">{topThree[0].name}</p>
                                    <span className="inline-block px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs rounded-full font-bold mb-1">{topThree[0].badge}</span>
                                    <p className="text-sm text-yellow-500 font-black">{topThree[0].points} Poin</p>
                                </div>
                                <div className="w-full h-56 bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-t-3xl flex items-start justify-center pt-4 shadow-xl shadow-yellow-500/20 relative">
                                    <span className="text-6xl font-black text-white/50">1</span>
                                    {/* Confetti effect could go here */}
                                </div>
                            </div>

                            {/* Rank 3 */}
                            <div className="order-3 md:order-3 flex flex-col items-center w-full md:w-1/3">
                                <div className="mb-4 text-center">
                                    <div className="text-4xl mb-2">{topThree[2].avatar}</div>
                                    <p className="font-bold text-gray-900 dark:text-white truncate max-w-[150px]">{topThree[2].name}</p>
                                    <p className="text-xs text-orange-500 font-bold">{topThree[2].points} Poin</p>
                                </div>
                                <div className="w-full h-32 bg-gradient-to-t from-orange-300 to-orange-200 dark:from-orange-800 dark:to-orange-700 rounded-t-3xl flex items-start justify-center pt-4 shadow-lg">
                                    <span className="text-4xl font-black text-white/50">3</span>
                                </div>
                            </div>
                        </div>

                        {/* List for the rest */}
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                                <h2 className="font-bold text-lg text-gray-900 dark:text-white">Peringkat Lainnya</h2>
                            </div>
                            <div className="divide-y divide-gray-100 dark:divide-gray-700">
                                {rest.map((student) => (
                                    <div key={student.rank} className="p-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                        <div className="w-8 text-center font-black text-gray-400">#{student.rank}</div>
                                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-xl">
                                            {student.avatar}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-gray-900 dark:text-white">{student.name}</p>
                                            <p className="text-xs text-gray-500">{student.class}</p>
                                        </div>
                                        <div className="font-bold text-blue-600 dark:text-blue-400">
                                            {student.points} pts
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
