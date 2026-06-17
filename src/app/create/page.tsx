"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { createEmptyResume, saveResume, getResume } from "@/lib/storage";
import { ResumeData, Experience, Education, Project, TemplateId } from "@/types/resume";
import { TEMPLATES } from "@/lib/templates";
import SectionCard from "@/components/form/SectionCard";
import { InputField, TextareaField } from "@/components/form/FormField";
import ATSPanel from "@/components/ai/ATSPanel";
import Button from "@/components/ui/Button";

// Template imports
import MinimalTemplate from "@/templates/MinimalTemplate";
import ModernTemplate from "@/templates/ModernTemplate";
import ExecutiveTemplate from "@/templates/ExecutiveTemplate";
import CreativeTemplate from "@/templates/CreativeTemplate";
import CompactTemplate from "@/templates/CompactTemplate";

import jsPDF from "jspdf";
import { toPng } from "html-to-image";

function TemplateRenderer({ data, template }: { data: ResumeData; template: TemplateId }) {
  switch (template) {
    case "modern": return <ModernTemplate data={data} />;
    case "executive": return <ExecutiveTemplate data={data} />;
    case "creative": return <CreativeTemplate data={data} />;
    case "compact": return <CompactTemplate data={data} />;
    default: return <MinimalTemplate data={data} />;
  }
}

function uid() { return crypto.randomUUID(); }

