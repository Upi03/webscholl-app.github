"use client";

import React from "react";
import { ThemeProvider } from "./ThemeProvider";
import PWARegister from "./PWARegister";

export default function ClientLayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            storageKey="theme-preference"
        >
            <PWARegister />
            {children}
        </ThemeProvider>
    );
}
