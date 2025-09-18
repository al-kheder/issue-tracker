// components/ActionButton.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";

type ActionType = "new" | "edit" | "delete";

interface ActionButtonProps {
  action: ActionType;
  issueId?: number;
  href?: string;
  size?: "1" | "2" | "3" | "4";
  variant?: "classic" | "solid" | "soft" | "surface" | "outline" | "ghost";
  className?: string;
  children?: React.ReactNode;
  onSuccess?: () => void;
}

const ActionButton = ({
  action,
  issueId,
  href,
  size = "3",
  variant = "solid",
  className = "",
  children,
  onSuccess,
}: ActionButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Configuration for each action type
  const actionConfig = {
    new: {
      label: "Create New Issue",
      icon: <PlusIcon className="h-5 w-5" />,
      color: "blue" as const,
      variant: variant,
      confirmDialog: false,
      href: href || "/issues/new",
    },
    edit: {
      label: "Edit Issue",
      icon: (
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
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
      color: "blue" as const,
      variant: variant,
      confirmDialog: false,
      href: href || (issueId ? `/issues/${issueId}/edit` : "/issues"),
    },
    delete: {
      label: "Delete Issue",
      icon: (
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
      ),
      color: "red" as const,
      variant: "soft" as const,
      confirmDialog: true,
      href: null,
    },
  };

  const config = actionConfig[action];

  const handleDelete = async () => {
    if (!issueId) return;

    try {
      setIsLoading(true);

      const response = await fetch(`/api/issues/${issueId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/issues");
        router.refresh();
        onSuccess?.();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete issue. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    if (action === "delete") {
      // Delete is handled by dialog
      return;
    }

    if (config.href) {
      router.push(config.href);
    }
  };

  // ✅ Render delete button with confirmation dialog
  if (action === "delete") {
    return (
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button
            variant={config.variant}
            color={config.color}
            size={size}
            className={`flex items-center gap-2 ${className}`}
            disabled={isLoading}
          >
            {config.icon}
            {children || (isLoading ? "Deleting..." : config.label)}
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
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete Issue"}
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    );
  }

  // ✅ Render regular button (new/edit)
  return (
    <Button
      variant={config.variant}
      color={config.color}
      size={size}
      className={`flex items-center gap-2 ${className}`}
      onClick={handleClick}
      disabled={isLoading}
    >
      {config.icon}
      {children || config.label}
    </Button>
  );
};

export default ActionButton;
