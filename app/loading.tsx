"use client";
import {
  Blockquote,
  Box,
  Button,
  Container,
  Heading,
  Section,
} from "@radix-ui/themes";
import { PlusIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";

const loading = () => {
  return (
    <Box className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-5">
      <Container className="max-w-6xl mx-auto px-4">
        {/* Hero Section with Staggered Animation */}
        <Section className="text-center">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 bg-blue-200 rounded-lg animate-pulse delay-100">
              <ExclamationTriangleIcon className="h-16 w-16 text-blue-300 opacity-50" />
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <div className="h-12 w-80 bg-gray-300 rounded-lg animate-pulse delay-200"></div>
          </div>

          <div className="flex justify-center mb-8">
            <div className="max-w-2xl mx-auto space-y-3">
              <div className="h-6 w-full bg-gray-300 rounded animate-pulse delay-300"></div>
              <div className="h-6 w-3/4 bg-gray-300 rounded animate-pulse delay-400 mx-auto"></div>
            </div>
          </div>

          <Section className="flex flex-col sm:flex-row gap-6 justify-center">
            <div className="h-12 w-40 bg-blue-200 rounded-lg animate-pulse delay-500"></div>
            <div className="h-12 w-44 bg-gray-200 rounded-lg animate-pulse delay-600"></div>
          </Section>
        </Section>

        {/* Features Grid with Individual Delays */}
        <Section className="grid md:grid-cols-3 gap-8 mt-16">
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className={`bg-white rounded-lg p-6 shadow-md animate-pulse delay-[${
                700 + index * 100
              }ms]`}
            >
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <div className="h-6 w-6 bg-blue-300 rounded animate-pulse"></div>
              </div>
              <div className="h-6 w-32 bg-gray-300 rounded mb-2 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 w-5/6 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 w-4/6 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </Section>

        {/* Stats Section with Shimmer Effect */}
        <Section className="mt-16 bg-white rounded-lg p-8 shadow-md">
          <div className="flex justify-center mb-8">
            <div className="h-8 w-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { color: "bg-red-200", label: "bg-red-100" },
              { color: "bg-yellow-200", label: "bg-yellow-100" },
              { color: "bg-green-200", label: "bg-green-100" },
            ].map((stat, index) => (
              <div key={index} className="animate-pulse">
                <div
                  className={`h-10 w-16 ${stat.color} rounded mb-2 mx-auto animate-pulse`}
                ></div>
                <div
                  className={`h-4 w-20 ${stat.label} rounded mx-auto animate-pulse`}
                ></div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <div className="h-8 w-36 bg-gray-200 rounded mx-auto animate-pulse"></div>
          </div>
        </Section>

        {/* Floating Loading Indicator */}
        <div className="fixed bottom-8 right-8 bg-white rounded-full p-4 shadow-lg border animate-bounce">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
            <span className="text-sm text-gray-600 font-medium animate-pulse">
              Loading dashboard...
            </span>
          </div>
        </div>
      </Container>

      {/* Custom CSS for shimmer effect */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </Box>
  );
};

export default loading;
