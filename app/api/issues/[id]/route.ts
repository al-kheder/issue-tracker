// Delete issue 

import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { updateIssueSchema } from "@/lib/validations";

interface DeleteProps {
  params: {
    id: string;
  };
}

interface EditProps {
  params: Promise<{
    id: string;
  }>;
}

export async function DELETE(
    request:NextRequest,{params:{id}}:DeleteProps
){
try {
    const issueId = parseInt(id);
    if(isNaN(issueId) || issueId<=0)
        return NextResponse.json({error:"Invalid issue ID"},{status:400})

    const existingIssue = await prisma.issue.findUnique({
        where:{id:issueId}
    });

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



//Edite Issue



export async function PATCH(
  request: NextRequest,
  { params }: EditProps
) {
  console.log("🔥 PATCH request received"); // ✅ Debug log
  
  try {
    // ✅ Get and validate ID
    const { id } = await params;
    console.log("📋 Issue ID:", id); // ✅ Debug log
    
    const issueId = parseInt(id);
    
    if (isNaN(issueId) || issueId <= 0) {
      console.log("❌ Invalid issue ID:", id); // ✅ Debug log
      return NextResponse.json(
        { error: "Invalid issue ID" },
        { status: 400 }
      );
    }

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
          details: validation.error.errors 
        },
        { status: 400 }
      );
    }

    console.log("✅ Validation passed:", validation.data); // ✅ Debug log

    // ✅ Check if issue exists
    const existingIssue = await prisma.issue.findUnique({
      where: { id: issueId }
    });

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
    return NextResponse.json(
      { error: "Failed to update issue", details: error.message },
      { status: 500 }
    );
  }
}