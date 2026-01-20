"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { id } from "@/lib/translations/id";
import { en } from "@/lib/translations/en";

type Language = "id" | "en";
type Translations = typeof id;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    console.log("DEBUG: LanguageProvider initializing...");
    const [language, setLanguageState] = useState<Language>("id");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        console.log("DEBUG: LanguageProvider mounted.");
        const savedLang = localStorage.getItem("language-preference") as Language;
        if (savedLang && (savedLang === "id" || savedLang === "en")) {
            setLanguageState(savedLang);
        }
        setMounted(true);
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("language-preference", lang);
    };

    const t = language === "id" ? id : en;

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        const errorMsg = "INTERNAL_CHECK_V1: useLanguage must be used within a LanguageProvider. If you see this, the code is updated.";
        console.error(errorMsg);
        // Temporary throw to match previous behavior but with unique message
        throw new Error(errorMsg);
    }
    return context;
};
