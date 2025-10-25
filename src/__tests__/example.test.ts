import { describe, expect, it } from "vitest";

describe("Example Test Suite", () => {
  it("should pass a basic assertion", () => {
    expect(1 + 1).toBe(2);
  });

  it("should handle string operations", () => {
    const str = "NextShip";
    expect(str).toBe("NextShip");
    expect(str.toLowerCase()).toBe("nextship");
    expect(str.length).toBe(8);
  });

  it("should handle array operations", () => {
    const arr = [1, 2, 3, 4, 5];
    expect(arr).toHaveLength(5);
    expect(arr).toContain(3);
    expect(arr[0]).toBe(1);
  });

  it("should handle object properties", () => {
    const obj = {
      name: "NextShip",
      version: "1.0.0",
      features: ["auth", "payments", "security"],
    };

    expect(obj).toHaveProperty("name");
    expect(obj.name).toBe("NextShip");
    expect(obj.features).toContain("auth");
  });

  it("should handle async operations", async () => {
    const asyncFunc = async () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve("success"), 10);
      });
    };

    const result = await asyncFunc();
    expect(result).toBe("success");
  });
});
