import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import delay from "delay";
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

  await delay(500); // to add some simulation for slow internet

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">{issueDetail.title}</h1>
        <div className="text-gray-600 mb-4">
          Issue #{issueDetail.id} • Created:{" "}
          {issueDetail.createdAt.toDateString()}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Description</h2>
        <div className="prose max-w-none whitespace-pre-wrap">
          {issueDetail.description}
        </div>
      </div>
    </div>
  );
};

export default IssueDetailsPage;
