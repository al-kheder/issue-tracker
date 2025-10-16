import { DemoBanner } from "@/app/components/index";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Section, Text } from "@radix-ui/themes";
import delay from "delay";
import Paginations from "../components/Paginations";
import IssueActions from "./IssueActions";
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

  await delay(200);

  return (
    <>
      <IssueActions />
      <IssueTable issues={issues} searchParams={resolvedSearchParams} />
      <Paginations
        itemCount={totalCount}
        pageSize={pageSize}
        currentPage={page}
      />
      <Section>
        <DemoBanner />
      </Section>
    </>
  );
};

export const dynamic = "force-dynamic";
export const revalidate = 0;
export default IssuesPage;
