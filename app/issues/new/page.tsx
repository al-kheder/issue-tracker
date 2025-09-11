"use client";
import { Button, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { createIssueSchema, CreateIssueData } from "@/lib/validations";
import { ErrorAlert, SuccessAlert } from "../../components/AlertMasseges";
import { SimpleMDE } from "../../components/SimpleMDE";
import Spiner from "@/app/components/Spiner";

const NewIssuePage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateIssueData>({
    resolver: zodResolver(createIssueSchema),
  });

  const onSubmit = async (data: CreateIssueData) => {
    try {
      setError(""); // Clear previous errors
      setSuccess(""); // Clear previous success messages

      const response = await axios.post("/api/issues", data);

      // ✅ Show success message
      setSuccess("Issue created successfully!");

      // Redirect after showing success
      setTimeout(() => {
        router.push("/issues");
      }, 1500);
    } catch (error) {
      console.error("Submission error:", error);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          const errorMessage =
            error.response.data?.error || "Failed to create issue";
          setError(errorMessage);
        } else if (error.request) {
          setError("No response from server. Please check your connection.");
        } else {
          setError("An unexpected error occurred.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 space-y-4">
      <h1 className="text-2xl font-bold">Create New Issue</h1>

      {/* ✅ Dynamic Error Callout */}
      <ErrorAlert message={error} />
      <SuccessAlert message={success} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <TextField.Root
            placeholder="Enter issue title..."
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Describe the issue..." {...field} />
            )}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Creating Issue..." : "Submit New Issue"}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
