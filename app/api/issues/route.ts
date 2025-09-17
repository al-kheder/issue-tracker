import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client';
import { createIssueSchema } from '@/lib/validations';

interface DeleteProps{
    params:{
        id:string
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        
        const validation = createIssueSchema.safeParse(body);
        
        if (!validation.success) {
            return NextResponse.json(
                { 
                    error: "Validation failed", 
                    details: validation.error.format() // Better error format
                },
                { status: 400 }
            );
        }

        const issue = await prisma.issue.create({
            data: validation.data, // ✅ Use validated data directly
        });

        return NextResponse.json(issue, { status: 201 });
        
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
            { error: 'Failed to create issue' },
            { status: 500 }
        );
    }
}

// ✅ Add GET method to fetch all issues
export async function GET() {
    try {
        const issues = await prisma.issue.findMany({
            orderBy: { createdAt: 'desc' }
        });
        
        return NextResponse.json(issues);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch issues' },
            { status: 500 }
        );
    }
}

