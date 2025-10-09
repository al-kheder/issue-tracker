
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { updateIssueSchema } from "@/lib/validations";
import { getIssueById, validateIssueId } from "@/lib/data/issue";
import { issue } from "@uiw/react-md-editor";
import { auth } from "@/auth";

interface Props {
  params: Promise<{  // ✅ Add Promise here too
    id: string;
  }>;
}



// DELETE ISSUE
export async function DELETE(
    request:NextRequest,{params}:Props
){
  const session = await auth();
try {
   if(!session) return NextResponse.json({},{status:401})
  const { id } = await params;
    const issueId = validateIssueId(id)
    if(!issueId)
        return NextResponse.json({error:"Invalid issue ID"},{status:400})

    const existingIssue =getIssueById(issueId)

    if(!existingIssue) return NextResponse.json({error:"Issue not found"},{status:404})

    await prisma.issue.delete({
        where:{id:issueId}
    })
    return NextResponse.json({message:"Issue deleted successfully"},{status:200})

} catch (error) {
     console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete issue" },
      { status: 500 }
    );
}

}

//EDIT ISSUE
export async function PATCH(
  request: NextRequest,
  { params }: Props
) {
  console.log("🔥 PATCH request received"); // ✅ Debug log
  const session = await auth();
  
  try {
          if(!session) return NextResponse.json({},{status:401})
    const { id } = await params;
    const issueId = validateIssueId(id)
    if(!issueId)
        return NextResponse.json({error:"Invalid issue ID"},{status:400})

    // ✅ Get request body
    const body = await request.json();
    console.log("📝 Request body:", body); // ✅ Debug log

    // ✅ Validate data
    const validation = updateIssueSchema.safeParse(body);
    if (!validation.success) {
      console.log("❌ Validation failed:", validation.error); // ✅ Debug log
      return NextResponse.json(
        { 
          error: "Validation failed", 
          details: validation.error.issues
        },
        { status: 400 }
      );
    }

    console.log("✅ Validation passed:", validation.data); // ✅ Debug log

    // ✅ Check if issue exists
    const existingIssue =getIssueById(issueId)

    if (!existingIssue) {
      console.log("❌ Issue not found:", issueId); // ✅ Debug log
      return NextResponse.json(
        { error: "Issue not found" },
        { status: 404 }
      );
    }

    console.log("📄 Existing issue:", existingIssue); // ✅ Debug log

    // ✅ Update the issue
    const updatedIssue = await prisma.issue.update({
      where: { id: issueId },
      data: {
        ...validation.data,
        updatedAt: new Date()
      }
    });

    console.log("✅ Issue updated successfully:", updatedIssue); // ✅ Debug log

    return NextResponse.json(updatedIssue, { status: 200 });

  } catch (error) {

    console.error("💥 Update error:", error); // ✅ Debug log
    // ✅ Fix: Properly handle the unknown error type
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: "Failed to update issue", details:errorMessage },
      { status: 500 }
    );
  }
}