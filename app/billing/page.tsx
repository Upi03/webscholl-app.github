"use client"

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useLanguage } from "../contexts/LanguageContext";
import Toast from "../components/Toast";

interface Transaction {
    id: string;
    description: string;
    amount: number;
    date: string;
    status: "Paid" | "Pending" | "Failed";
}

export default function BillingPage() {
    const { t } = useLanguage();
    const [mounted, setMounted] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const transactions: Transaction[] = [
        { id: "TX-9012", description: "SPP January 2026", amount: 500000, date: "2026-01-05", status: "Paid" },
        { id: "TX-8945", description: "Exam Fee Semester 1", amount: 250000, date: "2025-12-15", status: "Paid" },
        { id: "TX-8830", description: "School Uniform", amount: 750000, date: "2025-11-20", status: "Paid" },
        { id: "TX-9055", description: "SPP February 2026", amount: 500000, date: "2026-02-01", status: "Pending" },
    ];

    useEffect(() => {
        setMounted(true);
    }, []);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
            <Navbar />
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-6xl mx-auto">
                        <header className="mb-10">
                            <h1 className="text-3xl font-black text-gray-900 dark:text-white">Billing & Payments</h1>
                            <p className="text-gray-500 dark:text-gray-400">Manage your school fees and payment history.</p>
                        </header>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                            {/* Summary Card */}
                            <div className="lg:col-span-2 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-xl flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-indigo-100 font-medium mb-1 uppercase tracking-widest text-xs">Due Amount</p>
                                        <h2 className="text-5xl font-black tracking-tighter">{formatCurrency(500000)}</h2>
                                    </div>
                                    <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="mt-12 flex items-center justify-between">
                                    <div className="flex -space-x-3">
                                        <div className="w-10 h-10 rounded-full border-2 border-white bg-indigo-400 flex items-center justify-center font-bold text-xs italic">VISA</div>
                                        <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-500 flex items-center justify-center font-bold text-[10px] italic">BCA</div>
                                        <div className="w-10 h-10 rounded-full border-2 border-white bg-green-500 flex items-center justify-center font-bold text-[10px] italic">OVO</div>
                                    </div>
                                    <button
                                        onClick={() => setToast({ message: "Checkout system pending integration", type: "success" })}
                                        className="px-8 py-3 bg-white text-indigo-700 rounded-2xl font-black hover:bg-gray-100 transition-all active:scale-95 shadow-lg"
                                    >
                                        Pay Now
                                    </button>
                                </div>
                            </div>

                            {/* Status Card */}
                            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col justify-center text-center">
                                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold dark:text-white mb-2">Good Standing</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Your account is active and all previous bills are paid.</p>
                            </div>
                        </div>

                        {/* Transactions List */}
                        <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm">
                            <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 flex justify-between items-center">
                                <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-tight">Recent Transactions</h3>
                                <button className="text-indigo-600 dark:text-indigo-400 text-sm font-bold">View Statements</button>
                            </div>
                            <div className="divide-y divide-gray-100 dark:divide-gray-700">
                                {transactions.map((tx) => (
                                    <div key={tx.id} className="p-6 flex items-center hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mr-6 ${tx.status === "Paid" ? "bg-green-50 dark:bg-green-900/10 text-green-600" : "bg-yellow-50 dark:bg-yellow-900/10 text-yellow-600"
                                            }`}>
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold dark:text-white">{tx.description}</h4>
                                            <p className="text-xs text-gray-400 font-medium">#{tx.id} • {tx.date}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-black dark:text-white">{formatCurrency(tx.amount)}</p>
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${tx.status === "Paid" ? "text-green-500" : "text-yellow-500"
                                                }`}>
                                                {tx.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
