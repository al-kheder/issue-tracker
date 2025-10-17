import prisma from "@/prisma/client";
import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Text,
} from "@radix-ui/themes";
import {
  DotFilledIcon,
  CheckCircledIcon,
  ClockIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import IssueStatusBadge from "../components/IssueStatusBage";

const LatestIssues = async () => {
  const isseues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { assignedToUser: true },
  });

  // 🔧 Function to get status display with icon
  type TextColor = React.ComponentProps<typeof Text>["color"];
  type StatusDisplay = {
    color: TextColor;
    icon: React.ReactNode;
    text: string;
  };

  const getStatusDisplay = (status: string): StatusDisplay => {
    switch (status) {
      case "OPEN":
        return {
          color: "red",
          icon: <DotFilledIcon />,
          text: "Open",
        };
      case "IN_PROGRESS":
        return {
          color: "orange",
          icon: <ClockIcon />,
          text: "In Progress",
        };
      case "CLOSED":
        return {
          color: "green",
          icon: <CheckCircledIcon />,
          text: "Closed",
        };
      default:
        return {
          color: "gray",
          icon: <DotFilledIcon />,
          text: status,
        };
    }
  };

  console.log(isseues);
  return (
    <Box maxWidth="400px">
      <Heading
        align="center"
        style={{
          background: " linear-gradient(135deg, #667eea 0%, #764ba2 100%);",
          border: "none",
          color: "white",
          borderRadius: 5,
          margin: 5,
        }}
      >
        Latest {isseues.length} Issues
      </Heading>

      {isseues.map((issue) => {
        const statusProps = getStatusDisplay(issue.status);

        return (
          <Card mb="2" key={issue.id}>
            <Flex gap="1" justify="between">
              <Flex direction="column" justify="between">
                <Box>
                  <Text as="div" size="2" weight="bold">
                    {issue.title}
                  </Text>
                  <Text as="div" size="2" color="gray">
                    {issue.description.slice(0, 40) + "..."}
                  </Text>
                </Box>
                <Flex align="center" gap="2">
                  <IssueStatusBadge status={issue.status} />
                </Flex>
              </Flex>
              <Flex align="end" justify="between" gap="2" direction="column">
                {issue.assignedToUser && (
                  <Avatar
                    size="3"
                    src={issue.assignedToUser.image!}
                    radius="full"
                    color="gray"
                    fallback={issue.assignedToUser.name!}
                  />
                )}
                <Button
                  variant="soft"
                  size="1"
                  className="hover:cursor-pointer"
                >
                  <Link href={`/issues/${issue.id}`}>View</Link>
                </Button>
              </Flex>
            </Flex>
          </Card>
        );
      })}
    </Box>
  );
};

export default LatestIssues;
