import { ResumeData } from "@/types/resume";

export default function ExecutiveTemplate({ data }: { data: ResumeData }) {
  const { personalInfo: p, summary, skills, experience, education, projects } = data;
  const skillList = skills.split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <div id="resume-print" style={{ background: "#fff", width: "794px", minHeight: "1123px", fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "11px", lineHeight: "1.6", padding: "48px 52px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", borderBottom: "3px double #0f172a", paddingBottom: "20px", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "#0f172a", fontFamily: "Arial, sans-serif", marginBottom: "8px" }}>
          {p.fullName || "Your Name"}
        </h1>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "16px", color: "#64748b", fontSize: "10px", fontFamily: "Arial, sans-serif" }}>
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>|</span>}
          {p.phone && <span>{p.phone}</span>}
          {p.location && <span>|</span>}
          {p.location && <span>{p.location}</span>}
          {p.linkedin && <span>|</span>}
          {p.linkedin && <span>{p.linkedin}</span>}
        </div>
      </div>

      {summary && (
        <ExecSection title="Executive Summary">
          <p style={{ color: "#1e293b", fontStyle: "italic", textAlign: "justify" }}>{summary}</p>
        </ExecSection>
      )}

      {skillList.length > 0 && (
        <ExecSection title="Core Competencies">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "4px" }}>
            {skillList.map((s) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: "6px", color: "#334155", fontSize: "10px" }}>
                <span style={{ color: "#0f172a" }}>◆</span> {s}
              </div>
            ))}
          </div>
        </ExecSection>
      )}

      {experience.some((e) => e.company) && (
        <ExecSection title="Professional Experience">
          {experience.filter((e) => e.company).map((exp) => (
            <div key={exp.id} style={{ marginBottom: "18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <strong style={{ fontSize: "12px", color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.5px", fontFamily: "Arial, sans-serif" }}>{exp.role}</strong>
                <span style={{ color: "#64748b", fontSize: "10px", fontFamily: "Arial, sans-serif" }}>{exp.startDate}{exp.startDate && " – "}{exp.current ? "Present" : exp.endDate}</span>
              </div>
              <div style={{ fontStyle: "italic", color: "#475569", marginBottom: "6px", fontFamily: "Arial, sans-serif", fontSize: "10px" }}>{exp.company}</div>
              {exp.description && (
                <ul style={{ paddingLeft: "18px", color: "#334155" }}>
                  {exp.description.split("\n").filter(Boolean).map((line, i) => <li key={i} style={{ marginBottom: "3px" }}>{line.replace(/^[-•]\s*/, "")}</li>)}
                </ul>
              )}
            </div>
          ))}
        </ExecSection>
      )}

      {education.some((e) => e.college) && (
        <ExecSection title="Education">
          {education.filter((e) => e.college).map((edu) => (
            <div key={edu.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <div>
                <strong style={{ color: "#0f172a", fontFamily: "Arial, sans-serif", fontSize: "11px" }}>{edu.degree}{edu.field ? `, ${edu.field}` : ""}</strong>
                <div style={{ color: "#475569", fontStyle: "italic" }}>{edu.college}</div>
              </div>
              <span style={{ color: "#64748b", fontSize: "10px", fontFamily: "Arial, sans-serif" }}>{edu.startYear}{edu.startYear && "–"}{edu.endYear}</span>
            </div>
          ))}
        </ExecSection>
      )}

      {projects.some((p) => p.title) && (
        <ExecSection title="Notable Projects">
          {projects.filter((p) => p.title).map((proj) => (
            <div key={proj.id} style={{ marginBottom: "12px" }}>
              <strong style={{ color: "#0f172a", fontFamily: "Arial, sans-serif" }}>{proj.title}</strong>
              {proj.github && <span style={{ color: "#64748b", fontSize: "9px", marginLeft: "8px" }}>{proj.github}</span>}
              {proj.description && <p style={{ color: "#334155", marginTop: "3px" }}>{proj.description}</p>}
            </div>
          ))}
        </ExecSection>
      )}
    </div>
  );
}

function ExecSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h2 style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: "#0f172a", fontFamily: "Arial, sans-serif", marginBottom: "8px", paddingBottom: "4px", borderBottom: "1px solid #cbd5e1" }}>
        {title}
      </h2>
      {children}
    </div>
  );
}
