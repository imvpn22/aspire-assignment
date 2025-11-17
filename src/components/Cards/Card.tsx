import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "../Icons";
import Logo from "../../assets/aspire_logo_white.svg";
import VisaLogo from "../../assets/visa_Logo.svg";
import type { TCard } from "../../types";

type TCardProps = {
  cardDetails?: TCard;
};

const Card: React.FC<TCardProps> = ({ cardDetails }) => {
  const { cardNumber, expiryDate, cvv, cardHolderName } = cardDetails ?? {};

  const [showDetails, setShowDetails] = useState(true);

  return (
    <div className="rounded-lg flex flex-col text-white w-full pt-8 relative items-center box-border">
      <button
        onClick={() => setShowDetails((prev) => !prev)}
        className="cursor-pointer bg-white flex items-center gap-2 self-end font-semibold text-[#01D167] text-xs hover:text-[#00b857] transition-colors duration-200 pb-6 rounded-t-md px-2 py-1 absolute top-0 left-[50%] mt-1 z-1 translate-x-[-50%]"
      >
        {showDetails ? (
          <EyeOffIcon className="w-5 h-5" />
        ) : (
          <EyeIcon className="w-5 h-5" />
        )}
        {showDetails ? "Hide card number" : "Show card number"}
      </button>

      <div className="z-2 w-full min-w-[358px] overflow-hidden min-h-[220px] max-w-[414px] max-h-[248px] whitespace-nowrap bg-gradient-to-br from-[#01D167] to-[#00b857] rounded-2xl flex flex-col p-6 gap-4 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 rounded-2xl"></div>

        <div className="self-end z-10">
          <img src={Logo} alt="Logo" className="h-8" />
        </div>

        <div className="text-2xl font-bold tracking-wide z-10">
          {cardHolderName}
        </div>

        <div className="text-xl font-mono font-medium tracking-wider z-10">
          {showDetails
            ? cardNumber?.replaceAll(/(.{4})/g, "$1  ").trim()
            : `●●●●  ●●●●  ●●●● ${cardNumber?.slice(-4) || ""}`}
        </div>

        <div className="flex justify-between items-end text-sm z-10">
          <div className="flex gap-6">
            <div className="flex flex-col">
              <span className="text-white/70 text-xs uppercase tracking-wide">
                Valid Thru
              </span>
              <span className="font-semibold">{expiryDate}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white/70 text-xs uppercase tracking-wide">
                CVV
              </span>
              <span className="font-semibold">{showDetails ? cvv : "***"}</span>
            </div>
          </div>

          <div>
            <img src={VisaLogo} alt="Visa Logo" className="h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
