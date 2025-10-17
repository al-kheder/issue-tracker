import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { QuickStats } from "../components/index";
import LatestIssues from "./LatestIssues";

export default async function Dashboard() {
  const session = await auth();
  {
    !session && redirect("/api/auth/signin");
  }

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
        {/*  <Card className="p-6">
          <Flex direction="column" gap="3">
          <QuickStats stats={stats}/>
          </Flex>
        </Card> */}
      </div>
        <LatestIssues/>


    </div>
  );
}
