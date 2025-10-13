"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const statuses: { label: string; value?: Status | "ALL" }[] = [
  { label: "All", value: "ALL" }, // 🔧 Give "All" a value
  { label: "Open", value: "OPEN" },
  { label: "Closed", value: "CLOSED" },
  { label: "In Progress", value: "IN_PROGRESS" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 🔧 Get current filter from URL
  const currentStatus = searchParams.get("status") || "ALL";

  const handleValueChange = (value: string) => {
    // 🔧 Update URL with new filter
    const params = new URLSearchParams(searchParams);

    if (value === "ALL") {
      params.delete("status"); 
    } else {
      params.set("status", value);
    }

    router.push(`/issues?${params.toString()}`);
  };

  return (
    <Select.Root value={currentStatus} onValueChange={handleValueChange}>
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.value!}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
