"use client"

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { MapPin, Navigation, ChevronLeft, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Dynamically import MapComponent to avoid SSR errors with Leaflet
const MapComponent = dynamic(() => import('../components/MapComponent'), {
    ssr: false,
    loading: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { t } = useLanguage();
        return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">{t.map_page.loading}</p>
            </div>
        );
    }
});

export default function MapPage() {
    const { t } = useLanguage();
    const [position, setPosition] = useState<[number, number]>([-7.9839, 112.6214]); // Default to Malang
    const [isLocating, setIsLocating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGetLocation = () => {
        setIsLocating(true);
        setError(null);

        if (!navigator.geolocation) {
            setError(t.map_page.error_unsupported);
            setIsLocating(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosition([pos.coords.latitude, pos.coords.longitude]);
                setIsLocating(false);
            },
            (err) => {
                setError(t.map_page.error_failed + err.message);
                setIsLocating(false);
            },
            { enableHighAccuracy: true }
        );
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F8F9FA] dark:bg-gray-950 transition-colors duration-300">
            <Navbar />

            <div className="flex flex-1 overflow-hidden">
                <Sidebar />

                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50 dark:bg-gray-950/50">
                    <div className="max-w-5xl mx-auto">

                        {/* Container Card */}
                        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800 p-8 md:p-12 transition-colors duration-300">

                            {/* Header Section */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                                <div>
                                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">{t.map_page.title}</h1>
                                    <p className="text-gray-500 dark:text-gray-400 font-bold mt-1 uppercase tracking-widest text-xs">{t.map_page.subtitle}</p>
                                </div>
                                <Link
                                    href="/"
                                    className="flex items-center gap-2 text-sm font-black text-gray-400 hover:text-indigo-600 transition-colors"
                                >
                                    <ChevronLeft className="w-4 h-4" /> {t.map_page.back_home}
                                </Link>
                            </div>

                            {/* Control Panel */}
                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-8 mb-8 border border-gray-100 dark:border-gray-800">
                                <div className="flex flex-col md:flex-row items-center gap-6">
                                    <button
                                        onClick={handleGetLocation}
                                        disabled={isLocating}
                                        className="w-full md:w-auto px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black shadow-xl shadow-indigo-500/20 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                    >
                                        {isLocating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Navigation className="w-5 h-5" />}
                                        {t.map_page.get_location}
                                    </button>

                                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                                        <div className="bg-white dark:bg-gray-900 px-6 py-4 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                                                <MapPin className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Latitude</p>
                                                <p className="font-black text-gray-900 dark:text-white">{position[0].toFixed(6)}</p>
                                            </div>
                                        </div>
                                        <div className="bg-white dark:bg-gray-900 px-6 py-4 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600">
                                                <MapPin className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Longitude</p>
                                                <p className="font-black text-gray-900 dark:text-white">{position[1].toFixed(6)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {error && (
                                    <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold">
                                        <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                                        {error}
                                    </div>
                                )}
                            </div>

                            {/* Map View */}
                            <div className="h-[600px] w-full">
                                <MapComponent pos={position} />
                            </div>

                            <div className="mt-8 flex items-center justify-between text-gray-400 dark:text-gray-500">
                                <p className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                    {t.map_page.engine_active}
                                </p>
                                <p className="text-xs font-bold uppercase tracking-widest">Leaflet | © OpenStreetMap</p>
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
