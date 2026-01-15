"use client"

export default function CardSkeleton() {
    return (
        <div className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800 animate-pulse">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="space-y-2">
                <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
            <div className="mt-4 h-3 bg-gray-100 dark:bg-gray-700 rounded w-1/3"></div>
        </div>
    )
}
