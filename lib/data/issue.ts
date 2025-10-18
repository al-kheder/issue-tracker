import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { cache } from "react";

export function validateIssueId(id: string): number {
  const issueId = parseInt(id);
  
  if (isNaN(issueId) || issueId <= 0) {
    notFound();
  }
  return issueId;
}

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

export async function getIssueById(id: number) {
 /*  const issue = await prisma.issue.findUnique({
    where: { id },
  }); */

  const issue = await fetchUser(id)

  if (!issue) {
    notFound();
  }

  return issue;
}