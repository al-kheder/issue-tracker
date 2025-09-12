import { Status } from "@prisma/client";
import { Badge, Flex } from "@radix-ui/themes";
import React from "react";
import {
  CrossCircledIcon,
  ClockIcon,
  CheckCircledIcon,
} from "@radix-ui/react-icons";

const statusMap: Record<
  Status,
  { label: string; color: string; icon: React.ReactNode }
> = {
  OPEN: { label: "Open", color: "red", icon: <CrossCircledIcon /> },
  IN_PROGRESS: { label: "In Progress", color: "violet", icon: <ClockIcon /> },
  CLOSED: { label: "Closed", color: "green", icon: <CheckCircledIcon /> },
};

const IssueStatusBage = ({ status }: { status: Status }) => {
  const { label, color, icon } = statusMap[status];
  return (
    <Badge color={color as any}>
      {icon}
      {label}
    </Badge>
  );
};

export default IssueStatusBage;
