"use client"

import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Link from "next/link";

export default function ProfileDetailsPage() {
    const [userData, setUserData] = React.useState<{ username?: string; email?: string } | null>(null);

    React.useEffect(() => {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
            setUserData(JSON.parse(storedUser));
        }
    }, []);

    const activities = [
        { title: "Project 'Lumina' phase 2 completed", time: "2 hours ago", type: "success" },
        { title: "New team member 'Sarah' joined", time: "5 hours ago", type: "info" },
        { title: "Maintenance scheduled for weekend", time: "1 day ago", type: "warning" },
        { title: "Billing statement updated", time: "2 days ago", type: "info" },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-gray-950 font-sans transition-colors duration-300">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-gray-950/50">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6">
                        {/* Header */}
                        <div className="mb-6">
                            <Link href="/profile" className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-bold mb-4">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Back to Profile
                            </Link>
                            <h1 className="text-3xl font-black text-gray-900 dark:text-white">Profile Details</h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">More information about {userData?.username || "your profile"}</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Bio / About */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About Me</h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        Passionate developer and designer with over 5 years of experience building modern web applications.
                                        I love creating clean, user-friendly interfaces that solve complex problems. Currently focusing
                                        on Next.js, Tailwind CSS, and advanced agentic AI systems.
                                    </p>
                                    <div className="mt-6 flex flex-wrap gap-2">
                                        {["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "UI Design"].map((skill) => (
                                            <span key={skill} className="px-4 py-1.5 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-bold border border-gray-100 dark:border-gray-700">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Projects</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            { title: "Horizon Dashboard", tech: "Next.js & Supabase", img: "bg-gradient-to-br from-blue-400 to-indigo-500" },
                                            { title: "Quantum API", tech: "Node.js & GraphQL", img: "bg-gradient-to-br from-purple-400 to-pink-500" },
                                        ].map((project, i) => (
                                            <div key={i} className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm">
                                                <div className={`h-40 w-full ${project.img} group-hover:scale-110 transition-transform duration-500`}></div>
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-5">
                                                    <h4 className="text-white font-bold">{project.title}</h4>
                                                    <p className="text-white/70 text-xs">{project.tech}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Activity Feed */}
                            <div className="space-y-6">
                                <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 h-full">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Activity Feed</h3>
                                    <div className="space-y-6 relative">
                                        <div className="absolute top-0 bottom-0 left-[15px] w-0.5 bg-gray-100 dark:bg-gray-800"></div>
                                        {activities.map((activity, i) => (
                                            <div key={i} className="relative flex gap-4 pl-1">
                                                <div className={`w-8 h-8 rounded-full border-4 border-white dark:border-gray-900 z-10 flex items-center justify-center text-xs shadow-sm shadow-indigo-100 dark:shadow-none
                                                    ${activity.type === 'success' ? 'bg-green-500' :
                                                        activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'}`}>
                                                </div>
                                                <div className="flex-1 -mt-1">
                                                    <p className="text-sm font-bold text-gray-800 dark:text-gray-200 leading-tight">{activity.title}</p>
                                                    <p className="text-xs text-gray-400 mt-1 font-medium">{activity.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="w-full mt-8 py-3 bg-slate-50 dark:bg-gray-800/50 hover:bg-slate-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-xl text-sm font-bold transition-colors">
                                        View Full History
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
