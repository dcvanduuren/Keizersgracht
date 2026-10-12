export type TeamMember = {
  name: string;
  discipline: string;
  disciplineTone: "coral" | "terracotta";
  bio: string;
  photo: string;
  /** Figma crop of the source photo: share of the image height that is visible and where it starts. */
  crop: { heightShare: number; offsetShare: number };
  photoAlt: string;
};

export const team: TeamMember[] = [
  {
    name: "Kilan",
    discipline: "Development · Data",
    disciplineTone: "coral",
    bio: "Kilan holds an MSc in Computer Science. He specializes in full-stack architecture, clean data pipelines, and turning complex internal operations into fast, intuitive web tools.",
    photo: "/assets/team-kilan.png",
    crop: { heightShare: 0.3016759753227234, offsetShare: 0.06499999761581421 },
    photoAlt: "Portrait of Kilan",
  },
  {
    name: "Cheremy",
    discipline: "AI · Biomedical Sciences",
    disciplineTone: "terracotta",
    bio: "Cheremy holds MSc degrees in Artificial Intelligence and Biomedical Sciences, and consults on machine learning at Xomnia. He focuses on applied NLP, predictive modeling, and making AI systems reliable in production.",
    photo: "/assets/team-cheremy.png",
    crop: { heightShare: 0.5181192755699158, offsetShare: 0 },
    photoAlt: "Portrait of Cheremy",
  },
];
