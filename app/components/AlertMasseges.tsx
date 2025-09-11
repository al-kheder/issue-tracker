"use client";
import {
  CheckCircledIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";
import { Callout } from "@radix-ui/themes";

export const ErrorAlert = ({ message }: { message: string }) => {
  if (!message) return null;
  return (
    <Callout.Root color="red" role="alert">
      <Callout.Icon>
        <ExclamationTriangleIcon />
      </Callout.Icon>
      <Callout.Text>{message}</Callout.Text>
    </Callout.Root>
  );
};

export const SuccessAlert = ({ message }: { message: string }) => {
  if (!message) return null;
  return (
    <Callout.Root color="green" role="status">
      <Callout.Icon>
        <CheckCircledIcon />
      </Callout.Icon>
      <Callout.Text>{message}</Callout.Text>
    </Callout.Root>
  );
};
