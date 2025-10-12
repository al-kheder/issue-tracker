import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

export function validateIssueId(id: string): number {
  const issueId = parseInt(id);
  
  if (isNaN(issueId) || issueId <= 0) {
    notFound();
  }
  return issueId;
}

export async function getIssueById(id: number) {
  const issue = await prisma.issue.findUnique({
    where: { id },
  });

  if (!issue) {
    notFound();
  }

  return issue;
}