import { ResumeData } from "@/types/resume";

export default function CompactTemplate({ data }: { data: ResumeData }) {
  const { personalInfo: p, summary, skills, experience, education, projects } = data;
  const skillList = skills.split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <div id="resume-print" style={{ background: "#fff", width: "794px", minHeight: "1123px", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "10px", lineHeight: "1.4", padding: "28px 36px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: "10px", marginBottom: "12px", borderBottom: "2px solid #059669" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#064e3b", letterSpacing: "-0.5px", marginBottom: "3px" }}>{p.fullName || "Your Name"}</h1>
          <div style={{ display: "flex", gap: "10px", color: "#374151", flexWrap: "wrap" }}>
            {p.email && <span>{p.email}</span>}
            {p.phone && <span>· {p.phone}</span>}
            {p.location && <span>· {p.location}</span>}
          </div>
        </div>
        <div style={{ textAlign: "right", color: "#059669", fontSize: "9px" }}>
          {p.linkedin && <div>{p.linkedin}</div>}
          {p.github && <div>{p.github}</div>}
          {p.website && <div>{p.website}</div>}
        </div>
      </div>

      {summary && (
        <CompactSection title="Summary" accent="#059669">
          <p style={{ color: "#374151" }}>{summary}</p>
        </CompactSection>
      )}

      {skillList.length > 0 && (
        <CompactSection title="Skills" accent="#059669">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {skillList.map((s) => (
              <span key={s} style={{ background: "#ecfdf5", color: "#065f46", border: "1px solid #6ee7b7", padding: "1px 8px", borderRadius: "4px", fontSize: "9px", fontWeight: 600 }}>{s}</span>
            ))}
          </div>
        </CompactSection>
      )}

      {experience.some((e) => e.company) && (
        <CompactSection title="Experience" accent="#059669">
          {experience.filter((e) => e.company).map((exp) => (
            <div key={exp.id} style={{ marginBottom: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span><strong style={{ color: "#064e3b" }}>{exp.role}</strong><span style={{ color: "#6b7280" }}> · {exp.company}</span></span>
                <span style={{ color: "#9ca3af", fontSize: "9px", whiteSpace: "nowrap", marginLeft: "8px" }}>{exp.startDate}{exp.startDate && "–"}{exp.current ? "Present" : exp.endDate}</span>
              </div>
              {exp.description && (
                <div style={{ marginTop: "3px", paddingLeft: "10px" }}>
                  {exp.description.split("\n").filter(Boolean).map((line, i) => (
                    <div key={i} style={{ color: "#374151", marginBottom: "1px" }}>• {line.replace(/^[-•]\s*/, "")}</div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </CompactSection>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {education.some((e) => e.college) && (
          <CompactSection title="Education" accent="#059669">
            {education.filter((e) => e.college).map((edu) => (
              <div key={edu.id} style={{ marginBottom: "8px" }}>
                <strong style={{ color: "#064e3b" }}>{edu.degree}</strong>
                <div style={{ color: "#6b7280" }}>{edu.college}</div>
                <div style={{ color: "#9ca3af", fontSize: "9px" }}>{edu.startYear}{edu.startYear && "–"}{edu.endYear}</div>
              </div>
            ))}
          </CompactSection>
        )}

        {projects.some((p) => p.title) && (
          <CompactSection title="Projects" accent="#059669">
            {projects.filter((p) => p.title).map((proj) => (
              <div key={proj.id} style={{ marginBottom: "8px" }}>
                <strong style={{ color: "#064e3b" }}>{proj.title}</strong>
                {proj.github && <span style={{ color: "#059669", fontSize: "8px", marginLeft: "6px" }}>↗ GitHub</span>}
                {proj.description && <div style={{ color: "#374151", fontSize: "9px", marginTop: "2px" }}>{proj.description}</div>}
                {proj.techStack && <div style={{ color: "#059669", fontSize: "8px", marginTop: "2px" }}>{proj.techStack}</div>}
              </div>
            ))}
          </CompactSection>
        )}
      </div>
    </div>
  );
}

function CompactSection({ title, children, accent }: { title: string; children: React.ReactNode; accent: string }) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <h2 style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: accent, marginBottom: "6px" }}>{title}</h2>
      {children}
    </div>
  );
}
