import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  url: string;
  urlTitle: string;
}
const IssuesButton = ({ url, urlTitle }: Props) => {
  return (
    <Button
      variant="ghost"
      className="flex items-center gap-2 hover:bg-gray-100 transition-colors hover:cursor-pointer"
    >
      <ArrowLeftIcon className="h-4 w-4" />
      <Link href={"/" + url}>Back to {urlTitle}</Link>
    </Button>
  );
};

export default IssuesButton;
