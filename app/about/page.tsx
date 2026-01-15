"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50 dark:bg-gray-900 transition-colors duration-300">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md border border-gray-100 dark:border-gray-700 relative overflow-hidden transition-colors duration-300">
                            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-6">Tentang Kami</h1>
                            <div className="prose prose-blue dark:prose-invert max-w-none">
                                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                    Selamat datang di <span className="font-bold text-indigo-600 dark:text-indigo-400">WebSchooll App</span>. Kami adalah platform dashboard premium yang dirancang untuk memberikan pengalaman manajemen sekolah yang mulus dan intuitif.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                                    <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                                        <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-2">Visi Kami</h3>
                                        <p className="text-blue-800/80 dark:text-blue-200/80">
                                            Menjadi standar utama dalam visualisasi data dan manajemen aplikasi modern yang mengutamakan kecepatan dan estetika.
                                        </p>
                                    </div>
                                    <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                                        <h3 className="text-xl font-bold text-purple-900 dark:text-purple-100 mb-2">Misi Kami</h3>
                                        <p className="text-purple-800/80 dark:text-purple-200/80">
                                            Memberdayakan pengembang dan bisnis dengan alat yang kuat namun sederhana untuk mengelola ekosistem digital mereka.
                                        </p>
                                    </div>
                                </div>
                                <p className="mt-8 text-gray-600 dark:text-gray-300 italic text-center">
                                    "Inovasi bukan hanya tentang teknologi, tapi tentang bagaimana teknologi membantu manusia."
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
