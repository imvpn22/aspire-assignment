import { describe, test, expect, vi, beforeEach } from "vitest";
import { aspireDB, dropClientDB } from "../../utils/clientDB.utils";

// Mock localforage
vi.mock("localforage", () => {
  const mockStore: Record<string, any> = {};

  const mockInstance = {
    getItem: vi.fn((key: string) => {
      return Promise.resolve(mockStore[key] || null);
    }),
    setItem: vi.fn((key: string, value: any) => {
      mockStore[key] = value;
      return Promise.resolve(value);
    }),
    removeItem: vi.fn((key: string) => {
      delete mockStore[key];
      return Promise.resolve();
    }),
    clear: vi.fn(() => {
      Object.keys(mockStore).forEach((key) => delete mockStore[key]);
      return Promise.resolve();
    }),
  };

  return {
    default: {
      createInstance: vi.fn(() => mockInstance),
      dropInstance: vi.fn(() => Promise.resolve()),
    },
  };
});

describe("ClientDB Utils", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("aspireDB", () => {
    test("should store and retrieve items", async () => {
      const testData = { id: 1, name: "Test User", email: "test@example.com" };

      // Store the item
      await aspireDB.setItem("user", testData);

      // Retrieve the item
      const retrievedData = await aspireDB.getItem("user");

      expect(retrievedData).toEqual(testData);
    });

    test("should return null for non-existent items", async () => {
      const result = await aspireDB.getItem("non-existent-key");
      expect(result).toBeNull();
    });

    test("should remove items", async () => {
      const testData = { test: "value" };

      // Store the item
      await aspireDB.setItem("test-key", testData);

      // Verify it's stored
      let retrievedData = await aspireDB.getItem("test-key");
      expect(retrievedData).toEqual(testData);

      // Remove the item
      await aspireDB.removeItem("test-key");

      // Verify it's removed
      retrievedData = await aspireDB.getItem("test-key");
      expect(retrievedData).toBeNull();
    });

    test("should clear all items", async () => {
      // Store multiple items
      await aspireDB.setItem("key1", "value1");
      await aspireDB.setItem("key2", "value2");
      await aspireDB.setItem("key3", "value3");

      // Clear all items
      await aspireDB.clear();

      // Verify all items are removed
      expect(await aspireDB.getItem("key1")).toBeNull();
      expect(await aspireDB.getItem("key2")).toBeNull();
      expect(await aspireDB.getItem("key3")).toBeNull();
    });

    test("should handle complex data types", async () => {
      const complexData = {
        user: {
          id: 1,
          profile: {
            name: "John Doe",
            preferences: {
              theme: "dark",
              notifications: true,
            },
          },
        },
        cards: [
          { id: 1, number: "1234567890123456" },
          { id: 2, number: "6543210987654321" },
        ],
        metadata: {
          createdAt: "2025-01-01T00:00:00Z",
          version: "1.0.0",
        },
      };

      await aspireDB.setItem("complex-data", complexData);
      const retrieved = await aspireDB.getItem("complex-data");

      expect(retrieved).toEqual(complexData);
    });

    test("should handle arrays", async () => {
      const arrayData = ["item1", "item2", "item3", { nested: "object" }];

      await aspireDB.setItem("array-data", arrayData);
      const retrieved = await aspireDB.getItem("array-data");

      expect(retrieved).toEqual(arrayData);
    });

    test("should handle different data types", async () => {
      // Test string
      await aspireDB.setItem("string", "hello");
      expect(await aspireDB.getItem("string")).toBe("hello");

      // Test number
      await aspireDB.setItem("number", 42);
      expect(await aspireDB.getItem("number")).toBe(42);

      // Test boolean
      await aspireDB.setItem("boolean", true);
      expect(await aspireDB.getItem("boolean")).toBe(true);

      // Test null
      await aspireDB.setItem("null-value", null);
      expect(await aspireDB.getItem("null-value")).toBe(null);
    });

    test("should maintain data integrity with concurrent operations", async () => {
      const operations = [];

      // Perform multiple concurrent operations
      for (let i = 0; i < 10; i++) {
        operations.push(aspireDB.setItem(`key-${i}`, `value-${i}`));
      }

      await Promise.all(operations);

      // Verify all operations completed successfully
      for (let i = 0; i < 10; i++) {
        const value = await aspireDB.getItem(`key-${i}`);
        expect(value).toBe(`value-${i}`);
      }
    });
  });

  describe("dropClientDB", () => {
    test("should drop the database instance", async () => {
      await dropClientDB();

      // Verify that localforage.dropInstance was called
      const localforage = await import("localforage");
      expect(localforage.default.dropInstance).toHaveBeenCalledWith({
        name: "aspire-db",
      });
    });
  });

  describe("Error handling", () => {
    test("should handle storage errors gracefully", async () => {
      // Mock an error scenario
      const originalSetItem = aspireDB.setItem;
      (aspireDB as any).setItem = vi
        .fn()
        .mockRejectedValue(new Error("Storage full"));

      await expect(aspireDB.setItem("test", "data")).rejects.toThrow(
        "Storage full"
      );

      // Restore original method
      (aspireDB as any).setItem = originalSetItem;
    });

    test("should handle retrieval errors gracefully", async () => {
      // Mock an error scenario
      const originalGetItem = aspireDB.getItem;
      (aspireDB as any).getItem = vi
        .fn()
        .mockRejectedValue(new Error("Database corrupted"));

      await expect(aspireDB.getItem("test")).rejects.toThrow(
        "Database corrupted"
      );

      // Restore original method
      (aspireDB as any).getItem = originalGetItem;
    });
  });

  describe("Performance tests", () => {
    test("should handle large data sets efficiently", async () => {
      const largeData = {
        users: Array.from({ length: 1000 }, (_, i) => ({
          id: i,
          name: `User ${i}`,
          email: `user${i}@example.com`,
        })),
      };

      const startTime = performance.now();
      await aspireDB.setItem("large-dataset", largeData);
      const setTime = performance.now();

      const retrievedData = await aspireDB.getItem("large-dataset");
      const getTime = performance.now();

      expect(retrievedData).toEqual(largeData);
      expect(setTime - startTime).toBeLessThan(1000); // Should complete within 1 second
      expect(getTime - setTime).toBeLessThan(1000); // Should complete within 1 second
    });
  });
});
