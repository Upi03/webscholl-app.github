"use client"

import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MediaSection from "../components/MediaSection";
import { useLanguage } from "../contexts/LanguageContext";

export default function MediaGalleryPage() {
    const { t } = useLanguage();
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-gray-950 font-sans transition-colors duration-300">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-gray-950/50">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        {/* Header */}
                        <div className="mb-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
                                <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{t.media_page.badge}</span>
                            </div>
                            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">{t.media_page.title}</h1>
                            <p className="text-gray-600 dark:text-gray-400">{t.media_page.subtitle}</p>
                        </div>

                        {/* Media Section */}
                        <MediaSection />
                    </div>
                </main>
            </div>
        </div>
    );
}
