import { ClockIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";

export interface StatusConfig {
  color: "red" | "yellow" | "green" | "gray";
  bgColor: string;
  borderColor: string;
  icon: React.ReactNode;
  label: string;
}

export function getStatusConfig(status: string): StatusConfig {
  switch (status) {
    case "OPEN":
      return {
        color: "red",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        icon: <ExclamationTriangleIcon className="h-5 w-5" />,
        label: "Open",
      };
    case "IN_PROGRESS":
      return {
        color: "yellow",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        icon: <ClockIcon className="h-5 w-5" />,
        label: "In Progress",
      };
    case "CLOSED":
      return {
        color: "green",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
        label: "Resolved",
      };
    default:
      return {
        color: "gray",
        bgColor: "bg-gray-50",
        borderColor: "border-gray-200",
        icon: <ExclamationTriangleIcon className="h-5 w-5" />,
        label: status,
      };
  }
}