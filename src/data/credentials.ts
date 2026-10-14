export interface Certification {
  title: string;
  issuer: string;
}

export interface TimelineItem {
  type: "education" | "experience";
  title: string;
  organization: string;
  location?: string;
  period?: string;
  status?: string;
}

export const certifications: Certification[] = [
  {
    title: "Google Cloud Gen AI Academy, APAC Edition, Cohort 3",
    issuer: "Hack2Skill",
  },
  {
    title: "AI Automation & Intelligent Solutions Internship",
    issuer: "IBM SkillsBuild",
  },
];

export const timeline: TimelineItem[] = [
  {
    type: "education",
    title: "B.Tech in Artificial Intelligence & Data Science",
    organization: "University School of Automation and Robotics (USAR), GGSIPU",
    location: "East Campus, Delhi",
    period: "2024 to 2028",
  },
  {
    type: "experience",
    title: "AI/ML Coordinator",
    organization: "GDG on Campus USAR",
    status: "Current",
  },
];
