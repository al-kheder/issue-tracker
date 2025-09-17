import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssuesButton = () => {
  return (
    <Link href="/issues">
      <Button
        variant="ghost"
        className="flex items-center gap-2 hover:bg-gray-100 transition-colors"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back to Issues
      </Button>
    </Link>
  );
};

export default IssuesButton;
