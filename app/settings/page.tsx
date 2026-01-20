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
    const [userData, setUserData] = useState<{ username?: string; email?: string; photo?: string } | null>(null);
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
        setUserData(updatedUser);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        window.dispatchEvent(new Event("storage"));
        setToast({ message: "Profile photo updated!", type: "success" });
        setCroppingImage(null);
    };

    const handleSave = () => {
        if (userData) {
            localStorage.setItem("currentUser", JSON.stringify(userData));
            window.dispatchEvent(new Event("storage"));
            setToast({ message: "Settings saved successfully!", type: "success" });
        }
    };

    if (!mounted) return null;

    const tabs = [
        {
            id: "general", name: t.settings_page.tabs.general, icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
            <Navbar />
            {croppingImage && (
                <ImageCropper
                    imageSrc={croppingImage}
                    onCropComplete={handleCropComplete}
                    onCancel={() => setCroppingImage(null)}
                />
            )}
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50 dark:bg-gray-900/50">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                            <div>
                                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{t.settings_page.title}</h1>
                                <p className="text-gray-500 dark:text-gray-400 mt-1">{t.settings_page.subtitle}</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-semibold shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                                    {t.settings_page.cancel}
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all active:scale-95"
                                >
                                    {t.settings_page.save}
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            <div className="lg:col-span-3 space-y-2">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === tab.id
                                            ? "bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-gray-100 dark:border-gray-700"
                                            : "text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800/50 hover:text-gray-700 dark:hover:text-gray-200"
                                            }`}
                                    >
                                        <span className={`${activeTab === tab.id ? "text-indigo-600 dark:text-indigo-400" : "text-gray-400 group-hover:text-gray-600"}`}>
                                            {tab.icon}
                                        </span>
                                        {tab.name}
                                    </button>
                                ))}
                            </div>

                            <div className="lg:col-span-9">
                                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8">
                                    {activeTab === "general" && (
                                        <div className="space-y-8 animate-fade-in">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t.settings_page.general.title}</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-1.5">
                                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">{t.settings_page.general.name}</label>
                                                        <input
                                                            type="text"
                                                            value={userData?.username || ""}
                                                            onChange={(e) => setUserData(prev => prev ? { ...prev, username: e.target.value } : { username: e.target.value })}
                                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                                        />
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">{t.settings_page.general.email}</label>
                                                        <input
                                                            type="email"
                                                            value={userData?.email || ""}
                                                            onChange={(e) => setUserData(prev => prev ? { ...prev, email: e.target.value } : { email: e.target.value })}
                                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                                        />
                                                    </div>
                                                    <div className="md:col-span-2 space-y-1.5">
                                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">{t.settings_page.general.bio}</label>
                                                        <textarea
                                                            rows={4}
                                                            placeholder={t.settings_page.general.bio_placeholder}
                                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all resize-none"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-8 border-t border-gray-100 dark:border-gray-700">
                                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t.settings_page.general.photo}</h3>
                                                <div className="flex items-center gap-6">
                                                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-indigo-100 dark:shadow-none overflow-hidden relative">
                                                        {userData?.photo ? (
                                                            // eslint-disable-next-line @next/next/no-img-element
                                                            <img src={userData.photo} alt="Profile" className="w-full h-full object-cover" />
                                                        ) : (
                                                            userData?.username?.substring(0, 2).toUpperCase() || "US"
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" accept="image/*" />
                                                        <button onClick={triggerFileInput} className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm font-bold hover:bg-indigo-100 transition-colors">
                                                            {t.settings_page.general.upload}
                                                        </button>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">{t.settings_page.general.photo_hint}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === "security" && (
                                        <div className="space-y-8 animate-fade-in">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t.settings_page.security.title}</h3>
                                            <div className="space-y-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-1.5">
                                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">{t.settings_page.security.current_password}</label>
                                                        <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" />
                                                    </div>
                                                    <div></div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">{t.settings_page.security.new_password}</label>
                                                        <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" />
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">{t.settings_page.security.confirm_password}</label>
                                                        <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" />
                                                    </div>
                                                </div>
                                                <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                                                    <div className="flex items-center justify-between p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20">
                                                        <div>
                                                            <h4 className="font-bold text-red-800 dark:text-red-400">{t.settings_page.security.two_factor}</h4>
                                                            <p className="text-sm text-red-600 dark:text-red-400/80">{t.settings_page.security.two_factor_desc}</p>
                                                        </div>
                                                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition-all">
                                                            {t.settings_page.security.enable}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === "notifications" && (
                                        <div className="space-y-8 animate-fade-in">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t.settings_page.notifications.title}</h3>
                                            <div className="space-y-4">
                                                {[
                                                    { title: "Project updates", desc: "Get notified when there's progress in your projects." },
                                                    { title: "Team mentions", desc: "Get notified when someone mentions you in a comment." },
                                                    { title: "Account security", desc: "Get notified about login attempts and password changes." },
                                                    { title: "Weekly digest", desc: "A summary of your activities throughout the week." },
                                                ].map((item, i) => (
                                                    <div key={i} className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-700 last:border-0">
                                                        <div>
                                                            <h4 className="font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                                                        </div>
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input type="checkbox" defaultChecked={i < 2} className="sr-only peer" />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600 transition-colors"></div>
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === "billing" && (
                                        <div className="space-y-8 animate-fade-in">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Current Plan</h3>
                                            <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl">
                                                <div className="flex justify-between items-start mb-8">
                                                    <div>
                                                        <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider">Premium Plus</span>
                                                        <h4 className="text-3xl font-extrabold mt-3">$49/mo</h4>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-indigo-100 text-sm">Next billing date</p>
                                                        <p className="font-bold">Feb 24, 2026</p>
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                                                        <div className="bg-white h-full w-[75%]"></div>
                                                    </div>
                                                    <div className="flex justify-between text-sm font-medium">
                                                        <span>7.5GB of 10GB used</span>
                                                        <span>75%</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                                                <h4 className="font-bold text-gray-900 dark:text-white mb-4">Payment Methods</h4>
                                                <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                                                    <div className="w-12 h-8 bg-white dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-700 flex items-center justify-center font-bold text-xs italic text-blue-800">VISA</div>
                                                    <div className="flex-1">
                                                        <p className="font-bold text-gray-900 dark:text-white">Visa ending in 1234</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">Expires 12/28</p>
                                                    </div>
                                                    <button className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">Edit</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
