"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import NotificationManager from "../components/NotificationManager";
import ShareButton from "../components/ShareButton";
import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";

export default function PWAPage() {
    const { t } = useLanguage();
    const [isInstalled, setIsInstalled] = useState(false);
    const [swRegistration, setSwRegistration] = useState<ServiceWorkerRegistration | null>(null);
    const [cacheSize, setCacheSize] = useState<string>(t.pwa_page.calculating);

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
            alert(t.pwa_page.alert_clear);
            window.location.reload();
        }
    };

    const updateServiceWorker = async () => {
        if (swRegistration) {
            await swRegistration.update();
            alert(t.pwa_page.alert_sw);
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
                                {t.pwa_page.title}
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-2">
                                {t.pwa_page.subtitle}
                            </p>
                            <Link
                                href="/"
                                className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-bold text-sm transition-colors mt-2 inline-block"
                            >
                                ← {t.pwa_page.back_home}
                            </Link>
                        </div>

                        {/* Installation Status */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 mb-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                {t.pwa_page.install_status}
                            </h2>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {t.pwa_page.app_status}
                                    </p>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                                        {isInstalled ? "✅ " + t.pwa_page.installed : "📱 " + t.pwa_page.browser}
                                    </p>
                                </div>
                                {!isInstalled && (
                                    <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs">
                                        {t.pwa_page.install_hint}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Notifications */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 mb-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                {t.pwa_page.push_notifications}
                            </h2>
                            <NotificationManager />
                        </div>

                        {/* Share Feature */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 mb-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                {t.pwa_page.share_app}
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                Bagikan aplikasi ini dengan teman dan kolega Anda
                            </p>
                            <ShareButton
                                title="WebSchooll App"
                                text={t.pwa_page.share_desc}
                                url={typeof window !== "undefined" ? window.location.origin : ""}
                            />
                        </div>

                        {/* Cache Management */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 mb-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                {t.pwa_page.cache_management}
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {t.pwa_page.cache_size}
                                        </p>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                                            {cacheSize}
                                        </p>
                                    </div>
                                    <button
                                        onClick={clearCache}
                                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                                    >
                                        {t.pwa_page.clear_cache}
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {t.pwa_page.cache_desc}
                                </p>
                            </div>
                        </div>

                        {/* Service Worker */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                {t.pwa_page.service_worker}
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{t.pwa_page.app_status}</p>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                                            {swRegistration ? "✅ " + t.pwa_page.sw_active : "❌ " + t.pwa_page.sw_not_registered}
                                        </p>
                                    </div>
                                    {swRegistration && (
                                        <button
                                            onClick={updateServiceWorker}
                                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                                        >
                                            {t.pwa_page.update_sw}
                                        </button>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {t.pwa_page.sw_desc}
                                </p>
                            </div>
                        </div>

                        {/* PWA Features List */}
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-2xl border border-indigo-100 dark:border-indigo-900 p-6 mt-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                🎉 {t.pwa_page.features_title}
                            </h3>
                            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>{t.pwa_page.feature_offline}</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>{t.pwa_page.feature_notifications}</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>{t.pwa_page.feature_share}</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>{t.pwa_page.feature_shortcuts}</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>{t.pwa_page.feature_sync}</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>{t.pwa_page.feature_installable}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
