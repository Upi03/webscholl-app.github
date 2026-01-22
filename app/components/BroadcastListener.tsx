"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Toast from "./Toast";
import { useNotificationStore } from "@/app/store/useNotificationStore";

export default function BroadcastListener() {
    // Local toast state for this global listener
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

    useEffect(() => {
        if (!supabase) return;

        // Listen to inserts on 'broadcasts' table
        const channel = supabase
            .channel('public:broadcasts')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'broadcasts',
                },
                (payload: any) => {
                    const newBroadcast = payload.new;
                    // Show Toast
                    setToast({
                        message: newBroadcast.message || "New Announcement",
                        type: newBroadcast.type || "info"
                    });

                    // Also add to global store so it appears in the Notification center (bell icon)
                    useNotificationStore.getState().addNotification({
                        title: newBroadcast.title || "Pengumuman",
                        message: newBroadcast.message || "",
                        type: newBroadcast.type || "info"
                    });
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    if (!toast) return null;

    return (
        <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
        />
    );
}
