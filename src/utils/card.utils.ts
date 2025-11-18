export const generateRandomCardNumber = (): string =>
  Math.random().toString().slice(2, 18).padStart(16, "0");

export const generateExpiryDate = (): string =>
  `${Math.floor(Math.random() * 12) + 1}/${Math.floor(Math.random() * 10) + 25}`;

export const generateRandomCvv = (): string =>
  Math.floor(Math.random() * 900 + 100).toString();
