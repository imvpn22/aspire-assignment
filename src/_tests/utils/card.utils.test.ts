import { describe, it, expect } from "vitest";
import { generateRandomCardNumber } from "../../utils/card.utils";

describe("Card Utility Functions", () => {
  it("should return expected result from yourUtilityFunction", () => {
    const result = generateRandomCardNumber();
    expect(result).toBeDefined();
    expect(typeof result).toBe("string");
  });
});
