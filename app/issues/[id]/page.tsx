import {
  IssuesButton,
  IssueHeroSection,
  IssueDescription,
  IssueActions,
} from "@/app/components/index";
import { validateIssueId, getIssueById } from "@/lib/data/issue";
import { Box, Container } from "@radix-ui/themes";
import delay from "delay";

interface Props {
  params: {
    id: string;
  };
}

const IssueDetailsPage = async ({ params: { id } }: Props) => {
  const issueId = validateIssueId(id);
  const issueDetail = await getIssueById(issueId);
  await delay(500);
  
  return (
    <Box className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-2xl">
      <Container className="max-w-6xl mx-auto px-4 py-4">
        {/* Back Button */}
        <div>
          <IssuesButton />
        </div>

        {/* Hero Section */}
        <IssueHeroSection issue={issueDetail} />

        {/* Description Section */}
        <IssueDescription description={issueDetail.description} />

        {/* Action Buttons */}
        <IssueActions issueId={issueDetail.id} />
      </Container>
    </Box>
  );
};

export default IssueDetailsPage;
