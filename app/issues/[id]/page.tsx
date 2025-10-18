import {
  IssuesButton,
  IssueHeroSection,
  IssueDescription,
  IssueActions,
} from "@/app/components/index";
import { validateIssueId, getIssueById } from "@/lib/data/issue";
import prisma from "@/prisma/client";
import { Box, Container } from "@radix-ui/themes";
import { Description } from "@radix-ui/themes/components/alert-dialog";
import delay from "delay";

interface Props {
  params: Promise<{
    // ✅ Changed to Promise
    id: string;
  }>;
}

const IssueDetailsPage = async ({ params }: Props) => {
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
          <IssuesButton url="issues" urlTitle="Issues" />
          <IssuesButton url="dashboard" urlTitle="Dashboard" />
        </div>

        {/* Hero Section */}
        <IssueHeroSection issue={issueDetail} />

        {/* Description Section */}
        <IssueDescription description={issueDetail.description} />

        {/* Action Buttons */}
        <IssueActions issue={issueDetail} />
      </Container>
    </Box>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt((await params).id) },
  });

  return {
    title: issue?.title,
    description: "Details of issue" + issue?.id,
  };
}

export default IssueDetailsPage;
