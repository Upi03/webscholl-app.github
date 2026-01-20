"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { useLanguage } from "../contexts/LanguageContext";

export default function LoginPage() {
    const { t } = useLanguage();
    const router = useRouter();

    //state Input
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [confrimPassword, setConfrimPassword] = useState("");
    const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
    const [role, setRole] = useState<"student" | "admin">("student");

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
        const userData = isDefaultAdmin
            ? { ...defaultAdmin, username: "Admin", role: "admin" }
            : { ...storedUser, role: role }; // Assign selected role to user
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify(userData));

        // Delay redirect agar notifikasi terlihat
        setTimeout(() => {
            router.push("/");
        }, 1500);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-sans relative overflow-hidden">
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

            <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 space-y-6 relative z-10 border border-gray-100 dark:border-gray-800">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t.auth_page.login_title}</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t.auth_page.login_subtitle}</p>
                </div>
                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center border border-red-200">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.auth_page.login_as}</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value as "student" | "admin")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
                        >
                            <option value="student">{t.auth_page.student}</option>
                            <option value="admin">{t.auth_page.admin_teacher}</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.auth_page.email_user}</label>
                        <input
                            type="text"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
                            placeholder={t.auth_page.email_user}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.auth_page.password}</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
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
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition duration-200 transform hover:scale-[1.02]"
                    >
                        {t.auth_page.login_button}
                    </button>

                    <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                        {t.auth_page.no_account}{" "}
                        <Link href="/register" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium hover:underline">
                            {t.auth_page.register_now}
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}