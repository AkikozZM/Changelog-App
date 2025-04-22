export const LoadingSkeleton = () => (
  <div className="h-full flex flex-col animate-pulse">
    {/* Header Skeleton */}
    <div className="px-8 pt-8 pb-4">
      <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
      <div className="flex justify-between items-start">
        <div>
          <div className="h-8 w-64 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-80 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>

    {/* Filters Skeleton */}
    <div className="px-8 py-4">
      <div className="flex gap-4 sm:flex-row flex-col">
        <div className="relative flex-1 max-w-md h-10 bg-gray-200 rounded-md"></div>
        <div className="h-10 w-32 bg-gray-200 rounded-md"></div>
        <div className="h-10 w-32 bg-gray-200 rounded-md"></div>
        <div className="h-10 w-32 bg-gray-200 rounded-md"></div>
      </div>
    </div>

    {/* Stats Skeleton */}
    <div className="px-8 py-4">
      <div className="h-4 w-64 bg-gray-200 rounded"></div>
    </div>

    {/* Content Skeleton */}
    <div className="flex-1 overflow-auto px-8 py-6 space-y-8">
      {[...Array(3)].map((_, i) => (
        <div key={i}>
          <div className="flex items-center mb-4">
            <div className="h-6 w-40 bg-gray-200 rounded"></div>
          </div>
          <div className="grid gap-4">
            {[...Array(3)].map((_, j) => (
              <div key={j} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);
