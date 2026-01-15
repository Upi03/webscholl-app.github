"use client";

import React from "react";

interface FinalComparisonProps {
    originalSize: number;
    compressedSize: number;
    thumbnailSize: number;
    webpSize: number;
}

export default function FinalComparison({
    originalSize,
    compressedSize,
    thumbnailSize,
    webpSize,
}: FinalComparisonProps) {
    const formatSize = (bytes: number) => {
        if (bytes === 0) return "0 KB";
        return (bytes / 1024).toFixed(2) + " KB";
    };

    const calculateSavings = () => {
        if (!originalSize || !webpSize) return { diff: 0, percent: 0 };
        const diff = originalSize - webpSize;
        const percent = (diff / originalSize) * 100;
        return { diff, percent };
    };

    const { diff, percent } = calculateSavings();

    const Row = ({ label, size, highlight = false }: { label: string; size: number; highlight?: boolean }) => (
        <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</span>
            <span className={`text-lg font-bold ${highlight ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                {formatSize(size)}
            </span>
        </div>
    );

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors mt-8">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Final Comparison (End-to-End)</h3>

            <div className="grid grid-cols-2 gap-y-6 gap-x-12 mb-8">
                <Row label="Original Upload" size={originalSize} />
                <Row label="Compressed (Base)" size={compressedSize} />
                <Row label="Thumbnail (Step 2)" size={thumbnailSize} />
                <Row label="WebP (Final)" size={webpSize} highlight />
            </div>

            <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl text-center">
                    <p className="text-green-600 dark:text-green-400 font-bold">
                        Total Savings (WebP vs Original): {formatSize(diff)} ({percent.toFixed(1)}%)
                    </p>
                </div>
            </div>
        </div>
    );
}
