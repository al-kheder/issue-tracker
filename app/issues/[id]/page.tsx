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
  params: Promise<{
    // ✅ Changed to Promise
    id: string;
  }>;
}

const IssueDetailsPage = async ({ params }: Props) => {
  // ✅ Don't destructure here
  // ✅ AWAIT params first, then destructure
  const { id } = await params;

  // ✅ Rest of your code stays the same
  const issueId = validateIssueId(id);
  const issueDetail = await getIssueById(issueId);
  await delay(500);

  return (
    <Box className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-2xl">
      <Container className="max-w-6xl mx-auto px-4 py-4">
        {/* Back Button */}
        <div className="flex align-center justify-items-start gap-4">
          <IssuesButton url="issues" urlTitle="Issues"/>
          <IssuesButton url="dashboard" urlTitle="Dashboard"/>
        </div>

        {/* Hero Section */}
        <IssueHeroSection issue={issueDetail} />

        {/* Description Section */}
        <IssueDescription description={issueDetail.description} />

        {/* Action Buttons */}
        <IssueActions issue = {issueDetail}/>
      </Container>
    </Box>
  );
};

export default IssueDetailsPage;
