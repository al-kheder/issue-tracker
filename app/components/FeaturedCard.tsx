import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Blockquote, Section } from "@radix-ui/themes";
import React from "react";

interface FeaturesCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  bgColor?: string;
}

const FeaturedCard = ({
  title,
  icon,
  description,
  bgColor,
}: FeaturesCardProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md hover:bg-amber-50 transition-colors duration-600 ">
      <div
        className={`h-12 w-12 ${bgColor} rounded-lg flex items-center justify-center mb-4`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <Blockquote className="text-gray-600">{description}</Blockquote>
    </div>
  );
};

export default FeaturedCard;
