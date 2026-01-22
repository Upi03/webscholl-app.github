"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import QrScanner from "../components/QrScanner";
import Toast from "../components/Toast";
import { useLanguage } from "@/app/contexts/LanguageContext";
import dynamic from "next/dynamic";

const QRCodeCanvas = dynamic(
    () => import("qrcode.react").then((mod) => mod.QRCodeCanvas),
    { ssr: false }
);

export default function AttendancePage() {
    const { t } = useLanguage();
    const [userData, setUserData] = useState<{ username?: string; email?: string; role?: string } | null>(null);
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [checkInTime, setCheckInTime] = useState<string | null>(null);
    const [showScanner, setShowScanner] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const [currentTime, setCurrentTime] = useState(new Date());

    const [attendanceHistory, setAttendanceHistory] = useState([
        { id: 1, date: "Senin, 19 Januari 2026", status: "Hadir Tepat Waktu", time: "07:00" },
        { id: 2, date: "Senin, 26 Januari 2026", status: "Hadir Tepat Waktu", time: "07:00" },
        { id: 3, date: "Senin, 04 Februari 2026", status: "Hadir Tepat Waktu", time: "07:00" },
        { id: 4, date: "Senin, 12 Februari 2026", status: "Hadir Tepat Waktu", time: "07:00" }
    ]);

    React.useEffect(() => {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
            setUserData(JSON.parse(storedUser));
        }
        // Mock check if already checked in
        const today = new Date().toDateString();
        const lastCheckIn = localStorage.getItem("lastCheckInDate");
        if (lastCheckIn === today) {
            setIsCheckedIn(true);
            setCheckInTime(localStorage.getItem("lastCheckInTime"));
        }

        // Live Clock Interval
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleCheckIn = () => {
        const now = new Date();
        const timeString = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        const dateString = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

        // Logic Status Absensi
        // 06:00 - 07:00 -> Hadir Tepat Waktu
        // > 07:00 -> Hadir Terlambat
        const hour = now.getHours();
        const minute = now.getMinutes();

        let status = "Hadir Terlambat";
        if (hour === 6 || (hour === 7 && minute === 0)) {
            status = "Hadir Tepat Waktu";
        }

        setIsCheckedIn(true);
        setCheckInTime(timeString);
        localStorage.setItem("lastCheckInDate", now.toDateString());
        localStorage.setItem("lastCheckInTime", timeString);

        // Add to history
        setAttendanceHistory(prev => [{
            id: Date.now(),
            date: dateString,
            status: status,
            time: timeString
        }, ...prev]);
    };

    const handleScanResult = (decodedText: string) => {
        try {
            const scannedData = JSON.parse(decodedText);
            setToast({ message: `Absensi siswa ${scannedData.username} berhasil dicatat!`, type: "success" });
            setShowScanner(false);

            // Re-use logic for adding to teacher students list if it were dynamic
            // For now, just toast success and close.
        } catch (e) {
            setToast({ message: "Format QR Code tidak valid.", type: "error" });
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
            <Navbar />
            {showScanner && (
                <QrScanner
                    onResult={handleScanResult}
                    onClose={() => setShowScanner(false)}
                />
            )}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50 dark:bg-gray-900">
                    <div className="max-w-6xl mx-auto space-y-6">

                        {userData?.role === 'student' ? (
                            /* STUDENT VIEW */
                            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
                                <header className="text-center md:text-left">
                                    <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Presensi Mandiri</h1>
                                    <p className="text-gray-500 dark:text-gray-400">Silakan lakukan absensi hari ini menggunakan QR Code atau tombol di bawah.</p>
                                </header>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {/* CLOCK & ACTION CARD */}
                                    <div className="md:col-span-1 space-y-6">
                                        <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-8 shadow-xl border border-gray-100 dark:border-gray-700 text-center">
                                            <p className="text-red-600 dark:text-red-400 font-black uppercase tracking-widest text-xs mb-4">Waktu Saat Ini</p>
                                            <div className="text-4xl font-black text-gray-900 dark:text-white mb-2 font-mono tabular-nums">
                                                {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                            </div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">{currentTime.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}</p>

                                            {!isCheckedIn ? (
                                                <button
                                                    onClick={handleCheckIn}
                                                    className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black shadow-lg shadow-red-200 dark:shadow-none transition-all active:scale-95 flex items-center justify-center gap-3"
                                                >
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    Tap Absensi
                                                </button>
                                            ) : (
                                                <div className="py-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-2xl font-bold flex items-center justify-center gap-2 border border-emerald-100 dark:border-emerald-800">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                                                    Tercatat: {checkInTime}
                                                </div>
                                            )}
                                        </div>

                                        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden group">
                                            <div className="relative z-10">
                                                <h3 className="font-black text-xl mb-1">ID Card Digital</h3>
                                                <p className="text-blue-100/70 text-sm mb-6">Tunjukkan QR ini ke pembimbing di gerbang sekolah.</p>
                                                <div className="bg-white p-2 rounded-2xl w-40 h-40 mx-auto shadow-inner flex items-center justify-center">
                                                    {/* Real QR Code Generation */}
                                                    <QRCodeCanvas
                                                        value={JSON.stringify({
                                                            username: userData?.username,
                                                            email: userData?.email,
                                                            role: userData?.role,
                                                            timestamp: currentTime.toISOString()
                                                        })}
                                                        size={144}
                                                        level="H"
                                                        includeMargin={false}
                                                        imageSettings={{
                                                            src: "/webschool-logo.svg",
                                                            x: undefined,
                                                            y: undefined,
                                                            height: 36,
                                                            width: 36,
                                                            excavate: true,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>
                                        </div>
                                    </div>

                                    {/* HISTORY LIST */}
                                    <div className="md:col-span-2 space-y-6">
                                        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-[2.5rem] border border-white dark:border-gray-700 shadow-xl overflow-hidden h-full">
                                            <div className="p-8 border-b border-gray-100 dark:border-gray-700">
                                                <h3 className="text-xl font-black text-gray-900 dark:text-white">Riwayat Kehadiran Anda</h3>
                                            </div>
                                            <div className="divide-y divide-gray-100 dark:divide-gray-700">
                                                {attendanceHistory.map((item) => (
                                                    <div key={item.id} className="p-6 flex items-center justify-between hover:bg-white/40 dark:hover:bg-gray-700/30 transition-all group">
                                                        <div className="flex items-center gap-6">
                                                            <div className="w-14 h-14 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform">
                                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-bold text-gray-900 dark:text-white">{item.date}</p>
                                                                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">{item.status}</span>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-lg font-black text-gray-900 dark:text-white">{item.time}</p>
                                                            <p className="text-[10px] text-gray-400 font-bold uppercase">Gate 1</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : userData?.role === 'parent' ? (
                            /* PARENT MONITORING VIEW */
                            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
                                <header className="text-center space-y-2">
                                    <h1 className="text-3xl font-black text-gray-900 dark:text-white">
                                        Monitoring Kehadiran Anak
                                    </h1>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Pantau riwayat dan status kehadiran harian anak secara real-time.
                                    </p>
                                </header>

                                {/* Today's Live Status for Parent */}
                                <div className="bg-gradient-to-br from-red-600 to-blue-700 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-red-500/20 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 opacity-10">
                                        <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" /></svg>
                                    </div>
                                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div>
                                            <p className="text-red-100 font-bold uppercase tracking-[0.2em] text-xs mb-2">Status Hari Ini</p>
                                            <h2 className="text-4xl font-black">Hadir Tepat Waktu</h2>
                                            <p className="text-red-100/80 mt-1 font-medium italic">Anak Anda melakukan scan masuk pada 07:15 WIB</p>
                                        </div>
                                        <div className="bg-white/20 backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/30 text-center">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-white/70 mb-1">Total Kehadiran</p>
                                            <p className="text-3xl font-black">98.5%</p>
                                        </div>
                                    </div>
                                </div>

                                {/* History List Tailored for Parents */}
                                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-[2.5rem] border border-white dark:border-gray-700 shadow-xl overflow-hidden">
                                    <div className="p-8 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                        <h3 className="text-xl font-black text-gray-900 dark:text-white">Riwayat Kehadiran</h3>
                                        <button className="text-red-600 dark:text-red-400 text-sm font-black uppercase tracking-widest">Detail Bulanan</button>
                                    </div>
                                    <div className="divide-y divide-gray-100 dark:divide-gray-700">
                                        {attendanceHistory.map((item) => (
                                            <div key={item.id} className="p-6 flex items-center justify-between hover:bg-white/40 dark:hover:bg-gray-700/30 transition-all group">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-14 h-14 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform">
                                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900 dark:text-white">{item.date}</p>
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">{item.status}</span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-lg font-black text-gray-900 dark:text-white">{item.time}</p>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase">Scan Location: Gate 1</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* MANAGEMENT VIEW (Teachers/Admins) - Existing Logic */
                            <AttendanceManagementView
                                userData={userData}
                                setShowScanner={setShowScanner}
                            />
                        )}

                    </div>
                </main>
            </div>
        </div>
    );
}

function AttendanceManagementView({ userData, setShowScanner }: { userData: any, setShowScanner: (val: boolean) => void }) {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<"students" | "teachers">("students");

    // Mock Data with Pending Status
    const [students, setStudents] = useState([
        { id: 101, name: "Rina Wati", class: "XII-IPA-1", status: "Pending", time: "06:45" },
        { id: 102, name: "Joko Anwar", class: "XI-IPS-3", status: "Pending", time: "06:50" },
        { id: 1, name: "Ali baba", class: "X-IPA-1", status: "Present", time: "07:00" },
        { id: 2, name: "Maria Ozawa", class: "XI-IPS-2", status: "Absent", time: "-" },
        { id: 3, name: "John Doe", class: "XII-IPA-3", status: "Present", time: "07:05" },
        { id: 4, name: "Jane Smith", class: "X-IPS-1", status: "Late", time: "07:30" },
        { id: 5, name: "Michael Jordan", class: "X-IPA-2", status: "Present", time: "07:15" },
    ]);

    const handleApprove = (id: number) => {
        setStudents(prev => prev.map(s => s.id === id ? { ...s, status: "Present" } : s));
    };

    const handleReject = (id: number) => {
        setStudents(prev => prev.map(s => s.id === id ? { ...s, status: "Absent" } : s));
    };

    const pendingStudents = students.filter(s => s.status === "Pending");
    const historyStudents = students.filter(s => s.status !== "Pending");

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 dark:text-white">
                        Konfirmasi Absensi
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Kelola dan konfirmasi kehadiran siswa hari ini.
                    </p>
                </div>
                {(userData?.role === 'teacher' || userData?.role === 'admin') && (
                    <button
                        onClick={() => setShowScanner(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold shadow-lg shadow-red-200 dark:shadow-none transition-all active:scale-95"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Pindai QR Siswa
                    </button>
                )}
            </div>

            {/* PENDING REQUESTS SECTION */}
            {pendingStudents.length > 0 && (
                <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/30 rounded-2xl p-6">
                    <h2 className="text-lg font-bold text-yellow-800 dark:text-yellow-500 mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Menunggu Konfirmasi ({pendingStudents.length})
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {pendingStudents.map((student) => (
                            <div key={student.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                                            {student.name.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 dark:text-white">{student.name}</h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{student.class}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-mono font-medium text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                        {student.time}
                                    </span>
                                </div>
                                <div className="flex space-x-2 mt-auto">
                                    <button
                                        onClick={() => handleApprove(student.id)}
                                        className="flex-1 bg-green-50 hover:bg-green-100 text-green-600 dark:bg-green-900/20 dark:hover:bg-green-900/40 dark:text-green-400 py-2 rounded-lg font-bold text-sm transition-colors flex items-center justify-center"
                                    >
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                                        Terima
                                    </button>
                                    <button
                                        onClick={() => handleReject(student.id)}
                                        className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400 py-2 rounded-lg font-bold text-sm transition-colors flex items-center justify-center"
                                    >
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                                        Tolak
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* HISTORY LIST */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                    <h3 className="font-bold text-gray-700 dark:text-gray-200">Riwayat Kehadiran Hari Ini</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 font-bold uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4">{t.attendance_page.name}</th>
                                <th className="px-6 py-4">{t.attendance_page.class}</th>
                                <th className="px-6 py-4">{t.attendance_page.check_in}</th>
                                <th className="px-6 py-4">{t.attendance_page.status}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {historyStudents.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ${item.status === 'Present' ? 'bg-green-500' : 'bg-gray-400'}`}>
                                                {item.name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <span>{item.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                        {item.class}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400 font-mono">
                                        {item.time}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.status === "Present"
                                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                            : item.status === "Absent"
                                                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                            }`}>
                                            {item.status === "Present" ? t.attendance_page.present : item.status === "Absent" ? t.attendance_page.absent : item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
