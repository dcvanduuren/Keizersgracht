export type TeamMember = {
  name: string;
  discipline: string;
  disciplineTone: "coral" | "terracotta";
  bio: string;
  photo: string;
  linkedin: string;
  photoAlt: string;
};

export const team: TeamMember[] = [
  {
    name: "Kilan",
    discipline: "Development · Data",
    disciplineTone: "coral",
    bio: "Kilan holds an MSc in Computer Science. He specializes in full-stack architecture, clean data pipelines, and turning complex internal operations into fast, intuitive web tools.",
    photo: "/assets/team-kilan-card.png",
    linkedin: "https://www.linkedin.com/in/kilanvanloo/",
    photoAlt: "Portrait of Kilan",
  },
  {
    name: "Cheremy",
    discipline: "AI · Biomedical Engineering",
    disciplineTone: "terracotta",
    bio: "Cheremy holds MSc degrees in Artificial Intelligence and Biomedical Engineering, and consults on machine learning at Xomnia. He focuses on applied NLP, predictive modeling, and making AI systems reliable in production.",
    photo: "/assets/team-cheremy-card.png",
    linkedin: "https://www.linkedin.com/in/cheremyp/",
    photoAlt: "Portrait of Cheremy",
  },
];
