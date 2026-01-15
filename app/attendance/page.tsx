"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function AttendancePage() {
    const [activeTab, setActiveTab] = useState<"students" | "teachers">("students");

    const [students] = useState([
        { id: 1, name: "Ali baba", class: "X-IPA-1", status: "Present" },
        { id: 2, name: "Maria Ozawa", class: "XI-IPS-2", status: "Absent" },
        { id: 3, name: "John Doe", class: "XII-IPA-3", status: "Present" },
        { id: 4, name: "Jane Smith", class: "X-IPS-1", status: "Late" },
        { id: 5, name: "Michael Jordan", class: "X-IPA-2", status: "Present" },
    ]);

    const [teachers] = useState([
        { id: 1, name: "Budi Santoso", subject: "Matematika", status: "Present" },
        { id: 2, name: "Siti Aminah", subject: "Bahasa Indonesia", status: "Sick" },
        { id: 3, name: "Ahmad Dahlan", subject: "IPA", status: "Present" },
        { id: 4, name: "Dewi Sartika", subject: "Bahasa Inggris", status: "Present" },
    ]);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50 dark:bg-gray-900">
                    <div className="max-w-6xl mx-auto space-y-6">
                        <div className="flex flex-col md:flex-row justify-between items-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 gap-4">
                            <div>
                                <h1 className="text-2xl font-black text-gray-900 dark:text-white">Absensi {activeTab === "students" ? "Siswa" : "Guru"}</h1>
                                <p className="text-gray-500 dark:text-gray-400">Kelola kehadiran {activeTab === "students" ? "siswa-siswi" : "guru-guru"} hari ini.</p>
                            </div>
                            <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                                <button
                                    onClick={() => setActiveTab("students")}
                                    className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${activeTab === "students"
                                            ? "bg-white dark:bg-gray-600 text-indigo-600 dark:text-white shadow-sm"
                                            : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                                        }`}
                                >
                                    Siswa
                                </button>
                                <button
                                    onClick={() => setActiveTab("teachers")}
                                    className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${activeTab === "teachers"
                                            ? "bg-white dark:bg-gray-600 text-indigo-600 dark:text-white shadow-sm"
                                            : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                                        }`}
                                >
                                    Guru
                                </button>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 font-bold uppercase tracking-wider">
                                        <tr>
                                            <th className="px-6 py-4">Nama</th>
                                            <th className="px-6 py-4">{activeTab === "students" ? "Kelas" : "Mapel"}</th>
                                            <th className="px-6 py-4">Jam Masuk</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4 text-center">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                        {(activeTab === "students" ? students : teachers).map((item: any) => (
                                            <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                    <div className="flex items-center space-x-3">
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ${activeTab === 'students' ? 'bg-gradient-to-br from-green-400 to-emerald-500' : 'bg-gradient-to-br from-blue-400 to-indigo-500'}`}>
                                                            {item.name.substring(0, 2).toUpperCase()}
                                                        </div>
                                                        <span>{item.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                                    {activeTab === "students" ? item.class : item.subject}
                                                </td>
                                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400 font-mono">
                                                    07:00
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.status === "Present"
                                                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                            : item.status === "Absent"
                                                                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                                                : item.status === "Late"
                                                                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                                                    : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                                        }`}>
                                                        {item.status === "Present" ? "Hadir" : item.status === "Absent" ? "Alpha" : item.status === "Late" ? "Terlambat" : "Sakit"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <div className="flex items-center justify-center space-x-2">
                                                        <button className="w-8 h-8 rounded-full bg-green-50 text-green-600 hover:bg-green-100 flex items-center justify-center" title="Hadir">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                                        </button>
                                                        <button className="w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center" title="Alpha">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                                        </button>
                                                        <button className="w-8 h-8 rounded-full bg-yellow-50 text-yellow-600 hover:bg-yellow-100 flex items-center justify-center" title="Izin/Sakit">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
