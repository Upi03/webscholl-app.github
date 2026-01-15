"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import {
    Users,
    DollarSign,
    ShoppingCart,
    TrendingUp,
    Calendar,
    RefreshCw,
    ArrowUpRight,
    Maximize2,
    ChevronLeft
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line
} from 'recharts';

// Dummy Data
const performanceData = [
    { name: 'Jan', Actual: 2400, Target: 2100 },
    { name: 'Feb', Actual: 1800, Target: 1950 },
    { name: 'Mar', Actual: 3000, Target: 2400 },
    { name: 'Apr', Actual: 2700, Target: 2500 },
    { name: 'May', Actual: 3600, Target: 3000 },
    { name: 'Jun', Actual: 3300, Target: 3100 },
];

const distributionData = [
    { name: 'Kelas A', value: 40, color: '#3B82F6' },
    { name: 'Kelas B', value: 30, color: '#10B981' },
    { name: 'Kelas C', value: 20, color: '#F59E0B' },
    { name: 'Kelas D', value: 10, color: '#EF4444' },
];

const trendData = [
    { name: 'Week 1', Revenue: 1500, Sales: 2100 },
    { name: 'Week 2', Revenue: 1000, Sales: 1600 },
    { name: 'Week 3', Revenue: 6000, Sales: 2800 },
    { name: 'Week 4', Revenue: 2100, Sales: 1900 },
];

const timeRanges = [
    'Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days',
    'This Month', 'Last Month', 'This Year', 'Last Year', 'All Time'
];

