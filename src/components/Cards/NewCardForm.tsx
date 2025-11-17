import React, { useState } from "react";
import type { TCard } from "../../types";
import { useAddNewCard } from "../../query/cards.query";

interface NewCardFormProps {
  onSuccess?: () => void;
}

const NewCardForm: React.FC<NewCardFormProps> = ({ onSuccess }) => {
  const [newCardName, setNewCardName] = useState("");

  const { mutateAsync, isPending } = useAddNewCard();

  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault();
    const newCard: TCard = {
      cardHolderName: newCardName,
      cardNumber: Math.random().toString().slice(2, 18).padStart(16, "0"),
      expiryDate: `${Math.floor(Math.random() * 12) + 1}/${Math.floor(Math.random() * 10) + 25}`,
      cvv: Math.floor(Math.random() * 900 + 100).toString(),
      bankName: "Sample Bank",
      cardType: "credit",
    };
    await mutateAsync(newCard);
    onSuccess?.();
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleAddCard}>
      <input
        type="text"
        placeholder="Card Name"
        className="border p-2 rounded"
        value={newCardName}
        onChange={(e) => setNewCardName(e.target.value)}
        autoFocus
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
