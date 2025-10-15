import React from "react";
import { Section, Table } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import {
  DemoBanner,
  IssueStatusBage,
  Link as NextLink,
} from "@/app/components/index";
import delay from "delay";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import Link from "next/link";
import { keyof } from "zod";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Paginations from "../components/Paginations";

/* interface Props {
  searchParams: { status: Status };
} */

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ status?: Status; orderBy: keyof Issue }>;
}) => {
  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const resolvedSearchParams = await searchParams;
  console.log(" search params", resolvedSearchParams.status);

  const validStatuses: Status[] = ["OPEN", "CLOSED", "IN_PROGRESS"];
  const statusFilter =
    resolvedSearchParams.status &&
    validStatuses.includes(resolvedSearchParams.status as Status)
      ? (resolvedSearchParams.status as Status)
      : undefined;

  const whereClause = statusFilter ? { status: statusFilter } : {};

  const orderBy = columns
    .map((column) => column.value)
    .includes(resolvedSearchParams.orderBy)
    ? { [resolvedSearchParams.orderBy]: "asc" }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: whereClause,
    orderBy,
  });

  await delay(500);

  return (
    <>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.label}
                className={column.className}
              >
                <Link
                  href={{
                    query: { ...resolvedSearchParams, orderBy: column.value },
                  }}
                >
                  {column.label}
                  {column.value === resolvedSearchParams.orderBy && (
                    <ArrowUpIcon className="inline" />
                  )}
                </Link>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.length === 0 ? (
            <Table.Row>
              <Table.Cell
                colSpan={3}
                className="text-center py-8 text-gray-500"
              >
                No issues found for this filter
              </Table.Cell>
            </Table.Row>
          ) : (
            issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.RowHeaderCell>
                  <NextLink href={`/issues/${issue.id}`}>
                    {issue.title}
                  </NextLink>
                  <div className="block md:hidden">
                    <IssueStatusBage status={issue.status} />
                  </div>
                </Table.RowHeaderCell>
                <Table.Cell className="hidden md:table-cell">
                  <IssueStatusBage status={issue.status} />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue.createdAt.toDateString()}
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table.Root>
      {/* 🔧 Show current filter */}
        <Paginations itemCount={100} pageSize={10} currentPage={2}/>
      <div className="mt-2 text-sm text-gray-600">
        {statusFilter
          ? `Filtering by: ${statusFilter} (${issues.length} found)`
          : `Showing all issues (${issues.length} total)`}
      </div>
      <Section>
        <DemoBanner />
      </Section>
    </>
  );
};
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default IssuesPage;
