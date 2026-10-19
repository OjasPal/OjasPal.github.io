export interface Certification {
  title: string;
  issuer: string;
  date?: string;
  href?: string;
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
    issuer: "Google Cloud, powered by Hack2skill",
    date: "Sep 2026",
    href: "https://certificate.hack2skill.com/claim/26faf4b9529aa6c5b1c0e90d5adcb7b3bb63b3545d1e91aebdffda2fdafadbfe",
  },
  {
    title: "IBM SkillsBuild AI Automation & Intelligent Solutions Internship",
    issuer: "BharatCares, in association with AICTE and IBM SkillsBuild",
    date: "6-week program, Jun to Jul 2026",
    href: "certificates/ibm-skillsbuild-internship.pdf",
  },
];

export const timeline: TimelineItem[] = [
  {
    type: "education",
    title: "B.Tech in Artificial Intelligence & Data Science",
    organization: "University School of Automation and Robotics (USAR), GGSIPU",
    location: "East Campus, Delhi",
    period: "2024 to 2028",
    status: "Current",
  },
  {
    type: "experience",
    title: "AI/ML Coordinator",
    organization: "GDG on Campus USAR",
    period: "Oct 2026",
    status: "Current",
  },
];
