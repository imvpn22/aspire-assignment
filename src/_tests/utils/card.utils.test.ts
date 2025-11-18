import { describe, it, expect } from "vitest";
import {
  generateRandomCardNumber,
  generateExpiryDate,
  generateRandomCvv,
} from "../../utils/card.utils";

describe("Card Utility Functions", () => {
  describe("generateRandomCardNumber", () => {
    it("should generate a 16-digit card number", () => {
      const result = generateRandomCardNumber();
      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
      expect(result).toHaveLength(16);
      expect(result).toMatch(/^\d{16}$/);
    });

    it("should generate different card numbers on multiple calls", () => {
      const result1 = generateRandomCardNumber();
      const result2 = generateRandomCardNumber();
      expect(result1).not.toBe(result2);
    });
  });

  describe("generateExpiryDate", () => {
    it("should generate a valid expiry date format", () => {
      const result = generateExpiryDate();
      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
      expect(result).toMatch(/^\d{1,2}\/\d{2}$/);
    });

    it("should generate month between 1-12", () => {
      const result = generateExpiryDate();
      const [month] = result.split("/");
      const monthNum = parseInt(month, 10);
      expect(monthNum).toBeGreaterThanOrEqual(1);
      expect(monthNum).toBeLessThanOrEqual(12);
    });

    it("should generate year between 25-34", () => {
      const result = generateExpiryDate();
      const [, year] = result.split("/");
      const yearNum = parseInt(year, 10);
      expect(yearNum).toBeGreaterThanOrEqual(25);
      expect(yearNum).toBeLessThanOrEqual(34);
    });
  });

  describe("generateRandomCvv", () => {
    it("should generate a 3-digit CVV", () => {
      const result = generateRandomCvv();
      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
      expect(result).toHaveLength(3);
      expect(result).toMatch(/^\d{3}$/);
    });

    it("should generate CVV between 100-999", () => {
      const result = generateRandomCvv();
      const cvvNum = parseInt(result, 10);
      expect(cvvNum).toBeGreaterThanOrEqual(100);
      expect(cvvNum).toBeLessThanOrEqual(999);
    });

    it("should generate different CVVs on multiple calls", () => {
      const results = Array.from({ length: 10 }, () => generateRandomCvv());
      const uniqueResults = new Set(results);
      expect(uniqueResults.size).toBeGreaterThan(1);
    });
  });
});
