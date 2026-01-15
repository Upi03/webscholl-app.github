"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";

export default function RegisterPage() {
    const router = useRouter();

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
            setError("Username harus diisi");
            return;
        }
        if (!email || !password || !confirmPassword) {
            setError("Semua field harus diisi");
            return;
        }

        //2 Validasi format email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Format email tidak valid");
            return;
        }

        //3 Validasi panjang password
        if (password.length < 6) {
            setError("Password minimal 6 karakter");
            return;
        }

        //4 Validasi konfirmasi password
        if (password !== confirmPassword) {
            setError("Password dan konfirmasi password tidak cocok");
            return;
        }

        //4. Validasi Recaptcha
        if (!recaptchaValue) {
            setError("Harap centang reCAPTCHA");
            return;
        }

        // Simulasi registrasi berhasil
        setError("");

        // Simpan data registrasi ke localStorage agar bisa diloginkan
        const newUser = { username, email, password };
        localStorage.setItem("registeredUser", JSON.stringify(newUser));

        setSuccess("Registrasi berhasil! Silahkan login.");

        // Delay redirect agar notifikasi terlihat
        setTimeout(() => {
            router.push("/login");
        }, 1500);
    };

    const [success, setSuccess] = useState("");

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-sans relative overflow-hidden">
            {/* Success Notification Toast */}
            {success && (
                <div className="fixed top-6 right-6 bg-white border-l-4 border-emerald-500 shadow-2xl rounded-r-xl p-4 flex items-center space-x-4 animate-slide-in-right z-50 transition-all duration-300 transform translate-x-0">
                    <div className="bg-emerald-100 p-2 rounded-full text-emerald-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800">Sukses!</h4>
                        <p className="text-sm text-gray-600">{success}</p>
                    </div>
                </div>
            )}

            <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 space-y-4 relative z-10 border border-gray-100 dark:border-gray-800">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Buat Akun Baru</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Silahkan daftar untuk mulai menggunakan Dashboard</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center border border-red-200">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
                            placeholder="name@company.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
                            placeholder="••••••••"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                        Daftar
                    </button>

                    <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                        Sudah punya akun?{" "}
                        <Link href="/login" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium hover:underline">
                            Masuk di sini
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
