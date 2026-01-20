"use client";

import React from "react";
import { ThemeProvider } from "./ThemeProvider";
import PWARegister from "./PWARegister";

import { LanguageProvider } from "@/app/contexts/LanguageContext";

export default function ClientLayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    console.log("DEBUG: ClientLayoutWrapper rendering children...");
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            storageKey="theme-preference"
        >
            <LanguageProvider>
                <PWARegister />
                {children}
            </LanguageProvider>
        </ThemeProvider>
    );
}
