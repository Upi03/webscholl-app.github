"use client";

import { useState, useRef } from "react";
import imageCompression from "browser-image-compression";

interface ClientCompressionProps {
  onCompressed: (file: File, originalSize: number) => void;
}

export default function ClientCompression({
  onCompressed,
}: ClientCompressionProps) {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [compressing, setCompressing] = useState(false);
  const [status, setStatus] = useState<"idle" | "compressing" | "success" | "error">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setOriginalFile(file);
    setCompressedFile(null);
    setCompressing(true);
    setStatus("compressing");

    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      const compressed = await imageCompression(file, options);
      setCompressedFile(compressed);
      setStatus("success");
      onCompressed(compressed, file.size);
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setCompressing(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleDownload = () => {
    if (!compressedFile) return;
    const url = URL.createObjectURL(compressedFile);
    const link = document.createElement("a");
    link.href = url;
    link.download = `compressed_${originalFile?.name || "image.png"}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Image Optimizer</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Step 1: Client-Side Compression</p>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900/50">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              ref={fileInputRef}
            />

            {!originalFile ? (
              <div className="text-center">
                <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-full inline-block">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Upload Gambar untuk kompres otomatis</p>
                <button
                  onClick={triggerFileInput}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm"
                >
                  Browse...
                </button>
              </div>
            ) : (
              <div className="w-full space-y-4">
                <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{originalFile.name}</p>
                    <p className="text-xs text-gray-500">{formatSize(originalFile.size)}</p>
                  </div>
                </div>

                {status === "compressing" && (
                  <div className="text-center py-2">
                    <div className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent mb-2"></div>
                    <p className="text-sm font-medium text-blue-600 animate-pulse">Compressing...</p>
                  </div>
                )}

                {status === "success" && compressedFile && (
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between text-xs px-1">
                      <span className="text-green-600 font-medium">Compression Success!</span>
                      <span className="text-gray-500">{formatSize(compressedFile.size)} (-{Math.round((1 - compressedFile.size / originalFile.size) * 100)}%)</span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={triggerFileInput}
                        className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium transition-colors"
                      >
                        Change
                      </button>
                      <button
                        onClick={handleDownload}
                        className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
