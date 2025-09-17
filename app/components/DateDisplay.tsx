interface DateDisplayProps {
  date: Date;
  type?: "created" | "updated" | "short" | "full";
  prefix?: string;
  icon?: React.ReactNode;
}

const DateDisplay = ({
  date,
  type = "created",
  prefix,
  icon,
}: DateDisplayProps) => {
  const formatOptions: Record<string, Intl.DateTimeFormatOptions> = {
    created: {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
    updated: {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
    short: {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
    full: {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    },
  };

  const formattedDate = date.toLocaleDateString("en-US", formatOptions[type]);

  return (
    <div className="flex items-center gap-2">
      {icon}
      <span>
        {prefix && `${prefix}: `}
        {formattedDate}
      </span>
    </div>
  );
};

export default DateDisplay;
