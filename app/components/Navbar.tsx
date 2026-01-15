"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useNavStore } from "../store/useNavStore";
import PWAButton from "./PWAButton";
import Toast from "./Toast";
import { STUDENTS_DATA, APP_PAGES } from "../../lib/dummyData";

export default function Navbar() {
    const { isNavbarOpen, toggleNavbar, openSidebar } = useNavStore();
    const pathname = usePathname();
    const router = useRouter();
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

    // Search States
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<{ name: string; type: "page" | "student"; path: string }[]>([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        if (searchQuery.trim().length > 1) {
            const filteredPages = APP_PAGES.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase())
            ).map(p => ({ name: p.name, type: "page" as const, path: p.path }));

            const filteredStudents = STUDENTS_DATA.filter(s =>
                s.name.toLowerCase().includes(searchQuery.toLowerCase())
            ).map(s => ({ name: s.name, type: "student" as const, path: `/students?search=${encodeURIComponent(s.name)}` }));

            setSearchResults([...filteredPages, ...filteredStudents]);
            setIsSearchOpen(true);
        } else {
            setSearchResults([]);
            setIsSearchOpen(false);
        }
    }, [searchQuery]);

    // Keyboard Shortcut Ctrl+K
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                document.getElementById('global-search')?.focus();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleResultClick = (path: string) => {
        router.push(path);
        setSearchQuery("");
        setIsSearchOpen(false);
    };

    const [notifications] = useState([
        { id: 1, title: "Rapat Guru", message: "Rapat bulanan besok jam 09:00", time: "1 jam yang lalu" },
        { id: 2, title: "Jadwal Ujian", message: "Jadwal UAS telah dirilis", time: "2 jam yang lalu" },
        { id: 3, title: "Absensi", message: "Rekap absensi bulan ini siap", time: "5 jam yang lalu" },
    ]);

    const handleNotificationClick = () => {
        setIsNotificationOpen(!isNotificationOpen);
    };

    const handleNewNotification = () => {
        setToast({ message: "Notifikasi Baru: Pengumuman Libur Sekolah!", type: "info" });
        setIsNotificationOpen(false);
    };

    return (
        <header className="bg-white border-b border-gray-200 p-4 text-gray-900 shadow-sm z-50 relative transition-colors duration-300 dark:bg-gray-900 dark:border-gray-800 dark:text-white">
            <div className="container mx-auto flex justify-between items-center px-4">
                {/* Brand Restored - Click opens Sidebar on mobile */}
                <div
                    className="flex items-center space-x-2 group cursor-pointer"
                    onClick={() => {
                        if (window.innerWidth < 768) {
                            openSidebar();
                        }
                    }}
                >
                    <svg className="w-8 h-8 text-blue-600 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                    <h1 className="text-xl font-bold tracking-wide text-gray-900 dark:text-white" suppressHydrationWarning>WebSchooll App</h1>
                </div>

                {/* Global Search Bar - Desktop */}
                <div className="hidden lg:flex flex-1 max-w-md mx-8 relative group">
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            id="global-search"
                            type="text"
                            className="block w-full pl-10 pr-12 py-2 border-2 border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 rounded-2xl text-sm outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all dark:text-white font-medium shadow-sm"
                            placeholder="Cari fitur atau nama siswa... (Ctrl+K)"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
                            onFocus={() => searchQuery.length > 1 && setIsSearchOpen(true)}
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-[10px] font-bold text-gray-400 border border-gray-200 dark:border-gray-700 px-1.5 py-0.5 rounded-lg bg-white dark:bg-gray-900 shadow-sm">⌘K</span>
                        </div>
                    </div>

                    {/* Search Results Dropdown */}
                    {isSearchOpen && searchResults.length > 0 && (
                        <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden z-[100] animate-fade-in-up">
                            <div className="max-h-80 overflow-y-auto py-2">
                                {searchResults.map((result, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleResultClick(result.path)}
                                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-left group"
                                    >
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs shadow-sm shadow-blue-100 dark:shadow-none
                                            ${result.type === 'page' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'}`}>
                                            {result.type === 'page' ? (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                                            ) : (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{result.name}</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{result.type === 'page' ? 'Navigasi' : 'Siswa'}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    <Link href="/" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition">
                        <span>Home</span>
                    </Link>
                    <Link href="/about" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition">
                        <span>About</span>
                    </Link>
                    <Link href="/contact" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition">
                        <span>Contact</span>
                    </Link>

                    {/* Theme Toggle */}
                    <ThemeToggle />

                    {/* PWA Install Button */}
                    <PWAButton />

                    {/* Notification Icon */}
                    <button
                        onClick={handleNotificationClick}
                        className="p-1 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition relative"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white dark:ring-gray-900 animate-pulse"></span>
                    </button>
                </nav>

                {/* Mobile Menu Icon - Toggle Navbar Menu */}
                <div className="md:hidden flex items-center space-x-4">
                    <PWAButton />
                    <ThemeToggle />
                    <div
                        className="cursor-pointer p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-md"
                        onClick={toggleNavbar}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isNavbarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isNavbarOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800 shadow-lg py-4 px-6 space-y-4 animate-slide-down">
                    <Link href="/" className="block text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400" onClick={toggleNavbar}>Home</Link>
                    <Link href="/about" className="block text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400" onClick={toggleNavbar}>About</Link>
                    <Link href="/users" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={toggleNavbar}>Users</Link>
                    <Link href="/analytics" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={toggleNavbar}>Analytics</Link>
                    <Link href="/map" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={toggleNavbar}>Map</Link>
                    <Link href="/image-compression" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={toggleNavbar}>Image Compression</Link>
                    <Link href="/sprite" className="block text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400" onClick={toggleNavbar}>Sprite</Link>
                    <Link href="/storage" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={toggleNavbar}>Storage</Link>
                    <Link href="/indexeddb" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={toggleNavbar}>IndexedDB</Link>
                    <Link href="/realtime-db" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={toggleNavbar}>Realtime DB</Link>
                    <Link href="/settings" className="block text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400" onClick={toggleNavbar}>Settings</Link>
                    <Link href="/profile" className="block text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400" onClick={toggleNavbar}>Profile</Link>
                    <Link href="/contact" className="block text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400" onClick={toggleNavbar}>Contact</Link>
                </div>
            )}

            {/* Notification Dropdown */}
            {isNotificationOpen && (
                <div className="absolute top-16 right-4 sm:right-20 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden z-[100] animate-fade-in-up origin-top-right">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
                        <h3 className="font-bold text-gray-900 dark:text-white">Notifikasi</h3>
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">3 Baru</span>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                        {notifications.map((notif) => (
                            <div key={notif.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700/50 transition-colors cursor-pointer group">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="font-bold text-sm text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{notif.title}</h4>
                                    <span className="text-[10px] text-gray-400">{notif.time}</span>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{notif.message}</p>
                            </div>
                        ))}
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-900/50 text-center border-t border-gray-100 dark:border-gray-700">
                        <button
                            onClick={handleNewNotification}
                            className="text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 uppercase tracking-wider"
                        >
                            Simulasi Notifikasi Baru
                        </button>
                    </div>
                </div>
            )}

            {/* Toast Notification */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </header>
    );
}

function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // useEffect only runs on the client, so now we can safely show the UI
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors focus:outline-none"
            title="Toggle Theme"
        >
            {theme === 'dark' ? (
                <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ) : (
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            )}
        </button>
    )
}
