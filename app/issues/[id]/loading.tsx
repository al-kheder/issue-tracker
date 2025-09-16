const IssueDetailsLoading = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Match your actual page layout */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          {/* Title skeleton */}
          <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          {/* Status badge skeleton */}
          <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
        </div>

        {/* Meta info skeleton */}
        <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
      </div>

      {/* Content skeleton */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4 animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetailsLoading;
