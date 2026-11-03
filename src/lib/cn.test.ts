import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("joins class names with spaces", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("drops falsy values", () => {
    expect(cn("foo", false, null, undefined, "bar")).toBe("foo bar");
  });

  it("returns an empty string when everything is falsy", () => {
    expect(cn(false, null, undefined)).toBe("");
  });
});
