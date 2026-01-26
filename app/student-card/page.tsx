"use client";

import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import { motion } from "framer-motion";

export default function StudentCardPage() {
    const [isFlipped, setIsFlipped] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        // Load user data or use mock
        const stored = localStorage.getItem("currentUser");
        if (stored) {
            setUserData(JSON.parse(stored));
        } else {
            setUserData({
                username: "Siti Aminah",
                class: "XI IPA 1",
                nisn: "0054829102",
                dob: "Jakarta, 12 Mei 2008",
                photo: null
            });
        }
    }, []);

    const handleDownload = async () => {
        if (!cardRef.current) return;

        // Backup original console.error
        const originalError = console.error;
        // Suppress specific html2canvas warnings about modern color functions
        console.error = (...args: any[]) => {
            if (typeof args[0] === 'string' && args[0].includes('unsupported color function "lab"')) return;
            originalError.apply(console, args);
        };

        try {
            const canvas = await html2canvas(cardRef.current, {
                backgroundColor: null,
                scale: 2,
                logging: false,
            });
            // Restore console.error
            console.error = originalError;

            const link = document.createElement("a");
            link.download = `student-card-${userData?.username || "student"}.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();
        } catch (err) {
            console.error = originalError; // Ensure restoration on error
            console.error("Failed to download card:", err);
            alert("Gagal mengunduh kartu. Silakan coba lagi.");
        }
    };

    if (!userData) return null;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50 dark:bg-gray-900 flex flex-col items-center justify-center">

                    <div className="max-w-4xl w-full mx-auto space-y-8 text-center">
                        <div className="space-y-2">
                            <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                                Kartu Pelajar Digital 🆔
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400">
                                Kartu identitas resmi siswa WebSchool. Gunakan untuk absensi dan peminjaman buku.
                            </p>
                        </div>

                        {/* Card Container with Perspective */}
                        <div className="[perspective:1000px] w-[350px] h-[550px] mx-auto relative cursor-pointer group" onClick={() => setIsFlipped(!isFlipped)}>
                            <motion.div
                                className="w-full h-full relative [transform-style:preserve-3d] transition-all duration-700"
                                animate={{ rotateY: isFlipped ? 180 : 0 }}
                                ref={cardRef}
                            >
                                {/* FRONT SIDE */}
                                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-3xl overflow-hidden shadow-2xl bg-white text-gray-900">
                                    {/* Geometric Background - Using HEX to avoid modern color function issues */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb] via-[#4338ca] to-[#6b21a8]">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                                        {/* Grid Pattern */}
                                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10 h-full flex flex-col p-6 text-white">
                                        {/* Header */}
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/30">
                                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-lg leading-none">WebSchool</h3>
                                                    <p className="text-[10px] uppercase tracking-widest opacity-80">Kartu Pelajar</p>
                                                </div>
                                            </div>
                                            <div className="w-12 h-12 bg-white rounded-lg p-1">
                                                <QRCodeCanvas
                                                    value={userData.nisn || "000000"}
                                                    size={40}
                                                    bgColor="#FFFFFF"
                                                    fgColor="#000000"
                                                    level="L"
                                                />
                                            </div>
                                        </div>

                                        {/* Photo */}
                                        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                                            <div className="relative w-40 h-40">
                                                <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-pulse"></div>
                                                <div className="absolute inset-2 rounded-full border-2 border-white overflow-hidden bg-gray-200">
                                                    {userData.photo ? (
                                                        <img src={userData.photo} alt="Student" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-4xl">
                                                            🎓
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-indigo-800 flex items-center justify-center">
                                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <h2 className="text-2xl font-black">{userData.username}</h2>
                                                <p className="text-sm opacity-90">{userData.class || "Kelas X"}</p>
                                            </div>
                                            <div className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full border border-white/20">
                                                <p className="text-xs font-mono tracking-widest">{userData.nisn || "0054829102"}</p>
                                            </div>
                                        </div>

                                        {/* Footer */}
                                        <div className="mt-auto pt-6 border-t border-white/10 flex justify-between items-end">
                                            <div className="text-xs space-y-1 opacity-80">
                                                <p>Berlaku Hingga</p>
                                                <p className="font-bold">JULI 2026</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] opacity-60">Kepala Sekolah</p>
                                                <div className="h-8 w-24 bg-white/10 rounded my-1"></div> {/* Signature placeholder */}
                                                <p className="text-xs font-bold">Dr. Budi Santoso, M.Pd</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* BACK SIDE */}
                                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-3xl overflow-hidden shadow-2xl bg-gray-900 border border-gray-800 text-white p-6 flex flex-col">
                                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                                        <div>
                                            <h3 className="text-lg font-bold mb-2">Scan untuk Absensi</h3>
                                            <div className="p-4 bg-white rounded-2xl inline-block shadow-lg">
                                                <QRCodeCanvas
                                                    value={`student:${userData.nisn || "000"}`}
                                                    size={200}
                                                    bgColor="#FFFFFF"
                                                    fgColor="#000000"
                                                    level="H" // High error correction
                                                />
                                            </div>
                                            <p className="mt-4 text-xs text-gray-400">Tunjukkan kode QR ini ke scanner perpustakaan atau mesin absensi.</p>
                                        </div>

                                        <div className="w-full space-y-3 text-left bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                                            <div className="flex justify-between text-xs">
                                                <span className="text-gray-400">Tempat Lahir</span>
                                                <span className="font-medium">{userData.dob || "Jakarta, 01 Jan 2008"}</span>
                                            </div>
                                            <div className="flex justify-between text-xs">
                                                <span className="text-gray-400">Gol. Darah</span>
                                                <span className="font-medium">O</span>
                                            </div>
                                            <div className="flex justify-between text-xs">
                                                <span className="text-gray-400">No. Kontak</span>
                                                <span className="font-medium">+62 812 3456 7890</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-4 border-t border-gray-800 text-center text-[10px] text-gray-500">
                                        <p>Apabila kartu ini ditemukan, harap dikembalikan ke:</p>
                                        <p className="font-bold text-gray-300 mt-1">SMA WebSchool Indonesia</p>
                                        <p>Jl. Pendidikan No. 1, Jakarta Selatan</p>
                                        <p>Telp: (021) 555-0123</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Controls */}
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setIsFlipped(!isFlipped)}
                                className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-bold border border-gray-200 dark:border-gray-700"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                Balik Kartu
                            </button>
                            <button
                                onClick={handleDownload}
                                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/30 transition-all font-bold"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                Unduh PNG
                            </button>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 p-4 rounded-xl text-sm max-w-lg mx-auto">
                            💡 <strong>Tips:</strong> Simpan gambar kartu ini di HP kamu. QR Code di belakang bisa digunakan sebagai akses masuk gerbang sekolah dan juga sebagai kartu perpustakaan.
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
