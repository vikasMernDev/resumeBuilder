import { ResumeData } from "@/types/resume";

export default function CreativeTemplate({ data }: { data: ResumeData }) {
  const { personalInfo: p, summary, skills, experience, education, projects } = data;
  const skillList = skills.split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <div id="resume-print" style={{ width: "794px", minHeight: "1123px", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "11px", lineHeight: "1.5", background: "#fff" }}>
      {/* Top accent bar */}
      <div style={{ height: "6px", background: "linear-gradient(90deg, #7c3aed, #a78bfa, #6d28d9)" }} />

      <div style={{ padding: "32px 40px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" }}>
          <div>
            <h1 style={{ fontSize: "30px", fontWeight: 800, color: "#1e1b4b", letterSpacing: "-1px", marginBottom: "4px" }}>
              {p.fullName || "Your Name"}
            </h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", fontSize: "10px", color: "#6d28d9" }}>
              {p.email && <span>✉ {p.email}</span>}
              {p.phone && <span>☎ {p.phone}</span>}
              {p.location && <span>⌖ {p.location}</span>}
              {p.linkedin && <span>in {p.linkedin}</span>}
              {p.github && <span>⌥ {p.github}</span>}
            </div>
          </div>
          <div style={{ width: "56px", height: "56px", borderRadius: "12px", background: "linear-gradient(135deg, #7c3aed, #a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "22px", fontWeight: 800, flexShrink: 0 }}>
            {(p.fullName || "?")[0].toUpperCase()}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
          {/* Left */}
          <div>
            {summary && (
              <CreativeSection title="About Me" color="#7c3aed">
                <p style={{ color: "#334155" }}>{summary}</p>
              </CreativeSection>
            )}

            {experience.some((e) => e.company) && (
              <CreativeSection title="Experience" color="#7c3aed">
                {experience.filter((e) => e.company).map((exp) => (
                  <div key={exp.id} style={{ marginBottom: "14px", paddingLeft: "12px", borderLeft: "3px solid #a78bfa" }}>
                    <strong style={{ color: "#1e1b4b" }}>{exp.role}</strong>
                    <div style={{ color: "#7c3aed", fontSize: "10px", fontWeight: 600 }}>{exp.company}</div>
                    <div style={{ color: "#94a3b8", fontSize: "9px", marginBottom: "4px" }}>{exp.startDate}{exp.startDate && "–"}{exp.current ? "Present" : exp.endDate}</div>
                    {exp.description && exp.description.split("\n").filter(Boolean).map((line, i) => (
                      <div key={i} style={{ color: "#475569", fontSize: "10px", marginBottom: "2px" }}>• {line.replace(/^[-•]\s*/, "")}</div>
                    ))}
                  </div>
                ))}
              </CreativeSection>
            )}
          </div>

          {/* Right */}
          <div>
            {skillList.length > 0 && (
              <CreativeSection title="Skills" color="#7c3aed">
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                  {skillList.map((s) => (
                    <span key={s} style={{ background: "#f5f3ff", color: "#6d28d9", border: "1px solid #ddd6fe", padding: "3px 10px", borderRadius: "20px", fontSize: "9px", fontWeight: 600 }}>{s}</span>
                  ))}
                </div>
              </CreativeSection>
            )}

            {education.some((e) => e.college) && (
              <CreativeSection title="Education" color="#7c3aed">
                {education.filter((e) => e.college).map((edu) => (
                  <div key={edu.id} style={{ marginBottom: "10px" }}>
                    <strong style={{ color: "#1e1b4b" }}>{edu.degree}</strong>
                    <div style={{ color: "#475569", fontSize: "10px" }}>{edu.college}</div>
                    <div style={{ color: "#94a3b8", fontSize: "9px" }}>{edu.startYear}{edu.startYear && "–"}{edu.endYear}</div>
                  </div>
                ))}
              </CreativeSection>
            )}

            {projects.some((p) => p.title) && (
              <CreativeSection title="Projects" color="#7c3aed">
                {projects.filter((p) => p.title).map((proj) => (
                  <div key={proj.id} style={{ marginBottom: "12px", background: "#faf5ff", borderRadius: "8px", padding: "8px 10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <strong style={{ color: "#1e1b4b", fontSize: "10px" }}>{proj.title}</strong>
                      {proj.github && <a href={proj.github} style={{ color: "#7c3aed", fontSize: "8px" }}>↗</a>}
                    </div>
                    {proj.description && <p style={{ color: "#475569", fontSize: "9px", marginTop: "3px" }}>{proj.description}</p>}
                    {proj.techStack && <p style={{ color: "#7c3aed", fontSize: "8px", marginTop: "3px" }}>{proj.techStack}</p>}
                  </div>
                ))}
              </CreativeSection>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CreativeSection({ title, children, color }: { title: string; children: React.ReactNode; color: string }) {
  return (
    <div style={{ marginBottom: "22px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
        <div style={{ width: "20px", height: "3px", background: color, borderRadius: "2px" }} />
        <h2 style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}
