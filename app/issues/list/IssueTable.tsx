import React from "react";
import { Table } from "@radix-ui/themes";
import { Issue } from "@prisma/client";
import Link from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { IssueStatusBage, Link as NextLink } from "@/app/components/index";

interface IssueTableProps {
  issues: Issue[];
  searchParams: {
    status?: string;
    orderBy?: string;
    page?: string;
  };
}

const IssueTable = ({ issues, searchParams }: IssueTableProps) => {
  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const validOrderByColumns = ["title", "status", "createdAt"];
  const orderByColumn =
    searchParams.orderBy &&
    validOrderByColumns.includes(searchParams.orderBy)
      ? (searchParams.orderBy as keyof Issue)
      : "createdAt";

  const buildSortUrl = (columnValue: keyof Issue) => {
    const params = new URLSearchParams();

    if (searchParams.status) {
      params.set("status", searchParams.status);
    }
    if (searchParams.page && searchParams.page !== "1") {
      params.set("page", searchParams.page);
    }

    params.set("orderBy", columnValue);

    return `/issues?${params.toString()}`;
  };

  return (
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
  );
};

export default IssueTable;