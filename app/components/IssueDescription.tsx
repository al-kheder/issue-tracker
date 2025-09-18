import { Section, Heading, Text } from "@radix-ui/themes";

interface IssueDescriptionProps {
  description: string | null;
}

export function IssueDescription({ description }: IssueDescriptionProps) {
  return (
    <Section>
      <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <svg
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <Heading className="text-2xl font-semibold text-gray-900">
            Description
          </Heading>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-blue-500">
            <Text className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {description || "No description provided."}
            </Text>
          </div>
        </div>
      </div>
    </Section>
  );
}
