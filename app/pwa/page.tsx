"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import NotificationManager from "../components/NotificationManager";
import ShareButton from "../components/ShareButton";
import Link from "next/link";

export default function PWAPage() {
    const [isInstalled, setIsInstalled] = useState(false);
    const [swRegistration, setSwRegistration] = useState<ServiceWorkerRegistration | null>(null);
    const [cacheSize, setCacheSize] = useState<string>("Calculating...");

    useEffect(() => {
        // Check if app is installed
        if (window.matchMedia("(display-mode: standalone)").matches) {
            setIsInstalled(true);
        }

        // Get service worker registration
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.ready.then((registration) => {
                setSwRegistration(registration);
            });
        }

        // Calculate cache size
        if ("caches" in window) {
            calculateCacheSize();
        }
    }, []);

    const calculateCacheSize = async () => {
        try {
            const cacheNames = await caches.keys();
            let totalSize = 0;

            for (const name of cacheNames) {
                const cache = await caches.open(name);
                const requests = await cache.keys();

                for (const request of requests) {
                    const response = await cache.match(request);
                    if (response) {
                        const blob = await response.blob();
                        totalSize += blob.size;
                    }
                }
            }

            const sizeInMB = (totalSize / (1024 * 1024)).toFixed(2);
            setCacheSize(`${sizeInMB} MB`);
        } catch (error) {
            setCacheSize("N/A");
        }
    };

    const clearCache = async () => {
        if ("caches" in window) {
            const cacheNames = await caches.keys();
            await Promise.all(cacheNames.map((name) => caches.delete(name)));
            setCacheSize("0 MB");
            alert("Cache berhasil dibersihkan!");
            window.location.reload();
        }
    };

    const updateServiceWorker = async () => {
        if (swRegistration) {
            await swRegistration.update();
            alert("Service Worker diperbarui!");
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 font-sans transition-colors duration-300">
            <Navbar />

            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50 dark:bg-gray-950/50 transition-colors duration-300">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                                PWA Settings
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-2">
                                Manage Progressive Web App features and settings
                            </p>
                            <Link
                                href="/"
                                className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-bold text-sm transition-colors mt-2 inline-block"
                            >
                                ← Kembali ke Home
                            </Link>
                        </div>

                        {/* Installation Status */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 mb-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                Installation Status
                            </h2>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        App Status
                                    </p>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                                        {isInstalled ? "✅ Installed" : "📱 Running in Browser"}
                                    </p>
                                </div>
                                {!isInstalled && (
                                    <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs">
                                        Install aplikasi ini ke home screen untuk pengalaman yang lebih baik
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Notifications */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 mb-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                Push Notifications
                            </h2>
                            <NotificationManager />
                        </div>

                        {/* Share Feature */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 mb-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                Share App
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                Bagikan aplikasi ini dengan teman dan kolega Anda
                            </p>
                            <ShareButton
                                title="WebSchooll App"
                                text="Check out this amazing school portal!"
                                url={typeof window !== "undefined" ? window.location.origin : ""}
                            />
                        </div>

                        {/* Cache Management */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 mb-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                Cache Management
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Cache Size
                                        </p>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                                            {cacheSize}
                                        </p>
                                    </div>
                                    <button
                                        onClick={clearCache}
                                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                                    >
                                        Clear Cache
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Cache menyimpan file untuk akses offline. Membersihkan cache akan menghapus
                                    semua file yang tersimpan.
                                </p>
                            </div>
                        </div>

                        {/* Service Worker */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                Service Worker
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                                            {swRegistration ? "✅ Active" : "❌ Not Registered"}
                                        </p>
                                    </div>
                                    {swRegistration && (
                                        <button
                                            onClick={updateServiceWorker}
                                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                                        >
                                            Update SW
                                        </button>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Service Worker mengelola caching dan fitur offline
                                </p>
                            </div>
                        </div>

                        {/* PWA Features List */}
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-2xl border border-indigo-100 dark:border-indigo-900 p-6 mt-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                🎉 Available PWA Features
                            </h3>
                            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Offline support with custom offline page</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Push notifications</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Web Share API integration</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>App shortcuts for quick navigation</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Background sync capability</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Installable to home screen</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
