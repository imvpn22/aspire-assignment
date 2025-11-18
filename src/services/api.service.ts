import { DUMMY_CARDS, DUMMY_TRANSACTIONS } from "../constants/cards.constants";
import type { TCard } from "../types";
import { aspireDB } from "../utils/clientDB.utils";

export const fakeApi = async <T>(
  fn: () => T,
  failureRate: number = 0.2
): Promise<T> => {
  return new Promise((resolve, reject) => {
    console.log("API call started...");
    setTimeout(() => {
      if (Math.random() > failureRate) {
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
  console.log("Fetching cards data...");
  return fakeApi(async () => {
    console.log("Retrieving cards from database...");
    const cards = await aspireDB.getItem<TCard[]>("cards");

    if (cards && cards.length > 0) {
      return cards;
    }

    console.log("No cards found in database. Initializing with dummy data...");
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
