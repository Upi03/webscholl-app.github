"use client";

import { useLanguage } from "@/app/contexts/LanguageContext";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts";

export default function DashboardCharts() {
    const { t } = useLanguage();

    // Mock Data for Weekly Attendance
    const attendanceData = [
        { name: "Sen", hadir: 450, sakit: 10, izin: 5 },
        { name: "Sel", hadir: 460, sakit: 8, izin: 2 },
        { name: "Rab", hadir: 445, sakit: 15, izin: 8 },
        { name: "Kam", hadir: 455, sakit: 5, izin: 4 },
        { name: "Jum", hadir: 430, sakit: 20, izin: 12 },
    ];

    // Mock Data for Student Distribution
    const studentData = [
        { name: "Kelas X", value: 400 },
        { name: "Kelas XI", value: 350 },
        { name: "Kelas XII", value: 300 },
    ];

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Attendance Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">
                    {t.dashboard?.chart_attendance || "Statistik Kehadiran Minggu Ini"}
                </h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={attendanceData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                            <XAxis
                                dataKey="name"
                                tick={{ fill: '#9ca3af', fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fill: '#9ca3af', fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                cursor={{ fill: 'transparent' }}
                            />
                            <Bar dataKey="hadir" fill="#4f46e5" radius={[4, 4, 0, 0]} name="Hadir" />
                            <Bar dataKey="sakit" fill="#fbbf24" radius={[4, 4, 0, 0]} name="Sakit" />
                            <Bar dataKey="izin" fill="#f87171" radius={[4, 4, 0, 0]} name="Izin" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Student Distribution Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">
                    {t.dashboard?.chart_distribution || "Distribusi Siswa"}
                </h3>
                <div className="h-[300px] w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={studentData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {studentData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Legend
                                verticalAlign="bottom"
                                height={36}
                                iconType="circle"
                                formatter={(value) => <span className="text-gray-600 dark:text-gray-400 text-sm ml-1">{value}</span>}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
