import React from "react";

const CardTab: React.FC = () => {
  return (
    <div className="flex gap-4 items-center card-tab text-[#222222]">
      <div className="font-semibold  text-sm border-b-2 border-sky-400 py-1">
        My debit cards
      </div>
      <div className="font-semibold opacity-30 text-sm py-1 cursor-not-allowed">
        All company cards
      </div>
    </div>
  );
};

export default CardTab;
