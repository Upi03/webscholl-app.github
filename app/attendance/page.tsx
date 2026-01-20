"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import QrScanner from "../components/QrScanner";
import Toast from "../components/Toast";
import { useLanguage } from "@/app/contexts/LanguageContext";

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
        { id: 2, date: "Senin, 18 Januari 2026", status: "Hadir Tepat Waktu", time: "07:00" },
        { id: 3, date: "Senin, 17 Januari 2026", status: "Hadir Tepat Waktu", time: "07:00" }
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
                            <div className="max-w-md mx-auto space-y-6">
                                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                                    <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
                                        {(t.attendance_page as any).student_title || "Absensi Siswa"}
                                    </h1>
                                    <p className="text-gray-500 dark:text-gray-400 mb-8">
                                        {(t.attendance_page as any).student_subtitle || "Silahkan absen untuk hari ini"}
                                    </p>

                                    <div className="mb-8">
                                        <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-blue-600 to-indigo-600 mb-2 tabular-nums">
                                            {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(/\./g, ':')}
                                        </div>
                                        <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">
                                            {currentTime.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                        </p>
                                    </div>

                                    {isCheckedIn ? (
                                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-100 dark:border-green-800">
                                            <div className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400 font-bold text-lg">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>Sudah Absen</span>
                                            </div>
                                            <p className="text-sm text-green-500/80 mt-1">Masuk jam {checkInTime}</p>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={handleCheckIn}
                                            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-500/30 transform transition-all hover:scale-[1.02] active:scale-[0.98]"
                                        >
                                            Absen Sekarang
                                        </button>
                                    )}
                                </div>

                                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-4">Riwayat Absensi</h3>
                                    <div className="space-y-3">
                                        {attendanceHistory.map((item) => (
                                            <div key={item.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900 dark:text-white">{item.date}</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.status}</p>
                                                    </div>
                                                </div>
                                                <span className="text-sm font-mono font-medium text-gray-600 dark:text-gray-300">{item.time}</span>
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
                        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-95"
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
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
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
