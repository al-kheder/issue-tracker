import { IssuesButton } from "@/app/components/index";
import DeleteButton from "@/app/components/DeletButton";
import prisma from "@/prisma/client";
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
  Text,
} from "@radix-ui/themes";
import delay from "delay";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

const IssueDetailsPage = async ({ params: { id } }: Props) => {
  const issueId = parseInt(id);

  if (isNaN(issueId) || issueId <= 0) {
    notFound();
  }

  const issueDetail = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issueDetail) notFound();

  await delay(500);

  // Status configuration
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "OPEN":
        return {
          color: "red" as const,
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          icon: <ExclamationTriangleIcon className="h-5 w-5" />,
          label: "Open",
        };
      case "IN_PROGRESS":
        return {
          color: "yellow" as const,
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          icon: <ClockIcon className="h-5 w-5" />,
          label: "In Progress",
        };
      case "CLOSED":
        return {
          color: "green" as const,
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          icon: (
            <svg
              className="h-5 w-5"
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
          label: "Resolved",
        };
      default:
        return {
          color: "gray" as const,
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          icon: <ExclamationTriangleIcon className="h-5 w-5" />,
          label: status,
        };
    }
  };

  const statusConfig = getStatusConfig(issueDetail.status);

  return (
    <Box className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-2xl">
      <Container className="max-w-6xl mx-auto px-4 py-4">
        {/* Back Button */}
        <div>
          <IssuesButton />
        </div>

        {/* Hero Section */}
        <Section>
          <div
            className={`rounded-2xl ${statusConfig.bgColor} ${statusConfig.borderColor} border-2 p-8 shadow-lg transition-all duration-300 hover:shadow-xl`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl bg-white shadow-md`}>
                  {statusConfig.icon}
                </div>
                <div>
                  <Badge
                    color={statusConfig.color}
                    variant="soft"
                    className="mb-2"
                  >
                    {statusConfig.label}
                  </Badge>
                  <Heading className="text-3xl font-bold text-gray-900">
                    {issueDetail.title}
                  </Heading>
                </div>
              </div>
            </div>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="font-medium">Issue #{issueDetail.id}</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4" />
                <span>
                  Created
                  {issueDetail.createdAt.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              {issueDetail.updatedAt &&
                issueDetail.updatedAt !== issueDetail.createdAt && (
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    <span>
                      Updated{" "}
                      {issueDetail.updatedAt.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                )}
            </div>
          </div>
        </Section>

        {/* Description Section */}
        <Section>
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <Heading className="text-2xl font-semibold text-gray-900">
                Description
              </Heading>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-blue-500">
                <Text className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {issueDetail.description || "No description provided."}
                </Text>
              </div>
            </div>
          </div>
        </Section>

        {/* Action Buttons */}
        <Section className="flex flex-wrap gap-4">
          <Button size="3" className="flex items-center gap-2">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit Issue
          </Button>

          <Button
            variant="outline"
            size="3"
            className="flex items-center gap-2"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            Add Comment
          </Button>

          <DeleteButton issueId={issueId} />
        </Section>
      </Container>
    </Box>
  );
};

export default IssueDetailsPage;
