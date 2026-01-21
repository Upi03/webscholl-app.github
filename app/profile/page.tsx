"use client"

import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";

export default function ProfilePage() {
    const { t } = useLanguage();
    const [userData, setUserData] = React.useState<{ username?: string; email?: string; role?: string; photo?: string } | null>(null);

    React.useEffect(() => {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
            setUserData(JSON.parse(storedUser));
        }

        // Listen for storage events to update photo in real-time
        const handleStorageChange = () => {
            const updatedUser = localStorage.getItem("currentUser");
            if (updatedUser) {
                setUserData(JSON.parse(updatedUser));
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const isStudent = userData?.role === "student";
    const isParent = userData?.role === "parent";

    const stats = isParent ? [
        { label: "Anak Terpantau", value: "1", icon: "🧒", color: "bg-red-500" },
        { label: "Kehadiran Anak", value: "98%", icon: "📅", color: "bg-emerald-500" },
        { label: "Tugas Selesai", value: "24", icon: "✅", color: "bg-blue-500" },
        { label: "Tagihan Lunas", value: "Jan-Feb", icon: "💰", color: "bg-amber-500" },
    ] : isStudent ? [
        { label: t.profile_page.stats.attendance, value: "95%", icon: "📅", color: "bg-blue-500" },
        { label: t.profile_page.stats.assignments, value: "12", icon: "📚", color: "bg-green-500" },
        { label: t.profile_page.stats.average_grade, value: "88.5", icon: "⭐", color: "bg-yellow-500" },
        { label: t.profile_page.stats.credit_points, value: "450", icon: "💎", color: "bg-purple-500" },
    ] : [
        { label: t.profile_page.stats.teaching_hours, value: "32", icon: "⏱️", color: "bg-blue-500" },
        { label: t.profile_page.stats.active_classes, value: "4", icon: "🏫", color: "bg-purple-500" },
        { label: t.profile_page.stats.materials_uploaded, value: "15", icon: "📄", color: "bg-green-500" },
        { label: t.profile_page.stats.student_feedback, value: "4.9", icon: "🌟", color: "bg-yellow-500" },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-gray-950 font-sans transition-colors duration-300">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-gray-950/50">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-6">
                        {/* Profile Info Card */}
                        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-200/50 dark:shadow-none border border-white dark:border-gray-800 p-4 md:p-6 mb-3 overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-4">
                                <Link
                                    href="/settings"
                                    className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 shadow-blue-200 text-white rounded-xl text-sm font-bold shadow-lg dark:shadow-none transition-all active:scale-95 flex items-center gap-2`}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                    {t.profile_page.edit_profile}
                                </Link>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4 items-center md:items-end">
                                <div className="relative">
                                    <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-tr from-red-600 to-blue-700 p-1 shadow-xl overflow-hidden`}>
                                        {userData?.photo ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={userData.photo} alt="Profile" className="w-full h-full object-cover rounded-xl" />
                                        ) : (
                                            <div className={`w-full h-full rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-red-600 to-blue-700`}>
                                                {userData?.username?.substring(0, 2).toUpperCase() || "US"}
                                            </div>
                                        )}
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 bg-green-500 border-4 border-white dark:border-gray-900 w-6 h-6 rounded-full shadow-lg"></div>
                                </div>
                                <div className="text-center md:text-left flex-1">
                                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-1 tracking-tight">{userData?.username || t.profile_page.default_username}</h2>
                                    <p className={`font-bold mb-2 uppercase tracking-wide text-blue-600`}>
                                        {isParent ? "Wali Murid" : isStudent ? t.profile_page.role_student : t.profile_page.role_teacher}
                                    </p>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                            {t.profile_page.location}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                            {t.profile_page.school_year}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                            {stats.map((stat, i) => (
                                <div key={i} className="bg-white dark:bg-gray-900 p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300">
                                    <div className={`w-10 h-10 rounded-2xl ${stat.color} bg-opacity-10 flex items-center justify-center text-xl mb-3`}>
                                        {stat.icon}
                                    </div>
                                    <p className="text-2xl font-black text-gray-900 dark:text-white">{stat.value}</p>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* View More Details Button */}
                        <div className="flex justify-center">
                            <Link
                                href="/profile-details"
                                className={`px-8 py-4 bg-blue-600 hover:bg-blue-700 shadow-blue-200 text-white rounded-2xl font-black shadow-xl dark:shadow-none transition-all active:scale-95 flex items-center gap-3 tracking-wide`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {t.profile_page.view_details}
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
