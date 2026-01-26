"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/app/contexts/LanguageContext";

export default function StudentDashboard({ userData }: { userData: any }) {
    const router = useRouter();
    const { t } = useLanguage();

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Hero / Welcome Section for Student */}
            <div className="bg-gradient-to-r from-red-600 to-blue-700 rounded-2xl p-8 shadow-lg text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-3xl font-extrabold mb-2">{t.student_dashboard.greeting} {userData?.username || "Siswa"}! 🎓</h2>
                    <p className="text-red-50 max-w-xl">
                        {t.student_dashboard.welcome_desc}
                    </p>
                </div>
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-20 -mb-10 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl"></div>
            </div>

            {/* Student Specific Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{t.student_dashboard.attendance}</h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">95%</p>
                    <span className="text-xs text-green-500">{t.student_dashboard.attendance_good}</span>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{t.student_dashboard.pending_assignments}</h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">2</p>
                    <span className="text-xs text-orange-500">{t.student_dashboard.assignments_soon}</span>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{t.student_dashboard.average_score}</h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">88.5</p>
                    <span className="text-xs text-red-500">{t.student_dashboard.keep_it_up}</span>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:scale-[1.02] transition-transform cursor-pointer" onClick={() => router.push('/leaderboard')}>
                    <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-yellow-400/20 rounded-full blur-xl"></div>
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Gamification</h3>
                    <div className="flex items-end gap-2 mt-1">
                        <p className="text-2xl font-black text-yellow-500">2500</p>
                        <p className="text-xs font-bold text-gray-400 mb-1">Pts</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-yellow-600 dark:text-yellow-400 font-bold mt-1">
                        <span>🏆 Siswa Teladan</span>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:scale-[1.02] transition-transform cursor-pointer" onClick={() => router.push('/student-card')}>
                    <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-indigo-400/20 rounded-full blur-xl"></div>
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Digital ID</h3>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-black uppercase tracking-widest">
                            Active
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 font-bold mt-2">
                        <span>🆔 Lihat Kartu</span>
                    </div>
                </div>
            </div>

            {/* Schedule / Timeline */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">{t.student_dashboard.today_schedule}</h3>
                <div className="space-y-4">
                    {t.student_dashboard.schedule_list.map((item) => (
                        <div key={item.id} className={`flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors border-l-4 ${item.color === 'blue' ? 'border-red-500' : item.color === 'green' ? 'border-green-500' : 'border-blue-500'
                            }`}>
                            <div className="w-20 text-sm font-bold text-gray-500">{item.time}</div>
                            <div>
                                <p className="font-bold text-gray-900 dark:text-white">{item.subject}</p>
                                <p className="text-xs text-gray-500">{item.teacher} - {item.room}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
