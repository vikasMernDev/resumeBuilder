import { ResumeData } from "@/types/resume";

const KEY = "resumeai_resumes";

export function getAllResumes(): ResumeData[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveResume(resume: ResumeData): void {
  const all = getAllResumes();
  const idx = all.findIndex((r) => r.id === resume.id);
  if (idx >= 0) all[idx] = { ...resume, updatedAt: new Date().toISOString() };
  else all.unshift({ ...resume, updatedAt: new Date().toISOString() });
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function deleteResume(id: string): void {
  const all = getAllResumes().filter((r) => r.id !== id);
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function getResume(id: string): ResumeData | null {
  return getAllResumes().find((r) => r.id === id) ?? null;
}

export function createEmptyResume(template = "minimal"): ResumeData {
  return {
    id: crypto.randomUUID(),
    title: "Untitled Resume",
    template,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    personalInfo: { fullName: "", email: "", phone: "", location: "", linkedin: "", github: "", website: "" },
    summary: "",
    skills: "",
    experience: [{ id: crypto.randomUUID(), company: "", role: "", startDate: "", endDate: "", current: false, description: "" }],
    education: [{ id: crypto.randomUUID(), college: "", degree: "", field: "", startYear: "", endYear: "", gpa: "" }],
    projects: [{ id: crypto.randomUUID(), title: "", description: "", techStack: "", github: "", liveDemo: "" }],
  };
}
