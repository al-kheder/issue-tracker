import { Section, Heading } from "@radix-ui/themes";
import { getStatusConfig } from "@/lib/utils/issueStatus";
import IssueStatusBadge from "./IssueStatusBage";
import { IssueMetadata } from "./IssueMetadata";

interface IssueHeroSectionProps {
  issue: {
    id: number;
    title: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export function IssueHeroSection({ issue }: IssueHeroSectionProps) {
  const statusConfig = getStatusConfig(issue.status);

  return (
    <Section>
      <div
        className={`rounded-2xl ${statusConfig.bgColor} ${statusConfig.borderColor} border-2 p-8 shadow-lg transition-all duration-300 hover:shadow-xl`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* Status Icon */}
            <div className="p-3 rounded-xl bg-white shadow-md">
              {statusConfig.icon}
            </div>

            <div>
              {/* Status Badge */}
              <IssueStatusBadge status={issue.status} />

              {/* Issue Title */}
              <Heading className="text-3xl font-bold text-gray-900">
                {issue.title}
              </Heading>
            </div>
          </div>
        </div>

        {/* Metadata */}
        <IssueMetadata
          issueId={issue.id}
          createdAt={issue.createdAt}
          updatedAt={issue.updatedAt}
        />
      </div>
    </Section>
  );
}
