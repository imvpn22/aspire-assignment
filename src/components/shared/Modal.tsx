import React, { type ReactNode } from "react";
import { CloseIcon } from "../Icons";

type TModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
};

const Modal: React.FC<TModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center text-black">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-6">
        {/* Header */}
        {title && (
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-red-600 cursor-pointer rounded-full p-1 focus:outline-none hover:bg-red-200"
            >
              <CloseIcon className="size-5" />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
