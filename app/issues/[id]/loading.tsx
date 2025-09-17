import Link from "next/link";
import {
  ArrowLeftIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";
import {
  Badge,
  Box,
  Button,
  Container,
  Heading,
  Section,
} from "@radix-ui/themes";

const IssueDetailsLoading = () => {
  return (
    <Box className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Container className="max-w-6xl mx-auto px-4 py-4">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/issues">
            <Button
              variant="ghost"
              className="flex items-center gap-2 hover:bg-gray-100 transition-colors"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Issues
            </Button>
          </Link>
        </div>

        {/* Hero Section Skeleton */}
        <Section className="mb-8">
          <div className="rounded-2xl bg-gray-50 border-2 border-gray-200 p-8 shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {/* Status Icon Placeholder */}
                <div className="p-3 rounded-xl bg-white shadow-md">
                  <div className="h-5 w-5 bg-gray-300 rounded animate-pulse"></div>
                </div>
                <div className="flex-1">
                  {/* Status Badge Skeleton */}
                  <div className="h-6 w-20 bg-gray-300 rounded-full mb-2 animate-pulse"></div>
                  {/* Title Skeleton */}
                  <div className="h-8 w-96 bg-gray-300 rounded mb-2 animate-pulse"></div>
                  <div className="h-6 w-64 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Metadata Skeleton */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="h-4 w-16 bg-gray-300 rounded animate-pulse"></div>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4 text-gray-400" />
                <div className="h-4 w-32 bg-gray-300 rounded animate-pulse"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </Section>

        {/* Description Section Skeleton */}
        <Section className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              {/* Description Icon Placeholder */}
              <div className="p-2 bg-gray-100 rounded-lg">
                <div className="h-6 w-6 bg-gray-300 rounded animate-pulse"></div>
              </div>
              {/* Description Heading Skeleton */}
              <div className="h-7 w-32 bg-gray-300 rounded animate-pulse"></div>
            </div>

            {/* Description Content Skeleton */}
            <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-gray-300">
              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 w-5/6 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 w-4/6 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 w-3/6 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 w-2/6 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </Section>

        {/* Action Buttons Skeleton */}
        <Section className="flex flex-wrap gap-4">
          <Button size="3" className="flex items-center gap-2" disabled>
            <div className="h-5 w-5 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-4 w-20 bg-gray-300 rounded animate-pulse"></div>
          </Button>

          <Button
            variant="outline"
            size="3"
            className="flex items-center gap-2"
            disabled
          >
            <div className="h-5 w-5 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
          </Button>

          <Button
            variant="soft"
            color="red"
            size="3"
            className="flex items-center gap-2"
            disabled
          >
            <div className="h-5 w-5 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-4 w-20 bg-gray-300 rounded animate-pulse"></div>
          </Button>
        </Section>

        {/* Loading Indicator */}
        <div className="fixed bottom-8 right-8 bg-white rounded-full p-4 shadow-lg border">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
            <span className="text-sm text-gray-600 font-medium">
              Loading issue details...
            </span>
          </div>
        </div>
      </Container>
    </Box>
  );
};

export default IssueDetailsLoading;
