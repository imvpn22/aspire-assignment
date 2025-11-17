import React from "react";
import { AddCircleIcon } from "../Icons";

type THeaderProps = {
  onAddNewCard: () => void;
};

const Header: React.FC<THeaderProps> = ({ onAddNewCard }) => {
  return (
    <header className="flex flex-col gap-3">
      <div className="text-gray-900 text-sm">Available Balance</div>
      <div className="flex justify-between items-center ">
        <div className=" hover:text-gray-900 flex items-center gap-2">
          <div className="bg-[#01D167] rounded-md py-1 px-3 font-bold text-sm">
            S$
          </div>
          <span className="text-3xl text-gray-600 font-bold">$50,000.00</span>
        </div>
        <button
          onClick={onAddNewCard}
          className="text-white hover:text-gray-900 bg-[#325BAF] px-3 py-1 rounded-md flex items-center gap-2"
        >
          <AddCircleIcon />
          New Card
        </button>
      </div>
    </header>
  );
};

export default Header;
