import React from "react";
import type { Transaction, TTransactionCategory } from "../../types";
import {
  AttachMoneyIcon,
  ChevronRightIcon,
  CreditCardIcon,
  ElectricBoltIcon,
  FastfoodIcon,
  HospitalIcon,
  MovieIcon,
  PlaneIcon,
  ShoppingCartIcon,
} from "../Icons";
import Spinner from "../shared/Spinner";
import ErrorInfo from "../shared/ErrorInfo";

type TTransactionListProps = {
  transactions: Transaction[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
};

const TransactionCategory: Record<string, TTransactionCategory> = {
  FOOD: "Food & Drink",
  TRANSPORT: "Transportation",
  SHOPPING: "Shopping",
  ENTERTAINMENT: "Entertainment",
  BILLS: "Utilities",
  HEALTH: "Healthcare",
  INCOME: "Income",
};

const TransactionList: React.FC<TTransactionListProps> = ({
  transactions,
  isLoading,
  isError,
  refetch,
}) => {
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorInfo onRetry={refetch} />;
  }

  return (
    <div className="">
      {transactions.map((transaction) => (
        <Item key={transaction.id} transaction={transaction} />
      ))}
      <div className="text-center text-[#01D167] bg-[#EDFFF5] py-3 font-semibold text-sm">
        View all card transactions
      </div>
    </div>
  );
};

export default TransactionList;

const getRandomBgColor = () => {
  const colors = [
    "bg-blue-100 text-blue-600",
    "bg-green-100 text-green-600",
    "bg-yellow-100 text-yellow-600",
    "bg-red-100 text-red-600",
    "bg-purple-100 text-purple-600",
    "bg-pink-100 text-pink-600",
    "bg-indigo-100 text-indigo-600",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Item: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  const { description, date, amount, type } = transaction;
  return (
    <div className="flex justify-between items-center py-3 px-4 border-b border-gray-100 gap-4">
      <div className={`p-3 rounded-full ${getRandomBgColor()}`}>
        <TransactionCategoryIcon category={transaction.category} />
      </div>
      <div className="flex justify-between items-center flex-1">
        <div className="flex flex-col gap-1 flex-1">
          <div className="font-medium flex justify-between items-center w-full">
            {description}{" "}
            <div
              className={`font-semibold flex items-center gap-1 ${
                type === "credit" ? "text-green-600" : "text-red-600"
              }`}
            >
              {type === "credit" ? "+" : "-"}${amount.toFixed(2)}
              <ChevronRightIcon className="size-3 text-gray-300" />
            </div>
          </div>
          <div className="text-sm text-gray-400">{date}</div>
          <div className="text-xs flex items-center font-medium gap-1">
            <CreditCardIcon className="size-4 mr-1 p-1 bg-[#325BAF] text-white rounded-md" />
            <span className="text-[#325BAF]">
              {type === "credit"
                ? `Refund on debit card`
                : `Charged to debit card`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const TransactionCategoryIcon: React.FC<{
  category?: TTransactionCategory;
}> = ({ category }) => {
  const getIcon = () => {
    switch (category) {
      case TransactionCategory.FOOD:
        return <FastfoodIcon className="size-5" />;
      case TransactionCategory.TRANSPORT:
        return <PlaneIcon className="size-5" />;
      case TransactionCategory.SHOPPING:
        return <ShoppingCartIcon className="size-5" />;
      case TransactionCategory.ENTERTAINMENT:
        return <MovieIcon className="size-5" />;
      case TransactionCategory.BILLS:
        return <ElectricBoltIcon className="size-5" />;
      case TransactionCategory.HEALTH:
        return <HospitalIcon className="size-5" />;
      case TransactionCategory.INCOME:
        return <AttachMoneyIcon className="size-5" />;
      default:
        return <CreditCardIcon className="size-5" />;
    }
  };

  return <span className="text-2xl">{getIcon()}</span>;
};
