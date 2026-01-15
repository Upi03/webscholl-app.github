"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import CardSkeleton from "./CardSkeleton"

// Definisikan Tipe Data Item
interface FeedItem {
    id: number;
    title: string;
    description: string;
    content: string;
    page: number;
}

export default function InfiniteScroll() {
    const [items, setItems] = useState<FeedItem[]>([])
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)

    // Ref untuk Observer
    const sentinelRef = useRef<HTMLDivElement>(null)
    // Ref untuk mencegah multiple concurrent fetches
    const isFetchingRef = useRef(false)

    // Fungsi untuk Memuat Data Baru (Simulasi API Call)
    const fetchdata = useCallback(async (pageNum: number): Promise<FeedItem[]> => {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Batas maksimum halaman
        if (pageNum > 5) {
            return []
        }

        // Buat Data Dummy
        const newItem: FeedItem[] = Array.from({ length: 10 }, (_, index) => {
            const id = (pageNum - 1) * 10 + index + 1;
            return {
                id,
                title: `Item ${id}`,
                description: `Deskripsi untuk Item ${id}`,
                content: `Isi ${index + 1} (Page ${pageNum})`,
                page: pageNum,
            };
        })

        return newItem;
    }, [])

    const fetchMoreData = useCallback(async () => {
        // Prevent multiple concurrent fetches
        if (isFetchingRef.current || isLoading || !hasMore) {
            console.log("Skipping fetch - already in progress or no more data");
            return;
        }

        isFetchingRef.current = true;

        console.log(`Fetching page ${page + 1}...`);
        setIsLoading(true);
        const nextPage = page + 1;
        const newItems = await fetchdata(nextPage);

        console.log(`Fetched ${newItems.length} items.`);

        if (newItems.length === 0) {
            setHasMore(false);
        } else {
            setItems(prev => {
                console.log("Appending items. Previous length:", prev.length, "New items:", newItems.length);

                // Deduplicate: filter out items that already exist
                const existingIds = new Set(prev.map(item => item.id));
                const uniqueNewItems = newItems.filter(item => !existingIds.has(item.id));

                console.log("Unique new items:", uniqueNewItems.length);
                return [...prev, ...uniqueNewItems];
            });
            setPage(nextPage);
        }
        setIsLoading(false);
        isFetchingRef.current = false;
    }, [isLoading, hasMore, page, fetchdata]);

    useEffect(() => {
        const loadInitial = async () => {
            setIsLoading(true);
            const initialItems = await fetchdata(1);
            setItems(initialItems);
            setIsLoading(false);
        };
        loadInitial();
    }, [fetchdata]);

    useEffect(() => {
        if (isLoading || !hasMore) return;

        const observer = new IntersectionObserver(
            async (entries) => {
                if (entries[0].isIntersecting && !isFetchingRef.current) {
                    console.log("Intersecting! Fetching more data...");
                    await fetchMoreData();
                }
            },
            { threshold: 0.1 } // Trigger when 10% visible
        );

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }

        return () => {
            if (sentinelRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(sentinelRef.current);
            }
        }
    }, [isLoading, hasMore, fetchMoreData]);

    return (
        <div className="space-y-4 p-4 h-96 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg relative">
            <div className="p-2 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 mb-4">
                <p>Scroll <b>inside this box</b> to see more items.</p>
                <p>Total Items: {items.length}</p>
            </div>

            <div className="grid gap-4">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800 transition-all hover:scale-[1.01]"
                        style={{ borderLeft: `5px solid hsl(${(item.id * 50) % 360}, 70%, 50%)` }}
                    >
                        <h3 className="font-semibold text-lg">{item.title} (ID: {item.id})</h3>
                        <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                        <p className="mt-2 text-sm text-gray-500">{item.content}</p>
                    </div>
                ))}
            </div>

            {/* Sentinel Element */}
            <div ref={sentinelRef} className="h-20 flex items-center justify-center p-4">
                {isLoading ? (
                    <div className="flex items-center space-x-2 text-blue-600">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-current"></div>
                        <span>Loading more items...</span>
                    </div>
                ) : !hasMore ? (
                    <p className="text-gray-500 font-medium">No more items to load.</p>
                ) : (
                    <p className="text-gray-400 text-sm">Scroll for more...</p>
                )}
            </div>
        </div>
    )
}