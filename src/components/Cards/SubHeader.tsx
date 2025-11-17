import React from "react";

const SubHeader: React.FC = () => {
  return (
    <div className="flex gap-4 items-center">
      <div className="font-semibold text-[#222222] text-sm border-b-2 border-sky-400 py-1">
        My debit cards
      </div>
      <div className="font-semibold text-[#222222] opacity-30 text-sm py-1">
        All company cards
      </div>
    </div>
  );
};

export default SubHeader;
