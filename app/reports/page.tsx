"use client"

import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useLanguage } from "../contexts/LanguageContext";
import Toast from "../components/Toast";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

interface Grade {
    subject: string;
    score: number;
    grade: string;
    remark: string;
}

export default function ReportsPage() {
    const { t } = useLanguage();
    const [userData, setUserData] = useState<{ username?: string; role?: string; class?: string } | null>(null);
    const [mounted, setMounted] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const reportRef = useRef<HTMLDivElement>(null);

    const grades: Grade[] = [
        { subject: "Mathematics", score: 92, grade: "A", remark: "Excellent understanding" },
        { subject: "Science", score: 88, grade: "A-", remark: "Great progress" },
        { subject: "English", score: 95, grade: "A+", remark: "Native-level proficiency" },
        { subject: "Indonesian", score: 90, grade: "A", remark: "Very good" },
        { subject: "History", score: 82, grade: "B+", remark: "Good grasp of topics" },
        { subject: "Art", score: 98, grade: "A+", remark: "Highly creative" },
    ];

    useEffect(() => {
        setMounted(true);
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) setUserData(JSON.parse(storedUser));
    }, []);

    const handleDownloadPDF = async () => {
        if (!reportRef.current) return;

        try {
            setToast({ message: "Generating PDF...", type: "success" });
            const canvas = await html2canvas(reportRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff"
            });

            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Report_Card_${userData?.username || "Student"}.pdf`);
            setToast({ message: "Report downloaded successfully!", type: "success" });
        } catch (error) {
            console.error("PDF generation failed", error);
            setToast({ message: "Failed to generate PDF", type: "error" });
        }
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
            <Navbar />
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h1 className="text-3xl font-black text-gray-900 dark:text-white">E-Report Card</h1>
                                <p className="text-gray-500 dark:text-gray-400">View and download your academic performance.</p>
                            </div>
                            <button
                                onClick={handleDownloadPDF}
                                className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold shadow-lg shadow-red-200 dark:shadow-none transition-all active:scale-95"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Download PDF
                            </button>
                        </div>

                        {/* REPORT CARD DESIGN */}
                        <div
                            ref={reportRef}
                            className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100 text-gray-900"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-start border-b-4 border-indigo-600 pb-8 mb-8">
                                <div>
                                    <h2 className="text-4xl font-black text-indigo-600 mb-2 uppercase tracking-tighter">WebScholl Academy</h2>
                                    <p className="text-sm text-gray-500 max-w-xs font-medium">Building the future of education with technology and character.</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Academic Year</p>
                                    <p className="text-xl font-black">2025/2026</p>
                                    <p className="text-sm font-bold text-indigo-600 mt-2">SEMESTER 1</p>
                                </div>
                            </div>

                            {/* Student Info */}
                            <div className="grid grid-cols-2 gap-8 mb-12 bg-gray-50 p-6 rounded-2xl">
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">Student Name</p>
                                    <p className="text-xl font-bold">{userData?.username || "Guest Student"}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">Class / Grade</p>
                                    <p className="text-xl font-bold">{userData?.class || "XII - Science 1"}</p>
                                </div>
                            </div>

                            {/* Grades Table */}
                            <table className="w-full mb-12">
                                <thead>
                                    <tr className="bg-indigo-600 text-white">
                                        <th className="py-4 px-6 text-left rounded-tl-xl font-bold uppercase text-xs tracking-widest">Subject</th>
                                        <th className="py-4 px-6 text-center font-bold uppercase text-xs tracking-widest">Score</th>
                                        <th className="py-4 px-6 text-center font-bold uppercase text-xs tracking-widest">Grade</th>
                                        <th className="py-4 px-6 text-left rounded-tr-xl font-bold uppercase text-xs tracking-widest">Remarks</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 border-x border-b border-gray-100 rounded-b-xl overflow-hidden">
                                    {grades.map((g, i) => (
                                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                                            <td className="py-5 px-6 font-bold">{g.subject}</td>
                                            <td className="py-5 px-6 text-center font-mono text-lg">{g.score}</td>
                                            <td className="py-5 px-6 text-center">
                                                <span className={`px-3 py-1 rounded-full text-xs font-black ${g.score >= 90 ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                                                    }`}>
                                                    {g.grade}
                                                </span>
                                            </td>
                                            <td className="py-5 px-6 text-sm italic text-gray-600">{g.remark}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Footer Signature */}
                            <div className="flex justify-end pt-12">
                                <div className="text-center w-64">
                                    <p className="text-sm font-medium text-gray-500 mb-20">{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                    <div className="border-b-2 border-gray-900 mb-2"></div>
                                    <p className="font-bold text-lg">School Principal</p>
                                    <p className="text-xs text-gray-500 uppercase font-black tracking-widest mt-1">NIP. 19820304 200501 1 002</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                            <h4 className="font-bold text-blue-800 dark:text-blue-400 mb-2 flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Important Note
                            </h4>
                            <p className="text-sm text-blue-700 dark:text-blue-400 opacity-80">
                                This is a digital report card generated by the WebScholl system. Please contact the administration office for the official physical copy with the school stamp.
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
