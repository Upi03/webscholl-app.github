"use client";

import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

interface Message {
    id: string;
    text: string;
    sender: "user" | "ai";
    timestamp: Date;
}

export default function AiAssistantPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            text: "Halo! Saya adalah Asisten AI Sekolah. Ada yang bisa saya bantu terkait pelajaran atau info sekolah hari ini? 🤖",
            sender: "ai",
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: input,
            sender: "user",
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Simulate AI "Thinking"
        setTimeout(() => {
            let replyText = "Maaf, saya belum mengerti pertanyaan itu.";
            const lowerInput = userMsg.text.toLowerCase();

            // Simple primitive mock logic
            if (lowerInput.includes("pr") || lowerInput.includes("tugas")) {
                replyText = "Untuk tugas, kamu bisa cek menu **Assignments**. Sepertinya ada tugas Matematika yang deadline besok!";
            } else if (lowerInput.includes("jadwal") || lowerInput.includes("pelajaran")) {
                replyText = "Hari ini jadwal kamu: Matematika (07:00), Fisika (09:00), dan Bahasa Inggris (11:00). Semangat! 📚";
            } else if (lowerInput.includes("bayar") || lowerInput.includes("spp")) {
                replyText = "Pembayaran SPP bisa dilakukan lewat menu **Bayar SPP** di sidebar. Kamu bisa pakai QRIS lho.";
            } else if (lowerInput.includes("halo") || lowerInput.includes("hai")) {
                replyText = "Halo juga! 👋 Siap belajar hari ini?";
            } else if (lowerInput.includes("terima kasih") || lowerInput.includes("makasih")) {
                replyText = "Sama-sama! Senang bisa membantu. 😊";
            }

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: replyText,
                sender: "ai",
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 flex flex-col h-[calc(100vh-64px)] bg-gray-50/50 dark:bg-gray-900 md:p-4">
                    <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                        {/* Header */}
                        <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-600 flex items-center justify-center text-xl shadow-lg">
                                🤖
                            </div>
                            <div>
                                <h2 className="font-black text-gray-900 dark:text-white">AI School Assistant</h2>
                                <p className="text-xs text-green-500 font-bold flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    Online
                                </p>
                            </div>
                        </div>

                        {/* Chat Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-gray-900/50">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[75%] p-4 rounded-2xl shadow-sm ${msg.sender === "user"
                                            ? "bg-blue-600 text-white rounded-tr-none"
                                            : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-tl-none border border-gray-100 dark:border-gray-600"
                                            }`}
                                    >
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                                        <p className={`text-[10px] mt-1 opacity-70 ${msg.sender === "user" ? "text-blue-100 text-right" : "text-gray-400"}`}>
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white dark:bg-gray-700 p-4 rounded-2xl rounded-tl-none border border-gray-100 dark:border-gray-600 flex gap-2 items-center">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSend();
                                }}
                                className="flex gap-2"
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Tanya tentang PR, jadwal, atau SPP..."
                                    className="flex-1 bg-gray-100 dark:bg-gray-900 border-0 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isTyping}
                                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/30"
                                >
                                    <svg className="w-6 h-6 transform rotate-90" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
