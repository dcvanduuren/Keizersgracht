import type { Photo } from "@/components/ui/photo-slider";

export type TeamMember = {
  name: string;
  discipline: string;
  disciplineTone: "coral" | "terracotta";
  bio: string;
  photos: Photo[];
  linkedin: string;
};

export const team: TeamMember[] = [
  {
    name: "Kilan",
    discipline: "Development · Data",
    disciplineTone: "coral",
    bio: "Kilan holds an MSc in Computer Science. He specializes in full-stack architecture, clean data pipelines, and turning complex internal operations into fast, intuitive web tools.",
    photos: [
      { src: "/assets/team-kilan-card.png", alt: "Portrait of Kilan" },
      { src: "/assets/team-kilan-3381.jpg", alt: "Portrait of Kilan" },
      { src: "/assets/team-kilan-3386.jpg", alt: "Portrait of Kilan" },
      { src: "/assets/team-kilan-3340.jpg", alt: "Portrait of Kilan" },
      { src: "/assets/team-kilan-3354.jpg", alt: "Portrait of Kilan" },
      { src: "/assets/team-kilan-3355.jpg", alt: "Portrait of Kilan" },
      { src: "/assets/team-kilan-3356.jpg", alt: "Portrait of Kilan" },
      { src: "/assets/team-kilan-3367.jpg", alt: "Portrait of Kilan" },
      { src: "/assets/team-kilan-3375.jpg", alt: "Portrait of Kilan" },
    ],
    linkedin: "https://www.linkedin.com/in/kilanvanloo/",
  },
  {
    name: "Cheremy",
    discipline: "AI · Biomedical Engineering",
    disciplineTone: "terracotta",
    bio: "Cheremy holds MSc degrees in Artificial Intelligence and Biomedical Engineering, and consults on machine learning at Xomnia. He focuses on applied NLP, predictive modeling, and making AI systems reliable in production.",
    photos: [
      { src: "/assets/team-cheremy-card.png", alt: "Portrait of Cheremy" },
      { src: "/assets/team-cheremy-3336.jpg", alt: "Portrait of Cheremy" },
      { src: "/assets/team-cheremy-3340.jpg", alt: "Portrait of Cheremy" },
      { src: "/assets/team-cheremy-3354.jpg", alt: "Portrait of Cheremy" },
      { src: "/assets/team-cheremy-3355.jpg", alt: "Portrait of Cheremy" },
      { src: "/assets/team-cheremy-3356.jpg", alt: "Portrait of Cheremy" },
      { src: "/assets/team-cheremy-3367.jpg", alt: "Portrait of Cheremy" },
      { src: "/assets/team-cheremy-3375.jpg", alt: "Portrait of Cheremy" },
    ],
    linkedin: "https://www.linkedin.com/in/cheremyp/",
  },
];
