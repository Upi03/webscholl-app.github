"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { useLanguage } from "../contexts/LanguageContext";

export default function RegisterPage() {
    const { t } = useLanguage();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    //state Input
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

    //state error
    const [error, setError] = useState("");

    const [username, setUsername] = useState("");


    //handle submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        //1 Validasi sederhana

        if (!username || !username.trim()) {
            setError(t.auth_page.error_all_fields);
            return;
        }
        if (!email || !password || !confirmPassword) {
            setError(t.auth_page.error_all_fields);
            return;
        }

        //2 Validasi format email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError(t.auth_page.error_email_format);
            return;
        }

        //3 Validasi panjang password
        if (password.length < 8) {
            setError(t.auth_page.error_password_length || "Password minimum 8 karakter");
            return;
        }

        //4 Validasi konfirmasi password
        if (password !== confirmPassword) {
            setError(t.auth_page.error_password_mismatch);
            return;
        }

        //4. Validasi Recaptcha
        if (!recaptchaValue) {
            setError(t.auth_page.error_recaptcha);
            return;
        }

        // Simulasi registrasi berhasil
        setError("");

        // Simpan data registrasi ke localStorage agar bisa diloginkan
        const newUser = { username, email, password };
        localStorage.setItem("registeredUser", JSON.stringify(newUser));

        setSuccess(t.auth_page.success_register);

        // Delay redirect agar notifikasi terlihat
        setTimeout(() => {
            router.push("/login");
        }, 1500);
    };

    const [success, setSuccess] = useState("");

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-sans">
                <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 space-y-6">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Loading...</h1>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-600 via-red-700 to-blue-900 p-4 font-sans relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-500/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px] animate-pulse [animation-delay:2s]"></div>
            </div>

            {/* Success Notification Toast */}
            {success && (
                <div className="fixed top-6 right-6 bg-white border-l-4 border-emerald-500 shadow-2xl rounded-r-xl p-4 flex items-center space-x-4 animate-slide-in-right z-50 transition-all duration-300 transform translate-x-0">
                    <div className="bg-emerald-100 p-2 rounded-full text-emerald-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800">{t.common.success}</h4>
                        <p className="text-sm text-gray-600">{success}</p>
                    </div>
                </div>
            )}

            <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl relative z-10 border border-white/20 dark:border-gray-800/50 overflow-hidden text-left">
                {/* Solid Red Header Banner */}
                <div className="bg-red-700 p-8 text-center text-white relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                    </div>
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 backdrop-blur-lg rounded-2xl mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter">
                        Web<span className="opacity-80">Schooll</span>
                    </h1>
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-red-100 mt-1">{t.auth_page.register_title}</p>
                </div>

                <div className="p-8 pt-6 space-y-4">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold border border-red-100 flex items-center gap-3">
                            <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.auth_page.fullname || "Nama Lengkap"}</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-gray-900 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-gray-900 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
                                placeholder="name@company.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                minLength={8}
                                maxLength={20}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-gray-900 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
                                placeholder="••••••••"
                            />
                            <p className="text-xs text-gray-500 mt-1">Min 8, Max 20 characters</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.auth_page.confirm_password}</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                minLength={8}
                                maxLength={20}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-gray-900 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="flex justify-center pt-2">
                            <ReCAPTCHA
                                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                                onChange={(value) => setRecaptchaValue(value)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black py-3.5 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-xl shadow-red-500/20 active:scale-95 flex items-center justify-center gap-2 group"
                        >
                            <span>{t.auth_page.register_button}</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9l3 3m0 0l-3 3m3-3H22m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </button>

                        <div className="text-center text-sm">
                            <span className="text-gray-500 dark:text-gray-400 font-medium">{t.auth_page.have_account}</span>{" "}
                            <Link href="/login" className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-black hover:underline ml-1">
                                {t.auth_page.login_here}
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
