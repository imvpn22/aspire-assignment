import React from "react";
import { AddCircleIcon } from "../Icons";

type THeaderProps = {
  onAddNewCard: () => void;
  balance?: number;
};

const Header: React.FC<THeaderProps> = ({ onAddNewCard, balance }) => {
  return (
    <header className="flex flex-col gap-3 card-header text-gray-900">
      <div className="text-sm font-semibold">Available Balance</div>
      <div className="flex justify-between items-center ">
        <div className=" flex items-center gap-2">
          <div className="bg-[#01D167] rounded-md py-1 px-3 font-bold text-sm">
            S$
          </div>
          <span className="text-3xl font-bold">
            ${balance?.toLocaleString() || "0.00"}
          </span>
        </div>
        <button
          onClick={onAddNewCard}
          className="text-white bg-[#325BAF] px-3 py-1 rounded-md flex items-center gap-2 new-card-button"
        >
          <AddCircleIcon />
          New Card
        </button>
      </div>
    </header>
  );
};

export default Header;
