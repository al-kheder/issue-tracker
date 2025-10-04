import Link from "next/link";
import {
  Blockquote,
  Box,
  Button,
  Container,
  Heading,
  Section,
} from "@radix-ui/themes";
import { PlusIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import prisma from "@/prisma/client";
import FeaturedCard from "./components/FeaturedCard";
import { useSession } from "next-auth/react";

const features = [
  {
    icon: <ExclamationTriangleIcon className="h-6 w-6 text-blue-600" />,
    title: "Track Issues",
    description:
      "Keep track of all your project issues in one centralized location.",
    bgColor: "bg-blue-100",
  },
  {
    icon: (
      <svg
        className="h-6 w-6 text-green-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Manage Status",
    description:
      "Update issue status from open to in-progress to closed seamlessly.",
    bgColor: "bg-green-100",
  },
  {
    icon: (
      <svg
        className="h-6 w-6 text-purple-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: "Stay Productive",
    description:
      "Streamlined workflow to keep your team focused and productive.",
    bgColor: "bg-purple-100",
  },
];

export default async function Home() {
  const [openCount, inProgressCount, closedCount] = await Promise.all([
    prisma.issue.count({ where: { status: "OPEN" } }),
    prisma.issue.count({ where: { status: "IN_PROGRESS" } }),
    prisma.issue.count({ where: { status: "CLOSED" } }),
  ]);

  const stats = [
    {
      count: openCount,
      label: "Open Issues",
      color: "text-red-600",
    },
    {
      count: inProgressCount,
      label: "In Progress",
      color: "text-yellow-600",
    },
    {
      count: closedCount,
      label: "Resolved",
      color: "text-green-600",
    },
  ];

  return (
    <Box className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-5">
      <Container className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <Section className="text-center">
          <div className="flex justify-center">
            <ExclamationTriangleIcon className="h-16 w-16 text-blue-600" />
          </div>

          <Heading className="text-5xl font-bold text-gray-900 mb-6">
            Issue Tracker
          </Heading>

          <Blockquote className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Track, manage, and resolve issues efficiently. Keep your projects
            organized and your team productive.
          </Blockquote>

          {/* CTA Buttons */}
          <Section className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/issues">
              <Button size="3" className="text-lg px-8 py-3">
                View All Issues
              </Button>
            </Link>

            <Link href="/issues/new">
              <Button
                variant="outline"
                size="3"
                className="text-lg px-8 py-3 flex items-center gap-2"
              >
                <PlusIcon className="h-5 w-5" />
                Create New Issue
              </Button>
            </Link>
          </Section>
        </Section>

        {/* Features Grid */}
        <Section className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeaturedCard
              key={index}
              title={feature.title}
              icon={feature.icon}
              description={feature.description}
              bgColor={feature.bgColor}
            />
          ))}
        </Section>

        {/* Quick Stats */}
        <Section className="bg-white rounded-lg p-8 shadow-md">
          <Heading className="text-2xl font-semibold text-center">
            Quick Overview
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                  {stat.count}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <Link href="/issues">
              <Button variant="ghost">View detailed statistics →</Button>
            </Link>
          </div>
        </Section>
      </Container>
    </Box>
  );
}
