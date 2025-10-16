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
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Paginations from "../components/Paginations";

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string;
    orderBy?: string;
    page?: string;
  }>;
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
  console.log("Search params:", resolvedSearchParams);

 
  const validStatuses: Status[] = ["OPEN", "CLOSED", "IN_PROGRESS"];
  const statusFilter = resolvedSearchParams.status && 
    validStatuses.includes(resolvedSearchParams.status as Status)
    ? (resolvedSearchParams.status as Status)
    : undefined;

  const validOrderByColumns = ["title", "status", "createdAt"];
  const orderByColumn = resolvedSearchParams.orderBy && 
    validOrderByColumns.includes(resolvedSearchParams.orderBy)
    ? resolvedSearchParams.orderBy as keyof Issue
    : "createdAt";

  const whereClause = statusFilter ? { status: statusFilter } : {};
  const orderBy = { [orderByColumn]: "desc" };

  const pageParam = resolvedSearchParams.page;
  const page = pageParam && !isNaN(parseInt(pageParam)) ? parseInt(pageParam) : 1;
  const pageSize = 10;


  const skip = Math.max(0, (page - 1) * pageSize); // Ensure non-negative

  console.log("Pagination values:", { page, pageSize, skip }); // Debug log

  // 🔧 Get both issues and total count with explicit skip value
  const [issues, totalCount] = await Promise.all([
    prisma.issue.findMany({
      where: whereClause,
      orderBy,
      skip: skip,           // 🔧 Explicit skip value
      take: pageSize,
    }),
    prisma.issue.count({
      where: whereClause,
    })
  ]);
  
  await delay(500);

  const buildSortUrl = (columnValue: keyof Issue) => {
    const params = new URLSearchParams();
    
    if (resolvedSearchParams.status) {
      params.set('status', resolvedSearchParams.status);
    }
    if (page > 1) {
      params.set('page', page.toString());
    }

    params.set('orderBy', columnValue);
    
    return `/issues?${params.toString()}`;
  };

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
                  href={buildSortUrl(column.value)}
                  className="hover:text-blue-600 transition-colors"
                >
                  {column.label}
                  {orderByColumn === column.value && (
                    <ArrowUpIcon className="inline ml-1" />
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
      
      <Paginations
        itemCount={totalCount}
        pageSize={pageSize}
        currentPage={page}
      />
      
      <div className="mt-2 text-sm text-gray-600">
        {statusFilter
          ? `Filtering by: ${statusFilter} (${issues.length} of ${totalCount} found)`
          : `Showing all issues (${totalCount} total)`}
        {orderByColumn !== "createdAt" && ` • Sorted by: ${orderByColumn}`}
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