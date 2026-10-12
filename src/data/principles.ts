export type Principle = {
  number: string;
  tag: string;
  title: string;
  body: string;
  badge: "coral" | "aqua" | "terracotta";
};

export const principles: Principle[] = [
  {
    number: "01",
    tag: "Discovery",
    title: "Direct conversation.",
    body: "No sales pitches or slide decks. We start with an honest conversation about your bottlenecks to see where custom software or AI makes practical, financial sense.",
    badge: "coral",
  },
  {
    number: "02",
    tag: "Workflow audit",
    title: "Map your daily workflow.",
    body: "We look closely at how your team actually works. Together, we identify where hours are lost to repetitive tasks, messy spreadsheets, and disconnected tools.",
    badge: "aqua",
  },
  {
    number: "03",
    tag: "Prototype in weeks",
    title: "Tight, high-impact scope.",
    body: "No six-month discovery phases. We define a lean, focused prototype with clear deliverables so you can test working software in weeks, not quarters.",
    badge: "terracotta",
  },
  {
    number: "04",
    tag: "Hands-on testing",
    title: "Build and test with real data.",
    body: "We build with your actual data and share early demos. Your team gets hands-on access right away, letting us iterate rapidly on real-world feedback.",
    badge: "coral",
  },
  {
    number: "05",
    tag: "Plug & play",
    title: "Seamless tool integration.",
    body: "We deploy directly into your existing infrastructure — cloud databases, internal dashboards, or team tools — complete with clean docs and no friction.",
    badge: "aqua",
  },
  {
    number: "06",
    tag: "Ongoing partnership",
    title: "Direct support after launch.",
    body: "Shipping is just day one. We stay close to monitor performance, handle edge cases, and evolve the tool as your workload and team grow.",
    badge: "terracotta",
  },
];
