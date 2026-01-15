"use client";

import React, { useState, useEffect } from "react";

const Clock: React.FC = () => {
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        // Set initial time
        setTime(new Date());

        // Update every second
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!time) return <div className="h-20 w-48 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl" />;

    const hour = time.getHours().toString().padStart(2, '0');
    const minute = time.getMinutes().toString().padStart(2, '0');
    const second = time.getSeconds().toString().padStart(2, '0');

    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };
    const dateStr = time.toLocaleDateString('id-ID', options);

    return (
        <div className="py-3 px-1 transition-all duration-300">
            <div className="space-y-3">
                {/* Header: Label + Icon */}
                <div className="flex items-center space-x-2 text-gray-400 dark:text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-[10px] font-bold uppercase tracking-wider">Waktu Lokal (UTC+7)</span>
                </div>

                {/* Big Time Display */}
                <div className="text-3xl font-black tracking-tight text-gray-900 dark:text-white tabular-nums">
                    {hour}.{minute}.{second}
                </div>

                {/* Date Display */}
                <div className="flex items-center space-x-2 text-gray-400 dark:text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-[11px] font-medium">{dateStr}</span>
                </div>
            </div>
        </div>
    );
};

export default Clock;
