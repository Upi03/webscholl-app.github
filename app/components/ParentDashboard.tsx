"use client";

import { useLanguage } from "@/app/contexts/LanguageContext";

export default function ParentDashboard({ userData }: { userData: any }) {
    const { t } = useLanguage();

    // Mock Child Data (In a real app, this would come from a database based on the parent's ID)
    const childData = {
        name: "Budi Santoso",
        class: "10-A",
        billing: {
            total: "Rp 500.000",
            dueDate: "10 Feb 2026",
            isPaid: false
        },
        lateAssignments: [
            { id: 1, subject: "Matematika", title: "Aljabar Linear", deadline: "20 Jan 2026" },
            { id: 2, subject: "Fisika", title: "Hukum Newton", deadline: "18 Jan 2026" }
        ],
        attendance: {
            present: 18,
            absent: 1,
            sick: 1,
            totalDays: 20
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-10 group/dashboard animate-fade-in relative">
            {/* Background Decorative Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-pink-200/20 dark:bg-pink-900/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[5%] right-[-5%] w-[35%] h-[35%] bg-violet-200/20 dark:bg-violet-900/10 rounded-full blur-[120px] animation-delay-2000"></div>
            </div>

            {/* Header: Personal Family Hub Style */}
            <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-4 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-sm">Portal Orang Tua</span>
                        <div className="h-[1px] w-12 bg-red-200 dark:bg-red-800"></div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
                        {t.parent_dashboard.greeting}, <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-blue-600">{userData?.username || "Bundas"}!</span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium max-w-lg leading-relaxed">
                        {t.parent_dashboard.monitoring_hub} - <span className="text-gray-900 dark:text-white font-bold">{childData.name}</span>
                    </p>
                </div>

                {/* Child Quick Profile Avatar Style */}
                <div className="flex items-center gap-6 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl p-3 pl-6 pr-8 rounded-[2.5rem] border border-white/50 dark:border-gray-700/50 shadow-2xl shadow-red-100/20 dark:shadow-none transition-all hover:scale-105 duration-500">
                    <div className="text-right">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t.parent_dashboard.child_class}</p>
                        <p className="text-xl font-black text-blue-600 dark:text-blue-400">{childData.class}</p>
                    </div>
                    <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-tr from-red-500 to-blue-600 rounded-full flex items-center justify-center text-3xl shadow-lg ring-4 ring-white dark:ring-gray-800">
                            👦
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-[10px] text-white font-bold">✓</div>
                    </div>
                </div>
            </div>

            {/* MONITORING HUB: ACTIVE STATUS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
                {/* Real-time Presence Monitoring */}
                <div className="bg-emerald-50 dark:bg-emerald-900/10 border-2 border-emerald-100 dark:border-emerald-800/50 p-6 rounded-[2.5rem] flex items-center gap-6 shadow-xl shadow-emerald-500/5 group">
                    <div className="w-16 h-16 bg-white dark:bg-emerald-900/30 rounded-3xl flex items-center justify-center text-3xl shadow-lg ring-4 ring-emerald-100 dark:ring-emerald-800/20 group-hover:scale-110 transition-transform duration-500">
                        📍
                    </div>
                    <div>
                        <p className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">{t.parent_dashboard.today_presence}</p>
                        <h3 className="text-xl font-black text-gray-900 dark:text-white leading-tight">
                            {t.parent_dashboard.present_at} <span className="text-emerald-600">07:15 WIB</span>
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Anak Anda sudah berada di sekolah hari ini.</p>
                    </div>
                </div>

                {/* Assignment Submission Monitoring */}
                <div className="bg-red-50 dark:bg-red-900/10 border-2 border-red-100 dark:border-red-800/50 p-6 rounded-[2.5rem] flex items-center gap-6 shadow-xl shadow-red-500/5 group">
                    <div className="w-16 h-16 bg-white dark:bg-red-900/30 rounded-3xl flex items-center justify-center text-3xl shadow-lg ring-4 ring-red-100 dark:ring-red-800/20 group-hover:scale-110 transition-transform duration-500 animate-bounce-subtle">
                        ⚠️
                    </div>
                    <div>
                        <p className="text-xs font-black text-red-600 dark:text-red-400 uppercase tracking-widest mb-1">{t.parent_dashboard.assignment_status}</p>
                        <h3 className="text-xl font-black text-gray-900 dark:text-white leading-tight">
                            {childData.lateAssignments.length} {t.parent_dashboard.urgent_assignments}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Bantu ingatkan anak untuk segera mengumpulkan.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Academic & Health (8 cols) */}
                <div className="lg:col-span-8 space-y-8">

                    {/* Detailed Assignment Monitor */}
                    <div className="bg-white/40 dark:bg-gray-800/30 backdrop-blur-xl p-8 rounded-[3rem] border border-white/50 dark:border-gray-700/50">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-4">
                                📚 Detail Tugas & PR
                            </h3>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-rose-100 dark:bg-rose-900/30 text-rose-600 text-[10px] font-black uppercase rounded-full">Terlambat</span>
                                <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 text-[10px] font-black uppercase rounded-full">Masuk Deadline</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {childData.lateAssignments.map((task) => (
                                <div key={task.id} className="p-6 bg-white/60 dark:bg-gray-800/60 rounded-[2rem] border border-rose-200 dark:border-rose-800/30 flex justify-between items-center group hover:shadow-lg transition-all">
                                    <div className="flex gap-4 items-center">
                                        <div className="w-12 h-12 bg-rose-50 dark:bg-rose-900/20 rounded-2xl flex items-center justify-center text-xl shadow-inner">❌</div>
                                        <div>
                                            <p className="text-xs font-bold text-rose-500 uppercase tracking-widest">{task.subject}</p>
                                            <h4 className="font-black text-gray-900 dark:text-white text-lg leading-tight">{task.title}</h4>
                                            <p className="text-xs text-gray-400 font-medium italic">Deadline: {task.deadline}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-rose-600 bg-rose-50 px-3 py-1 rounded-full uppercase mb-2">Segera Hubungi Guru</p>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">History: Belum Dikumpulkan</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Main Child Status Card: Large Glass Design */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

                        {/* Attendance Radial Hub */}
                        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-2xl p-8 rounded-[3rem] border border-white dark:border-gray-700 shadow-xl flex flex-col items-center justify-center text-center group/card transition-all hover:bg-white/80 dark:hover:bg-gray-800/80">
                            <div className="relative w-40 h-40 mb-6 transition-transform group-hover/card:scale-110 duration-700">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-100 dark:text-gray-700" />
                                    <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={440} strokeDashoffset={440 - (440 * (childData.attendance.present / childData.attendance.totalDays))} className="text-rose-500 transition-all duration-1000 ease-out" strokeLinecap="round" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl font-black text-gray-900 dark:text-white">{Math.round((childData.attendance.present / childData.attendance.totalDays) * 100)}%</span>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Kehadiran</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-black text-gray-800 dark:text-white mb-2">{t.parent_dashboard.attendance_summary}</h3>
                            <div className="flex gap-4 text-xs font-bold">
                                <span className="px-3 py-1 bg-rose-50 dark:bg-rose-900/20 text-rose-600 rounded-full">{childData.attendance.present} Hadir</span>
                                <span className="px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-full">{childData.attendance.absent} Alpha</span>
                            </div>
                        </div>

                        {/* Schedule Glass Panel */}
                        <div className="bg-gradient-to-br from-violet-600 to-indigo-700 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group/schedule">
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-black uppercase tracking-tight">{t.student_dashboard.today_schedule}</h3>
                                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold">Senin</span>
                                </div>
                                <div className="space-y-4 flex-1">
                                    {t.student_dashboard.schedule_list.slice(0, 3).map((item: any, i: number) => (
                                        <div key={i} className="flex gap-4 items-center p-3 bg-white/10 rounded-2xl border border-white/10 hover:bg-white/20 transition-all cursor-default">
                                            <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                                            <div>
                                                <p className="text-sm font-bold leading-tight">{item.subject}</p>
                                                <p className="text-[10px] opacity-70">{item.time} • {item.room}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="mt-6 w-full py-3 bg-white text-violet-700 rounded-2xl font-black text-xs hover:bg-rose-50 transition-all uppercase tracking-widest shadow-lg">Lihat Semua Jadwal</button>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover/schedule:scale-150 transition-transform duration-1000"></div>
                        </div>

                    </div>

                    {/* Activity Timeline: Distinct Parent Item */}
                    <div className="bg-white/40 dark:bg-gray-800/30 backdrop-blur-xl p-8 rounded-[3rem] border border-white/50 dark:border-gray-700/50">
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-8 flex items-center gap-4">
                            ✨ Aktivitas & Pengumuman
                            <div className="h-[2px] flex-1 bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-700"></div>
                        </h3>
                        <div className="relative pl-8 space-y-10">
                            {/* Vertical Line */}
                            <div className="absolute left-[3px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-rose-400 via-violet-500 to-transparent opacity-30"></div>

                            {[
                                { date: "22 Jan", type: "Rapat", title: "Rapat Komite & Wali Murid", desc: "Diskusi perkembangan kurikulum semester genap di Aula Utama.", icon: "🏫", color: "rose" },
                                { date: "25 Jan", type: "Ujian", title: "Persiapan Ujian Tengah Semester", desc: "Materi ujian sudah dapat diunduh melalui portal siswa.", icon: "📝", color: "violet" },
                                { date: "30 Jan", type: "Event", title: "Pameran Karya Seni Siswa", desc: "Jangan lewatkan apresiasi karya seni terbaik siswa kelas 10.", icon: "🎨", color: "amber" },
                            ].map((activity, i) => (
                                <div key={i} className="relative group/time">
                                    <div className={`absolute -left-[35px] w-4 h-4 rounded-full bg-${activity.color}-500 border-4 border-white dark:border-gray-800 shadow-lg z-10 group-hover/time:scale-150 transition-transform`}></div>
                                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                                        <span className="text-xs font-black text-rose-500 whitespace-nowrap uppercase tracking-[0.2em]">{activity.date}</span>
                                        <div className="flex-1 p-5 bg-white/60 dark:bg-gray-800/60 rounded-[2rem] border border-white dark:border-gray-700 group-hover/time:bg-white transition-all shadow-sm group-hover/time:shadow-xl group-hover/time:shadow-rose-100/30">
                                            <div className="flex gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-xl shadow-inner">{activity.icon}</div>
                                                <div>
                                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{activity.type}</p>
                                                    <h4 className="font-black text-gray-900 dark:text-white text-lg leading-tight mb-2">{activity.title}</h4>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">{activity.desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Financial & Quick Access (4 cols) */}
                <div className="lg:col-span-4 space-y-8">

                    {/* Billing: Stylish Glass Wallet */}
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-2xl p-8 rounded-[3rem] border border-white dark:border-gray-700 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-[2rem] flex items-center justify-center text-3xl text-emerald-500 mb-6 shadow-xl shadow-emerald-500/10">
                            💰
                        </div>
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.3em] mb-2">{t.parent_dashboard.billing_status}</h3>
                        <p className="text-3xl font-black text-gray-900 dark:text-white mb-2">{childData.billing.total}</p>
                        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-8 ${childData.billing.isPaid ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                            {childData.billing.isPaid ? t.parent_dashboard.paid : t.parent_dashboard.unpaid}
                        </div>
                        <div className="w-full space-y-3 mb-8">
                            <div className="flex justify-between text-xs font-bold px-2">
                                <span className="text-gray-400">Jatuh Tempo:</span>
                                <span className="text-gray-900 dark:text-white">{childData.billing.dueDate}</span>
                            </div>
                            <div className="h-[2px] w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[70%]"></div>
                            </div>
                        </div>
                        <button className="w-full py-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-[2rem] font-black text-sm hover:shadow-2xl hover:shadow-emerald-200 transition-all active:scale-95 shadow-lg">
                            {t.parent_dashboard.view_billing}
                        </button>
                    </div>

                    {/* Quick Access Grid: Unique Buttons */}
                    <div className="grid grid-cols-2 gap-4">
                        <button className="p-6 bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all flex flex-col items-center gap-3">
                            <span className="text-3xl">📊</span>
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">E-Raport</span>
                        </button>
                        <button className="p-6 bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all flex flex-col items-center gap-3">
                            <span className="text-3xl">📝</span>
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Absensi</span>
                        </button>
                    </div>

                    {/* Teacher Contact: Card Style */}
                    <div className="bg-gradient-to-br from-rose-500 to-pink-600 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group/teacher">
                        <h3 className="text-sm font-black uppercase tracking-widest opacity-80 mb-6">Wali Kelas</h3>
                        <div className="flex items-center gap-5 mb-8">
                            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-3xl shadow-xl">👩‍🏫</div>
                            <div>
                                <p className="text-lg font-black leading-tight">Ibu Sri Wahyuni</p>
                                <p className="text-xs opacity-80 font-medium">Pembina Kelas 10-A</p>
                            </div>
                        </div>
                        <a href="https://wa.me/6281234567890" target="_blank" className="flex items-center justify-center gap-2 w-full py-4 bg-white/20 backdrop-blur-md rounded-2xl font-black text-xs hover:bg-white/30 transition-all uppercase tracking-widest">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 2c-5.512 0-9.969 4.457-9.969 9.969 0 1.762.459 3.417 1.259 4.86l-1.321 4.819 4.931-1.294c1.408.761 3.012 1.196 4.717 1.196 5.513 0 9.969-4.457 9.969-9.969s-4.457-9.969-9.969-9.969z" /></svg>
                            Hubungi via WA
                        </a>
                        {/* Blob decor */}
                        <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-white/10 rounded-full blur-2xl transition-transform group-hover/teacher:scale-150 duration-700"></div>
                    </div>

                    {/* Late Homework Banner */}
                    {childData.lateAssignments.length > 0 && (
                        <div className="bg-amber-50 dark:bg-amber-900/10 border-2 border-dashed border-amber-200 dark:border-amber-800 p-6 rounded-[2.5rem] flex flex-col items-center text-center animate-bounce-subtle">
                            <span className="text-2xl mb-2">⚠️</span>
                            <p className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-1">{childData.lateAssignments.length} Tugas Terlambat</p>
                            <p className="text-[10px] text-gray-500 font-medium">Jangan lupa ingatkan si kecil ya, Bunda!</p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
