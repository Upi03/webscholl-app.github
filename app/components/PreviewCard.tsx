"use client";

import React from "react";

interface PreviewCardProps {
    title: string;
    file: File | null;
    comparisonSize?: number; // Size to compare against for percentage reduction
}

export default function PreviewCard({ title, file, comparisonSize }: PreviewCardProps) {
    if (!file) return null;

    const previewUrl = URL.createObjectURL(file);

    const formatSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const getReduction = () => {
        if (!comparisonSize || comparisonSize === 0) return null;
        const reduction = ((comparisonSize - file.size) / comparisonSize) * 100;
        return reduction.toFixed(1);
    };

    const reduction = getReduction();

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm w-full transition-colors">
            <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-3">{title}</h4>

            <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 mb-3 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={previewUrl}
                    alt={title}
                    className="max-w-full max-h-full object-contain shadow-sm"
                    onLoad={() => URL.revokeObjectURL(previewUrl)}
                />
            </div>

            <div className="space-y-1">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    Size: <span className="font-semibold text-gray-700 dark:text-gray-200">{formatSize(file.size)}</span>
                </p>
                {reduction && parseFloat(reduction) > 0 && (
                    <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                        -{reduction}% dari ukuran {comparisonSize === file.size ? 'original' : 'sebelumnya'}
                    </p>
                )}
            </div>
        </div>
    );
}
