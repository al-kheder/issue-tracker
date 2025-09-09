
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import prisma from '@/prisma/client';

const createIssueSchema = z.object({
    title: z.string().min(1, "Title is required").max(255, "Title too long"),
    description: z.string().min(1, "Description is required")
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validation = createIssueSchema.safeParse(body);
        
        if (!validation.success) {
            return NextResponse.json(
                { error: "Validation failed", details: validation.error.errors},
                { status: 400 }
            );
        }

        const issue = await prisma.issue.create({
            data: {
                title: validation.data.title,       // ✅ Using validated data
                description: validation.data.description, // ✅ Using validated data
            }
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