"use client"

import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useLanguage } from "../contexts/LanguageContext";
import Toast from "../components/Toast";
import ImageCropper from "../components/ImageCropper";

export default function SettingsPage() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState("general");
    const [userData, setUserData] = useState<{ username?: string; email?: string; photo?: string; role?: string; bio?: string } | null>(null);
    const [mounted, setMounted] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
    const [croppingImage, setCroppingImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setMounted(true);
        if (typeof window !== "undefined") {
            const storedUser = localStorage.getItem("currentUser");
            if (storedUser) {
                setUserData(JSON.parse(storedUser));
            }
        }
    }, []);

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCroppingImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleCropComplete = (croppedImage: string) => {
        const updatedUser = { ...userData, photo: croppedImage };
        setUserData(updatedUser as any);

        // Update current session
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));

        // Update persistent data
        if (updatedUser.role === "admin" && (updatedUser.username === "Admin" || updatedUser.email === "admin@example.com")) {
            // It's the default admin, use a dedicated key
            localStorage.setItem("adminProfile", JSON.stringify(updatedUser));
        } else {
            // It's a registered user (student, teacher, etc.)
            const registeredUser = JSON.parse(localStorage.getItem("registeredUser") || "{}");
            // Sync any field that exists in registeredUser
            const updatedRegisteredUser = { ...registeredUser };
            if (updatedUser.photo) updatedRegisteredUser.photo = updatedUser.photo;
            if (updatedUser.email) updatedRegisteredUser.email = updatedUser.email;
            if (updatedUser.bio) updatedRegisteredUser.bio = updatedUser.bio;

            localStorage.setItem("registeredUser", JSON.stringify(updatedRegisteredUser));
        }

        window.dispatchEvent(new Event("storage"));
        setToast({ message: "Profile photo updated!", type: "success" });
        setCroppingImage(null);
    };

    const handleSave = () => {
        if (userData) {
            // Update current session
            localStorage.setItem("currentUser", JSON.stringify(userData));

            // Update persistent data
            if (userData.role === "admin" && (userData.username === "Admin" || userData.email === "admin@example.com")) {
                // It's the default admin
                localStorage.setItem("adminProfile", JSON.stringify(userData));
            } else {
                // It's a registered user (student, teacher, etc.)
                const registeredUser = JSON.parse(localStorage.getItem("registeredUser") || "{}");
                // Sync any field that exists in registeredUser
                const updatedRegisteredUser = { ...registeredUser };
                if (userData.photo) updatedRegisteredUser.photo = userData.photo;
                if (userData.email) updatedRegisteredUser.email = userData.email;
                if (userData.bio) updatedRegisteredUser.bio = userData.bio;

                localStorage.setItem("registeredUser", JSON.stringify(updatedRegisteredUser));
            }

            window.dispatchEvent(new Event("storage"));
            setToast({ message: "Settings saved successfully!", type: "success" });
        }
    };

    if (!mounted) return null;

    const tabs = [
        {
            id: "general", name: t.settings_page.tabs.general, icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            )
        },
        {
            id: "security", name: t.settings_page.tabs.security, icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            )
        },
        {
            id: "notifications", name: t.settings_page.tabs.notifications, icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
            )
        },
        {
            id: "billing", name: t.settings_page.tabs.billing, icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
            )
        },
    ];

    const isStudent = userData?.role === "student";

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 font-sans transition-colors duration-300">
            <Navbar />
            {croppingImage && (
                <ImageCropper
                    imageSrc={croppingImage}
                    onCropComplete={handleCropComplete}
                    onCancel={() => setCroppingImage(null)}
                />
            )}
            {toast && <Toast message={toast.message} type={toast.type === "info" ? "success" : toast.type} onClose={() => setToast(null)} />}

            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50 dark:bg-gray-950/20">
                    <div className="max-w-4xl mx-auto">
                        {/* Header Section */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                            <div>
                                <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">{t.settings_page.title}</h1>
                                <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">{t.settings_page.subtitle}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all active:scale-95">
                                    {t.settings_page.cancel}
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-200 dark:shadow-none hover:bg-blue-700 transition-all active:scale-95"
                                >
                                    {t.settings_page.save}
                                </button>
                            </div>
                        </div>

                        {/* Modern Horizontal Tabs */}
                        <div className="flex items-center gap-2 mb-8 bg-gray-100 dark:bg-gray-900 p-1.5 rounded-2xl w-fit">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id
                                        ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm"
                                        : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                                        }`}
                                >
                                    {tab.icon}
                                    {tab.name}
                                </button>
                            ))}
                        </div>

                        {/* Content Card */}
                        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 p-8 md:p-10">
                            {activeTab === "general" && (
                                <div className="space-y-10 animate-fade-in">
                                    <div className="flex flex-col md:flex-row gap-10">
                                        {/* Avatar Section */}
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="relative group">
                                                <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-blue-500 to-indigo-600 p-1 shadow-2xl overflow-hidden">
                                                    {userData?.photo ? (
                                                        <img src={userData.photo} alt="Profile" className="w-full h-full object-cover rounded-2xl" />
                                                    ) : (
                                                        <div className="w-full h-full rounded-2xl bg-white dark:bg-gray-800 flex items-center justify-center text-4xl font-black text-blue-600">
                                                            {userData?.username?.substring(0, 2).toUpperCase() || "US"}
                                                        </div>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={triggerFileInput}
                                                    className="absolute -bottom-2 -right-2 p-2.5 bg-white dark:bg-gray-700 rounded-xl shadow-lg border border-gray-100 dark:border-gray-600 text-blue-600 dark:text-blue-400 hover:scale-110 transition-transform"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                </button>
                                                <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" accept="image/*" />
                                            </div>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{t.settings_page.general.photo_hint}</p>
                                        </div>

                                        {/* Fields Section */}
                                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">{t.settings_page.general.name}</label>
                                                <input
                                                    type="text"
                                                    value={userData?.username || ""}
                                                    disabled={isStudent}
                                                    readOnly={isStudent}
                                                    onChange={(e) => setUserData(prev => prev ? { ...prev, username: e.target.value } : { username: e.target.value })}
                                                    className={`w-full px-5 py-3.5 rounded-2xl border ${isStudent ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 cursor-not-allowed text-gray-500' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none'} transition-all font-bold text-gray-900 dark:text-white`}
                                                />
                                                {isStudent && <p className="text-[10px] text-orange-500 font-bold ml-1 uppercase">Siswa tidak dapat mengubah nama</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">{t.settings_page.general.email}</label>
                                                <input
                                                    type="email"
                                                    value={userData?.email || ""}
                                                    onChange={(e) => setUserData(prev => prev ? { ...prev, email: e.target.value } : { email: e.target.value })}
                                                    className="w-full px-5 py-3.5 rounded-2xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-gray-900 dark:text-white"
                                                />
                                            </div>
                                            <div className="md:col-span-2 space-y-2">
                                                <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">{t.settings_page.general.bio}</label>
                                                <textarea
                                                    rows={4}
                                                    placeholder={t.settings_page.general.bio_placeholder}
                                                    className="w-full px-5 py-3.5 rounded-2xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-gray-900 dark:text-white resize-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "security" && (
                                <div className="space-y-8 animate-fade-in">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">{t.settings_page.security.current_password}</label>
                                            <input type="password" placeholder="••••••••" className="w-full px-5 py-3.5 rounded-2xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-gray-900 dark:text-white" />
                                        </div>
                                        <div></div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">{t.settings_page.security.new_password}</label>
                                            <input type="password" placeholder="••••••••" className="w-full px-5 py-3.5 rounded-2xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-gray-900 dark:text-white" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">{t.settings_page.security.confirm_password}</label>
                                            <input type="password" placeholder="••••••••" className="w-full px-5 py-3.5 rounded-2xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-gray-900 dark:text-white" />
                                        </div>
                                    </div>

                                    <div className="pt-8 border-t border-gray-100 dark:border-gray-800">
                                        <div className="flex flex-col md:flex-row items-center justify-between p-6 rounded-3xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 gap-4">
                                            <div>
                                                <h4 className="font-black text-blue-900 dark:text-blue-400 tracking-tight">{t.settings_page.security.two_factor}</h4>
                                                <p className="text-sm text-blue-700 dark:text-blue-400/80 font-medium">{t.settings_page.security.two_factor_desc}</p>
                                            </div>
                                            <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 dark:shadow-none whitespace-nowrap">
                                                {t.settings_page.security.enable}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "notifications" && (
                                <div className="space-y-6 animate-fade-in text-center py-10 px-4">
                                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{t.settings_page.tabs.notifications}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium max-w-sm mx-auto">
                                        Sistem notifikasi email sedang dalam pengembangan. Anda akan segera dapat mengelola preferensi Anda di sini.
                                    </p>
                                </div>
                            )}

                            {activeTab === "billing" && (
                                <div className="space-y-6 animate-fade-in text-center py-10 px-4">
                                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{t.settings_page.tabs.billing}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium max-w-sm mx-auto">
                                        Informasi tagihan dan paket sekolah Anda akan muncul di sini. Fitur ini hanya tersedia untuk akun Admin.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
