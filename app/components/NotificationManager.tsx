"use client";

import { useState, useEffect } from "react";

export default function NotificationManager() {
    const [permission, setPermission] = useState<NotificationPermission>("default");
    const [isSupported, setIsSupported] = useState(false);

    useEffect(() => {
        // Check if notifications are supported
        if ("Notification" in window) {
            setIsSupported(true);
            setPermission(Notification.permission);
        }
    }, []);

    const requestPermission = async () => {
        if (!isSupported) return;

        try {
            const result = await Notification.requestPermission();
            setPermission(result);

            if (result === "granted") {
                // Send a test notification
                new Notification("Notifikasi Diaktifkan! 🎉", {
                    body: "Anda akan menerima notifikasi penting dari aplikasi ini.",
                    icon: "/next.svg",
                    badge: "/next.svg",
                    tag: "welcome-notification",
                });
            }
        } catch (error) {
            console.error("Error requesting notification permission:", error);
        }
    };

    const sendTestNotification = () => {
        if (permission === "granted") {
            new Notification("Test Notification", {
                body: "Ini adalah notifikasi percobaan dari MyBrand App!",
                icon: "/next.svg",
                badge: "/next.svg",
                tag: "test-notification",
                requireInteraction: false,
            });
        }
    };

    if (!isSupported) {
        return null;
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Push Notifications</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {permission === "granted" && "✅ Aktif"}
                        {permission === "denied" && "❌ Diblokir"}
                        {permission === "default" && "⏸️ Belum diatur"}
                    </p>
                </div>
                <div className="flex gap-2">
                    {permission === "default" && (
                        <button
                            onClick={requestPermission}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                        >
                            Aktifkan
                        </button>
                    )}
                    {permission === "granted" && (
                        <button
                            onClick={sendTestNotification}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                        >
                            Test Notifikasi
                        </button>
                    )}
                    {permission === "denied" && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            Aktifkan di pengaturan browser
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
