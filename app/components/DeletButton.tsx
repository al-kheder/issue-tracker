"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";

interface DeleteButtonProps {
  issueId: number;
}

const DeleteButton = ({ issueId }: DeleteButtonProps) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true); // Show loading state

      // Step 1: Make DELETE API call
      const response = await fetch(`/api/issues/${issueId}`, {
        method: "DELETE",
      });

      // Step 2: Check if deletion was successful
      if (response.ok) {
        // Step 3: Redirect to issues list
        router.push("/issues");
        router.refresh(); // Refresh the page data
      } else {
        // Step 4: Handle error
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete issue. Please try again.");
    } finally {
      setIsDeleting(false); // Hide loading state
    }
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button
          variant="soft"
          color="red"
          size="3"
          className="flex items-center gap-2"
          disabled={isDeleting}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          {isDeleting ? "Deleting..." : "Delete Issue"}
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Content>
        <AlertDialog.Title>Delete Issue</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure you want to delete this issue? This action cannot be
          undone.
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>

          <AlertDialog.Action>
            <Button
              variant="solid"
              color="red"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Issue"}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteButton;
