import React from 'react';

const Loading = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <h2 className="mt-6 text-2xl font-bold text-gray-900">
                        Signing you in...
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Please wait while we authenticate your credentials
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Loading;