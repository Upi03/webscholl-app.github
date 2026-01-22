"use client";



import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/app/contexts/LanguageContext"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Toast from "./components/Toast";

import StudentDashboard from "./components/StudentDashboard";
import ParentDashboard from "./components/ParentDashboard";
import DashboardCharts from "./components/DashboardCharts";
import { useNotificationStore } from "./store/useNotificationStore";

export default function HomePage() {
  const router = useRouter();
  console.log("DEBUG: HomePage rendering. Calling useLanguage...");
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<{ username?: string; role?: string } | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const storedUser = localStorage.getItem("currentUser");

    if (!isLoggedIn) {
      router.push("/login");
    } else {
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
      }
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {/* Navbar with Gradient */}
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50 dark:bg-gray-900 transition-colors duration-300">
          {userData?.role === "student" ? (
            <StudentDashboard key={language} userData={userData} />
          ) : userData?.role === "parent" ? (
            <ParentDashboard key={language} userData={userData} />
          ) : (
            <div className="max-w-6xl mx-auto space-y-8">



              {/* Hero / Welcome Section */}
              <div className="bg-gradient-to-r from-red-800 to-slate-900 text-white rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden transition-colors duration-300">
                <div className="relative z-10">
                  <h2 className="text-3xl font-extrabold text-white mb-2">{t.dashboard.welcome_hero}, {userData?.username || "Admin"}! 👋</h2>
                  <p className="text-red-100 max-w-xl">
                    {t.dashboard.hero_desc}
                  </p>
                </div>
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-50 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 right-20 -mb-10 w-24 h-24 bg-purple-50 dark:bg-purple-900/20 rounded-full blur-2xl opacity-50"></div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1 */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-200 group transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2.5 py-0.5 rounded-full flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                      12.5%
                    </span>
                  </div>
                  <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{t.dashboard.total_students}</h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">1,250</p>
                </div>

                {/* Card 2 */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-200 group transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2.5 py-0.5 rounded-full flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                      8.2%
                    </span>
                  </div>
                  <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{t.dashboard.total_teachers}</h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">45</p>
                </div>

                {/* Card 3 */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-200 group transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-orange-50 dark:bg-orange-900/30 rounded-lg text-orange-600 dark:text-orange-400 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 px-2.5 py-0.5 rounded-full flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                      2.1%
                    </span>
                  </div>
                  <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{t.dashboard.active_classes}</h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">32</p>
                </div>
              </div>

              {/* Analytics Charts */}
              <DashboardCharts />

              {/* Teacher/Admin Notification Section */}
              {(userData?.role === 'admin' || userData?.role === 'teacher') && (
                <div className="bg-gradient-to-br from-red-600 to-blue-900 p-8 rounded-2xl shadow-xl text-white mb-8 border border-white/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                    <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 22a2 2 0 002-2H10a2 2 0 002 2zm6-6V10a6 6 0 00-9-5.16V4a3 3 0 00-6 0v.84A6 6 0 003 10v6l-2 2v1h18v-1l-2-2z" /></svg>
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-black mb-2 flex items-center gap-2">
                      <span className="p-2 bg-white/20 rounded-xl backdrop-blur-md">📢</span>
                      {t.notifications.create_title}
                    </h3>
                    <p className="text-blue-100 text-sm mb-6 max-w-lg">{t.notifications.create_desc}</p>

                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-blue-200">{t.notifications.form_title}</label>
                          <input
                            type="text"
                            id="notif-title"
                            placeholder={t.notifications.form_placeholder_title}
                            className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:bg-white/20 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-blue-200">{t.notifications.form_message}</label>
                          <input
                            type="text"
                            id="notif-msg"
                            placeholder={t.notifications.form_placeholder_message}
                            className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:bg-white/20 outline-none transition-all"
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const title = (document.getElementById('notif-title') as HTMLInputElement).value;
                          const msg = (document.getElementById('notif-msg') as HTMLInputElement).value;
                          if (title && msg) {
                            // Add to Store (Local immediate feedback)
                            useNotificationStore.getState().addNotification({
                              title: title,
                              message: msg,
                              type: "info"
                            });

                            // Insert into Supabase for Global Broadcast
                            import("@/lib/supabase").then(({ supabase }) => {
                              if (supabase) {
                                supabase.from('broadcasts').insert({
                                  title: title,
                                  message: msg,
                                  type: 'info', // Default type
                                  created_at: new Date().toISOString()
                                }).then(({ error }: { error: any }) => {
                                  if (error) console.error("Broadcast error:", error);
                                });
                              }
                            });

                            setToast({ message: t.notifications.success_msg, type: "success" });
                            (document.getElementById('notif-title') as HTMLInputElement).value = "";
                            (document.getElementById('notif-msg') as HTMLInputElement).value = "";

                            // Logic for browser push notification
                            if ("Notification" in window && Notification.permission === "granted") {
                              new Notification(title, { body: msg });
                            }
                          }
                        }}
                        className="w-full md:w-auto self-end px-10 py-4 bg-white text-blue-600 rounded-2xl font-black hover:bg-gray-100 transition-all active:scale-95 shadow-xl"
                      >
                        {t.notifications.send_btn}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* About School Section */}

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">{t.dashboard.about_title}</h3>
                </div>
                <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                  <p className="mb-4">
                    {t.dashboard.about_desc}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">{t.dashboard.features_title}</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {t.dashboard.features_list.map((feature: string, i: number) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <h4 className="font-bold text-purple-700 dark:text-purple-300 mb-2">{t.dashboard.tech_title}</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {t.dashboard.tech_list.map((tech: string, i: number) => (
                          <li key={i}>{tech}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>



              {/* Skeleton Demo Section Removed */}
            </div>
          )}
        </main>
      </div>

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 py-6 text-center text-sm transition-colors duration-300">
        <div className="container mx-auto">
          <p>&copy; 2026 WebSchooll App. Created with Next.js & Tailwind by UBIG.</p>
        </div>
      </footer>
    </div>

  )
}