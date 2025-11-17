import { DUMMY_CARDS, DUMMY_TRANSACTIONS } from "../constants/cards.constants";
import type { TCard } from "../types";
import { aspireDB } from "../utils/clientDB.utils";

export const fakeApi = async <T>(fn: () => T): Promise<T> => {
  return new Promise((resolve, reject) => {
    console.log("API call started...");
    setTimeout(() => {
      if (Math.random() > 0.5) {
        console.log("API call succeeded.");
        resolve(fn());
      } else {
        console.log("API call failed.");
        reject(new Error("Simulating Random API failure!!"));
      }
    }, 1000); // Wait for 1 second
  });
};

export const getCards = async () => {
  return fakeApi(async () => {
    const cards = await aspireDB.getItem<TCard[]>("cards");

    if (cards && cards.length > 0) {
      return cards;
    }

    await aspireDB.setItem("cards", DUMMY_CARDS);
    return DUMMY_CARDS;
  });
};

export const getCardTransactions = async (cardNumber?: string) => {
  return fakeApi(() => {
    console.log("Fetching transactions for card:", cardNumber);
    return DUMMY_TRANSACTIONS;
  });
};

export const addNewCard = async (cardDetails: TCard) => {
  return fakeApi(async () => {
    const existingCards = await aspireDB.getItem<TCard[]>("cards");
    const updatedCards = existingCards
      ? [cardDetails, ...existingCards]
      : [cardDetails];
    await aspireDB.setItem("cards", updatedCards);

    return { success: true };
  });
};
