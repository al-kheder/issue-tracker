import { Section, Button } from "@radix-ui/themes";
import Link from "next/link";
import DeleteButton from "./DeletButton";

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

      {/* Comment Button */}
      <Button variant="outline" size="3" className="flex items-center gap-2">
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
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        Add Comment 
      </Button>

      {/* Delete Button */}
      <DeleteButton issueId={issueId} />
    </Section>
  );
}
