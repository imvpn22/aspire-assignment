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
    queryKey: ["cardTransactions", cardNumber],
    queryFn: () => getCardTransactions(cardNumber),
    enabled: !!cardNumber,
  });
};

export const useAddNewCard = () => {
  return useMutation({
    mutationKey: ["addNewCard"],
    mutationFn: (cardDetails: TCard) => addNewCard(cardDetails),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cards", "cardTransactions"],
      });
    },
    onError: (error) => {
      console.error("Error adding new card:", error);
    },
  });
};
