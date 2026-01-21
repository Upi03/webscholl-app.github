"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { useLanguage } from "../contexts/LanguageContext";

export default function LoginPage() {
    const { t } = useLanguage();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    //state Input
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [confrimPassword, setConfrimPassword] = useState("");
    const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
    const [role, setRole] = useState<"student" | "admin" | "parent">("student");

    //state error
    const [error, setError] = useState("");
    //state success
    const [success, setSuccess] = useState("");

    //handle submit From
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        //Validasi Required (wajib Disis)
        if (!identifier || !password) {
            setError(t.auth_page.error_required);
            return;
        }

        // 2. Validasi Format (Minimal 3 karakter untuk username/email)
        if (identifier.length < 3) {
            setError(t.auth_page.error_invalid_user);
            return;
        }

        //3. Validasi Panjang Password
        if (password.length < 6) {
            setError(t.auth_page.error_password_length);
            return;
        }

        //4. Validasi Recaptcha
        if (!recaptchaValue) {
            setError(t.auth_page.error_recaptcha);
            return;
        }

        // 5. Validasi Mock Password
        const storedUser = JSON.parse(localStorage.getItem("registeredUser") || "{}");
        const defaultAdmin = { email: "admin@example.com", username: "admin", password: "password123" };


        const isValidUser =
            ((identifier === storedUser.email || identifier === storedUser.username) && password === storedUser.password) ||
            ((identifier === defaultAdmin.email || identifier === defaultAdmin.username) && password === defaultAdmin.password);

        if (!isValidUser) {
            setError(t.auth_page.error_login_failed);
            return;
        }

        // 6. Validasi Role (Simple simulation)
        // In a real app, role would be checked against the database user record.
        // For this demo, we trust the selection for "admin" only if using the default admin creds, 
        // or we just attach the selected role to the session for UI demo purposes.
        if (role === "admin" && identifier !== defaultAdmin.email && identifier !== defaultAdmin.username) {
            // Forcing "admin" login to require specific credentials could be done here, 
            // but for flexibility in this demo we will allow it but normally you'd verify rights.
            // Let's just allow it for the "demo" of views.
        }

        //Jika lolos
        setError("");
        setSuccess(t.auth_page.success_login);

        // Simpan sesi ke localStorage
        const isDefaultAdmin = identifier === defaultAdmin.email || identifier === defaultAdmin.username;
        let userData;

        if (isDefaultAdmin) {
            const savedAdminProfile = JSON.parse(localStorage.getItem("adminProfile") || "{}");
            userData = { ...defaultAdmin, username: "Admin", role: "admin", ...savedAdminProfile };
        } else {
            userData = { ...storedUser, role: role };
        }

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify(userData));

        // Delay redirect agar notifikasi terlihat
        setTimeout(() => {
            router.push("/");
        }, 1500);
    }

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
                <div className="fixed top-6 right-6 bg-white border-l-4 border-green-500 shadow-2xl rounded-r-xl p-4 flex items-center space-x-4 animate-slide-in-right z-50 transition-all duration-300 transform translate-x-0">
                    <div className="bg-green-100 p-2 rounded-full text-green-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800">{t.common.success || "Sukses!"}</h4>
                        <p className="text-sm text-gray-600">{success}</p>
                    </div>
                </div>
            )}

            <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl relative z-10 border border-white/20 dark:border-gray-800/50 overflow-hidden">
                {/* Solid Red Header Banner */}
                <div className="bg-red-700 p-8 text-center text-white relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.45l8.15 14.55H3.85L12 5.45zM11 10v4h2v-4h-2zm0 6h2v2h-2v-2z" /></svg>
                    </div>
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl mb-4">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18 18.247 18.477 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter">
                        Web<span className="opacity-80">Schooll</span>
                    </h1>
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-red-100 mt-1">{t.auth_page.login_title}</p>
                </div>

                <div className="p-8 pt-6 space-y-6">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold border border-red-100 flex items-center gap-3">
                            <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.auth_page.login_as}</label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value as "student" | "admin" | "parent")}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-gray-900 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
                            >
                                <option value="student">{t.auth_page.student}</option>
                                <option value="parent">{t.auth_page.parent}</option>
                                <option value="admin">{t.auth_page.admin_teacher}</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {role === "student" ? (t.auth_page.fullname || "Nama Lengkap") : t.auth_page.email_user}
                            </label>
                            <input
                                type="text"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-gray-900 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
                                placeholder={role === "student" ? (t.auth_page.fullname || "Nama Lengkap") : t.auth_page.email_user}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.auth_page.password}</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                            <span>{t.auth_page.login_button}</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>

                        <div className="text-center text-sm">
                            <span className="text-gray-500 dark:text-gray-400 font-medium">{t.auth_page.no_account}</span>{" "}
                            <Link href="/register" className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-black hover:underline ml-1">
                                {t.auth_page.register_now}
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
