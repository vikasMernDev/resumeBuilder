"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllResumes, deleteResume } from "@/lib/storage";
import { ResumeData } from "@/types/resume";
import { TEMPLATES } from "@/lib/templates";

export default function ResumesPage() {
  const [resumes, setResumes] = useState<ResumeData[]>([]);

  useEffect(() => {
    setResumes(getAllResumes());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Delete this resume?")) {
      deleteResume(id);
      setResumes(getAllResumes());
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Nav */}
      <nav className="sticky top-0 z-50 glass border-b border-white/60">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 brand-gradient rounded-lg flex items-center justify-center text-white text-xs font-bold">R</div>
            <span className="font-bold text-slate-900 text-lg">ResumeAI</span>
          </Link>
          <Link href="/create" className="brand-gradient text-white text-sm font-medium px-4 py-2 rounded-full hover:opacity-90 transition-opacity">
            + New Resume
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Resumes</h1>
            <p className="text-slate-500 mt-1">{resumes.length} resume{resumes.length !== 1 ? "s" : ""} saved locally</p>
          </div>
        </div>

        {resumes.length === 0 ? (
          <div className="text-center py-32">
            <div className="text-6xl mb-6">📄</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">No resumes yet</h2>
            <p className="text-slate-500 mb-8">Create your first resume and it'll appear here.</p>
            <Link href="/create" className="brand-gradient text-white font-semibold px-8 py-4 rounded-2xl hover:opacity-90 transition-opacity">
              Build my first resume →
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((r) => {
              const tpl = TEMPLATES.find((t) => t.id === r.template) ?? TEMPLATES[0];
              return (
                <div key={r.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm card-hover overflow-hidden">
                  <div className={`h-2 brand-gradient`} />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-slate-900 text-lg leading-tight">{r.title || "Untitled Resume"}</h3>
                        <p className="text-sm text-slate-500 mt-0.5">{r.personalInfo.fullName || "No name set"}</p>
                      </div>
                      <span className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full font-medium shrink-0">{tpl.name}</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-5">Updated {new Date(r.updatedAt).toLocaleDateString()}</p>
                    <div className="flex gap-2">
                      <Link href={`/create?id=${r.id}`} className="flex-1 text-center text-sm font-medium py-2 px-3 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors">
                        Edit
                      </Link>
                      <button onClick={() => handleDelete(r.id)} className="text-sm font-medium py-2 px-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            {/* New card */}
            <Link href="/create" className="bg-white rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-12 text-slate-400 hover:border-indigo-300 hover:text-indigo-500 transition-colors card-hover">
              <div className="text-4xl mb-3">+</div>
              <span className="text-sm font-medium">New Resume</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
