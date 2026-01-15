"use client"

import Image from "next/image"
import { useState, useEffect, useRef, useCallback } from "react"

interface MediaItem {
    id: number;
    type: 'image' | 'video';
    src: string;
    title: string;
    description: string;
}
        
export default function MediaSection() {
    const [items, setItems] = useState<MediaItem[]>([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const observer = useRef<IntersectionObserver | null>(null)
    const isFetching = useRef(false) // Race condition prevention

    const fetchMedia = useCallback(async () => {
        if (loading || !hasMore || isFetching.current) return;

        isFetching.current = true;
        setLoading(true);

        try {
            const res = await fetch(`/api/media?page=${page}&limit=5`);
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();

            setItems(prev => [...prev, ...data.data]);
            setHasMore(data.hasMore);
            if (data.hasMore) {
                setPage(prev => prev + 1);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            isFetching.current = false;
        }
    }, [page, hasMore, loading]);

    useEffect(() => {
        fetchMedia(); // Initial fetch
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className="mt-8 space-y-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Galeri Media Gramedia Responsive</h3>

            <div className="space-y-8">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <div
                            key={`${item.id}-${index}`}
                            className="space-y-4 animate-in fade-in duration-500"
                        >
                            <h4 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">{item.title}</h4>

                            {item.type === 'video' ? (
                                <div className="relative w-full h-0 pb-[56.25%] overflow-hidden rounded-lg shadow-xl">
                                    <iframe
                                        src={item.src}
                                        title={item.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="absolute top-0 left-0 w-full h-full"
                                    ></iframe>
                                </div>
                            ) : (
                                <Image
                                    src={item.src}
                                    alt={item.title}
                                    width={800}
                                    height={500}
                                    className="w-full h-auto rounded-lg shadow-xl bg-white dark:bg-gray-700 p-2"
                                />
                            )}

                            <p className="text-gray-600 dark:text-gray-400 text-ms">
                                {item.description}
                            </p>
                        </div>
                    );
                })}
            </div>

            {loading && items.length === 0 && (
                <div className="flex justify-center p-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
                </div>
            )}
        </section>
    )
}
