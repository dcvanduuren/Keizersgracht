import { Badge } from "@/components/ui/badge";
import { AdminDraftsDiagram } from "@/components/sections/diagrams/admin-drafts-diagram";
import { CleanWaterDiagram } from "@/components/sections/diagrams/clean-water-diagram";
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
    id: "price-tool",
    eyebrow: "01 — Price tool",
    eyebrowTone: "coral",
    title: "Smarter pricing for a construction company.",
    description:
      "A data-driven price calculation tool that helps project managers quote with confidence.",
    descriptionClassName: "text-taupe",
    gradientClassName: "bg-gradient-coral",
    tags: (
      <>
        <Badge variant="tagSand">Data</Badge>
        <Badge variant="tagSand">Dev</Badge>
      </>
    ),
    diagram: <PriceToolDiagram />,
  },
  {
    id: "clean-water",
    eyebrow: "02 — Clean water",
    eyebrowTone: "terracotta",
    title: "Measuring sanitation impact across rural Indonesia.",
    description:
      "A field survey tool that tracks households with Safe Water Gardens (SWG) to measure long-term improvements in village sanitation and health.",
    descriptionClassName: "text-terracotta",
    gradientClassName: "bg-gradient-aqua",
    tags: (
      <>
        <Badge variant="tagAqua">Dev</Badge>
        <Badge variant="tagAqua">Data</Badge>
      </>
    ),
    diagram: <CleanWaterDiagram />,
  },
  {
    id: "admin-drafts",
    eyebrow: "03 — Admin drafts",
    eyebrowTone: "terracotta",
    title: "Fast, clear replies for every client request.",
    description:
      "An internal workflow tool that turns messy inbound inquiries into verified, draft-ready customer replies.",
    descriptionClassName: "text-terracotta",
    gradientClassName: "bg-gradient-stone",
    tags: (
      <>
        <Badge variant="tagCoral">AI</Badge>
        <Badge variant="tagCoral">Dev</Badge>
      </>
    ),
    diagram: <AdminDraftsDiagram />,
  },
];
