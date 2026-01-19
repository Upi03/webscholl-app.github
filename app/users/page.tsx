"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

// Initial Dummy Data
const initialUsers = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@sekolah.com`,
    role: i % 3 == 0 ? "Admin" : i % 3 == 1 ? "Siswa" : "Guru",
    kelas: i % 2 == 0 ? "XII-RPL" : "XI-TKJ",
    tanggalLahir: `2005-0${(i % 9) + 1}-1${i % 9}`
}))

const ITEMS_PER_PAGE = 10;

function UsersContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    //State tabel
    const [users, setUsers] = useState(initialUsers);
    const [isLoading, setIsLoading] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null); // Modal Detail User

    // Form States
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        role: "Siswa",
        kelas: "XII-RPL",
        tanggalLahir: ""
    });

    // Filter States
    const [searchQuery, setSearchQuery] = useState("");
    const [filterKelas, setFilterKelas] = useState("Semua");
    const [filterRole, setFilterRole] = useState("Semua");
    const [dobStart, setDobStart] = useState("");
    const [dobEnd, setDobEnd] = useState("");

    const page = Number(searchParams.get("page") || 1);

    // Filter Logic
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.role.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesKelas = filterKelas === "Semua" || user.kelas === filterKelas;
        const matchesRole = filterRole === "Semua" || user.role === filterRole;
        const matchesDob = (!dobStart || user.tanggalLahir >= dobStart) &&
            (!dobEnd || user.tanggalLahir <= dobEnd);

        return matchesSearch && matchesKelas && matchesRole && matchesDob;
    });

    //Logic Pagination
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = page * ITEMS_PER_PAGE;
    const currrentData = filteredUsers.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

    //Efek loading saat filter atau halaman berubah
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [page, searchQuery, filterKelas, filterRole, dobStart, dobEnd]);

    //Fungsi Navigasi Pagintion
    const handlePageChange = (newPage: number) => {
        router.push(`/users?page=${newPage}`);
    }

    const resetFilters = () => {
        setSearchQuery("");
        setFilterKelas("Semua");
        setFilterRole("Semua");
        setDobStart("");
        setDobEnd("");
    };

    const handleAddUser = (e: React.FormEvent) => {
        e.preventDefault();
        const userToAdd = {
            ...newUser,
            id: users.length + 1
        };
        setUsers([userToAdd, ...users]);
        setIsModalOpen(false);
        setNewUser({ name: "", email: "", role: "Siswa", kelas: "XII-RPL", tanggalLahir: "" });
        // Optional: show toast
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 font-sans transition-colors duration-300">
            <Navbar />

            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50 dark:bg-gray-950/50 transition-colors duration-300">
                    <div className="max-w-5xl mx-auto">

                        {/* Content Card */}
                        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800 p-8 md:p-12 transition-colors duration-300">

                            {/* Header */}
                            <div className="flex justify-between items-start mb-10">
                                <div>
                                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Daftar Users</h1>
                                    <Link href="/" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-bold text-sm transition-colors mt-2 inline-block">
                                        ← Kembali ke Home
                                    </Link>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black shadow-xl shadow-blue-500/20 active:scale-95 transition-all flex items-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Tambah User
                                </button>
                            </div>

                            {/* Search & Filter Trigger */}
                            <div className="flex gap-4 mb-8">
                                <div className="flex-1 relative group">
                                    <input
                                        type="text"
                                        placeholder="Cari berdasarkan nama, email, atau role..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full px-8 py-5 rounded-2xl border-2 border-gray-50 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/30 text-gray-900 dark:text-white outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all font-bold text-lg"
                                    />
                                    <div className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500 transition-colors pointer-events-none">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                    className={`px-10 py-5 rounded-2xl font-black transition-all shadow-sm flex items-center gap-3 border-2 ${isFilterOpen
                                        ? "bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400"
                                        : "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    Filter
                                    <svg className={`w-5 h-5 transition-transform duration-500 ${isFilterOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Advanced Filter Panel */}
                            {isFilterOpen && (
                                <div className="mb-10 p-10 bg-gray-50/50 dark:bg-gray-800/50 rounded-3xl border border-gray-100 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 animate-slide-down">
                                    <div className="space-y-3">
                                        <label className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest px-1">Kelas</label>
                                        <select
                                            value={filterKelas}
                                            onChange={(e) => setFilterKelas(e.target.value)}
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-white dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-blue-500/30 font-bold shadow-sm"
                                        >
                                            <option>Semua</option>
                                            <option>XII-RPL</option>
                                            <option>XI-TKJ</option>
                                        </select>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest px-1">Role</label>
                                        <select
                                            value={filterRole}
                                            onChange={(e) => setFilterRole(e.target.value)}
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-white dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-blue-500/30 font-bold shadow-sm"
                                        >
                                            <option>Semua</option>
                                            <option>Siswa</option>
                                            <option>Guru</option>
                                            <option>Admin</option>
                                        </select>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest px-1">Tanggal Lahir Awal</label>
                                        <input
                                            type="date"
                                            value={dobStart}
                                            onChange={(e) => setDobStart(e.target.value)}
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-white dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-blue-500/30 font-bold shadow-sm"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest px-1">Tanggal Lahir Akhir</label>
                                        <input
                                            type="date"
                                            value={dobEnd}
                                            onChange={(e) => setDobEnd(e.target.value)}
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-white dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-blue-500/30 font-bold shadow-sm"
                                        />
                                    </div>
                                    <div className="md:col-span-2 pt-4">
                                        <button
                                            onClick={resetFilters}
                                            className="w-full py-5 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black transition-all shadow-xl shadow-red-500/20 active:scale-[0.98]"
                                        >
                                            Reset Filter
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Table */}
                            <div className="overflow-x-auto rounded-[2rem] border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm mb-12">
                                <table className="min-w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50/50 dark:bg-gray-800/50">
                                            <th className="px-8 py-7 text-left text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800">ID</th>
                                            <th className="px-8 py-7 text-left text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800">NAMA LENGKAP</th>
                                            <th className="px-8 py-7 text-left text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800">EMAIL</th>
                                            <th className="px-8 py-7 text-left text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800">KELAS</th>
                                            <th className="px-8 py-7 text-left text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800">TANGGAL LAHIR</th>
                                            <th className="px-8 py-7 text-left text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800">ROLE</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                        {isLoading ? (
                                            Array.from({ length: 5 }).map((_, idx) => (
                                                <tr key={idx} className="animate-pulse">
                                                    <td colSpan={6} className="px-8 py-8"><div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-full"></div></td>
                                                </tr>
                                            ))
                                        ) : filteredUsers.length === 0 ? (
                                            <tr>
                                                <td colSpan={6} className="px-8 py-16 text-center text-gray-400 font-bold italic text-lg">Data tidak ditemukan</td>
                                            </tr>
                                        ) : (
                                            currrentData.map((user) => (
                                                <tr
                                                    key={user.id}
                                                    className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group"
                                                    onClick={() => setSelectedUser(user)}
                                                >
                                                    <td className="px-8 py-8 text-sm font-bold text-gray-400 dark:text-gray-500">{user.id}</td>
                                                    <td className="px-8 py-8 text-lg font-black text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">{user.name}</td>
                                                    <td className="px-8 py-8 text-sm text-gray-500 dark:text-gray-400 font-bold">{user.email}</td>
                                                    <td className="px-8 py-8 text-sm text-gray-500 dark:text-gray-400 font-black">{user.role === 'Siswa' ? user.kelas : '-'}</td>
                                                    <td className="px-8 py-8 text-sm text-gray-500 dark:text-gray-400 font-bold italic">
                                                        {new Date(user.tanggalLahir).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                                    </td>
                                                    <td className="px-8 py-8">
                                                        <span className={`px-5 py-2 inline-flex text-xs leading-5 font-black rounded-full shadow-sm border-2 ${user.role === 'Admin' ? 'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30' :
                                                            user.role === 'Guru' ? 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30' :
                                                                'bg-green-50 text-green-600 border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30'
                                                            }`}>
                                                            {user.role}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="flex items-center justify-between pt-4">
                                <div className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center gap-3">
                                    <span className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-blue-600 font-black">{page}</span>
                                    dari {totalPages} Halaman
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => handlePageChange(page - 1)}
                                        disabled={page === 1}
                                        className="px-8 py-4 rounded-2xl border-2 border-gray-100 dark:border-gray-800 text-sm font-black text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm active:scale-95"
                                    >
                                        Sebelumnya
                                    </button>
                                    <button
                                        onClick={() => handlePageChange(page + 1)}
                                        disabled={page === totalPages}
                                        className="px-8 py-4 rounded-2xl border-2 border-gray-100 dark:border-gray-800 text-sm font-black text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm active:scale-95"
                                    >
                                        Berikutnya
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Modal Tambah User */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
                    <div className="bg-white dark:bg-gray-900 rounded-[3rem] shadow-2xl w-full max-w-xl border border-white/20 animate-scale-up overflow-hidden">
                        <div className="p-10 border-b border-gray-50 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
                            <div>
                                <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Tambah User</h3>
                                <p className="text-gray-500 dark:text-gray-400 font-bold mt-1 uppercase tracking-widest text-xs">Informasi Pengguna Baru</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white dark:bg-gray-800 text-gray-400 hover:text-red-500 transition-all shadow-sm group">
                                <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <form onSubmit={handleAddUser} className="p-10 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest px-1">Nama Lengkap</label>
                                    <input
                                        type="text"
                                        required
                                        value={newUser.name}
                                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                        className="w-full px-6 py-4 rounded-2xl border-2 border-gray-50 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/30 text-gray-900 dark:text-white outline-none focus:border-blue-500/30 focus:bg-white dark:focus:bg-gray-800 transition-all font-bold"
                                        placeholder="Contoh: Budi Santoso"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest px-1">Email Sekolah</label>
                                    <input
                                        type="email"
                                        required
                                        value={newUser.email}
                                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                        className="w-full px-6 py-4 rounded-2xl border-2 border-gray-50 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/30 text-gray-900 dark:text-white outline-none focus:border-blue-500/30 focus:bg-white dark:focus:bg-gray-800 transition-all font-bold"
                                        placeholder="user@sekolah.com"
                                    />
                                </div>
                                {newUser.role === "Siswa" && (
                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest px-1">Kelas</label>
                                        <select
                                            value={newUser.kelas}
                                            onChange={(e) => setNewUser({ ...newUser, kelas: e.target.value })}
                                            className="w-full px-6 py-4 rounded-2xl border-2 border-gray-50 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/30 text-gray-900 dark:text-white outline-none focus:border-blue-500/30 focus:bg-white dark:focus:bg-gray-800 transition-all font-bold"
                                        >
                                            <option>XII-RPL</option>
                                            <option>XI-TKJ</option>
                                        </select>
                                    </div>
                                )}
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest px-1">Role Utama</label>
                                    <select
                                        value={newUser.role}
                                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                        className="w-full px-6 py-4 rounded-2xl border-2 border-gray-50 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/30 text-gray-900 dark:text-white outline-none focus:border-blue-500/30 focus:bg-white dark:focus:bg-gray-800 transition-all font-bold"
                                    >
                                        <option>Siswa</option>
                                        <option>Guru</option>
                                        <option>Admin</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2 space-y-3">
                                    <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest px-1">Tanggal Lahir</label>
                                    <input
                                        type="date"
                                        required
                                        value={newUser.tanggalLahir}
                                        min="1950-01-01"
                                        max="2025-12-31"
                                        onChange={(e) => setNewUser({ ...newUser, tanggalLahir: e.target.value })}
                                        className="w-full px-6 py-4 rounded-2xl border-2 border-gray-50 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/30 text-gray-900 dark:text-white outline-none focus:border-blue-500/30 focus:bg-white dark:focus:bg-gray-800 transition-all font-bold"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-2xl font-black transition-all hover:bg-gray-200 active:scale-95">Batal</button>
                                <button type="submit" className="flex-2 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black transition-all shadow-xl shadow-blue-500/20 active:scale-95">Simpan Data</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Detail User */}
            {selectedUser && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl animate-fade-in"
                    onClick={() => setSelectedUser(null)}
                >
                    <div
                        className="bg-white dark:bg-gray-900 rounded-[3rem] shadow-2xl w-full max-w-md overflow-hidden animate-scale-up border border-white/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative h-32 bg-gradient-to-r from-blue-600 to-purple-600">
                            <button onClick={() => setSelectedUser(null)} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <div className="px-10 pb-10 -mt-16 text-center">
                            <div className="w-32 h-32 rounded-[2.5rem] bg-white dark:bg-gray-800 border-8 border-white dark:border-gray-900 mx-auto shadow-2xl flex items-center justify-center overflow-hidden">
                                <div className="text-4xl font-black text-blue-600">{selectedUser.name.charAt(0)}</div>
                            </div>
                            <h3 className="text-3xl font-black text-gray-900 dark:text-white mt-6 tracking-tight">{selectedUser.name}</h3>
                            <p className="text-blue-600 dark:text-blue-400 font-black uppercase tracking-widest text-sm mt-1">{selectedUser.role}</p>

                            <div className="mt-8 space-y-4 text-left bg-gray-50 dark:bg-gray-800/50 p-6 rounded-3xl border border-gray-100 dark:border-gray-700">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Email</span>
                                    <span className="font-bold text-gray-700 dark:text-white truncate max-w-[200px]">{selectedUser.email}</span>
                                </div>
                                {selectedUser.role === "Siswa" && (
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Kelas</span>
                                        <span className="font-black text-blue-600 dark:text-blue-400">{selectedUser.kelas}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Lahir</span>
                                    <span className="font-bold text-gray-700 dark:text-white">
                                        {new Date(selectedUser.tanggalLahir).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-8 p-6 bg-white rounded-3xl border-2 border-dashed border-gray-100 dark:bg-white shadow-inner flex flex-col items-center">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=ID: ${selectedUser.id}\nName: ${selectedUser.name}\nEmail: ${selectedUser.email}\nRole: ${selectedUser.role}\nKelas: ${selectedUser.kelas}`}
                                    alt={`QR Code ${selectedUser.name}`}
                                    className="w-48 h-48 object-contain"
                                />
                                <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mt-4">Digital ID Signature</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default function UsersPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        }>
            <UsersContent />
        </Suspense>
    );
}
