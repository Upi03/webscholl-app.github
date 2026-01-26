"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Toast from "../components/Toast";

interface Suggestion {
    id: string;
    category: string;
    subject: string;
    message: string;
    isAnonymous: boolean;
    createdAt: string;
}

export default function SuggestionsPage() {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [category, setCategory] = useState("Fasilitas");
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("suggestions");
        if (stored) setSuggestions(JSON.parse(stored));
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const subject = (form.elements.namedItem("subject") as HTMLInputElement).value;
        const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

        const newSuggestion: Suggestion = {
            id: Date.now().toString(),
            category,
            subject,
            message,
            isAnonymous,
            createdAt: new Date().toISOString(),
        };

        const updated = [newSuggestion, ...suggestions];
        setSuggestions(updated);
        localStorage.setItem("suggestions", JSON.stringify(updated));

        setToast({ message: "Saran berhasil dikirim!", type: "success" });
        form.reset();
        setCategory("Fasilitas");
        setIsAnonymous(false);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50 dark:bg-gray-900">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Form Section */}
                        <div className="space-y-6">
                            <header>
                                <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">📩 Kotak Saran Digital</h1>
                                <p className="text-gray-500 dark:text-gray-400">Suara Anda sangat berharga bagi kemajuan sekolah.</p>
                            </header>

                            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Kategori</label>
                                        <div className="flex gap-2 flex-wrap">
                                            {["Fasilitas", "Akademik", "Kantin", "Ekskul", "Lainnya"].map((cat) => (
                                                <button
                                                    key={cat}
                                                    type="button"
                                                    onClick={() => setCategory(cat)}
                                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${category === cat
                                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                                                        : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                                                        }`}
                                                >
                                                    {cat}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Subjek / Judul</label>
                                        <input
                                            name="subject"
                                            required
                                            type="text"
                                            placeholder="Contoh: AC di kelas X-A panas"
                                            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Pesan & Detail</label>
                                        <textarea
                                            name="message"
                                            required
                                            rows={5}
                                            placeholder="Jelaskan detail saran atau pengaduan Anda..."
                                            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                                        ></textarea>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition-colors ${isAnonymous ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-500"}`}>
                                                🕵️
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 dark:text-white">Kirim Sebagai Anonim</p>
                                                <p className="text-xs text-gray-500">Identitas Anda akan disembunyikan.</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:scale-[1.02]"
                                    >
                                        Kirim Masukan 🚀
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Recent Suggestions List */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Riwayat Kiriman Anda</h2>
                            <div className="space-y-4">
                                {suggestions.length === 0 ? (
                                    <div className="text-center py-10 opacity-50">
                                        <p className="text-6xl mb-4">📭</p>
                                        <p>Belum ada saran yang dikirim.</p>
                                    </div>
                                ) : (
                                    suggestions.map((item) => (
                                        <div key={item.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-lg">
                                                    {item.category}
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    {new Date(item.createdAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </span>
                                            </div>
                                            <h3 className="text-md font-bold text-gray-900 dark:text-white mb-1">{item.subject}</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{item.message}</p>
                                            {item.isAnonymous && (
                                                <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                                                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                                                    Dikirim Anonim
                                                </div>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                    {toast && (
                        <Toast
                            message={toast.message}
                            type={toast.type}
                            onClose={() => setToast(null)}
                        />
                    )}
                </main>
            </div>
        </div>
    );
}
