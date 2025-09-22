"use client";

import { useState, useEffect } from "react";
import { Box, Text, Button } from "@radix-ui/themes";

const DemoToast = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <Box className="fixed top-4 right-4 z-50 max-w-sm">
      <div className="bg-white border border-yellow-200 rounded-lg shadow-lg p-4 transform transition-all duration-300 hover:scale-105">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="flex-shrink-0">
            <svg
              className="h-6 w-6 text-yellow-500 animate-pulse"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          {/* Content */}
          <div className="flex-1">
            <Text className="font-semibold text-gray-900 text-sm">
              🎭 Demo Notice
            </Text>
            <Text className="text-gray-600 text-xs mt-1">
              Slow loading? That's intentional! We added delays to showcase
              loading states.
            </Text>
          </div>

          {/* Close Button */}
          <Button
            size="1"
            variant="ghost"
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </Button>
        </div>
      </div>
    </Box>
  );
};

export const demoMessages = [
  "🎬 Lights, camera, loading...",
  "🍿 Grab some popcorn while we demo load!",
  "🎭 This is just for show - real app would be instant!",
  "⏰ Demo delay in progress... tick tock!",
  "🚀 Simulating space-age loading times!",
  "🎪 Welcome to our loading circus!",
  "🎨 Painting pixels... please wait!",
  "🔮 Consulting the demo crystal ball...",
  "🎵 Loading to the rhythm of demo music...",
  "🏗️ Building your experience brick by brick!",
  "☕ Perfect time for a coffee break!",
  "🌟 Sprinkling some demo magic...",
];

export const getRandomDemoMessage = () => {
  return demoMessages[Math.floor(Math.random() * demoMessages.length)];
};



export default DemoToast;
