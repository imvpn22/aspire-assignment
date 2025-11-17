export type TTransactionCategory =
  | "Food & Drink"
  | "Income"
  | "Transportation"
  | "Groceries"
  | "Shopping"
  | "Utilities"
  | "Cash"
  | "Healthcare"
  | "Entertainment"
  | "Education"
  | "Health & Fitness"
  | "Pets"
  | "Home Improvement";

export type Transaction = {
  id: string;
  amount: number;
  description: string;
  date: string;
  type: "credit" | "debit";
  category: TTransactionCategory;
};

export type TCard = {
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  cardType: "credit" | "debit";
  cvv: string;
  bankName: string;
};
