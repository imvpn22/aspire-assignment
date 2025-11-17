import React from "react";
import type { TCard } from "../../types";

type TCardDetailsProps = {
  cardDetails: TCard;
};

const CardDetails: React.FC<TCardDetailsProps> = ({ cardDetails }) => {
  const { cardType, cardNumber, cardHolderName, expiryDate, cvv, bankName } =
    cardDetails ?? {};

  const formatCardNumber = (number: string) => {
    return number.replace(/\d{4}(?=.)/g, "$& ");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg whitespace-nowrap">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-gray-600">
          {cardType} Card
        </span>
        {bankName && (
          <span className="text-sm font-medium text-gray-800">{bankName}</span>
        )}
      </div>

      <div className="text-xl font-mono font-semibold text-gray-900 mb-6 tracking-widest">
        {formatCardNumber(cardNumber)}
      </div>

      <div className="flex justify-between items-end">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            Card Holder
          </span>
          <span className="text-sm font-medium text-gray-900">
            {cardHolderName}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            Expires
          </span>
          <span className="text-sm font-medium text-gray-900">
            {expiryDate}
          </span>
        </div>

        {cvv && (
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              CVV
            </span>
            <span className="text-sm font-medium text-gray-900">{cvv}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardDetails;
