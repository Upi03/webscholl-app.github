"use client"

import { useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

interface QrScannerProps {
    onResult: (decodedText: string) => void;
    onClose: () => void;
}

export default function QrScanner({ onResult, onClose }: QrScannerProps) {
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);

    useEffect(() => {
        // Initialize scanner
        scannerRef.current = new Html5QrcodeScanner(
            "qr-reader",
            {
                fps: 10,
                qrbox: { width: 250, height: 250 },
                aspectRatio: 1.0
            },
            /* verbose= */ false
        );

        scannerRef.current.render(
            (decodedText) => {
                onResult(decodedText);
                if (scannerRef.current) {
                    scannerRef.current.clear();
                }
            },
            (error) => {
                // Ignore errors
            }
        );

        return () => {
            if (scannerRef.current) {
                scannerRef.current.clear().catch(err => console.error("Failed to clear scanner", err));
            }
        };
    }, [onResult]);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md animate-fade-in"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl animate-scale-up">
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold dark:text-white">Pindai Kartu ID</h3>
                        <p className="text-sm text-gray-500">Arahkan kamera ke kode QR</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                    >
                        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-4">
                    <style jsx global>{`
                        #qr-reader {
                            border: none !important;
                        }
                        #qr-reader__dashboard {
                            padding: 20px !important;
                            background: transparent !important;
                        }
                        #qr-reader__dashboard_section_csr button {
                            background: #4f46e5 !important;
                            color: white !important;
                            padding: 10px 20px !important;
                            border-radius: 12px !important;
                            font-weight: 700 !important;
                            border: none !important;
                            cursor: pointer !important;
                            transition: all 0.2s !important;
                            font-family: inherit !important;
                            text-transform: uppercase !important;
                            letter-spacing: 0.05em !important;
                            font-size: 12px !important;
                        }
                        #qr-reader__dashboard_section_csr button:hover {
                            background: #4338ca !important;
                            transform: translateY(-1px) !important;
                        }
                        #qr-reader__dashboard_section_csr button:active {
                            transform: translateY(0px) !important;
                        }
                        #qr-reader__status_span {
                            color: #6b7280 !important;
                            font-size: 14px !important;
                            font-weight: 500 !important;
                        }
                        #qr-reader__header_message {
                            color: #6b7280 !important;
                            font-size: 14px !important;
                        }
                        #qr-reader__camera_selection {
                            padding: 8px !important;
                            border-radius: 12px !important;
                            border: 1px solid #e5e7eb !important;
                            background: white !important;
                            margin-bottom: 10px !important;
                            outline: none !important;
                        }
                        .dark #qr-reader__camera_selection {
                            background: #1f2937 !important;
                            border-color: #374151 !important;
                            color: white !important;
                        }
                        #html5-qrcode-anchor-scan-type-change {
                            color: #4f46e5 !important;
                            text-decoration: none !important;
                            font-weight: 700 !important;
                            font-size: 13px !important;
                            display: block !important;
                            margin-top: 15px !important;
                        }
                        #qr-reader img {
                            opacity: 0.5 !important;
                            max-width: 80px !important;
                            margin-bottom: 15px !important;
                        }
                    `}</style>
                    <div id="qr-reader" className="overflow-hidden rounded-2xl border-none" />
                </div>

                <div className="p-6 bg-gray-50 dark:bg-gray-800/50 flex flex-col gap-2">
                    <p className="text-center text-xs text-gray-400">
                        Pindai kode QR pada Kartu ID Digital siswa untuk mencatat absensi secara otomatis.
                    </p>
                </div>
            </div>
        </div>
    );
}
