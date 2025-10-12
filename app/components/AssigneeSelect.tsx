"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

interface IssueActionsProps {
  issue:any;
  issueId: number;
  currentAssigneeId?: string | null
}

const AssigneeSelect = ({ issue,issueId ,currentAssigneeId}: IssueActionsProps) => {
 
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, //60s
    retry: 3,
  });
  if (error) return null;

  if (isLoading) return <Skeleton />;


  const currentValue = issue.assignedToUserId || "none";
  return (
    <Select.Root
      onValueChange={(userId) => {
        const assignedUserId = userId === "none" ? null : userId;
        axios.patch("/api/issues/" + issue.id, {
          assignedToUserId: assignedUserId,
        });
      }}
      defaultValue={currentValue}
    >
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {}
          <Select.Item value="none">Unassigned</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
