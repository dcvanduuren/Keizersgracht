import { describe, expect, it } from "vitest";
import { principles } from "./principles";
import { team } from "./team";

describe("principles", () => {
  it("are numbered sequentially starting at 01", () => {
    expect(principles.length).toBeGreaterThan(0);
    principles.forEach((principle, index) => {
      expect(principle.number).toBe(String(index + 1).padStart(2, "0"));
    });
  });

  it("have complete content with valid badges", () => {
    for (const principle of principles) {
      expect(principle.tag.length).toBeGreaterThan(0);
      expect(principle.title.length).toBeGreaterThan(0);
      expect(principle.body.length).toBeGreaterThan(0);
      expect(["coral", "aqua", "terracotta"]).toContain(principle.badge);
    }
  });
});

describe("team", () => {
  it("has members with complete profiles", () => {
    expect(team.length).toBeGreaterThan(0);
    for (const member of team) {
      expect(member.name.length).toBeGreaterThan(0);
      expect(member.bio.length).toBeGreaterThan(0);
      expect(member.linkedin).toMatch(/^https:\/\/www\.linkedin\.com\//);
      expect(member.photos.length).toBeGreaterThan(0);
      for (const photo of member.photos) {
        expect(photo.src.length).toBeGreaterThan(0);
        expect(photo.alt.length).toBeGreaterThan(0);
      }
    }
  });
});
