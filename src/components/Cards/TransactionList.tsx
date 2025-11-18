import React from "react";
import Spinner from "../shared/Spinner";
import ErrorInfo from "../shared/ErrorInfo";
import { useGetCardTransactions } from "../../query/cards.query";
import TransactionItem from "./TransactionItem";

type TTransactionListProps = {
  cardNumber: string;
};

const TransactionList: React.FC<TTransactionListProps> = ({ cardNumber }) => {
  const {
    data: transactions = [],
    isLoading,
    isError,
    refetch,
    error,
  } = useGetCardTransactions(cardNumber);

  if (isLoading) {
    return <Spinner className="my-6" />;
  }

  if (isError) {
    return <ErrorInfo message={error?.message} onRetry={refetch} />;
  }

  return (
    <div className="">
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
      <div className="text-center text-[#01D167] bg-[#EDFFF5] py-3 font-semibold text-sm">
        View all card transactions
      </div>
    </div>
  );
};

export default TransactionList;
