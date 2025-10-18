import { DemoBanner } from "@/app/components/index";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Section, Text } from "@radix-ui/themes";
import delay from "delay";
import Paginations from "../components/Paginations";
import IssueActions from "./IssueActions";
import IssueTable from "./list/IssueTable"; // 🔧 Import the new component
import type { Metadata } from "next";

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


export const metadata: Metadata = {
  title: {
    default: "Issues",
    template: "%s | Issue Tracker",
  },
  description:
    "Browse, filter, and manage issues with sorting and pagination.",
  keywords: [
    "issue tracker",
    "issues",
    "bug tracking",
    "project management",
    "Next.js",
    "Prisma",
  ],
  alternates: {
    canonical: "/issues",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    title: "Issues | Issue Tracker",
    description:
      "Browse, filter, and manage issues with sorting and pagination.",
    siteName: "Issue Tracker",
    url: "/issues",
    images: [
      {
        url: "/og-issues.png",
        width: 1200,
        height: 630,
        alt: "Issue Tracker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Issues | Issue Tracker",
    description:
      "Browse, filter, and manage issues with sorting and pagination.",
    images: ["/og-issues.png"],
  },
};