import { Badge } from "@radix-ui/themes";
import { getStatusConfig } from "@/lib/utils/issueStatus";

interface IssueStatusBadgeProps {
  status: string;
}

export default function IssueStatusBadge({ status }: IssueStatusBadgeProps) {
  const config = getStatusConfig(status);

  return (
    <Badge color={config.color} variant="soft" className="mb-2">
      {config.label}
    </Badge>
  );
}
