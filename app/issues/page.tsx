import React from "react";
import { Section, Table } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import { DemoBanner, IssueStatusBage, Link } from "@/app/components/index";
import delay from "delay";
import IssueActions from "./IssueActions";
import { Status } from "@prisma/client";

/* interface Props {
  searchParams: { status: Status };
} */

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ status?: Status }>;
}) => {
 
  const resolvedSearchParams = await searchParams;
  console.log(' search params', resolvedSearchParams.status)

   const validStatuses: Status[] = ["OPEN", "CLOSED", "IN_PROGRESS"];
  const statusFilter = resolvedSearchParams.status && validStatuses.includes(resolvedSearchParams.status as Status)
    ? (resolvedSearchParams.status as Status)
    : undefined;

  const whereClause = statusFilter ? { status: statusFilter } : {};
  console.log("Where clause:", whereClause);

  const issues = await prisma.issue.findMany(
    {
      where:whereClause,
      orderBy:{createdAt:"desc"}
    }
  );



  await delay(500);

  return (
    <>
        <IssueActions />
  

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
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
                  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
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
      <div className="mt-2 text-sm text-gray-600">
        {statusFilter 
          ? `Filtering by: ${statusFilter} (${issues.length} found)`
          : `Showing all issues (${issues.length} total)`
        }
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
