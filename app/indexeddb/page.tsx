"use client"

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import {
    Database,
    Plus,
    Trash2,
    CheckCircle2,
    ListTodo,
    AlertCircle
} from 'lucide-react';

// IndexedDB Constants
const DB_NAME = 'TodoDB';
const DB_VERSION = 1;
const STORE_NAME = 'todos';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
    createdAt: number;
}

export default function IndexedDBPage() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [db, setDb] = useState<IDBDatabase | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Initialize DB
    useEffect(() => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => {
            setError("Gagal membuka database.");
        };

        request.onupgradeneeded = (event: any) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        };

        request.onsuccess = (event: any) => {
            const database = event.target.result;
            setDb(database);
            fetchTodos(database);
        };
    }, []);

    const fetchTodos = (database: IDBDatabase) => {
        const transaction = database.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => {
            setTodos(request.result.sort((a: Todo, b: Todo) => b.createdAt - a.createdAt));
        };
    };

    const addTodo = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!inputValue.trim() || !db) return;

        const newTodo: Todo = {
            id: Date.now(),
            text: inputValue,
            completed: false,
            createdAt: Date.now()
        };

        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.add(newTodo);

        request.onsuccess = () => {
            setTodos([newTodo, ...todos]);
            setInputValue('');
        };
    };

    const deleteTodo = (id: number) => {
        if (!db) return;

        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(id);

        request.onsuccess = () => {
            setTodos(todos.filter(todo => todo.id !== id));
        };
    };

    const clearAll = () => {
        if (!db) return;

        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.clear();

        request.onsuccess = () => {
            setTodos([]);
        };
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50 dark:bg-gray-950/50">
                    <div className="max-w-2xl mx-auto space-y-6">

                        {/* Hero Header */}
                        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                            <div className="relative z-10">
                                <h1 className="text-3xl font-black tracking-tight mb-2">Todo List with IndexedDB</h1>
                                <p className="text-indigo-100 font-bold opacity-80">Database Browser untuk data kompleks</p>
                            </div>
                            <Database className="absolute bottom-[-20px] right-[-20px] w-48 h-48 text-white opacity-10 rotate-12" />
                        </div>

                        {/* Error Alert */}
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 p-4 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm font-bold animate-shake">
                                <AlertCircle className="w-5 h-5" />
                                {error}
                            </div>
                        )}

                        {/* Add Todo Form */}
                        <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
                            <h2 className="text-lg font-black text-gray-900 dark:text-white mb-6 uppercase tracking-widest">Tambah Todo</h2>
                            <form onSubmit={addTodo} className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Mancing mungking"
                                    className="flex-1 px-6 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-500 rounded-2xl text-gray-900 dark:text-white outline-none transition-all font-bold shadow-inner"
                                />
                                <button
                                    type="submit"
                                    className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl font-black shadow-xl shadow-indigo-500/20 active:scale-95 transition-all text-sm uppercase tracking-widest"
                                >
                                    Tambah
                                </button>
                            </form>
                        </div>

                        {/* Todo List View */}
                        <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-3">
                                    Daftar Todo
                                    <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-sm">
                                        ({todos.length})
                                    </span>
                                </h2>
                                {todos.length > 0 && (
                                    <button
                                        onClick={clearAll}
                                        className="text-xs font-black text-red-500 hover:text-red-600 uppercase tracking-widest flex items-center gap-1 transition-colors"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        Hapus Semua
                                    </button>
                                )}
                            </div>

                            <div className="space-y-3">
                                {todos.length > 0 ? (
                                    todos.map((todo) => (
                                        <div key={todo.id} className="group flex items-center justify-between p-5 bg-gray-50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 rounded-2xl border border-transparent hover:border-indigo-100 dark:hover:border-indigo-900/30 transition-all shadow-sm">
                                            <div className="flex items-center gap-4 flex-1">
                                                <div className="w-2 h-2 rounded-full bg-indigo-500 group-hover:scale-125 transition-transform" />
                                                <p className="font-bold text-gray-700 dark:text-gray-200">
                                                    {todo.text}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => deleteTodo(todo.id)}
                                                className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                                                title="Delete Todo"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-16 text-gray-400 dark:text-gray-600">
                                        <ListTodo className="w-16 h-16 mb-4 opacity-20" />
                                        <p className="font-bold uppercase tracking-widest text-xs">Belum ada daftar kegiatan</p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}
