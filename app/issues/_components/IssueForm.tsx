"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm, FieldErrors } from "react-hook-form";

import {
  CreateIssueData,
  createIssueSchema,
  updateIssueSchema,
  UpdateIssueData,
} from "@/lib/validations";
import {
  ErrorAlert,
  SuccessAlert,
  SimpleMDE,
  IssuesButton,
} from "@/app/components/index";
import { Issue } from "@prisma/client";

interface Props {
  issue?: Issue;
}

const IssueForm = ({ issue }: Props) => {
  console.log("Issue data:", issue);
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Determine if we're editing or creating
  const isEditing = !!issue;

  // ✅ Use conditional schema and types
  const schema = isEditing ? updateIssueSchema : createIssueSchema;
  type FormData = typeof isEditing extends true
    ? UpdateIssueData
    : CreateIssueData;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Issue extends undefined ? CreateIssueData : UpdateIssueData>({
    resolver: zodResolver(schema),
    defaultValues: isEditing
      ? ({
          title: issue.title,
          description: issue.description || "",
          status: issue.status,
        } as UpdateIssueData)
      : ({
          title: "",
          description: "",
        } as CreateIssueData),
  });

  // ✅ Handle both create and update
  const onSubmit = async (data: CreateIssueData | UpdateIssueData) => {
    try {
      setError(""); // Clear previous errors
      setSuccess(""); // Clear previous success messages

      let response;

      if (isEditing) {
        // ✅ UPDATE existing issue with PATCH
        response = await axios.patch(`/api/issues/${issue.id}`, data);
        setSuccess("Issue updated successfully!");
      } else {
        // ✅ CREATE new issue with POST
        response = await axios.post("/api/issues", data);
        setSuccess("Issue created successfully!");
      }

      console.log("Response:", response.data);

      // ✅ Redirect after success
      setTimeout(() => {
        if (isEditing) {
          router.push(`/issues/${issue.id}`); // Go back to issue details
        } else {
          router.push("/issues"); // Go to issues list
        }
        router.refresh(); // Refresh to show updated data
      }, 500);
    } catch (error) {
      console.error("Submission error:", error);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          // ✅ Server responded with error
          const errorMessage =
            error.response.data?.error ||
            `Failed to ${isEditing ? "update" : "create"} issue`;
          setError(errorMessage); // ✅ Fixed variable name
        } else if (error.request) {
          // ✅ Network error
          setError("No response from server. Please check your connection.");
        } else {
          // ✅ Other error
          setError("An unexpected error occurred.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 space-y-4">
      {/* ✅ Dynamic title based on mode */}
      <h1 className="text-2xl font-bold">
        {isEditing ? `Edit Issue #${issue.id}` : "Create New Issue"}
      </h1>

      {/* ✅ Dynamic Error & Success Alerts */}
      <ErrorAlert message={error} />
      <SuccessAlert message={success} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title Field */}
        <div>
          <TextField.Root
            placeholder="Enter issue title..."
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <SimpleMDE
                placeholder="Describe the issue in detail..."
                {...field}
              />
            )}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Status Field (only show when editing) */}
        {isEditing && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              {...register("status" as keyof FormData)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="CLOSED">Closed</option>
            </select>
            {/* ✅ Type assertion for errors in edit mode */}
            {(errors as FieldErrors<UpdateIssueData>).status && (
              <p className="text-red-500 text-sm mt-1">
                {(errors as FieldErrors<UpdateIssueData>).status?.message}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button type="submit" disabled={isSubmitting} className="flex-1">
            {isSubmitting
              ? isEditing
                ? "Updating Issue..."
                : "Creating Issue..."
              : isEditing
              ? "Update Issue"
              : "Create Issue"}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => {
              if (isEditing) {
                router.push(`/issues/${issue.id}`); // Go back to issue details
              } else {
                router.push("/issues"); // Go to issues list
              }
            }}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default IssueForm;
