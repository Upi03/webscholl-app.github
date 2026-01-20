"use client";

import React from "react";
import { useEffect, useState } from "react";

interface ToastProps {
    message: string;
    type?: "success" | "error" | "info";
    onClose: () => void;
}

export default function Toast({ message, type = "info", onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const bgColors = {
        success: "bg-green-500/90 dark:bg-green-600/90 border-green-400/50 text-white",
        error: "bg-red-500/90 dark:bg-red-600/90 border-red-400/50 text-white",
        info: "bg-blue-500/90 dark:bg-blue-600/90 border-blue-400/50 text-white",
    };

    const icons = {
        success: (
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        error: (
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        info: (
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    }

    return (
        <div className={`fixed top-6 right-6 z-[100] flex items-center shadow-xl rounded-xl px-6 py-4 backdrop-blur-md border ${bgColors[type]} animate-slide-in-right transform transition-all hover:scale-105 cursor-pointer`}>
            {icons[type]}
            <span className="font-bold tracking-wide">{message}</span>
            <button onClick={onClose} className="ml-6 hover:bg-white/20 rounded-full p-1 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
}
