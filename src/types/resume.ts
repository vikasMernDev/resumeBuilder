export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  college: string;
  degree: string;
  field?: string;
  startYear: string;
  endYear: string;
  gpa?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string;
  github?: string;
  liveDemo?: string;
}

export interface ResumeData {
  id: string;
  title: string;
  template: string;
  createdAt: string;
  updatedAt: string;
  personalInfo: PersonalInfo;
  summary: string;
  skills: string;
  experience: Experience[];
  education: Education[];
  projects: Project[];
}

export type TemplateId = "minimal" | "modern" | "executive" | "creative" | "compact";

export interface Template {
  id: TemplateId;
  name: string;
  description: string;
  preview: string;
  accentColor: string;
  tags: string[];
}

export interface ATSResult {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
}
