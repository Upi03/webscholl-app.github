"use client"

export default function TableSkeleton() {
    return (
        <div className="w-full animate-pulse space-y-4 p-4 border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            {/* Header Skeleton */}
            <div className="flex items-center space-x-4 border-b border-gray-200 dark:border-gray-700 pb-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            </div>

            {/* Row Skeletons */}
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4 py-2">
                    <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded w-1/4"></div>
                </div>
            ))}
        </div>
    )
}
