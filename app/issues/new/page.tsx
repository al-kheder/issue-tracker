"use client";
import SimpleMDE from "react-simplemde-editor";
import { Button, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl  space-y-4">
      <TextField.Root placeholder="Title"></TextField.Root>
      <SimpleMDE />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuePage;
