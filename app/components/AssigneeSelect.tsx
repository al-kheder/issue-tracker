"use client";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface IssueActionsProps {
  issue: any;
  currentAssigneeId?: string | null;
}

const AssigneeSelect = ({ issue, currentAssigneeId }: IssueActionsProps) => {
  const { data: users, error, isLoading } = useUsers();
  if (isLoading) return <div>Loading...</div>;
  if (error) return null;

  const assignIssue = (userId: string) => {
    const assignedUserId = userId === "none" ? null : userId;
    axios
      .patch("/api/issues/" + issue.id, {
        assignedToUserId: assignedUserId,
      })
      .catch(() => {
        toast.error("Changes could not be saved");
      });
  };

  const currentValue = issue.assignedToUserId || "none";
  return (
    <>
      <Select.Root onValueChange={assignIssue} defaultValue={currentValue}>
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="none">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 300 * 1000, //60s
    retry: 3,
  });
export default AssigneeSelect;
