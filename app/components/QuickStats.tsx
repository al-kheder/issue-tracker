import React from "react";

interface quickStatProps {
  title: string;
  issueCout: number;
  color?: string;
}
const QuickStats = ({ title, issueCout, color }: quickStatProps) => {
  return (
      <>
        <div className={`text-3xl font-bold ${color} mb-2`}>{issueCout}</div>
        <div className="text-gray-600">{title}</div>
      </>
    
  );
};

export default QuickStats;
