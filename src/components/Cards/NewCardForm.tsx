import React, { useState } from "react";
import type { TCard } from "../../types";
import { useAddNewCard } from "../../query/cards.query";
import {
  generateExpiryDate,
  generateRandomCardNumber,
  generateRandomCvv,
} from "../../utils/card.utils";
import Input from "../shared/Input";

type TNewCardFormProps = {
  onSuccess?: () => void;
};

const NewCardForm: React.FC<TNewCardFormProps> = ({ onSuccess }) => {
  const [newCardName, setNewCardName] = useState("");
  const [newCardNumber] = useState(generateRandomCardNumber());
  const [newExpiryDate] = useState(generateExpiryDate());
  const [newCvv] = useState(generateRandomCvv());

  const { mutateAsync, isPending } = useAddNewCard();

  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault();
    const newCard: TCard = {
      cardHolderName: newCardName,
      cardNumber: newCardNumber,
      expiryDate: newExpiryDate,
      cvv: newCvv,
      bankName: "Sample Bank",
      cardType: "credit",
      availableBalance: Math.floor(Math.random() * 5000) + 1000,
    };
    await mutateAsync(newCard);
    onSuccess?.();
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleAddCard}>
      <Input
        label="Card name"
        value={newCardName}
        onChange={(e) => setNewCardName(e.target.value)}
        required
        autoFocus
      />

      <Input
        label="Card number"
        className="border p-2 rounded"
        disabled
        value={newCardNumber
          .split(/(.{4})/g)
          .filter(Boolean)
          .join(" ")}
      />

      <Input
        label="Expiry date"
        className="border p-2 rounded"
        disabled
        value={newExpiryDate}
      />

      <Input
        type="password"
        label="CVV"
        className="border p-2 rounded"
        disabled
        value={newCvv}
      />

      <div className="flex items-center gap-4 self-end">
        <button
          type="button"
          className="bg-gray-300 text-black py-1.5 px-4 rounded hover:bg-gray-400 cursor-pointer"
          onClick={onSuccess}
        >
          Cancel
        </button>
        <button
          disabled={isPending}
          type="submit"
          className="bg-blue-500 text-white py-1.5 px-4 rounded hover:bg-blue-600 cursor-pointer"
        >
          {isPending ? "Saving..." : "Save Card"}
        </button>
      </div>
    </form>
  );
};

export default NewCardForm;
