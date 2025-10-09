import { Section, Button } from "@radix-ui/themes";
import Link from "next/link";
import DeleteButton from "./DeletButton";
import IssuesButton from "./IssuesButton";
import AssigneeSelect from "./AssigneeSelect";

interface IssueActionsProps {
  issueId: number;
}

export function IssueActions({ issueId }: IssueActionsProps) {
  return (
    <Section className="flex flex-wrap gap-4">
      {/* Edit Button */}
      <Button size="3" className="flex items-center gap-2">
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
        <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
      </Button>
      {/* Delete Button */}

      <DeleteButton issueId={issueId} />

      {/* Assign Button */}
      <AssigneeSelect />
    </Section>
  );
}
