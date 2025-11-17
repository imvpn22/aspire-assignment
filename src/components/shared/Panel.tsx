import React, { useState, type ReactNode } from "react";
import { ChevronCircleUpIcon } from "../Icons";

interface PanelProps {
  header: ReactNode;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

const Panel: React.FC<PanelProps> = ({
  header,
  children,
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="border border-gray-100 rounded-md shadow-sm w-full">
      <div
        className="cursor-pointer p-3 bg-gray-100 border-b border-gray-100 flex justify-between items-center hover:bg-gray-200 transition-colors duration-200"
        onClick={toggleExpanded}
      >
        {header}
        <span
          className={`transform transition-transform duration-300 font-bold text-gray-400 text-lg ${
            isExpanded ? "rotate-180" : ""
          }`}
        >
          <ChevronCircleUpIcon />
        </span>
      </div>
      <div
        className={`overflow-auto transition-all duration-300 ease-in-out p-4 ${
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Panel;
