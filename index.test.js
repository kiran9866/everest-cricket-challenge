import { sum } from "./index";

describe("sum", () => {
  it("should return addition", function () {
    const result = sum(1, 2);
    expect(result).toBe(3);
  });
});
