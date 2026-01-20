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
    const [userData, setUserData] = useState<{ username?: string; email?: string; role?: string } | null>(null);
    const [isUtilitiesOpen, setIsUtilitiesOpen] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
            setUserData(JSON.parse(storedUser));
        }
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

    const linkClass = (path: string) => `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${isActive(path)
        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-sm"
        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"}`

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
                            <div className="p-2 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-bold text-gray-900 dark:text-white tracking-tight leading-none">
                                    Web<span className="text-blue-600 dark:text-blue-400">Schooll</span>
                                </span>
                                <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Management
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
                        <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-2 border-l-2 border-blue-500/50">{t.sidebar.menu_title}</p>
                    </div>
                    <ul className="space-y-1">
                        <li>
                            <Link href="/" className={linkClass("/")}>
                                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                                <span>{t.sidebar.dashboard}</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/news" className={linkClass("/news")}>
                                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                                <span>{t.sidebar.news}</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/map" className={linkClass("/map")}>
                                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 20l-5.447-2.724A2 2 0 013 15.487V6.512a2 2 0 011.133-1.79l5.447-2.724a2 2 0 011.84 0l5.447 2.724A2 2 0 0118 6.512v8.975a2 2 0 01-1.133 1.79L11.42 20a2 2 0 01-1.84 0zM9 4.236L3.99 6.74v8.197l5.01-2.505V4.236zM11 4.236v8.196l5.01 2.505V6.741L11 4.236z" />
                                </svg>
                                <span>{t.sidebar.map}</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/attendance" className={linkClass("/attendance")}>
                                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                <span>{t.sidebar.attendance}</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/assignments" className={linkClass("/assignments")}>
                                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                <span>{t.sidebar.assignments}</span>
                            </Link>
                        </li>

                        {/* Restricted Management Links */}
                        {userData?.role !== "student" && (
                            <>
                                <div className="pt-4 pb-2">
                                    <p className="px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Management</p>
                                </div>
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

                        {/* Detailed/Technical Utilities Collapsible */}
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
                                    {userData?.role !== "student" && (
                                        <li>
                                            <Link href="/analytics" className={linkClass("/analytics")}>
                                                <span className="text-sm">{t.sidebar.analytics}</span>
                                            </Link>
                                        </li>
                                    )}
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
                                    {userData?.role !== "student" && (
                                        <>
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
                                        </>
                                    )}
                                </ul>
                            )}
                        </li>

                        <div className="pt-4 pb-2">
                            <p className="px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Settings</p>
                        </div>
                        {userData?.role !== "student" && (
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
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span>{t.sidebar.profile}</span>
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
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-sm">
                            {userData?.username?.substring(0, 2).toUpperCase() || "US"}
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
