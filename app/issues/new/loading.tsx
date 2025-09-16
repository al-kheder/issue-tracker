import React from "react";

const NewIssueLoading = () => {
  return (
    <div className="max-w-xl mx-auto mt-8 space-y-4">
      {/* Page title skeleton */}
      <div className="flex items-center space-x-3">
        <div className="h-8 bg-gray-200 rounded-md w-52 animate-pulse"></div>
      </div>

      {/* Form container */}
      <div className="space-y-4 pt-4">
        {/* Title field skeleton */}
        <div className="space-y-2">
          <div className="space-y-1">
            {/* Input field skeleton */}
            <div className="relative">
              <div className="h-10 bg-gray-100 border border-gray-200 rounded-md w-full animate-pulse flex items-center px-3">
                <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Description field skeleton */}
        <div className="space-y-2">
          {/* SimpleMDE Editor skeleton */}
          <div className="border border-gray-200 rounded-md overflow-hidden">
            {/* Toolbar skeleton */}
            <div className="bg-gray-50 border-b border-gray-200 p-2">
              <div className="flex items-center space-x-1">
                {/* Bold, italic, etc. buttons */}
                <div className="h-7 w-7 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-7 w-7 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-px h-6 bg-gray-300 mx-1"></div>
                <div className="h-7 w-7 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-7 w-7 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-7 w-7 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-px h-6 bg-gray-300 mx-1"></div>
                <div className="h-7 w-7 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-7 w-7 bg-gray-200 rounded animate-pulse"></div>

                {/* Spacer */}
                <div className="flex-1"></div>

                {/* Preview/Guide buttons */}
                <div className="h-7 w-16 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-7 w-7 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Editor content area */}
            <div className="bg-white p-4 min-h-[200px]">
              <div className="space-y-3">
                {/* Placeholder text skeleton */}
                <div className="h-4 bg-gray-200 rounded w-40 animate-pulse opacity-50"></div>

                {/* Simulated typing area */}
                <div className="space-y-2 pt-2">
                  <div className="h-4 bg-gray-100 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-100 rounded w-4/5 animate-pulse"></div>
                  <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-gray-100 rounded w-2/3 animate-pulse"></div>
                  <div className="h-4 bg-gray-100 rounded w-1/2 animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Status bar skeleton */}
            <div className="bg-gray-50 border-t border-gray-200 px-4 py-2">
              <div className="flex justify-between items-center text-xs">
                <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit button skeleton */}
        <div className="pt-2">
          <div className="h-12 bg-blue-100 border border-blue-200 rounded-md w-full animate-pulse flex items-center justify-center">
            <div className="h-4 bg-blue-200 rounded w-32 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewIssueLoading;
