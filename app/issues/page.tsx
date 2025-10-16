import React from "react";
import { Section, Text } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import { DemoBanner } from "@/app/components/index";
import delay from "delay";
import IssueActions from "./IssueActions";
import { Status } from "@prisma/client";
import Paginations from "../components/Paginations";
import IssueTable from "./list/IssueTable"; // 🔧 Import the new component

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string;
    orderBy?: string;
    page?: string;
  }>;
}) => {
  const resolvedSearchParams = await searchParams;
  console.log("Search params:", resolvedSearchParams);

  const validStatuses: Status[] = ["OPEN", "CLOSED", "IN_PROGRESS"];
  const statusFilter =
    resolvedSearchParams.status &&
    validStatuses.includes(resolvedSearchParams.status as Status)
      ? (resolvedSearchParams.status as Status)
      : undefined;

  const validOrderByColumns = ["title", "status", "createdAt"];
  const orderByColumn =
    resolvedSearchParams.orderBy &&
    validOrderByColumns.includes(resolvedSearchParams.orderBy)
      ? resolvedSearchParams.orderBy
      : "createdAt";

  const whereClause = statusFilter ? { status: statusFilter } : {};
  const orderBy = { [orderByColumn]: "desc" };

  const pageParam = resolvedSearchParams.page;
  const page =
    pageParam && !isNaN(parseInt(pageParam)) ? parseInt(pageParam) : 1;
  const pageSize = 10;

  const skip = Math.max(0, (page - 1) * pageSize);

  console.log("Pagination values:", { page, pageSize, skip });

  const [issues, totalCount] = await Promise.all([
    prisma.issue.findMany({
      where: whereClause,
      orderBy,
      skip: skip,
      take: pageSize,
    }),
    prisma.issue.count({
      where: whereClause,
    }),
  ]);

  await delay(500);

  return (
    <>
      <IssueActions />

      <IssueTable issues={issues} searchParams={resolvedSearchParams} />

      <Paginations
        itemCount={totalCount}
        pageSize={pageSize}
        currentPage={page}
      />

      <Text className="mt-2 text-sm text-gray-600">
        {statusFilter
          ? `Filtering by: ${statusFilter} (${issues.length} of ${totalCount} found)`
          : `Showing all issues (${totalCount} total)`}
        {orderByColumn !== "createdAt" && ` • Sorted by: ${orderByColumn}`}
      </Text>

      <Section>
        <DemoBanner />
      </Section>
    </>
  );
};

export const dynamic = "force-dynamic";
export const revalidate = 0;
export default IssuesPage;
