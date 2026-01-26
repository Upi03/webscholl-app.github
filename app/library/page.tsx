"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Toast from "../components/Toast";

interface Book {
    id: number;
    title: string;
    author: string;
    category: string;
    coverColor: string;
    stock: number;
    description: string;
}

export default function LibraryPage() {
    // Mock Data
    const books: Book[] = [
        { id: 1, title: "Laskar Pelangi", author: "Andrea Hirata", category: "Novel", coverColor: "bg-orange-500", stock: 3, description: "Kisah inspiratif sekelompok anak di Belitong yang memperjuangkan mimpi mereka." },
        { id: 2, title: "Matematika Dasar", author: "Dr. Budi Santoso", category: "Pelajaran", coverColor: "bg-blue-600", stock: 12, description: "Buku panduan lengkap matematika untuk siswa sekolah dasar dan menengah." },
        { id: 3, title: "Bumi Manusia", author: "Pramoedya A. Toer", category: "Sastra", coverColor: "bg-yellow-700", stock: 1, description: "Roman sejarah pergerakan nasional di awal abad ke-20." },
        { id: 4, title: "Biologi Modern", author: "Campbell", category: "Sains", coverColor: "bg-green-600", stock: 5, description: "Eksplorasi mendalam dunia biologi dari sel hingga ekosistem." },
        { id: 5, title: "Sejarah Dunia", author: "E.H. Gombrich", category: "Sejarah", coverColor: "bg-red-700", stock: 0, description: "Sejarah singkat dunia untuk pembaca muda." },
        { id: 6, title: "Pemrograman Web", author: "W3Schools", category: "Teknologi", coverColor: "bg-purple-600", stock: 8, description: "Panduan praktis belajar HTML, CSS, dan JavaScript." },
    ];

    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");

    const filteredBooks = books.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || book.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === "All" || book.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const handleBorrow = () => {
        if (!selectedBook) return;
        setToast({ message: `Berhasil meminjam buku "${selectedBook.title}". Harap ambil di perpustakaan.`, type: "success" });
        setSelectedBook(null);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50 dark:bg-gray-900">
                    <div className="max-w-7xl mx-auto space-y-8">
                        {/* Header & Search */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">📚 E-Library Sekolah</h1>
                                <p className="text-gray-500 dark:text-gray-400">Temukan jendela dunia lewat koleksi buku kami.</p>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Cari judul atau penulis..."
                                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 w-full md:w-64 focus:ring-2 focus:ring-blue-500 dark:text-white"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                            {["All", "Pelajaran", "Novel", "Sains", "Sejarah", "Teknologi", "Sastra"].map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setCategoryFilter(cat)}
                                    className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${categoryFilter === cat
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                                        : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Book Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {filteredBooks.map((book) => (
                                <div
                                    key={book.id}
                                    onClick={() => setSelectedBook(book)}
                                    className="group bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    {/* Book Cover */}
                                    <div className={`aspect-[2/3] ${book.coverColor} rounded-xl mb-4 relative overflow-hidden shadow-inner`}>
                                        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent"></div>
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <p className="text-white font-serif font-bold text-lg leading-tight line-clamp-2">{book.title}</p>
                                            <p className="text-white/80 text-xs mt-1">{book.author}</p>
                                        </div>
                                        {/* Book Spine Effect */}
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/20"></div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-start mb-1">
                                            <p className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">{book.category}</p>
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${book.stock > 0 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}>
                                                {book.stock > 0 ? `${book.stock} Stok` : "Habis"}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-gray-900 dark:text-white truncate" title={book.title}>{book.title}</h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{book.author}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Detail Modal */}
                    {selectedBook && (
                        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
                            <div className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-scale-in">
                                {/* Modal Cover */}
                                <div className={`md:w-1/3 ${selectedBook.coverColor} p-8 flex items-end relative`}>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="relative z-10 text-white">
                                        <h2 className="text-2xl font-serif font-bold mb-2">{selectedBook.title}</h2>
                                        <p className="opacity-90">{selectedBook.author}</p>
                                    </div>
                                    <button onClick={() => setSelectedBook(null)} className="absolute top-4 left-4 text-white/70 hover:text-white md:hidden">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </div>

                                {/* Modal Content */}
                                <div className="p-8 md:w-2/3 flex flex-col relative">
                                    <button onClick={() => setSelectedBook(null)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 hidden md:block transition-colors">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>

                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold rounded-lg uppercase tracking-wider">
                                                {selectedBook.category}
                                            </span>
                                            <span className={`text-sm font-bold ${selectedBook.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                                                {selectedBook.stock > 0 ? "Tersedia Disewa" : "Stok Kosong"}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Sinopsis</h3>
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                                            {selectedBook.description}
                                        </p>
                                    </div>

                                    <div className="mt-8 border-t border-gray-100 dark:border-gray-700 pt-6 flex gap-3">
                                        <button
                                            onClick={handleBorrow}
                                            disabled={selectedBook.stock === 0}
                                            className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed transition-all"
                                        >
                                            {selectedBook.stock > 0 ? "Pinjam Buku Ini" : "Stok Habis"}
                                        </button>
                                        <button onClick={() => setSelectedBook(null)} className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                            Batal
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

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
