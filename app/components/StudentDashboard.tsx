"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function StudentDashboard({ userData }: { userData: any }) {
    const router = useRouter();

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Hero / Welcome Section for Student */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 shadow-lg text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-3xl font-extrabold mb-2">Halo, {userData?.username || "Siswa"}! 🎓</h2>
                    <p className="text-blue-100 max-w-xl">
                        Selamat datang di dashboard siswa. Cek jadwal pelajaran, tugas, dan nilai kamu di sini.
                    </p>
                </div>
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-20 -mb-10 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl"></div>
            </div>

            {/* Student Specific Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Kehadiran</h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">95%</p>
                    <span className="text-xs text-green-500">Sangat Baik</span>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Tugas Pending</h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">2</p>
                    <span className="text-xs text-orange-500">Segera Kumpulkan</span>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Rata-rata Nilai</h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">88.5</p>
                    <span className="text-xs text-blue-500">Pertahankan!</span>
                </div>
            </div>

            {/* Schedule / Timeline */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Jadwal Hari Ini</h3>
                <div className="space-y-4">
                    <div className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors border-l-4 border-blue-500">
                        <div className="w-20 text-sm font-bold text-gray-500">07:00</div>
                        <div>
                            <p className="font-bold text-gray-900 dark:text-white">Matematika</p>
                            <p className="text-xs text-gray-500">Pak Budi - Ruang 10A</p>
                        </div>
                    </div>
                    <div className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors border-l-4 border-green-500">
                        <div className="w-20 text-sm font-bold text-gray-500">09:30</div>
                        <div>
                            <p className="font-bold text-gray-900 dark:text-white">Bahasa Inggris</p>
                            <p className="text-xs text-gray-500">Ms. Sarah - Lab Bahasa</p>
                        </div>
                    </div>
                    <div className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors border-l-4 border-purple-500">
                        <div className="w-20 text-sm font-bold text-gray-500">11:00</div>
                        <div>
                            <p className="font-bold text-gray-900 dark:text-white">Fisika</p>
                            <p className="text-xs text-gray-500">Bu Rina - Lab IPA</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
