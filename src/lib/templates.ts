import { Template } from "@/types/resume";

export const TEMPLATES: Template[] = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean, timeless. Perfect for any industry. Lets your content shine.",
    preview: "bg-white border-slate-200",
    accentColor: "#1e293b",
    tags: ["Clean", "ATS-Safe", "Classic"],
  },
  {
    id: "modern",
    name: "Modern",
    description: "Two-column layout with a bold sidebar. Stands out in tech roles.",
    preview: "bg-indigo-600",
    accentColor: "#6366f1",
    tags: ["Tech", "Bold", "Two-Column"],
  },
  {
    id: "executive",
    name: "Executive",
    description: "Refined, sophisticated design for senior roles and leadership.",
    preview: "bg-slate-900",
    accentColor: "#0f172a",
    tags: ["Senior", "Corporate", "Elegant"],
  },
  {
    id: "creative",
    name: "Creative",
    description: "Vibrant accent and contemporary layout for design or marketing roles.",
    preview: "bg-violet-600",
    accentColor: "#7c3aed",
    tags: ["Design", "Marketing", "Vibrant"],
  },
  {
    id: "compact",
    name: "Compact",
    description: "Fits more on one page without feeling cramped. Ideal for experienced candidates.",
    preview: "bg-emerald-600",
    accentColor: "#059669",
    tags: ["Dense", "Experienced", "One-Page"],
  },
];
