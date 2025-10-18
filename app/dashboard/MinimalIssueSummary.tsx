import prisma from "@/prisma/client";
import { Card, Flex, Text, Badge } from "@radix-ui/themes";
import Link from "next/link";

const MinimalIssueSummary = async () => {
  const issueStats = await prisma.issue.groupBy({
    by: ["status"],
    _count: { status: true },
  });

  const stats = [
    {
      label: "Open",
      count: issueStats.find((s) => s.status === "OPEN")?._count.status || 0,
      color: "red" as const,
      filterdIssue: "OPEN",
    },
    {
      label: "Progress",
      count:
        issueStats.find((s) => s.status === "IN_PROGRESS")?._count.status || 0,
      color: "orange" as const,
      filterdIssue: "IN_PROGRESS",
    },
    {
      label: "Closed",
      count: issueStats.find((s) => s.status === "CLOSED")?._count.status || 0,
      color: "green" as const,
      filterdIssue: "CLOSED",
    },
  ];

  return (
    <Card size="2">
      <Flex direction="column" gap="3">
        <Text size="3" weight="bold" style={{ textAlign: "center" }}>
          📋 Issue Summary (
          <Link href="/issues?status=ALL">
            {stats.reduce((total, { count }) => total + count, 0)})
          </Link>
        </Text>

        <Flex justify="between" gap="2">
          {stats.map((stat) => (
            <Flex key={stat.label} direction="column" align="center" gap="1">
              <Badge color={stat.color} variant="soft">
                <Link href={`issues?status=${stat.filterdIssue}`}>
                  {stat.label}
                </Link>
              </Badge>
              <Text size="5" weight="bold">
                {stat.count}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Card>
  );
};

export default MinimalIssueSummary;
