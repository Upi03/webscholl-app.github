"use client"

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import {
    Database,
    User,
    Moon,
    Sun,
    Search,
    Trash2,
    Save,
    RefreshCcw,
    Layout,
    Clock
} from 'lucide-react';

export default function StoragePage() {
    const [userName, setUserName] = useState('');
    const [theme, setTheme] = useState('light');
    const [searchFilter, setSearchFilter] = useState('');

    // Display states
    const [localData, setLocalData] = useState<Record<string, string>>({});
    const [sessionData, setSessionData] = useState<Record<string, string>>({});

    // Load initial data
    useEffect(() => {
        updateDisplay();

        // Listen for storage changes in other tabs
        window.addEventListener('storage', updateDisplay);
        return () => window.removeEventListener('storage', updateDisplay);
    }, []);

    const updateDisplay = () => {
        const local: Record<string, string> = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key) local[key] = localStorage.getItem(key) || '';
        }
        setLocalData(local);

        const session: Record<string, string> = {};
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            if (key) session[key] = sessionStorage.getItem(key) || '';
        }
        setSessionData(session);
    };

    const saveToLocal = (key: string, value: string) => {
        localStorage.setItem(key, value);
        updateDisplay();
    };

    const saveToSession = (key: string, value: string) => {
        sessionStorage.setItem(key, value);
        updateDisplay();
    };

    const savePreferencesJSON = () => {
        const prefs = {
            lastLogin: new Date().toISOString(),
            language: 'id',
            notifications: true,
            version: '2.0.1'
        };
        localStorage.setItem('preferences', JSON.stringify(prefs));
        updateDisplay();
    };

    const clearAll = () => {
        localStorage.clear();
        sessionStorage.clear();
        updateDisplay();
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50 dark:bg-gray-950/50">
                    <div className="max-w-4xl mx-auto space-y-8">

                        {/* Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3 tracking-tight">
                                    <div className="p-2 bg-indigo-600 rounded-xl">
                                        <Database className="w-6 h-6 text-white" />
                                    </div>
                                    Web Storage
                                </h1>
                                <p className="text-gray-500 dark:text-gray-400 font-bold mt-1 uppercase tracking-widest text-xs">
                                    Local & Session Storage Management
                                </p>
                            </div>
                            <button
                                onClick={clearAll}
                                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-black shadow-xl shadow-red-500/20 active:scale-95 transition-all flex items-center gap-2 text-sm uppercase"
                            >
                                <Trash2 className="w-4 h-4" />
                                Hapus Semua Data
                            </button>
                        </div>

                        {/* Controls Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Card: Username */}
                            <div className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
                                <label className="block text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">Nama Pengguna</label>
                                <div className="flex gap-3">
                                    <div className="relative flex-1">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                            placeholder="Masukan Nama..."
                                            className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-bold"
                                        />
                                    </div>
                                    <button
                                        onClick={() => saveToLocal('userName', userName)}
                                        className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-black text-sm hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-600/20"
                                    >
                                        Simpan
                                    </button>
                                </div>
                                <p className="mt-2 text-[10px] text-gray-400 font-bold italic">Simpan di Local Storage</p>
                            </div>

                            {/* Card: Theme */}
                            <div className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
                                <label className="block text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">Tema</label>
                                <div className="flex items-center gap-3">
                                    <div className="flex bg-gray-50 dark:bg-gray-800 p-1 rounded-2xl border border-gray-100 dark:border-gray-700">
                                        <button
                                            onClick={() => setTheme('light')}
                                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all ${theme === 'light' ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-gray-400'}`}
                                        >
                                            <Sun className="w-3.5 h-3.5" /> Light
                                        </button>
                                        <button
                                            onClick={() => setTheme('dark')}
                                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all ${theme === 'dark' ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-gray-400'}`}
                                        >
                                            <Moon className="w-3.5 h-3.5" /> Dark
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => saveToLocal('theme', theme)}
                                        className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl font-black text-sm hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-600/20"
                                    >
                                        Simpan
                                    </button>
                                </div>
                                <p className="mt-2 text-[10px] text-gray-400 font-bold italic">Simpan di Local Storage</p>
                            </div>

                            {/* Card: Session Search */}
                            <div className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800 transition-colors md:col-span-2">
                                <label className="block text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">Filter Pencarian</label>
                                <div className="flex gap-3">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            value={searchFilter}
                                            onChange={(e) => setSearchFilter(e.target.value)}
                                            placeholder="Masukan Filter..."
                                            className="w-full pl-11 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-bold"
                                        />
                                    </div>
                                    <button
                                        onClick={() => saveToSession('searchFilter', searchFilter)}
                                        className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-600/20 uppercase tracking-widest"
                                    >
                                        <Save className="w-4 h-4 mb-0.5 inline mr-2" />
                                        Simpan ke Session
                                    </button>
                                </div>
                                <p className="mt-2 text-[10px] text-gray-400 font-bold italic">Data ini akan hilang saat browser ditutup / Session ditutup</p>
                            </div>
                        </div>

                        {/* Middle Action */}
                        <button
                            onClick={savePreferencesJSON}
                            className="w-full py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-[1.5rem] font-black shadow-2xl shadow-indigo-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3"
                        >
                            <RefreshCcw className="w-5 h-5" />
                            Simpan Preferensi (Local Storage JSON)
                        </button>

                        {/* Data Display Section */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-widest">Data Tersimpan</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                {/* Local Storage View */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Layout className="w-4 h-4 text-emerald-500" />
                                        <span className="text-sm font-black text-emerald-600 dark:emerald-400 uppercase tracking-widest">Local Storage</span>
                                    </div>
                                    <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 h-[220px] overflow-y-auto">
                                        <div className="font-mono text-xs space-y-2">
                                            {Object.keys(localData).length > 0 ? (
                                                Object.entries(localData).map(([key, val]) => (
                                                    <div key={key} className="flex flex-col gap-1 py-2 border-b border-gray-50 dark:border-gray-800 last:border-0">
                                                        <span className="text-indigo-600 dark:text-indigo-400 font-bold">{key}:</span>
                                                        <span className="text-gray-600 dark:text-gray-300 break-all">{val}</span>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-gray-400 italic text-center py-10 font-sans">Belum ada data di Local Storage</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Session Storage View */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-amber-500" />
                                        <span className="text-sm font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest">Session Storage</span>
                                    </div>
                                    <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 h-[220px] overflow-y-auto">
                                        <div className="font-mono text-xs space-y-2">
                                            {Object.keys(sessionData).length > 0 ? (
                                                Object.entries(sessionData).map(([key, val]) => (
                                                    <div key={key} className="flex flex-col gap-1 py-2 border-b border-gray-50 dark:border-gray-800 last:border-0">
                                                        <span className="text-orange-500 font-bold">{key}:</span>
                                                        <span className="text-gray-600 dark:text-gray-300 break-all">{val}</span>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-gray-400 italic text-center py-10 font-sans">Belum ada data di Session Storage</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}
