"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import InfiniteScroll from "../components/InfinteScoll";
import { useLanguage } from "../contexts/LanguageContext";

export default function NewsPage() {
    const { t } = useLanguage();
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50 dark:bg-gray-900">
                    <div className="max-w-6xl mx-auto space-y-6">
                        <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <div>
                                <h1 className="text-2xl font-black text-gray-900 dark:text-white">{t.news_page.title}</h1>
                                <p className="text-gray-500 dark:text-gray-400">{t.news_page.subtitle}</p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white">{t.news_page.latest_news}</h3>
                            </div>
                            <InfiniteScroll />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
