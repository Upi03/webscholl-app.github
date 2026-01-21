"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    type: "info" | "holiday" | "alert" | "success";
    isRead: boolean;
}

interface NotificationStore {
    notifications: Notification[];
    addNotification: (notification: Omit<Notification, "id" | "time" | "isRead">) => void;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    unreadCount: () => number;
}

export const useNotificationStore = create<NotificationStore>()(
    persist(
        (set, get) => ({
            notifications: [
                {
                    id: "1",
                    title: "Rapat Guru",
                    message: "Rapat bulanan besok jam 09:00",
                    time: new Date(Date.now() - 3600000).toISOString(),
                    type: "info",
                    isRead: false,
                },
                {
                    id: "2",
                    title: "Jadwal Ujian",
                    message: "Jadwal UAS telah dirilis",
                    time: new Date(Date.now() - 7200000).toISOString(),
                    type: "info",
                    isRead: false,
                },
                {
                    id: "3",
                    title: "Absensi",
                    message: "Rekap absensi bulan ini siap",
                    time: new Date(Date.now() - 18000000).toISOString(),
                    type: "info",
                    isRead: false,
                },
            ],
            addNotification: (notif) => {
                const newNotif: Notification = {
                    ...notif,
                    id: Math.random().toString(36).substring(2, 9),
                    time: new Date().toISOString(),
                    isRead: false,
                };
                set((state) => ({
                    notifications: [newNotif, ...state.notifications],
                }));
            },
            markAsRead: (id) => {
                set((state) => ({
                    notifications: state.notifications.map((n) =>
                        n.id === id ? { ...n, isRead: true } : n
                    ),
                }));
            },
            markAllAsRead: () => {
                set((state) => ({
                    notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
                }));
            },
            unreadCount: () => {
                return get().notifications.filter((n) => !n.isRead).length;
            },
        }),
        {
            name: "webschool-notifications",
        }
    )
);
