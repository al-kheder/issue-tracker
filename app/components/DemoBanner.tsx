"use client"; // ← Only this component is client-side

import { getRandomDemoMessage } from "./index";

const DemoBanner = () => {
  const message = getRandomDemoMessage();

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-3">
        <div className="animate-bounce">🎭</div>
        <div>
          <p className="text-purple-800 font-medium text-sm">{message}</p>
          <p className="text-purple-600 text-xs">
            Production would load instantly - this delay is just for demo!
          </p>
        </div>
      </div>
    </div>
  );
};

export default DemoBanner;