function CreatePageInner() {
  const params = useSearchParams();
  const router = useRouter();
  const resumeRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<"form" | "ats" | "templates">("form");
  const [jobDescription, setJobDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [savedToast, setSavedToast] = useState(false);

  const [formData, setFormData] = useState<ResumeData>(() => {
    const templateParam = (params.get("template") ?? "minimal") as TemplateId;
    return createEmptyResume(templateParam);
  });

  // Load existing resume if id param
  useEffect(() => {
    const id = params.get("id");
    if (id) {
      const existing = getResume(id);
      if (existing) setFormData(existing);
    }
  }, [params]);

  const update = useCallback((partial: Partial<ResumeData>) => {
    setFormData((prev) => ({ ...prev, ...partial }));
  }, []);

  const updatePersonal = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }));
  };

  // Experience
  const addExp = () => update({ experience: [...formData.experience, { id: uid(), company: "", role: "", startDate: "", endDate: "", current: false, description: "" }] });
  const removeExp = (i: number) => update({ experience: formData.experience.filter((_, idx) => idx !== i) });
  const updateExp = (i: number, field: keyof Experience, value: string | boolean) => {
    const updated = [...formData.experience];
    updated[i] = { ...updated[i], [field]: value };
    update({ experience: updated });
  };

  // Education
  const addEdu = () => update({ education: [...formData.education, { id: uid(), college: "", degree: "", field: "", startYear: "", endYear: "", gpa: "" }] });
  const removeEdu = (i: number) => update({ education: formData.education.filter((_, idx) => idx !== i) });
  const updateEdu = (i: number, field: keyof Education, value: string) => {
    const updated = [...formData.education];
    updated[i] = { ...updated[i], [field]: value };
    update({ education: updated });
  };

  // Projects
  const addProj = () => update({ projects: [...formData.projects, { id: uid(), title: "", description: "", techStack: "", github: "", liveDemo: "" }] });
  const removeProj = (i: number) => update({ projects: formData.projects.filter((_, idx) => idx !== i) });
  const updateProj = (i: number, field: keyof Project, value: string) => {
    const updated = [...formData.projects];
    updated[i] = { ...updated[i], [field]: value };
    update({ projects: updated });
  };

  // AI rewrite experience
  const rewriteExp = async (i: number) => {
    try {
      const res = await fetch("/api/ai/rewrite-experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ experience: formData.experience[i], jobDescription }),
      });
      const data = await res.json();
      if (data.description) updateExp(i, "description", data.description);
    } catch (e) { console.error(e); }
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      saveResume(formData);
      setSaving(false);
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 2500);
    }, 400);
  };

  const handleDownload = async () => {
    const el = resumeRef.current;
    if (!el) return;
    setDownloading(true);
    try {
      const png = await toPng(el, { cacheBust: true, pixelRatio: 2 });
      const pdf = new jsPDF("p", "px", "a4");
      const w = pdf.internal.pageSize.getWidth();
      const h = (el.offsetHeight * w) / el.offsetWidth;
      pdf.addImage(png, "PNG", 0, 0, w, h);
      pdf.save(`${formData.title || "resume"}.pdf`);
    } finally {
      setDownloading(false);
    }
  };

  const tpl = TEMPLATES.find((t) => t.id === formData.template) ?? TEMPLATES[0];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Topbar */}
      <header className="sticky top-0 z-50 glass border-b border-white/60 h-14 flex items-center px-6 gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-6 h-6 brand-gradient rounded-md flex items-center justify-center text-white text-xs font-bold">R</div>
          <span className="font-bold text-slate-900 hidden sm:block">ResumeAI</span>
        </Link>

        <div className="flex-1 min-w-0">
          <input
            value={formData.title}
            onChange={(e) => update({ title: e.target.value })}
            placeholder="Resume title..."
            className="w-full max-w-xs text-sm font-medium text-slate-900 bg-transparent border-none outline-none placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {savedToast && <span className="text-xs text-green-600 font-medium animate-fade-in">✓ Saved</span>}
          <Button onClick={handleSave} loading={saving} variant="secondary" size="sm">Save</Button>
          <Button onClick={handleDownload} loading={downloading} size="sm">↓ PDF</Button>
          <Link href="/resumes" className="text-xs text-slate-500 hover:text-slate-900 transition-colors hidden sm:block">My Resumes</Link>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT PANEL */}
        <div className="w-full lg:w-[420px] xl:w-[460px] shrink-0 flex flex-col bg-slate-50 border-r border-slate-200">
          {/* Tabs */}
          <div className="flex border-b border-slate-200 bg-white">
            {(["form", "ats", "templates"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wide transition-colors ${activeTab === tab ? "text-indigo-600 border-b-2 border-indigo-500" : "text-slate-500 hover:text-slate-800"}`}
              >
                {tab === "form" ? "📝 Details" : tab === "ats" ? "🎯 AI / ATS" : "🎨 Template"}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {/* FORM TAB */}
            {activeTab === "form" && (
              <>
                <SectionCard title="Personal Info" icon="👤" defaultOpen>
                  <InputField label="Full Name" value={formData.personalInfo.fullName} onChange={(e) => updatePersonal("fullName", e.target.value)} placeholder="Jane Smith" />
                  <div className="grid grid-cols-2 gap-3">
                    <InputField label="Email" type="email" value={formData.personalInfo.email} onChange={(e) => updatePersonal("email", e.target.value)} placeholder="jane@example.com" />
                    <InputField label="Phone" value={formData.personalInfo.phone} onChange={(e) => updatePersonal("phone", e.target.value)} placeholder="+1 234 567 890" />
                  </div>
                  <InputField label="Location" value={formData.personalInfo.location} onChange={(e) => updatePersonal("location", e.target.value)} placeholder="San Francisco, CA" />
                  <div className="grid grid-cols-2 gap-3">
                    <InputField label="LinkedIn" value={formData.personalInfo.linkedin ?? ""} onChange={(e) => updatePersonal("linkedin", e.target.value)} placeholder="linkedin.com/in/..." />
                    <InputField label="GitHub" value={formData.personalInfo.github ?? ""} onChange={(e) => updatePersonal("github", e.target.value)} placeholder="github.com/..." />
                  </div>
                  <InputField label="Website / Portfolio" value={formData.personalInfo.website ?? ""} onChange={(e) => updatePersonal("website", e.target.value)} placeholder="https://yoursite.com" />
                </SectionCard>

                <SectionCard title="Professional Summary" icon="💬">
                  <TextareaField label="Summary" rows={4} value={formData.summary} onChange={(e) => update({ summary: e.target.value })} hint="3–5 sentences. Use AI in the ATS tab to generate." placeholder="Results-driven software engineer with 4+ years of experience..." />
                </SectionCard>

                <SectionCard title="Skills" icon="⚡">
                  <InputField label="Skills (comma separated)" value={formData.skills} onChange={(e) => update({ skills: e.target.value })} placeholder="React, TypeScript, Node.js, PostgreSQL" hint="Use AI & ATS tab to auto-extract from a job description." />
                </SectionCard>

                <SectionCard title="Work Experience" icon="💼">
                  {formData.experience.map((exp, i) => (
                    <div key={exp.id} className="border border-slate-200 rounded-xl p-4 space-y-3 bg-white">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-slate-500">Experience {i + 1}</span>
                        {formData.experience.length > 1 && (
                          <button onClick={() => removeExp(i)} className="text-xs text-red-400 hover:text-red-600">Remove</button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <InputField label="Job Title" value={exp.role} onChange={(e) => updateExp(i, "role", e.target.value)} placeholder="Software Engineer" />
                        <InputField label="Company" value={exp.company} onChange={(e) => updateExp(i, "company", e.target.value)} placeholder="Acme Corp" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <InputField label="Start Date" value={exp.startDate} onChange={(e) => updateExp(i, "startDate", e.target.value)} placeholder="Jan 2022" />
                        <InputField label="End Date" value={exp.endDate} onChange={(e) => updateExp(i, "endDate", e.target.value)} placeholder="Present" disabled={exp.current} />
                      </div>
                      <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                        <input type="checkbox" checked={exp.current} onChange={(e) => updateExp(i, "current", e.target.checked)} className="rounded border-slate-300 text-indigo-600" />
                        Currently working here
                      </label>
                      <TextareaField label="Responsibilities & Achievements" rows={4} value={exp.description} onChange={(e) => updateExp(i, "description", e.target.value)} hint="One bullet point per line. Start with action verbs." placeholder={"• Led development of a microservices API serving 1M+ users\n• Reduced page load time by 40% through code splitting"} />
                      {jobDescription && (
                        <button onClick={() => rewriteExp(i)} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1">
                          ✦ AI Rewrite for this JD
                        </button>
                      )}
                    </div>
                  ))}
                  <Button onClick={addExp} variant="secondary" size="sm" className="w-full justify-center">
                    + Add Experience
                  </Button>
                </SectionCard>

                <SectionCard title="Education" icon="🎓">
                  {formData.education.map((edu, i) => (
                    <div key={edu.id} className="border border-slate-200 rounded-xl p-4 space-y-3 bg-white">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-slate-500">Education {i + 1}</span>
                        {formData.education.length > 1 && (
                          <button onClick={() => removeEdu(i)} className="text-xs text-red-400 hover:text-red-600">Remove</button>
                        )}
                      </div>
                      <InputField label="School / University" value={edu.college} onChange={(e) => updateEdu(i, "college", e.target.value)} placeholder="MIT" />
                      <div className="grid grid-cols-2 gap-3">
                        <InputField label="Degree" value={edu.degree} onChange={(e) => updateEdu(i, "degree", e.target.value)} placeholder="B.S. Computer Science" />
                        <InputField label="GPA (optional)" value={edu.gpa ?? ""} onChange={(e) => updateEdu(i, "gpa", e.target.value)} placeholder="3.8" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <InputField label="Start Year" value={edu.startYear} onChange={(e) => updateEdu(i, "startYear", e.target.value)} placeholder="2018" />
                        <InputField label="End Year" value={edu.endYear} onChange={(e) => updateEdu(i, "endYear", e.target.value)} placeholder="2022" />
                      </div>
                    </div>
                  ))}
                  <Button onClick={addEdu} variant="secondary" size="sm" className="w-full justify-center">
                    + Add Education
                  </Button>
                </SectionCard>

                <SectionCard title="Projects" icon="🛠">
                  {formData.projects.map((proj, i) => (
                    <div key={proj.id} className="border border-slate-200 rounded-xl p-4 space-y-3 bg-white">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-slate-500">Project {i + 1}</span>
                        {formData.projects.length > 1 && (
                          <button onClick={() => removeProj(i)} className="text-xs text-red-400 hover:text-red-600">Remove</button>
                        )}
                      </div>
                      <InputField label="Project Name" value={proj.title} onChange={(e) => updateProj(i, "title", e.target.value)} placeholder="AI Resume Builder" />
                      <TextareaField label="Description" rows={3} value={proj.description} onChange={(e) => updateProj(i, "description", e.target.value)} placeholder="Brief description of what it does and the impact it had." />
                      <InputField label="Tech Stack" value={proj.techStack} onChange={(e) => updateProj(i, "techStack", e.target.value)} placeholder="React, Next.js, TypeScript, Tailwind" />
                      <div className="grid grid-cols-2 gap-3">
                        <InputField label="GitHub URL" value={proj.github ?? ""} onChange={(e) => updateProj(i, "github", e.target.value)} placeholder="github.com/..." />
                        <InputField label="Live Demo URL" value={proj.liveDemo ?? ""} onChange={(e) => updateProj(i, "liveDemo", e.target.value)} placeholder="yourproject.com" />
                      </div>
                    </div>
                  ))}
                  <Button onClick={addProj} variant="secondary" size="sm" className="w-full justify-center">
                    + Add Project
                  </Button>
                </SectionCard>
              </>
            )}

            {/* ATS TAB */}
            {activeTab === "ats" && (
              <div className="space-y-4">
                <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
                  <h3 className="font-semibold text-indigo-900 text-sm mb-1">How the AI & ATS tools work</h3>
                  <ul className="text-xs text-indigo-700 space-y-1">
                    <li>→ Paste a job description below</li>
                    <li>→ Click <strong>Analyze</strong> to extract keywords and auto-fill your skills</li>
                    <li>→ See your ATS score and which keywords you're missing</li>
                    <li>→ Click <strong>AI-Write Summary</strong> to generate a tailored summary</li>
                    <li>→ Use <strong>AI Rewrite</strong> on each job experience in the Details tab</li>
                  </ul>
                </div>
                <ATSPanel
                  formData={formData}
                  jobDescription={jobDescription}
                  onJobDescriptionChange={setJobDescription}
                  onSkillsExtracted={(skills) => update({ skills })}
                  onSummaryGenerated={(summary) => update({ summary })}
                />
              </div>
            )}

            {/* TEMPLATES TAB */}
            {activeTab === "templates" && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500 px-1">Choose a template. Your content stays the same.</p>
                {TEMPLATES.map((t) => {
                  const colorMap: Record<string, string> = {
                    minimal: "bg-slate-100 border border-slate-200",
                    modern: "bg-indigo-500",
                    executive: "bg-slate-900",
                    creative: "bg-violet-600",
                    compact: "bg-emerald-500",
                  };
                  const active = formData.template === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => update({ template: t.id })}
                      className={`w-full text-left flex gap-4 p-4 rounded-2xl border transition-all ${active ? "border-indigo-400 bg-indigo-50 ring-2 ring-indigo-200" : "border-slate-200 bg-white hover:border-slate-300"}`}
                    >
                      <div className={`w-12 h-14 rounded-lg shrink-0 ${colorMap[t.id]}`} />
                      <div>
                        <div className="font-semibold text-slate-900 text-sm">{t.name}</div>
                        <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{t.description}</div>
                        <div className="flex gap-1 mt-2">
                          {t.tags.map((tag) => <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">{tag}</span>)}
                        </div>
                      </div>
                      {active && <div className="ml-auto text-indigo-500 text-sm">✓</div>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL — Preview */}
        <div className="hidden lg:flex flex-1 flex-col bg-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-slate-200">
            <span className="text-xs font-medium text-slate-500">Preview — {tpl.name} template</span>
            <Button onClick={handleDownload} loading={downloading} size="sm">↓ Download PDF</Button>
          </div>
          <div className="flex-1 overflow-auto p-6 flex justify-center">
            <div
              ref={resumeRef}
              className="shadow-2xl origin-top"
              style={{ transform: "scale(0.85)", transformOrigin: "top center" }}
            >
              <TemplateRenderer data={formData} template={formData.template as TemplateId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CreatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-500">Loading...</div>}>
      <CreatePageInner />
    </Suspense>
  );
}
