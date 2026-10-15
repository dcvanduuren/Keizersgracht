import { Badge } from "@/components/ui/badge";
import { AdminIntakeDiagram } from "@/components/sections/diagrams/admin-intake-diagram";
import { SwgSurveyDiagram } from "@/components/sections/diagrams/swg-survey-diagram";
import { PriceToolDiagram } from "@/components/sections/diagrams/price-tool-diagram";
import type { ReactNode } from "react";

export type Project = {
  id: string;
  eyebrow: string;
  eyebrowTone: "coral" | "terracotta";
  title: string;
  description: string;
  descriptionClassName: string;
  gradientClassName: string;
  tags: ReactNode;
  diagram: ReactNode;
};

export const projects: Project[] = [
  {
    id: "admin-drafts",
    eyebrow: "01 — Workflow automation",
    eyebrowTone: "coral",
    title: "Turning incoming messages into ready-to-send replies.",
    description:
      "We build custom AI agents for companies that automate their inbound client communications. Whether inquiries arrive via email, WhatsApp, or web forms, our agents handle the admin legwork—analyzing intent, cross-checking live schedules and pricing rules, and preparing accurate drafts for your team to review and send in one click.",
    descriptionClassName: "text-taupe",
    gradientClassName: "bg-gradient-coral",
    tags: (
      <>
        <Badge variant="tagCoral">AI</Badge>
        <Badge variant="tagCoral">Dev</Badge>
      </>
    ),
    diagram: <AdminIntakeDiagram />,
  },
  {
    id: "clean-water",
    eyebrow: "02 — Clean water",
    eyebrowTone: "terracotta",
    title: "Measuring sanitation impact across rural Indonesia.",
    description:
      "We built the field census app for Safe Water Gardens (SWG), enabling both their team and the Indonesian government to monitor household participation, water quality, and long-term sanitation health.",
    descriptionClassName: "text-terracotta",
    gradientClassName: "bg-gradient-aqua",
    tags: (
      <>
        <Badge variant="tagAqua">Dev</Badge>
        <Badge variant="tagAqua">Data</Badge>
      </>
    ),
    diagram: <SwgSurveyDiagram />,
  },
  {
    id: "price-tool",
    eyebrow: "03 — Price tool",
    eyebrowTone: "terracotta",
    title: "Smarter pricing for a construction company.",
    description:
      "A data-driven price calculation tool that helps project managers quote with confidence.",
    descriptionClassName: "text-terracotta",
    gradientClassName: "bg-gradient-stone",
    tags: (
      <>
        <Badge variant="tagSand">Data</Badge>
        <Badge variant="tagSand">Dev</Badge>
      </>
    ),
    diagram: <PriceToolDiagram />,
  },
];
