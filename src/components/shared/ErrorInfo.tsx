import React from "react";
import { ErrorOutlineIcon } from "../Icons";

type TErrorProps = {
  onRetry?: () => void;
  message?: string;
};

const ErrorInfo: React.FC<TErrorProps> = ({
  onRetry = () => window.location.reload(),
  message = "Something went wrong. Please try again.",
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-64 p-8 h-full w-full">
      <div className="text-center">
        <div className="mb-4">
          <ErrorOutlineIcon className="mx-auto h-12 w-12 text-red-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Error</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors cursor-pointer"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorInfo;
