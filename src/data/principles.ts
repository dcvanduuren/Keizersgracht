export type Principle = {
  number: string;
  title: string;
  body: string;
  badge: "coral" | "aqua" | "terracotta";
};

export const principles: Principle[] = [
  {
    number: "01",
    title: "Direct conversation.",
    body: "Tell us about the bottleneck you're dealing with. We start with a practical, honest review of where custom software or AI makes financial and technical sense.",
    badge: "coral",
  },
  {
    number: "02",
    title: "Understand your daily workflow.",
    body: "We look closely at how your team actually works. Together, we explore your existing spreadsheets, APIs, databases, and daily habits to find where automation saves real time.",
    badge: "aqua",
  },
  {
    number: "03",
    title: "Shape a tight, focused scope.",
    body: "We define the core problem, system architecture, and clear deliverables. We keep scopes tight so you see working software within weeks rather than months.",
    badge: "terracotta",
  },
  {
    number: "04",
    title: "Build, test, and iterate.",
    body: "We build with real data and share working demos early. Your team gets hands-on access right away, providing rapid feedback before anything goes to production.",
    badge: "coral",
  },
  {
    number: "05",
    title: "Integrate into everyday tools.",
    body: "We deploy directly into your existing infrastructure — cloud services, databases, or internal dashboards — complete with clear docs and straightforward handoffs.",
    badge: "aqua",
  },
  {
    number: "06",
    title: "Direct support after launch.",
    body: "Shipping is just milestone one. We monitor performance, handle edge cases, and evolve the tool as your team's workload and data expand.",
    badge: "terracotta",
  },
];
