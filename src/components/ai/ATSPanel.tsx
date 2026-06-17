"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { ResumeData, ATSResult } from "@/types/resume";

interface Props {
  formData: ResumeData;
  jobDescription: string;
  onJobDescriptionChange: (v: string) => void;
  onSkillsExtracted: (skills: string) => void;
  onSummaryGenerated: (summary: string) => void;
}

export default function ATSPanel({ formData, jobDescription, onJobDescriptionChange, onSkillsExtracted, onSummaryGenerated }: Props) {
  const [loading, setLoading] = useState<string | null>(null);
  const [atsResult, setAtsResult] = useState<ATSResult | null>(null);

  const analyzeJD = async () => {
    if (!jobDescription.trim()) return;
    setLoading("analyze");
    try {
      const res = await fetch("/api/ai/analyze-jd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription }),
      });
      const data = await res.json();
      if (data.technicalSkills?.length) {
        onSkillsExtracted((data.technicalSkills || []).join(", "));
      }

      // Compute ATS score against current resume
      const resumeText = [formData.summary, formData.skills, ...formData.experience.map((e) => e.description)].join(" ").toLowerCase();
      const allKeywords = [...(data.technicalSkills || []), ...(data.softSkills || []), ...(data.keywords || [])];
      const matched = allKeywords.filter((kw: string) => resumeText.includes(kw.toLowerCase()));
      const missing = allKeywords.filter((kw: string) => !resumeText.includes(kw.toLowerCase()));
      const score = allKeywords.length ? Math.round((matched.length / allKeywords.length) * 100) : 0;
      setAtsResult({
        score,
        matchedKeywords: matched.slice(0, 10),
        missingKeywords: missing.slice(0, 10),
        suggestions: [
          missing.length > 0 ? `Add these missing keywords: ${missing.slice(0, 5).join(", ")}` : "Great keyword coverage!",
          data.seniority ? `Target seniority: ${data.seniority}` : "",
          data.role ? `Role detected: ${data.role}` : "",
        ].filter(Boolean),
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(null);
    }
  };

  const generateSummary = async () => {
    setLoading("summary");
    try {
      const res = await fetch("/api/ai/generate-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, jobDescription }),
      });
      const data = await res.json();
      if (data.summary) onSummaryGenerated(data.summary);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(null);
    }
  };

  const scoreColor = atsResult ? (atsResult.score >= 70 ? "#22c55e" : atsResult.score >= 40 ? "#f59e0b" : "#ef4444") : "#e2e8f0";
  const circumference = 2 * Math.PI * 36;
  const strokeOffset = atsResult ? circumference - (atsResult.score / 100) * circumference : circumference;

  return (
    <div className="space-y-4">
      {/* JD Input */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Paste Job Description</label>
        <textarea
          rows={6}
          value={jobDescription}
          onChange={(e) => onJobDescriptionChange(e.target.value)}
          placeholder="Paste the full job description here. AI will extract skills, match keywords, and score your resume..."
          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 resize-none"
        />
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button onClick={analyzeJD} loading={loading === "analyze"} disabled={!jobDescription.trim()} size="sm">
          ✦ Analyze & Extract Skills
        </Button>
        <Button onClick={generateSummary} loading={loading === "summary"} disabled={!jobDescription.trim()} variant="secondary" size="sm">
          ✎ AI-Write Summary
        </Button>
      </div>

      {/* ATS Score */}
      {atsResult && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 animate-fade-in">
          <div className="flex items-center gap-5 mb-4">
            <div className="relative w-20 h-20 shrink-0">
              <svg viewBox="0 0 80 80" className="w-20 h-20 -rotate-90">
                <circle cx="40" cy="40" r="36" fill="none" stroke="#f1f5f9" strokeWidth="7" />
                <circle
                  cx="40" cy="40" r="36" fill="none"
                  stroke={scoreColor} strokeWidth="7"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeOffset}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 1s ease" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-slate-900">{atsResult.score}</span>
                <span className="text-[9px] text-slate-500">/ 100</span>
              </div>
            </div>
            <div>
              <div className="font-semibold text-slate-900 text-sm mb-1">ATS Match Score</div>
              <div className={`text-xs font-semibold px-2 py-0.5 rounded-full inline-block ${atsResult.score >= 70 ? "bg-green-50 text-green-700" : atsResult.score >= 40 ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-600"}`}>
                {atsResult.score >= 70 ? "Strong Match" : atsResult.score >= 40 ? "Moderate Match" : "Needs Improvement"}
              </div>
            </div>
          </div>

          {atsResult.matchedKeywords.length > 0 && (
            <div className="mb-3">
              <div className="text-xs font-semibold text-green-700 mb-1.5">✓ Matched Keywords</div>
              <div className="flex flex-wrap gap-1">
                {atsResult.matchedKeywords.map((k) => (
                  <span key={k} className="text-xs px-2 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded-full">{k}</span>
                ))}
              </div>
            </div>
          )}

          {atsResult.missingKeywords.length > 0 && (
            <div className="mb-3">
              <div className="text-xs font-semibold text-red-600 mb-1.5">✗ Missing Keywords</div>
              <div className="flex flex-wrap gap-1">
                {atsResult.missingKeywords.map((k) => (
                  <span key={k} className="text-xs px-2 py-0.5 bg-red-50 text-red-600 border border-red-200 rounded-full">{k}</span>
                ))}
              </div>
            </div>
          )}

          {atsResult.suggestions.length > 0 && (
            <div className="mt-3 space-y-1">
              {atsResult.suggestions.map((s, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                  <span className="text-indigo-500 mt-0.5">→</span> {s}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
