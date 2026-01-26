"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ParentPayments from "../components/ParentPayments";

export default function PaymentsPage() {
    const [userData, setUserData] = useState<any>(null);
    const [bills, setBills] = useState([
        { id: 1, title: "SPP Bulan Januari 2026", amount: 500000, status: "UNPAID", dueDate: "2026-01-10" },
        { id: 2, title: "Uang Gedung Semester 2", amount: 1500000, status: "UNPAID", dueDate: "2026-02-01" },
        { id: 3, title: "Seragam Olahraga", amount: 350000, status: "PAID", dueDate: "2025-12-20" },
    ]);

    useEffect(() => {
        const stored = localStorage.getItem("currentUser");
        if (stored) {
            setUserData(JSON.parse(stored));
        }
    }, []);

    const [selectedBill, setSelectedBill] = useState<any>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePay = () => {
        setIsProcessing(true);
        // Simulate payment gateway delay
        setTimeout(() => {
            setBills(prev => prev.map(b => b.id === selectedBill.id ? { ...b, status: "PAID" } : b));
            setIsProcessing(false);
            setSelectedBill(null);
            alert("Pembayaran Berhasil! Terima kasih.");
        }, 2000);
    };

    if (userData?.role === "parent") {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
                <Navbar />
                <div className="flex flex-1 overflow-hidden">
                    <Sidebar />
                    <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50 dark:bg-gray-900">
                        <div className="max-w-5xl mx-auto">
                            <ParentPayments childName={userData?.username ? `Anak ${userData.username}` : "Siswa WebSchool"} />
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50 dark:bg-gray-900">
                    <div className="max-w-5xl mx-auto space-y-6">
                        <header className="mb-8 flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">💸 Pembayaran Online</h1>
                                <p className="text-gray-500 dark:text-gray-400">Kelola tagihan sekolah dengan mudah.</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                                <span className="text-sm text-gray-500 dark:text-gray-400 block">Total Tagihan</span>
                                <span className="text-2xl font-bold text-red-500">
                                    Rp{bills.filter(b => b.status === "UNPAID").reduce((a, b) => a + b.amount, 0).toLocaleString("id-ID")}
                                </span>
                            </div>
                        </header>

                        <div className="grid gap-4">
                            {bills.map((bill) => (
                                <div key={bill.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4 transition-transform hover:scale-[1.01]">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl ${bill.status === "PAID" ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"}`}>
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{bill.title}</h3>
                                            <p className="text-sm text-gray-500">Jatuh Tempo: {bill.dueDate}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                                        <span className="text-xl font-bold text-gray-900 dark:text-white">Rp{bill.amount.toLocaleString("id-ID")}</span>
                                        {bill.status === "PAID" ? (
                                            <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-bold rounded-lg text-sm">
                                                LUNAS
                                            </span>
                                        ) : (
                                            <button
                                                onClick={() => setSelectedBill(bill)}
                                                className="px-6 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-red-500/30 transition-all"
                                            >
                                                Bayar Sekarang
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Simple Payment Modal */}
                    {selectedBill && (
                        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
                            <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-3xl p-6 shadow-2xl scale-100 animate-scale-in">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Konfirmasi Pembayaran</h3>
                                    <button onClick={() => setSelectedBill(null)} className="text-gray-400 hover:text-gray-600">×</button>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl mb-6">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Tagihan</p>
                                    <p className="text-3xl font-black text-gray-900 dark:text-white">Rp{selectedBill.amount.toLocaleString("id-ID")}</p>
                                    <p className="text-sm text-gray-500 mt-2">{selectedBill.title}</p>
                                </div>

                                <div className="space-y-3 mb-8">
                                    <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <input type="radio" name="payment" defaultChecked className="w-5 h-5 text-red-600" />
                                        <span className="font-medium text-gray-700 dark:text-gray-200">QRIS (GoPay, OVO, Dana)</span>
                                    </label>
                                    <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <input type="radio" name="payment" className="w-5 h-5 text-red-600" />
                                        <span className="font-medium text-gray-700 dark:text-gray-200">Virtual Account Bank</span>
                                    </label>
                                </div>

                                <button
                                    onClick={handlePay}
                                    disabled={isProcessing}
                                    className="w-full py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold rounded-xl text-lg hover:shadow-xl hover:shadow-red-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                                >
                                    {isProcessing ? (
                                        <>
                                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                            Memproses...
                                        </>
                                    ) : (
                                        "Bayar Sekarang"
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
