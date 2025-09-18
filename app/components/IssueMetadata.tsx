import { ClockIcon } from "@radix-ui/react-icons";
import { DateDisplay } from "./index";

interface IssueMetadataProps {
  issueId: number;
  createdAt: Date;
  updatedAt: Date;
}

export function IssueMetadata({
  issueId,
  createdAt,
  updatedAt,
}: IssueMetadataProps) {
  return (
    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
      {/* Issue ID */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        <span className="font-medium">Issue #{issueId}</span>
      </div>

      {/* Created Date */}
      <div className="flex items-center gap-2">
        <DateDisplay
          date={createdAt}
          type="created"
          prefix="Created"
          icon={<ClockIcon className="h-4 w-4" />}
        />
      </div>

      {/* Updated Date (if different from created) */}
      {updatedAt && updatedAt !== createdAt && (
        <div className="flex items-center gap-2">
          <DateDisplay
            date={updatedAt}
            type="updated"
            prefix="Updated"
            icon={
              <svg
                className="h-4 w-4"
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
            }
          />
        </div>
      )}
    </div>
  );
}
