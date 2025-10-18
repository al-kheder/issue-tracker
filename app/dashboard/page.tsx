import { auth } from "@/auth";
import prisma from "@/prisma/client";
import { Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { redirect } from "next/navigation";
import IssueChart from "./IssueChart";
import LatestIssues from "./LatestIssues";
import MinimalIssueSummary from "./MinimalIssueSummary";

export default async function Dashboard() {
  const session = await auth();
  {
    !session && redirect("/api/auth/signin");
  }

  try {
    const issueStats = await prisma.issue.groupBy({
      by: ["status"],
      _count: { status: true },
    });
    const open =
      issueStats.find((stat) => stat.status === "OPEN")?._count.status || 0;
    const inProgress =
      issueStats.find((stat) => stat.status === "IN_PROGRESS")?._count.status ||
      0;
    const closed =
      issueStats.find((stat) => stat.status === "CLOSED")?._count.status || 0;

    return (
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Welcome Header */}
        <Card className="p-6">
          <Flex direction="column" gap="2">
            <Heading size="6">Welcome back, {session!.user?.name}! 👋</Heading>
            <Text color="gray">
              Ready to manage your issues? Here's your dashboard.
            </Text>
          </Flex>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6">
            <Flex direction="column" gap="3">
              <Heading size="4">📝 Create New Issue</Heading>
              <Text color="gray" size="2">
                Report a new bug or feature request
              </Text>
              <Button asChild>
                <Link href="/issues/new">Create Issue</Link>
              </Button>
            </Flex>
          </Card>

          <Card className="p-6">
            <Flex direction="column" gap="3">
              <Heading size="4">📋 View All Issues</Heading>
              <Text color="gray" size="2">
                Browse and manage existing issues
              </Text>
              <Button asChild variant="outline">
                <Link href="/issues">View Issues</Link>
              </Button>
            </Flex>
          </Card>
          <Card className="p-6">
            <Flex direction="column" gap="3">
              <Heading size="4">👤 Your Profile</Heading>
              <Text color="gray" size="2">
                Manage your account settings
              </Text>
              <Button asChild variant="outline">
                <Link href="/profile">View Profile</Link>
              </Button>
            </Flex>
          </Card>

          <MinimalIssueSummary />
        </div>

        {/*  <Grid columns="2" gap="2">
          <LatestIssues />
          <IssueChart open={2} inProgress={13} closed={12} />
        </Grid> */}
        {/* Ultra responsive with more breakpoints */}
        <Grid
          columns={{
            initial: "1",
            sm: "1",
            md: "1",
            lg: "2",
            xl: "2",
          }}
          gap={{
            initial: "4",
            lg: "6",
          }}
          style={{
            background:
              "linear-gradient(135deg, rgba(245,158,11,0.05), rgba(245,158,11,0.1))",
            borderRadius: "12px",
            padding: "24px",
            minHeight: "400px",
          }}
        >
          <IssueChart open={open} inProgress={inProgress} closed={closed} />
          <LatestIssues />
        </Grid>
      </div>
    );
  } catch (error) {
    console.error("Error fetching issue stats:", error);
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <Grid columns="2" gap="5" className="border-2 border-amber-600">
          <LatestIssues />
          <IssueChart open={0} inProgress={0} closed={0} />
        </Grid>
      </div>
    );
  }
}