export default function AnalyticsPage() {
    const [selectedRange, setSelectedRange] = useState('Last 7 Days');
    const [autoRefresh, setAutoRefresh] = useState(true);
    const [countdown, setCountdown] = useState(49);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (autoRefresh && countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        } else if (countdown === 0) {
            handleRefresh();
        }
        return () => clearTimeout(timer);
    }, [autoRefresh, countdown]);

    const handleRefresh = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setCountdown(60);
        }, 1000);
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F8F9FA] dark:bg-gray-950 transition-colors duration-300">
            <Navbar />

            <div className="flex flex-1 overflow-hidden">
                <Sidebar />

                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-7xl mx-auto space-y-8">

                        {/* Header & Controls Section */}
                        <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-8 shadow-sm border border-gray-100 dark:border-gray-800">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                                <div>
                                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Analytic Dashboard</h1>
                                    <p className="text-gray-500 dark:text-gray-400 font-bold mt-1">Real Time Analytics</p>
                                    <p className="text-sm font-black text-indigo-600 dark:text-indigo-400 mt-2">
                                        Viewing data for: <span className="text-gray-900 dark:text-white uppercase">{selectedRange}</span>
                                    </p>
                                </div>
                                <Link
                                    href="/"
                                    className="flex items-center gap-2 text-sm font-black text-gray-400 hover:text-indigo-600 transition-colors"
                                >
                                    <ChevronLeft className="w-4 h-4" /> Kembali ke Home
                                </Link>
                            </div>

                            {/* Filters */}
                            <div className="flex flex-wrap gap-2 mb-8">
                                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center gap-2 mr-2">
                                    <Calendar className="w-5 h-5 text-gray-400" />
                                </div>
                                {timeRanges.map((range) => (
                                    <button
                                        key={range}
                                        onClick={() => setSelectedRange(range)}
                                        className={`px-5 py-3 rounded-xl text-sm font-black transition-all ${selectedRange === range
                                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                                                : 'bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`}
                                    >
                                        {range}
                                    </button>
                                ))}
                            </div>

                            {/* Refresh Controls */}
                            <div className="flex items-center gap-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-black text-gray-400 uppercase tracking-widest">Auto Refresh</span>
                                    <button
                                        onClick={() => setAutoRefresh(!autoRefresh)}
                                        className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ${autoRefresh ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`}
                                    >
                                        <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${autoRefresh ? 'translate-x-6' : 'translate-x-0'}`} />
                                    </button>
                                    {autoRefresh && (
                                        <span className="text-xs font-black text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1 rounded-lg">
                                            {countdown}s
                                        </span>
                                    )}
                                </div>
                                <button
                                    onClick={handleRefresh}
                                    disabled={isLoading}
                                    className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-xl text-sm font-black text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all uppercase tracking-widest active:scale-95 disabled:opacity-50"
                                >
                                    <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                                    Refresh
                                </button>
                            </div>
                        </div>

                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard
                                title="Total Users"
                                value="7407"
                                growth="+5.2%"
                                icon={<Users className="w-6 h-6 text-white" />}
                                color="bg-blue-500"
                            />
                            <StatCard
                                title="Total Revenue"
                                value="$27407"
                                growth="+3.8%"
                                icon={<DollarSign className="w-6 h-6 text-white" />}
                                color="bg-emerald-500"
                            />
                            <StatCard
                                title="Total Orders"
                                value="2074"
                                growth="+4.1%"
                                icon={<ShoppingCart className="w-6 h-6 text-white" />}
                                color="bg-amber-500"
                            />
                            < StatCard
                                title="Growth Rate"
                                value="14.1%"
                                growth="+2.7%"
                                icon={<TrendingUp className="w-6 h-6 text-white" />}
                                color="bg-rose-500"
                            />
                        </div>

                        {/* Charts Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                            {/* Monthly Performance */}
                            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col h-[500px]">
                                <div className="flex justify-between items-center mb-10">
                                    <h3 className="text-xl font-black text-gray-900 dark:text-white">Monthly Performance</h3>
                                    <button className="text-gray-400 hover:text-indigo-600 transition-colors">
                                        <Maximize2 className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="flex-1 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={performanceData}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                            <XAxis
                                                dataKey="name"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#9CA3AF', fontWeight: 'bold', fontSize: 12 }}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#9CA3AF', fontWeight: 'bold', fontSize: 12 }}
                                            />
                                            <Tooltip
                                                cursor={{ fill: 'rgba(79, 70, 229, 0.05)' }}
                                                contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                                            />
                                            <Legend
                                                iconType="circle"
                                                wrapperStyle={{ paddingTop: '20px', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '1px' }}
                                            />
                                            <Bar dataKey="Actual" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={32} />
                                            <Bar dataKey="Target" fill="#10B981" radius={[4, 4, 0, 0]} barSize={32} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Distribution by Category */}
                            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col h-[500px]">
                                <div className="flex justify-between items-center mb-10">
                                    <h3 className="text-xl font-black text-gray-900 dark:text-white">Distribution by Category</h3>
                                    <button className="text-gray-400 hover:text-indigo-600 transition-colors">
                                        <Maximize2 className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="flex-1 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={distributionData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={80}
                                                outerRadius={140}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {distributionData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                                            />
                                            <Legend
                                                verticalAlign="bottom"
                                                height={36}
                                                wrapperStyle={{ fontWeight: 'bold', color: '#6B7280', fontSize: '12px' }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Weekly Trends */}
                            <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col h-[500px]">
                                <div className="flex justify-between items-center mb-10">
                                    <h3 className="text-xl font-black text-gray-900 dark:text-white">Weekly Trends</h3>
                                    <button className="text-gray-400 hover:text-indigo-600 transition-colors">
                                        <Maximize2 className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="flex-1 w-full px-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={trendData}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                                            <XAxis
                                                dataKey="name"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#9CA3AF', fontWeight: 'bold', fontSize: 12 }}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#9CA3AF', fontWeight: 'bold', fontSize: 12 }}
                                            />
                                            <Tooltip
                                                contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                                            />
                                            <Legend
                                                iconType="plainline"
                                                wrapperStyle={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '1px' }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="Revenue"
                                                stroke="#3B82F6"
                                                strokeWidth={4}
                                                dot={{ r: 6, fill: '#3B82F6', strokeWidth: 2, stroke: '#fff' }}
                                                activeDot={{ r: 8 }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="Sales"
                                                stroke="#10B981"
                                                strokeWidth={4}
                                                dot={{ r: 6, fill: '#10B981', strokeWidth: 2, stroke: '#fff' }}
                                                activeDot={{ r: 8 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

function StatCard({ title, value, growth, icon, color }: { title: string, value: string, growth: string, icon: React.ReactNode, color: string }) {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <p className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">{title}</p>
                    <h4 className="text-3xl font-black text-gray-900 dark:text-white">{value}</h4>
                    <div className="flex items-center gap-1 mt-2">
                        <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm font-black text-emerald-500">{growth}</span>
                    </div>
                </div>
                <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center shadow-lg shadow-${color.split('-')[1]}-500/20 group-hover:scale-110 transition-transform`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}
