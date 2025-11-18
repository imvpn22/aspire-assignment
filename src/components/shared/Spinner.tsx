import React from "react";

type TSpinnerProps = {
  size?: "small" | "medium" | "large";
  color?: string;
  className?: string;
};

const Spinner: React.FC<TSpinnerProps> = ({
  size = "medium",
  color = "#3b82f6",
  className,
}) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center gap-2 ${className}`}
    >
      <div
        className={`${sizeClasses[size]} border-2 border-gray-300 border-t-current rounded-full animate-spin`}
        style={{ borderTopColor: color }}
      />
      <span className="text-sm text-gray-600">Loading...</span>
    </div>
  );
};

export default Spinner;
