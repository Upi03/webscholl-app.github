"use client"

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useLanguage } from "../contexts/LanguageContext";

interface ClassSession {
    time: string;
    subject: string;
    room: string;
    teacher: string;
    color: string;
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function SchedulePage() {
    const { t } = useLanguage();
    const [activeDay, setActiveDay] = useState("Monday");
    const [mounted, setMounted] = useState(false);

    const scheduleData: Record<string, ClassSession[]> = {
        Monday: [
            { time: "07:00 - 08:30", subject: "Mathematics", room: "Room 101", teacher: "Mr. Budi", color: "indigo" },
            { time: "08:30 - 10:00", subject: "Indonesian", room: "Room 101", teacher: "Ms. Siti", color: "blue" },
            { time: "10:30 - 12:00", subject: "Physics", room: "Lab A", teacher: "Mr. Jarwo", color: "purple" },
        ],
        Tuesday: [
            { time: "07:00 - 08:30", subject: "English", room: "Room 102", teacher: "Ms. Jane", color: "pink" },
            { time: "08:30 - 10:00", subject: "History", room: "Room 102", teacher: "Mr. Agus", color: "orange" },
            { time: "10:30 - 12:00", subject: "Art", room: "Studio", teacher: "Ms. Maya", color: "emerald" },
        ],
        Wednesday: [
            { time: "07:00 - 08:30", subject: "Biology", room: "Lab B", teacher: "Ms. Dewi", color: "green" },
            { time: "08:30 - 10:00", subject: "Mathematics", room: "Room 101", teacher: "Mr. Budi", color: "indigo" },
            { time: "10:30 - 12:00", subject: "Physical Ed", room: "Gym", teacher: "Mr. Anton", color: "red" },
        ],
        Thursday: [
            { time: "07:00 - 08:30", subject: "Chemistry", room: "Lab A", teacher: "Mr. Jarwo", color: "cyan" },
            { time: "08:30 - 10:00", subject: "English", room: "Room 102", teacher: "Ms. Jane", color: "pink" },
            { time: "10:30 - 12:00", subject: "Religion", room: "Prayer Hall", teacher: "Ust. Abdullah", color: "amber" },
        ],
        Friday: [
            { time: "07:00 - 08:30", subject: "Mathematics", room: "Room 101", teacher: "Mr. Budi", color: "indigo" },
            { time: "08:30 - 10:00", subject: "Indonesian", room: "Room 101", teacher: "Ms. Siti", color: "blue" },
        ]
    };

    useEffect(() => {
        setMounted(true);
        // Set today as active day
        const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        if (DAYS.includes(today)) {
            setActiveDay(today);
        }
    }, []);

    if (!mounted) return null;

    const getColorClass = (color: string) => {
        const classes: Record<string, string> = {
            indigo: "bg-indigo-50 dark:bg-indigo-900/10 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/30",
            blue: "bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/30",
            purple: "bg-purple-50 dark:bg-purple-900/10 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-900/30",
            pink: "bg-pink-50 dark:bg-pink-900/10 text-pink-600 dark:text-pink-400 border-pink-100 dark:border-pink-900/30",
            orange: "bg-orange-50 dark:bg-orange-900/10 text-orange-600 dark:text-orange-400 border-orange-100 dark:border-orange-900/30",
            emerald: "bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30",
            green: "bg-green-50 dark:bg-green-900/10 text-green-600 dark:text-green-400 border-green-100 dark:border-green-900/30",
            red: "bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 border-red-100 dark:border-red-900/30",
            cyan: "bg-cyan-50 dark:bg-cyan-900/10 text-cyan-600 dark:text-cyan-400 border-cyan-100 dark:border-cyan-900/30",
            amber: "bg-amber-50 dark:bg-amber-900/10 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/30",
        };
        return classes[color] || classes.indigo;
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
            <Navbar />

            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-6xl mx-auto">
                        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Class Schedule</h1>
                                <p className="text-gray-500 dark:text-gray-400 font-medium">Don't miss a beat. Check your daily academic sessions.</p>
                            </div>
                            <div className="flex bg-white dark:bg-gray-800 p-1.5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                                {DAYS.map(day => (
                                    <button
                                        key={day}
                                        onClick={() => setActiveDay(day)}
                                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeDay === day
                                                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none"
                                                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                            }`}
                                    >
                                        {day.substring(0, 3)}
                                    </button>
                                ))}
                            </div>
                        </header>

                        <div className="grid gap-6">
                            {scheduleData[activeDay]?.map((session, i) => (
                                <div
                                    key={i}
                                    className={`group relative p-6 rounded-3xl border-2 transition-all hover:scale-[1.01] ${getColorClass(session.color)}`}
                                >
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                        <div className="flex items-center gap-6">
                                            <div className="text-sm font-black uppercase tracking-widest opacity-60">
                                                {session.time}
                                            </div>
                                            <div className="h-10 w-[2px] bg-current opacity-20 hidden md:block"></div>
                                            <div>
                                                <h3 className="text-2xl font-black tracking-tight mb-1">{session.subject}</h3>
                                                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest opacity-70">
                                                    <span className="flex items-center gap-1">
                                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-10V4m0 10V4m-4 10h4" /></svg>
                                                        {session.room}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                                        {session.teacher}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="px-5 py-2 bg-white/50 dark:bg-white/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white dark:hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100">
                                            Join Class
                                        </button>
                                    </div>

                                    {/* Ongoing Indicator for specific time (Mock) */}
                                    {i === 0 && activeDay === new Date().toLocaleDateString('en-US', { weekday: 'long' }) && (
                                        <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-current rounded-full">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                                            </span>
                                            <span className="text-[10px] font-black text-white uppercase tracking-widest">Ongoing</span>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {(!scheduleData[activeDay] || scheduleData[activeDay].length === 0) && (
                                <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700">
                                    <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No classes scheduled for today.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
