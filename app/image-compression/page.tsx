"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ClientCompression from "../components/ClientCompression";
import ServerSide from "../components/ServerSide";
import PreviewCard from "../components/PreviewCard";
import WebPConversion from "../components/WebPConversion";
import FinalComparison from "../components/FinalComparison";
import { useLanguage } from "../contexts/LanguageContext";

export default function ImageCompressionPage() {
    const { t } = useLanguage();
    const [originalSize, setOriginalSize] = React.useState<number>(0);
    const [compressedFile, setCompressedFile] = React.useState<File | null>(null);
    const [thumbnailFile, setThumbnailFile] = React.useState<File | null>(null);
    const [webpFile, setWebpFile] = React.useState<File | null>(null);

    const handleCompressed = (file: File, size: number) => {
        setCompressedFile(file);
        setOriginalSize(size);
        console.log("Compressed file ready:", file.name, "Original size:", size, "New size:", file.size);
    };

    const handleServerResized = (file: File) => {
        setThumbnailFile(file);
        console.log("Server resized file ready:", file.name, "New size:", file.size);
    };

    const handleWebPConverted = (file: File) => {
        setWebpFile(file);
        console.log("WebP converted file ready:", file.name, "New size:", file.size);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
            {/* Navbar */}
            <Navbar />

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50 dark:bg-gray-900 transition-colors duration-300">
                    <div className="max-w-4xl mx-auto space-y-8">

                        {/* Header Section */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden transition-colors duration-300">
                            <div className="relative z-10">
                                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">{t.compression_page.title} 🖼️</h2>
                                <p className="text-gray-500 dark:text-gray-400 max-w-xl">
                                    {t.compression_page.subtitle}
                                </p>
                            </div>
                            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-50 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50"></div>
                            <div className="absolute bottom-0 right-20 -mb-10 w-24 h-24 bg-purple-50 dark:bg-purple-900/20 rounded-full blur-2xl opacity-50"></div>
                        </div>

                        {/* Main Tool Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

                            {/* Left Column: Controls (Steps) */}
                            <div className="space-y-6">
                                <ClientCompression onCompressed={handleCompressed} />

                                {compressedFile && (
                                    <div className="animate-slide-up">
                                        <ServerSide
                                            compressedFile={compressedFile}
                                            originalSize={originalSize}
                                            onresized={handleServerResized}
                                        />
                                    </div>
                                )}

                                {thumbnailFile && (
                                    <div className="animate-slide-up">
                                        <WebPConversion
                                            compressedFile={compressedFile}
                                            onconverted={handleWebPConverted}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Right Column: Previews & Comparison */}
                            <div className="space-y-6">
                                {compressedFile && (
                                    <div className="animate-fade-in">
                                        <PreviewCard
                                            title={t.compression_page.original_format}
                                            file={compressedFile}
                                        />
                                    </div>
                                )}

                                {webpFile && (
                                    <div className="animate-fade-in">
                                        <PreviewCard
                                            title={t.compression_page.webp_format}
                                            file={webpFile}
                                            comparisonSize={compressedFile?.size}
                                        />
                                    </div>
                                )}

                                {webpFile && (
                                    <div className="animate-fade-in">
                                        <FinalComparison
                                            originalSize={originalSize}
                                            compressedSize={compressedFile?.size || 0}
                                            thumbnailSize={thumbnailFile?.size || 0}
                                            webpSize={webpFile?.size || 0}
                                        />
                                    </div>
                                )}

                                {!compressedFile && (
                                    <div className="h-64 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 bg-white/50 dark:bg-gray-800/50">
                                        <svg className="w-12 h-12 mb-3 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <p className="text-sm">{t.compression_page.preview_title}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Help / Tips Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {t.compression_page.why_title}
                                </h3>
                                <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">•</span>
                                        {t.compression_page.why_1}
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">•</span>
                                        {t.compression_page.why_2}
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">•</span>
                                        {t.compression_page.why_3}
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    {t.compression_page.safe_title}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {t.compression_page.safe_desc}
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Footer */}
            <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 py-6 text-center text-sm transition-colors duration-300">
                <div className="container mx-auto">
                    <p>&copy; 2026 MyBrand App. Created with Next.js & Tailwind by UBIG.</p>
                </div>
            </footer>
        </div>
    );
}
