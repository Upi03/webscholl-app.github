"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "../contexts/LanguageContext"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import Toast from "../components/Toast"

interface Assignment {
    id: number
    subject: string
    title: string
    deadline: string
    status: "Belum Dikerjakan" | "Sudah Dikumpulkan" | "Dinilai"
    score?: number
    studentName?: string // For teacher view
}

export default function AssignmentsPage() {
    const router = useRouter()
    const { t, language } = useLanguage()
    const [role, setRole] = useState<string | null>(null)
    const [assignments, setAssignments] = useState<Assignment[]>([])

    // Localized dummy data
    const STUDENT_ASSIGNMENTS = React.useMemo<Assignment[]>(() => [
        { id: 1, subject: t.teachers.math, title: language === 'id' ? "Latihan Aljabar Linear" : "Linear Algebra Practice", deadline: "2026-01-20", status: "Belum Dikerjakan" },
        { id: 2, subject: t.teachers.indo, title: language === 'id' ? "Membuat Puisi" : "Write a Poem", deadline: "2026-01-18", status: "Sudah Dikumpulkan" },
        { id: 3, subject: language === 'id' ? "Fisika" : "Physics", title: language === 'id' ? "Laporan Praktikum Hukum Newton" : "Newton's Law Lab Report", deadline: "2026-01-15", status: "Dinilai", score: 85 },
    ], [t, language])

    const TEACHER_SUBMISSIONS = React.useMemo<Assignment[]>(() => [
        { id: 101, subject: t.teachers.math, title: language === 'id' ? "Latihan Aljabar Linear" : "Linear Algebra Practice", studentName: "Ahmad Siswa", deadline: "2026-01-20", status: "Sudah Dikumpulkan" },
        { id: 102, subject: t.teachers.math, title: language === 'id' ? "Latihan Aljabar Linear" : "Linear Algebra Practice", studentName: "Budi Santoso", deadline: "2026-01-20", status: "Dinilai", score: 90 },
        { id: 103, subject: language === 'id' ? "Fisika" : "Physics", title: language === 'id' ? "Laporan Praktikum" : "Lab Report", studentName: "Siti Aminah", deadline: "2026-01-15", status: "Sudah Dikumpulkan" },
    ], [t, language])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)
    const [newAssignment, setNewAssignment] = useState({ subject: "", title: "", deadline: "" })

    useEffect(() => {
        const userData = localStorage.getItem("currentUser")
        if (userData) {
            const parsedUser = JSON.parse(userData)
            const userRole = parsedUser.role || "student" // Fallback to student if role is missing
            setRole(userRole)

            if (userRole === "student") {
                setAssignments(STUDENT_ASSIGNMENTS)
            } else {
                setAssignments(TEACHER_SUBMISSIONS)
            }
        } else {
            router.push("/login")
        }
    }, [router])

    const handleUploadClick = (assignment: Assignment) => {
        setSelectedAssignment(assignment)
        setIsModalOpen(true)
    }

    const handleGradingChange = (id: number, newScore: string) => {
        if (newScore === "") {
            setAssignments((prev) =>
                prev.map((item) => (item.id === id ? { ...item, score: 0, status: "Sudah Dikumpulkan" } : item))
            )
            return
        }

        let scoreValue = Number(newScore)

        // Clamp value between 0 and 100
        if (scoreValue > 100) scoreValue = 100
        if (scoreValue < 0) scoreValue = 0

        setAssignments((prev) =>
            prev.map((item) => (item.id === id ? { ...item, score: scoreValue, status: "Dinilai" } : item))
        )
    }

    const handleConfirmUpload = () => {
        setToast({ message: t.assignments.upload_success, type: "success" })
        setIsModalOpen(false)
    }

    const handleCreateAssignment = () => {
        if (!newAssignment.subject || !newAssignment.title || !newAssignment.deadline) {
            setToast({ message: t.assignments.fill_all, type: "error" })
            return
        }

        const newId = Math.max(...assignments.map(a => a.id), 0) + 1
        const assignmentRecord: Assignment = {
            id: newId,
            subject: newAssignment.subject,
            title: newAssignment.title,
            deadline: newAssignment.deadline,
            status: "Belum Dikerjakan"
        }

        setAssignments([assignmentRecord, ...assignments])
        setIsCreateModalOpen(false)
        setNewAssignment({ subject: "", title: "", deadline: "" })
        setToast({ message: t.assignments.create_success, type: "success" })
    }

    if (!role) return <div className="p-8 text-center text-gray-500">{t.common.loading}</div>

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden relative">
                <Navbar />

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 p-4 sm:p-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-white tracking-tight">
                                {role === "student" ? t.assignments.student_title : t.assignments.teacher_title}
                            </h1>
                            {role !== "student" && (
                                <button
                                    onClick={() => setIsCreateModalOpen(true)}
                                    className="bg-blue-600 text-white px-6 py-2.5 rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all transform hover:-translate-y-0.5 font-medium"
                                >
                                    {t.assignments.create_button}
                                </button>
                            )}
                        </div>

                        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                                {t.assignments.subject}
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                                {t.assignments.title}
                                            </th>
                                            {role !== "student" && (
                                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                                    {t.assignments.student_name}
                                                </th>
                                            )}
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                                {t.assignments.deadline}
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                                {t.assignments.status}
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                                {role === "student" ? t.assignments.score : t.assignments.input_score}
                                            </th>
                                            {role === "student" && (
                                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                                    {t.assignments.action}
                                                </th>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        {assignments.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{item.subject}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{item.title}</td>
                                                {role !== "student" && (
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{item.studentName}</td>
                                                )}
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-mono">{item.deadline}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full shadow-sm ${item.status === "Dinilai"
                                                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 ring-1 ring-green-500/20"
                                                            : item.status === "Sudah Dikumpulkan"
                                                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 ring-1 ring-yellow-500/20"
                                                                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 ring-1 ring-red-500/20"
                                                            }`}
                                                    >
                                                        {item.status === "Dinilai"
                                                            ? t.assignments.status_graded
                                                            : item.status === "Sudah Dikumpulkan"
                                                                ? t.assignments.status_submitted
                                                                : t.assignments.status_pending}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {role === "student" ? (
                                                        item.score ? <span className="font-bold text-lg text-green-600 dark:text-green-400">{item.score}</span> : <span className="text-gray-400">-</span>
                                                    ) : (
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            max="100"
                                                            className="w-20 px-3 py-1.5 border rounded-lg text-black dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                            value={(item.score === 0 && item.status !== "Dinilai") ? "" : (item.score ?? "")}
                                                            placeholder={t.assignments.placeholder}
                                                            onChange={(e) => handleGradingChange(item.id, e.target.value)}
                                                            onWheel={(e) => (e.target as HTMLInputElement).blur()}
                                                        />
                                                    )}
                                                </td>
                                                {role === "student" && (
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <button
                                                            onClick={() => handleUploadClick(item)}
                                                            className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 text-xs uppercase tracking-wider font-bold"
                                                        >
                                                            Upload
                                                        </button>
                                                    </td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Teacher's Create Assignment Modal */}
                        {isCreateModalOpen && (
                            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[60] animate-fade-in">
                                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-lg w-full shadow-2xl transform transition-all scale-100 border border-gray-100 dark:border-gray-700">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t.assignments.modal_title}</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t.assignments.modal_subtitle}</p>
                                        </div>
                                        <button onClick={() => setIsCreateModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">{t.assignments.subject}</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                placeholder={language === 'id' ? "Contoh: Matematika" : "Example: Mathematics"}
                                                value={newAssignment.subject}
                                                onChange={(e) => setNewAssignment({ ...newAssignment, subject: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">{t.assignments.title}</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                placeholder={language === 'id' ? "Contoh: Latihan Trigonometri" : "Example: Trigonometry Practice"}
                                                value={newAssignment.title}
                                                onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">{t.assignments.deadline}</label>
                                            <input
                                                type="date"
                                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                value={newAssignment.deadline}
                                                onChange={(e) => setNewAssignment({ ...newAssignment, deadline: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <button
                                            onClick={() => setIsCreateModalOpen(false)}
                                            className="px-5 py-2.5 rounded-xl text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            {t.assignments.cancel}
                                        </button>
                                        <button
                                            onClick={handleCreateAssignment}
                                            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5"
                                        >
                                            {t.assignments.save_button}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Upload Modal for Student - IMPROVED STYLING */}
                        {isModalOpen && (
                            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[60] animate-fade-in">
                                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-lg w-full shadow-2xl transform transition-all scale-100 border border-gray-100 dark:border-gray-700">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t.assignments.upload_title}</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{selectedAssignment?.title}</p>
                                        </div>
                                        <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                    </div>

                                    <div className="mb-8">
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{t.assignments.upload_file_label}</label>
                                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors bg-gray-50 dark:bg-gray-900/50 cursor-pointer">
                                            <div className="mx-auto w-12 h-12 text-gray-400 mb-3">
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                            </div>
                                            <input type="file" className="hidden" id="file-upload" />
                                            <label htmlFor="file-upload" className="cursor-pointer">
                                                <span className="text-blue-600 font-semibold hover:text-blue-700">Browse files</span>
                                                <span className="text-gray-500"> or drag and drop</span>
                                            </label>
                                            <p className="text-xs text-gray-500 mt-2">PDF, DOCX, JPG or PNG (Max. 5MB)</p>
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="px-5 py-2.5 rounded-xl text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            {t.assignments.cancel}
                                        </button>
                                        <button
                                            onClick={handleConfirmUpload}
                                            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5"
                                        >
                                            {t.assignments.upload_now}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
}
