import { auth } from "@/auth";
import { Card, Flex, Heading } from "@radix-ui/themes";
import { redirect } from "next/navigation";
import React from "react";
import { IssuesButton } from "../components";

const page = async () => {
  const session = await auth();
  {
    !session && redirect("/api/auth/signin");
  }
  return (
    <Card className="p-6">
      <Flex direction="column" gap="3">
        <Heading size="4">🔍 Your Session Info</Heading>
        <div className="bg-gray-50 p-4 rounded border text-sm space-y-1">
          <p>
            <strong>User ID:</strong> {session!.user?.id}
          </p>
          <p>
            <strong>Name:</strong> {session!.user?.name}
          </p>
          <p>
            <strong>Email:</strong> {session!.user?.email}
          </p>
          <p>
            <strong>Has Profile Image:</strong>{" "}
            {session!.user?.image ? "Yes" : "No"}
          </p>
        </div>
      <IssuesButton url="dashboard" urlTitle="Dashboard"/>
      </Flex>
    </Card>
  );
};

export default page;
