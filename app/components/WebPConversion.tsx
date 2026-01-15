"use client";

import { useState } from "react";

interface WebPConversionProps {
    compressedFile: File | null;
    onconverted: (file: File) => void;
}

export default function WebPConversion({
    compressedFile,
    onconverted,
}: WebPConversionProps) {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleConvert = async () => {
        if (!compressedFile) return;

        setLoading(true);
        setStatus("loading");

        const formData = new FormData();
        formData.append("file", compressedFile);
        formData.append("format", "webp");

        try {
            const response = await fetch("/api/server-resize", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const blob = await response.blob();
                const filename = compressedFile.name.split('.')[0] + ".webp";
                const webpFile = new File([blob], filename, { type: "image/webp" });
                onconverted(webpFile);
                setStatus("success");
            } else {
                setStatus("error");
            }
        } catch (err) {
            console.error(err);
            setStatus("error");
        } finally {
            setLoading(false);
        }
    };

    if (!compressedFile) return null;

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Step 3: WebP Conversion</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Convert ke format WebP untuk performa optimal</p>
                </div>

                <button
                    onClick={handleConvert}
                    disabled={loading}
                    className={`w-full py-2.5 rounded-lg font-medium transition-all flex items-center justify-center ${loading
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-purple-600 hover:bg-purple-700 text-white shadow-sm"
                        }`}
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Converting...
                        </>
                    ) : (
                        "Convert to WebP"
                    )}
                </button>

                {status === "success" && (
                    <p className="mt-3 text-center text-sm text-green-600 font-medium animate-fade-in">
                        ✨ Successfully converted to WebP!
                    </p>
                )}
                {status === "error" && (
                    <p className="mt-3 text-center text-sm text-red-600 font-medium">
                        ❌ Failed to convert to WebP.
                    </p>
                )}
            </div>
        </div>
    );
}
