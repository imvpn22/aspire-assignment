import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from ".";
import {
  getCards,
  getCardTransactions,
  addNewCard,
} from "../services/api.service";
import type { TCard } from "../types";

export const useGetCards = () => {
  return useQuery({
    queryKey: ["cards"],
    queryFn: () => getCards(),
  });
};

export const useGetCardTransactions = (cardNumber: string) => {
  return useQuery({
    queryKey: ["cards", "cardTransactions", cardNumber],
    queryFn: () => getCardTransactions(cardNumber),
    enabled: !!cardNumber,
  });
};

export const useAddNewCard = () => {
  return useMutation({
    mutationKey: ["addNewCard"],
    mutationFn: (cardDetails: TCard) => addNewCard(cardDetails),
    onSuccess: () => {
      console.log("New card added successfully. Invalidating queries...");
      queryClient.invalidateQueries({
        queryKey: ["cards"],
      });
    },
    onError: (error) => {
      console.error("Error adding new card:", error);
      alert("Failed to add new card. Please try again.");
    },
  });
};
