"use client";

import React, { useState } from "react";

export default function ParentPayments({ childName }: { childName: string }) {
    const [bills, setBills] = useState([
        { id: 1, title: `SPP Bulan Januari 2026 - ${childName}`, amount: 500000, status: "UNPAID", dueDate: "2026-01-10" },
        { id: 2, title: `Uang Gedung Semester 2 - ${childName}`, amount: 1500000, status: "UNPAID", dueDate: "2026-02-01" },
        { id: 3, title: `Asuransi Siswa Tahunan - ${childName}`, amount: 200000, status: "PAID", dueDate: "2025-12-20" },
    ]);

    const [selectedBill, setSelectedBill] = useState<any>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePay = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setBills(prev => prev.map(b => b.id === selectedBill.id ? { ...b, status: "PAID" } : b));
            setIsProcessing(false);
            setSelectedBill(null);
            alert(`Pembayaran Berhasil untuk ${childName}! Kwitansi digital telah dikirim ke email Anda.`);
        }, 2000);
    };

    return (
        <div className="space-y-6">
            <header className="bg-gradient-to-r from-emerald-600 to-teal-700 p-8 rounded-[2rem] text-white shadow-xl shadow-emerald-500/20 relative overflow-hidden">
                <div className="relative z-10 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-black mb-1">🏦 Panel Wali Murid</h1>
                        <p className="opacity-90 font-medium tracking-tight">Kelola Pembayaran SPP & Administrasi Ananda <span className="font-black underline">{childName}</span></p>
                    </div>
                    <div className="bg-white/20 px-6 py-4 rounded-2xl backdrop-blur-md border border-white/30 text-right">
                        <span className="text-xs uppercase font-black opacity-80 block mb-1">Total Tunggakan</span>
                        <span className="text-3xl font-black italic">
                            Rp{bills.filter(b => b.status === "UNPAID").reduce((a, b) => a + b.amount, 0).toLocaleString("id-ID")}
                        </span>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            </header>

            <div className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-50 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/30">
                    <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-sm">Daftar Tagihan Aktif</h3>
                    <div className="flex gap-2">
                        <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-[10px] font-black uppercase tracking-wider border border-red-200">Perlu Bayar</span>
                    </div>
                </div>

                <div className="divide-y divide-gray-50 dark:divide-gray-700">
                    {bills.map((bill) => (
                        <div key={bill.id} className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                            <div className="flex items-center gap-6">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${bill.status === "PAID" ? "bg-green-100 text-green-600" : "bg-red-50 text-red-600"}`}>
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                </div>
                                <div>
                                    <h4 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">{bill.title}</h4>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="text-sm font-bold text-gray-400">Jatuh Tempo: {bill.dueDate}</span>
                                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                        <span className="text-sm font-black text-indigo-500 uppercase tracking-widest">Inv #{2400 + bill.id}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                                <div className="text-right">
                                    <p className="text-2xl font-black text-gray-900 dark:text-white">Rp{bill.amount.toLocaleString("id-ID")}</p>
                                    <p className="text-xs font-bold text-gray-400 uppercase">Tipe: Pembayaran Sekolah</p>
                                </div>
                                {bill.status === "PAID" ? (
                                    <div className="flex flex-col items-center">
                                        <div className="px-6 py-2 bg-emerald-100 text-emerald-700 font-black rounded-xl text-xs uppercase tracking-widest border border-emerald-200">LUNAS</div>
                                        <button className="mt-2 text-[10px] font-bold text-indigo-500 underline uppercase tracking-widest">Unduh Kwitansi</button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setSelectedBill(bill)}
                                        className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-xl shadow-emerald-600/20 transition-all active:scale-95"
                                    >
                                        Bayar Sekarang
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Parent Specific Payment Modal */}
            {selectedBill && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in">
                    <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-[3rem] p-10 shadow-2xl animate-scale-up border border-white/20">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Konfirmasi Bayar SPP</h3>
                            <button onClick={() => setSelectedBill(null)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-red-500 transition-colors">×</button>
                        </div>

                        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-8 rounded-3xl mb-8 border border-emerald-100 dark:border-emerald-800/50">
                            <p className="text-sm text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-widest mb-2">Total Pembayaran</p>
                            <p className="text-4xl font-black text-gray-900 dark:text-white leading-none">Rp{selectedBill.amount.toLocaleString("id-ID")}</p>
                            <div className="mt-4 pt-4 border-t border-emerald-100 dark:border-emerald-800/50 space-y-1">
                                <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{selectedBill.title}</p>
                                <p className="text-xs text-gray-500 italic">Ananda: {childName}</p>
                            </div>
                        </div>

                        <div className="space-y-4 mb-10">
                            <p className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest px-1">Pilih Metode Aman:</p>
                            <label className="flex items-center justify-between p-5 border-2 border-gray-50 dark:border-gray-800 rounded-2xl cursor-pointer hover:border-emerald-500/30 hover:bg-emerald-50/10 dark:hover:bg-emerald-900/10 transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center font-black text-blue-600 italic">VA</div>
                                    <span className="font-bold text-gray-700 dark:text-gray-200">Virtual Account (BCA/Mandiri)</span>
                                </div>
                                <input type="radio" name="payment" defaultChecked className="w-5 h-5 accent-emerald-600" />
                            </label>
                            <label className="flex items-center justify-between p-5 border-2 border-gray-50 dark:border-gray-800 rounded-2xl cursor-pointer hover:border-emerald-500/30 hover:bg-emerald-50/10 dark:hover:bg-emerald-900/10 transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center justify-center font-black text-red-600 italic">QR</div>
                                    <span className="font-bold text-gray-700 dark:text-gray-200">QRIS (Gopay/Shopee)</span>
                                </div>
                                <input type="radio" name="payment" className="w-5 h-5 accent-emerald-600" />
                            </label>
                        </div>

                        <button
                            onClick={handlePay}
                            disabled={isProcessing}
                            className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl text-xl shadow-xl shadow-emerald-600/20 transition-all flex justify-center items-center gap-3 disabled:opacity-70 active:scale-[0.98]"
                        >
                            {isProcessing ? (
                                <span className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></span>
                            ) : "Bayar Sekarang"}
                        </button>
                        <p className="mt-6 text-center text-[10px] text-gray-400 font-bold uppercase tracking-tighter">🔒 Transaksi Dijamin Aman & Terenkripsi</p>
                    </div>
                </div>
            )}
        </div>
    );
}
