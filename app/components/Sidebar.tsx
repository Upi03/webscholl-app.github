"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useNavStore } from "../store/useNavStore";
import { useRouter } from "next/navigation";
import Clock from "./Clock";
import { useLanguage } from "@/app/contexts/LanguageContext";

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { t } = useLanguage();
    const { isSidebarOpen, closeSidebar } = useNavStore();
    const [userData, setUserData] = useState<{ username?: string; email?: string; role?: string; photo?: string } | null>(null);
    const [isUtilitiesOpen, setIsUtilitiesOpen] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
            setUserData(JSON.parse(storedUser));
        }

        const handleStorageChange = () => {
            const updatedUser = localStorage.getItem("currentUser");
            if (updatedUser) {
                setUserData(JSON.parse(updatedUser));
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("currentUser");
        router.push("/login");
    };

    const isActive = (path: string) => {
        // Simple exact match or starts with for sub-routes
        if (path === "/" && pathname === "/") return true;
        if (path !== "/" && pathname.startsWith(path)) return true;
        return false;
    }

    const isParent = userData?.role === "parent";

    const linkClass = (path: string) => {
        const activeBase = "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 shadow-sm";
        const inactiveBase = "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white";

        return `flex items-center space-x-3 px-4 py-3.5 rounded-xl text-sm font-black transition-all ${isActive(path) ? activeBase : inactiveBase}`;
    }

    return (
        <>
            {/* Sidebar Overlay for Mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden animate-fade-in"
                    onClick={closeSidebar}
                />
            )}

            <aside className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:static inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-sm z-50 transition-transform duration-300 ease-in-out flex flex-col`}>
                <div className="p-6 flex-1 overflow-y-auto">
                    {/* Logo Section */}
                    <div className="flex items-center justify-between mb-8 px-2">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className={`p-2 bg-gradient-to-tr from-red-600 to-blue-700 rounded-xl shadow-lg shadow-red-500/20 group-hover:scale-105 transition-transform duration-300`}>
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-black text-gray-900 dark:text-white tracking-tighter leading-none">
                                    Web<span className="text-red-600 dark:text-red-400">Schooll</span>
                                </span>
                                <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">
                                    {isParent ? "Parent Portal" : "Management"}
                                </span>
                            </div>
                        </Link>

                        <button onClick={closeSidebar} className="md:hidden p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="mb-4 px-2">
                        <p className={`text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-2 border-l-2 border-red-500/50`}>{t.sidebar.menu_title}</p>
                    </div>
                    <ul className="space-y-1">
                        <li>
                            <Link href="/" className={linkClass("/")}>
                                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                <span>{isParent ? (t as any).sidebar_parent.dashboard : t.sidebar.dashboard}</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/news" className={linkClass("/news")}>
                                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <span>{isParent ? (t as any).sidebar_parent.news : t.sidebar.news}</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/map" className={linkClass("/map")}>
                                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{isParent ? (t as any).sidebar_parent.map : t.sidebar.map}</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/attendance" className={linkClass("/attendance")}>
                                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{isParent ? (t as any).sidebar_parent.attendance : t.sidebar.attendance}</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/assignments" className={linkClass("/assignments")}>
                                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                <span>{isParent ? (t as any).sidebar_parent.assignments : t.sidebar.assignments}</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/schedule" className={linkClass("/schedule")}>
                                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{isParent ? (t as any).sidebar_parent.schedule : t.sidebar.schedule}</span>
                            </Link>
                        </li>

                        <li>
                            <Link href="/billing" className={linkClass("/billing")}>
                                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span>{isParent ? "Riwayat Pembayaran SPP" : t.sidebar.billing || "Tagihan"}</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/payments" className={linkClass("/payments")}>
                                <svg className="w-5 h-5 transition-transform group-hover:scale-110 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span>{isParent ? "Bayar SPP Anak" : "Bayar SPP"}</span>
                            </Link>
                        </li>
                        {userData?.role === "student" && (
                            <li>
                                <Link href="/student-card" className={linkClass("/student-card")}>
                                    <svg className="w-5 h-5 transition-transform group-hover:scale-110 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                    </svg>
                                    <span>Kartu Pelajar</span>
                                </Link>
                            </li>
                        )}

                        {/* Restricted Management Links */}
                        {(userData?.role === "admin" || userData?.role === "teacher") && (
                            <>
                                <li className="pt-4 pb-2">
                                    <p className="px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Management</p>
                                </li>
                                <li>
                                    <Link href="/teachers" className={linkClass("/teachers")}>
                                        <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                        <span>{t.sidebar.teachers}</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/students" className={linkClass("/students")}>
                                        <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <span>{t.sidebar.students}</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/users" className={linkClass("/users")}>
                                        <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                        <span>{t.sidebar.users}</span>
                                    </Link>
                                </li>
                            </>
                        )}

                        {/* Detailed/Technical Utilities Collapsible - Hidden for Parents & Students */}
                        {(userData?.role === "admin" || userData?.role === "teacher") && (
                            <li className="pt-2">
                                <button
                                    onClick={() => setIsUtilitiesOpen(!isUtilitiesOpen)}
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-colors text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                        <span>Utilities</span>
                                    </div>
                                    <svg className={`w-4 h-4 transition-transform duration-200 ${isUtilitiesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {isUtilitiesOpen && (
                                    <ul className="mt-1 ml-4 space-y-1 border-l-2 border-gray-100 dark:border-gray-800 pl-2">
                                        <li>
                                            <Link href="/analytics" className={linkClass("/analytics")}>
                                                <span className="text-sm">{t.sidebar.analytics}</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/media" className={linkClass("/media")}>
                                                <span className="text-sm">{t.sidebar.media}</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/image-compression" className={linkClass("/image-compression")}>
                                                <span className="text-sm">{t.sidebar.compression}</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/sprite" className={linkClass("/sprite")}>
                                                <span className="text-sm">{t.sidebar.sprite}</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/realtime-db" className={linkClass("/realtime-db")}>
                                                <span className="text-sm">{t.sidebar.realtime_db}</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/indexeddb" className={linkClass("/indexeddb")}>
                                                <span className="text-sm">{t.sidebar.indexed_db}</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/storage" className={linkClass("/storage")}>
                                                <span className="text-sm">{t.sidebar.storage}</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/pwa" className={linkClass("/pwa")}>
                                                <span className="text-sm">{t.sidebar.pwa_settings}</span>
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </li>
                        )}

                        <li className="pt-4 pb-2">
                            <p className="px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Settings</p>
                        </li>
                        {(userData?.role === "admin" || userData?.role === "teacher") && (
                            <li>
                                <Link href="/settings" className={linkClass("/settings")}>
                                    <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>{t.sidebar.settings}</span>
                                </Link>
                            </li>
                        )}
                        <li>
                            <Link href="/profile" className={linkClass("/profile")}>
                                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{isParent ? (t as any).sidebar_parent.profile : t.sidebar.profile}</span>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-800/50">
                    <Clock />
                </div>

                {/* User Profile Section Bottom */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-tr from-red-600 to-blue-600 flex items-center justify-center text-white font-bold shadow-sm overflow-hidden`}>
                            {userData?.photo ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={userData.photo} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                userData?.username?.substring(0, 2).toUpperCase() || "US"
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{userData?.username || t.sidebar.user_account}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{userData?.email || t.sidebar.user_email}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            title="Logout"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
