import { z } from "zod";

// ✅ Shared validation schema for issues
export const createIssueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be less than 255 characters")
    .trim(), // Remove extra whitespace
  
  description: z
    .string()
    .min(1, "Description is required")
    .max(65535, "Description is too long")
    .trim(),
});

// ✅ TypeScript type inference
export type CreateIssueData = z.infer<typeof createIssueSchema>;

// ✅ Update issue schema (for future use)
export const updateIssueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be less than 255 characters")
    .trim()
    .optional(),
  
  description: z
    .string()
    .min(1, "Description is required")
    .max(65535, "Description is too long")
    .trim()
    .optional(),
    
  status: z
    .enum(["OPEN", "IN_PROGRESS", "CLOSED"])
    .optional(),
});

export type UpdateIssueData = z.infer<typeof updateIssueSchema>;

// ✅ Issue status enum for consistency
export const IssueStatus = {
  OPEN: "OPEN",
  IN_PROGRESS: "IN_PROGRESS", 
  CLOSED: "CLOSED",
} as const;

export type IssueStatusType = keyof typeof IssueStatus;