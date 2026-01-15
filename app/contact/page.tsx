"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50 dark:bg-gray-900 transition-colors duration-300">
                    <div className="max-w-xl mx-auto space-y-8">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 relative overflow-hidden transition-colors duration-300">
                            <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2 text-center">Hubungi Kami</h1>
                            <p className="text-gray-500 dark:text-gray-400 mb-8 text-center text-sm">Ada pertanyaan atau masukan? Kirim pesan kepada kami hari ini!</p>

                            {submitted ? (
                                <div className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 p-6 rounded-xl text-center animate-bounce">
                                    <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="font-bold text-lg">Pesan Terkirim!</p>
                                    <p className="text-sm">Terima kasih telah menghubungi kami. Kami akan segera membalas pesan Anda.</p>
                                </div>
                            ) : (
                                <form className="space-y-4" onSubmit={handleSubmit}>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Lengkap</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Masukkan nama Anda"
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="email@anda.com"
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pesan</label>
                                        <textarea
                                            required
                                            rows={4}
                                            placeholder="Tuliskan pesan Anda di sini..."
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none transition resize-none"
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                                    >
                                        Kirim Pesan
                                    </button>
                                </form>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 text-center">
                                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Email</p>
                                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">info@websekolah.id</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 text-center">
                                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Telepon</p>
                                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">+62 812-3456-7890</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
