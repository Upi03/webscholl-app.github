"use client";

import { useState } from "react";

interface ShareButtonProps {
    title?: string;
    text?: string;
    url?: string;
    className?: string;
}

export default function ShareButton({
    title = "MyBrand App",
    text = "Check out this amazing dashboard app!",
    url = typeof window !== "undefined" ? window.location.href : "",
    className = "",
}: ShareButtonProps) {
    const [isSupported, setIsSupported] = useState(true);

    const handleShare = async () => {
        // Check if Web Share API is supported
        if (!navigator.share) {
            setIsSupported(false);
            // Fallback: copy to clipboard
            try {
                await navigator.clipboard.writeText(url);
                alert("Link disalin ke clipboard!");
            } catch (err) {
                console.error("Failed to copy:", err);
            }
            return;
        }

        try {
            await navigator.share({
                title,
                text,
                url,
            });
            console.log("Content shared successfully");
        } catch (error) {
            // User cancelled or error occurred
            if ((error as Error).name !== "AbortError") {
                console.error("Error sharing:", error);
            }
        }
    };

    return (
        <button
            onClick={handleShare}
            className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg ${className}`}
            title={isSupported ? "Share this page" : "Copy link"}
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
            </svg>
            <span>{isSupported ? "Share" : "Copy Link"}</span>
        </button>
    );
}
