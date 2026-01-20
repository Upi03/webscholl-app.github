"use client"

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { supabase } from '../../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Zap,
    Bell,
    Send,
    Trash2,
    Database,
    CheckCircle2,
    RefreshCw,
    X
} from 'lucide-react';

interface Todo {
    id: string;
    text: string;
    completed: boolean;
    created_at: string;
}

export default function RealtimeDBPage() {
    const { t } = useLanguage();
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Request Notification Permission
    useEffect(() => {
        if ("Notification" in window) {
            setIsNotificationEnabled(Notification.permission === "granted");
        }
    }, []);

    const requestPermission = () => {
        if ("Notification" in window) {
            Notification.requestPermission().then(permission => {
                setIsNotificationEnabled(permission === "granted");
            });
        }
    };

    const showNotification = (text: string) => {
        if (isNotificationEnabled) {
            new Notification("New Todo Added", {
                body: text,
                icon: "/favicon.ico" // Change this to your icon
            });
        }
    };

    // Fetch and Subscribe to Realtime Updates
    useEffect(() => {
        if (!supabase) {
            setIsLoading(false);
            return;
        }

        const fetchTodos = async () => {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('todos')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && data) {
                setTodos(data);
            }
            setIsLoading(false);
        };

        fetchTodos();

        // Realtime Subscription
        const channel = supabase
            .channel('schema-db-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'todos',
                },
                (payload: any) => {
                    if (payload.eventType === 'INSERT') {
                        const newTodo = payload.new as Todo;
                        setTodos(prev => [newTodo, ...prev]);
                        showNotification(newTodo.text);
                    } else if (payload.eventType === 'DELETE') {
                        setTodos(prev => prev.filter(t => t.id !== payload.old.id));
                    } else if (payload.eventType === 'UPDATE') {
                        const updatedTodo = payload.new as Todo;
                        setTodos(prev => prev.map(t => t.id === updatedTodo.id ? updatedTodo : t));
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [isNotificationEnabled]);

    const addTodo = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!inputValue.trim() || !supabase) return;

        const { error } = await supabase
            .from('todos')
            .insert([{ text: inputValue, completed: false }]);

        if (!error) {
            setInputValue('');
        }
    };

    const deleteTodo = async (id: string) => {
        await supabase.from('todos').delete().match({ id });
    };

    const clearAll = async () => {
        const { error } = await supabase.from('todos').delete().neq('id', 0); // Hacky clear all for demo
        if (!error) setTodos([]);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-300"
        >
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50 dark:bg-gray-950/50">
                    <div className="max-w-2xl mx-auto space-y-6">

                        {/* Status Bar */}
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 px-2">
                            <span className="flex items-center gap-2">
                                <RefreshCw className="w-3 h-3 animate-spin text-indigo-500" />
                                {t.realtime_page.connected}
                            </span>
                            <span className="flex items-center gap-2">
                                <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                                {t.realtime_page.engine_active}
                            </span>
                        </div>

                        {/* Hero Header */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden"
                        >
                            <div className="relative z-10">
                                <h1 className="text-3xl font-black tracking-tight mb-2">{t.realtime_page.title}</h1>
                                <p className="text-indigo-100 font-bold opacity-80 flex items-center gap-2">
                                    {isNotificationEnabled ? (
                                        <><Bell className="w-4 h-4 text-green-300" /> {t.realtime_page.notif_allowed}</>
                                    ) : (
                                        <button onClick={requestPermission} className="underline hover:text-white">{t.realtime_page.notif_request}</button>
                                    )}
                                </p>
                            </div>
                            <Database className="absolute bottom-[-20px] right-[-20px] w-48 h-48 text-white opacity-10 rotate-12" />
                        </motion.div>

                        {/* Input Form */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800"
                        >
                            <h2 className="text-lg font-black text-gray-900 dark:text-white mb-6 uppercase tracking-widest">{t.realtime_page.add_todo}</h2>
                            <form onSubmit={addTodo} className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder={t.realtime_page.placeholder}
                                    className="flex-1 px-6 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-500 rounded-2xl text-gray-900 dark:text-white outline-none transition-all font-bold shadow-inner"
                                />
                                <button
                                    type="submit"
                                    className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black shadow-xl shadow-indigo-500/20 active:scale-95 transition-all text-sm uppercase tracking-widest flex items-center justify-center gap-2"
                                >
                                    <Send className="w-4 h-4" />
                                    {t.realtime_page.add_btn}
                                </button>
                            </form>
                        </motion.div>

                        {/* List Area */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white dark:bg-gray-900 p-8 rounded-[3rem] shadow-sm border border-gray-100 dark:border-gray-800"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-3">
                                    {t.realtime_page.list_title}
                                    <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-sm">
                                        ({todos.length})
                                    </span>
                                </h2>
                                {todos.length > 0 && (
                                    <button
                                        onClick={clearAll}
                                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-red-500/20"
                                    >
                                        {t.realtime_page.clear_all}
                                    </button>
                                )}
                            </div>

                            <div className="space-y-4">
                                <AnimatePresence mode='popLayout'>
                                    {todos.length > 0 ? (
                                        todos.map((todo) => (
                                            <motion.div
                                                layout
                                                key={todo.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="group flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-800/40 hover:bg-white dark:hover:bg-gray-800 rounded-2xl border border-transparent hover:border-indigo-100 dark:hover:border-indigo-900/30 transition-all shadow-sm"
                                            >
                                                <div className="flex items-center gap-4 flex-1">
                                                    <div className="flex items-center justify-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={todo.completed}
                                                            className="w-5 h-5 rounded-lg border-2 border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer transition-all"
                                                            onChange={async () => {
                                                                await supabase.from('todos').update({ completed: !todo.completed }).match({ id: todo.id });
                                                            }}
                                                        />
                                                    </div>
                                                    <p className={`font-bold text-gray-700 dark:text-gray-200 ${todo.completed ? 'line-through opacity-50' : ''}`}>
                                                        {todo.text}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => deleteTodo(todo.id)}
                                                    className="px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-xs font-bold opacity-0 group-hover:opacity-100 transition-all hover:bg-red-200 dark:hover:bg-red-900/40"
                                                >
                                                    {t.realtime_page.delete}
                                                </button>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex flex-col items-center justify-center py-20 text-gray-400 dark:text-gray-600"
                                        >
                                            <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-full mb-4">
                                                <X className="w-8 h-8 opacity-20" />
                                            </div>
                                            <p className="font-bold uppercase tracking-widest text-[10px]">{t.realtime_page.no_todos}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>
                </main>
            </div>
        </motion.div>
    );
}
