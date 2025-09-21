import { getIssueById, validateIssueId } from "@/lib/data/issue";
import { IssuesButton } from "@/app/components/index";
import EditIssueForm from "../../_components/IssueForm";
import { Box, Container, Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const EditIssuePage = async ({ params }: Props) => {
  const { id } = await params;
  // ✅ Step 1: Check if the ID is valid
  const issueId = validateIssueId(id);

  // ✅ Step 2: Get the current issue data from database
  const issue = await getIssueById(issueId);


  // ✅ Step 3: If issue doesn't exist, show 404
  if (!issue) {
    notFound();
  }

  // ✅ Step 4: Render the edit page
  return (
    <Box className="min-h-screen bg-gray-50 py-8">
      <Container className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <div className="mb-6">
          <IssuesButton />
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <Heading className="text-3xl font-bold text-gray-900">
            Edit Issue #{issue.id}
          </Heading>
          <p className="text-gray-600 mt-2">
            Make changes to your issue details below
          </p>
        </div>

        {/* Edit Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <EditIssueForm issue={issue} />
        </div>
      </Container>
    </Box>
  );
};

export default EditIssuePage;
