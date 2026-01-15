"use client"

import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Link from "next/link";

export default function ProfileDetailsPage() {
    const [userData, setUserData] = React.useState<{ username?: string; email?: string; role?: string } | null>(null);

    React.useEffect(() => {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
            setUserData(JSON.parse(storedUser));
        }
    }, []);

    const isStudent = userData?.role === "student";

    const activities = isStudent ? [
        { title: "Mengumpulkan Tugas Matematika", time: "2 jam yang lalu", type: "success" },
        { title: "Hadir tepat waktu di kelas Fisika", time: "5 jam yang lalu", type: "info" },
        { title: "Jadwal Ujian Semester dirilis", time: "1 hari yang lalu", type: "warning" },
        { title: "Menerima Feedback Guru Seni Budaya", time: "2 hari yang lalu", type: "info" },
    ] : [
        { title: "Berhasil mengunggah modul Biologi", time: "1 jam yang lalu", type: "success" },
        { title: "Rapat Guru Bulanan dimulai", time: "3 jam yang lalu", type: "warning" },
        { title: "Memberikan nilai tugas XII-RPL", time: "1 hari yang lalu", type: "info" },
        { title: "Update kurikulum merdeka kelas X", time: "2 hari yang lalu", type: "info" },
    ];

    const studentBio = "Seorang siswa yang bersemangat dalam belajar teknologi informasi dan desain kreatif. Fokus pada pengembangan diri untuk menjadi web developer profesional di masa depan.";
    const teacherBio = "Pendidik profesional dengan pengalaman lebih dari 10 tahun dalam membimbing siswa. Berkomitmen untuk menciptakan lingkungan belajar yang interaktif dan memotivasi.";

    const skills = isStudent ? ["Matematika", "Bahasa Inggris", "Desain Grafis", "Pemrograman", "Olahraga", "Seni"] : ["Manajemen Kelas", "Kurikulum Merdeka", "E-Learning", "Metode Mengajar", "Evaluasi Siswa"];

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-gray-950 font-sans transition-colors duration-300">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-gray-950/50">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6">
                        {/* Header */}
                        <div className="mb-6">
                            <Link href="/profile" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-bold mb-4">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Kembali ke Profil
                            </Link>
                            <h1 className="text-3xl font-black text-gray-900 dark:text-white">Detail Akademik</h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">Informasi mendalam mengenai profil {isStudent ? "siswa" : "guru"}</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Bio / About */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Biodata Singkat</h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                                        {isStudent ? studentBio : teacherBio}
                                    </p>
                                    <div className="mt-8">
                                        <h4 className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">{isStudent ? "Mata Pelajaran Favorit" : "Keahlian Pendidik"}</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {skills.map((skill) => (
                                                <span key={skill} className="px-5 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl text-xs font-black border border-blue-100 dark:border-blue-800/50">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 underline decoration-blue-500 decoration-4 underline-offset-8">
                                        {isStudent ? "Jadwal Kelas Besok" : "Kelas Yang Diampu"}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {(isStudent ? [
                                            { title: "Matematika Arimatika", time: "07:30 - 09:00", instructor: "Pak Budi", color: "from-blue-400 to-blue-600" },
                                            { title: "Bahasa Indonesia", time: "09:15 - 10:45", instructor: "Ibu Siti", color: "from-purple-400 to-purple-600" },
                                        ] : [
                                            { title: "XII - Rekayasa Perangkat Lunak", time: "Senin & Rabu", instructor: "Kelas Teori", color: "from-blue-400 to-blue-600" },
                                            { title: "XI - Teknik Komputer Jaringan", time: "Selasa", instructor: "Praktikum Lab", color: "from-green-400 to-green-600" },
                                        ]).map((item, i) => (
                                            <div key={i} className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-sm border border-gray-100 dark:border-gray-800">
                                                <div className={`h-32 w-full bg-gradient-to-br ${item.color} group-hover:scale-110 transition-transform duration-500`}></div>
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                                                    <h4 className="text-white font-black text-lg">{item.title}</h4>
                                                    <p className="text-white/80 text-xs font-bold">{item.time} • {item.instructor}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Activity Feed */}
                            <div className="space-y-6">
                                <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800 h-full">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Log Aktivitas</h3>
                                    <div className="space-y-8 relative">
                                        <div className="absolute top-0 bottom-0 left-[15px] w-1 bg-gray-50 dark:bg-gray-800 rounded-full"></div>
                                        {activities.map((activity, i) => (
                                            <div key={i} className="relative flex gap-5 pl-1">
                                                <div className={`w-8 h-8 rounded-full border-4 border-white dark:border-gray-900 z-10 flex items-center justify-center text-xs shadow-xl
                                                    ${activity.type === 'success' ? 'bg-green-500' :
                                                        activity.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'}`}>
                                                </div>
                                                <div className="flex-1 -mt-1">
                                                    <p className="text-sm font-black text-gray-800 dark:text-gray-200 leading-tight tracking-tight">{activity.title}</p>
                                                    <p className="text-[10px] text-gray-400 mt-2 font-black uppercase tracking-widest bg-gray-50 dark:bg-gray-800/50 inline-block px-2 py-1 rounded-lg">{activity.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="w-full mt-10 py-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-sm">
                                        Lihat Riwayat Lengkap
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
