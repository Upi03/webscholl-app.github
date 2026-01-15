"use client"

import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Link from "next/link";

export default function ProfilePage() {
    const [userData, setUserData] = React.useState<{ username?: string; email?: string; role?: string } | null>(null);

    React.useEffect(() => {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
            setUserData(JSON.parse(storedUser));
        }
    }, []);

    const isStudent = userData?.role === "student";

    const stats = isStudent ? [
        { label: "Kehadiran", value: "95%", icon: "📅", color: "bg-blue-500" },
        { label: "Tugas Masuk", value: "12", icon: "📚", color: "bg-green-500" },
        { label: "Nilai Rerata", value: "88.5", icon: "⭐", color: "bg-yellow-500" },
        { label: "Poin Kredit", value: "450", icon: "💎", color: "bg-purple-500" },
    ] : [
        { label: "Jam Mengajar", value: "32", icon: "⏱️", color: "bg-blue-500" },
        { label: "Kelas Aktif", value: "4", icon: "🏫", color: "bg-purple-500" },
        { label: "Materi Upload", value: "15", icon: "📄", color: "bg-green-500" },
        { label: "Feedback Siswa", value: "4.9", icon: "🌟", color: "bg-yellow-500" },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-gray-950 font-sans transition-colors duration-300">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-gray-950/50">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-6">
                        {/* Profile Info Card */}
                        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-200/50 dark:shadow-none border border-white dark:border-gray-800 p-4 md:p-6 mb-3 overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-4">
                                <Link
                                    href="/settings"
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 dark:shadow-none transition-all active:scale-95 flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                    Edit Profile
                                </Link>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4 items-center md:items-end">
                                <div className="relative">
                                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 p-1 shadow-xl">
                                        <div className="w-full h-full rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-blue-600 to-indigo-600">
                                            {userData?.username?.substring(0, 2).toUpperCase() || "US"}
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 bg-green-500 border-4 border-white dark:border-gray-900 w-6 h-6 rounded-full shadow-lg"></div>
                                </div>
                                <div className="text-center md:text-left flex-1">
                                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-1 tracking-tight">{userData?.username || "Akun Pengguna"}</h2>
                                    <p className="text-blue-600 dark:text-blue-400 font-bold mb-2 uppercase tracking-wide">
                                        {isStudent ? "Siswa SMK Negeri 1" : "Guru / Pengajar Sekolah"}
                                    </p>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                            Jakarta, Indonesia
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                            Tahun Ajaran 2024/2025
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                            {stats.map((stat, i) => (
                                <div key={i} className="bg-white dark:bg-gray-900 p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300">
                                    <div className={`w-10 h-10 rounded-2xl ${stat.color} bg-opacity-10 flex items-center justify-center text-xl mb-3`}>
                                        {stat.icon}
                                    </div>
                                    <p className="text-2xl font-black text-gray-900 dark:text-white">{stat.value}</p>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* View More Details Button */}
                        <div className="flex justify-center">
                            <Link
                                href="/profile-details"
                                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-black shadow-xl shadow-blue-200 dark:shadow-none transition-all active:scale-95 flex items-center gap-3 tracking-wide"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Lihat Detail Akademik Lengkap
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
