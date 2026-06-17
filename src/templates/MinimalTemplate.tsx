import { ResumeData } from "@/types/resume";

export default function MinimalTemplate({ data }: { data: ResumeData }) {
  const { personalInfo: p, summary, skills, experience, education, projects } = data;
  const skillList = skills.split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <div id="resume-print" className="bg-white text-slate-900 font-sans" style={{ fontFamily: "'Times New Roman', Georgia, serif", fontSize: "11px", lineHeight: "1.5", padding: "40px", minHeight: "1123px", width: "794px" }}>
      {/* Header */}
      <div style={{ borderBottom: "2px solid #1e293b", paddingBottom: "16px", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: 700, letterSpacing: "-0.5px", fontFamily: "Arial, sans-serif", marginBottom: "6px" }}>
          {p.fullName || "Your Name"}
        </h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", color: "#475569", fontSize: "10px" }}>
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>· {p.phone}</span>}
          {p.location && <span>· {p.location}</span>}
          {p.linkedin && <span>· {p.linkedin}</span>}
          {p.github && <span>· {p.github}</span>}
        </div>
      </div>

      {summary && (
        <Section title="Summary">
          <p style={{ color: "#334155" }}>{summary}</p>
        </Section>
      )}

      {skillList.length > 0 && (
        <Section title="Skills">
          <p style={{ color: "#334155" }}>{skillList.join(" · ")}</p>
        </Section>
      )}

      {experience.some((e) => e.company) && (
        <Section title="Experience">
          {experience.filter((e) => e.company).map((exp) => (
            <div key={exp.id} style={{ marginBottom: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div>
                  <strong style={{ fontSize: "12px" }}>{exp.role}</strong>
                  <span style={{ color: "#64748b" }}> — {exp.company}</span>
                </div>
                <span style={{ color: "#64748b", fontSize: "10px", whiteSpace: "nowrap" }}>{exp.startDate}{exp.startDate && " – "}{exp.current ? "Present" : exp.endDate}</span>
              </div>
              {exp.description && (
                <ul style={{ marginTop: "6px", paddingLeft: "16px", color: "#334155" }}>
                  {exp.description.split("\n").filter(Boolean).map((line, i) => <li key={i} style={{ marginBottom: "2px" }}>{line.replace(/^[-•]\s*/, "")}</li>)}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

      {education.some((e) => e.college) && (
        <Section title="Education">
          {education.filter((e) => e.college).map((edu) => (
            <div key={edu.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <div>
                <strong style={{ fontSize: "12px" }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ""}</strong>
                <div style={{ color: "#64748b" }}>{edu.college}{edu.gpa ? ` · GPA: ${edu.gpa}` : ""}</div>
              </div>
              <span style={{ color: "#64748b", fontSize: "10px", whiteSpace: "nowrap" }}>{edu.startYear}{edu.startYear && " – "}{edu.endYear}</span>
            </div>
          ))}
        </Section>
      )}

      {projects.some((p) => p.title) && (
        <Section title="Projects">
          {projects.filter((p) => p.title).map((proj) => (
            <div key={proj.id} style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong style={{ fontSize: "12px" }}>{proj.title}</strong>
                {proj.github && <a href={proj.github} style={{ color: "#6366f1", fontSize: "10px" }}>GitHub</a>}
              </div>
              {proj.description && <p style={{ color: "#334155", marginTop: "3px" }}>{proj.description}</p>}
              {proj.techStack && <p style={{ color: "#64748b", marginTop: "3px" }}><em>{proj.techStack}</em></p>}
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <h2 style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: "#1e293b", borderBottom: "1px solid #e2e8f0", paddingBottom: "4px", marginBottom: "10px", fontFamily: "Arial, sans-serif" }}>
        {title}
      </h2>
      {children}
    </div>
  );
}
