// Delete issue 

import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface DeleteProps {
  params: {
    id: string;
  };
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