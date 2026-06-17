import { ResumeData } from "@/types/resume";

export default function ModernTemplate({ data }: { data: ResumeData }) {
  const { personalInfo: p, summary, skills, experience, education, projects } = data;
  const skillList = skills.split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <div id="resume-print" style={{ display: "flex", width: "794px", minHeight: "1123px", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "11px", lineHeight: "1.5" }}>
      {/* Sidebar */}
      <div style={{ width: "220px", background: "#6366f1", color: "white", padding: "32px 20px", flexShrink: 0 }}>
        <div style={{ marginBottom: "28px" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: 700, marginBottom: "12px" }}>
            {(p.fullName || "?")[0].toUpperCase()}
          </div>
          <h1 style={{ fontSize: "16px", fontWeight: 700, lineHeight: "1.3", marginBottom: "4px" }}>{p.fullName || "Your Name"}</h1>
        </div>

        <SideSection title="Contact">
          {p.email && <ContactLine icon="✉" text={p.email} />}
          {p.phone && <ContactLine icon="☎" text={p.phone} />}
          {p.location && <ContactLine icon="⌖" text={p.location} />}
          {p.linkedin && <ContactLine icon="in" text={p.linkedin} />}
          {p.github && <ContactLine icon="⌥" text={p.github} />}
        </SideSection>

        {skillList.length > 0 && (
          <SideSection title="Skills">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
              {skillList.map((s) => (
                <span key={s} style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "4px", padding: "2px 7px", fontSize: "9px", fontWeight: 500 }}>{s}</span>
              ))}
            </div>
          </SideSection>
        )}

        {education.some((e) => e.college) && (
          <SideSection title="Education">
            {education.filter((e) => e.college).map((edu) => (
              <div key={edu.id} style={{ marginBottom: "10px" }}>
                <div style={{ fontWeight: 600, fontSize: "10px" }}>{edu.degree}</div>
                <div style={{ opacity: 0.8, fontSize: "9px" }}>{edu.college}</div>
                <div style={{ opacity: 0.6, fontSize: "9px" }}>{edu.startYear}{edu.startYear && "–"}{edu.endYear}</div>
              </div>
            ))}
          </SideSection>
        )}
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: "32px 28px", background: "#fff" }}>
        {summary && (
          <MainSection title="Profile" accent="#6366f1">
            <p style={{ color: "#334155" }}>{summary}</p>
          </MainSection>
        )}

        {experience.some((e) => e.company) && (
          <MainSection title="Experience" accent="#6366f1">
            {experience.filter((e) => e.company).map((exp) => (
              <div key={exp.id} style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <strong style={{ fontSize: "12px", color: "#1e293b" }}>{exp.role}</strong>
                  <span style={{ color: "#94a3b8", fontSize: "9px" }}>{exp.startDate}{exp.startDate && " – "}{exp.current ? "Present" : exp.endDate}</span>
                </div>
                <div style={{ color: "#6366f1", fontWeight: 500, fontSize: "10px", marginBottom: "4px" }}>{exp.company}</div>
                {exp.description && (
                  <ul style={{ paddingLeft: "14px", color: "#475569" }}>
                    {exp.description.split("\n").filter(Boolean).map((line, i) => <li key={i} style={{ marginBottom: "2px" }}>{line.replace(/^[-•]\s*/, "")}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </MainSection>
        )}

        {projects.some((p) => p.title) && (
          <MainSection title="Projects" accent="#6366f1">
            {projects.filter((p) => p.title).map((proj) => (
              <div key={proj.id} style={{ marginBottom: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong style={{ fontSize: "12px", color: "#1e293b" }}>{proj.title}</strong>
                  {proj.github && <a href={proj.github} style={{ color: "#6366f1", fontSize: "9px" }}>GitHub ↗</a>}
                </div>
                {proj.description && <p style={{ color: "#475569", marginTop: "3px" }}>{proj.description}</p>}
                {proj.techStack && <p style={{ color: "#6366f1", fontSize: "9px", marginTop: "3px" }}>{proj.techStack}</p>}
              </div>
            ))}
          </MainSection>
        )}
      </div>
    </div>
  );
}

function SideSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <div style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", opacity: 0.7, borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: "4px", marginBottom: "10px" }}>{title}</div>
      {children}
    </div>
  );
}

function ContactLine({ icon, text }: { icon: string; text: string }) {
  return (
    <div style={{ display: "flex", gap: "6px", alignItems: "flex-start", marginBottom: "5px", fontSize: "9px", opacity: 0.9 }}>
      <span style={{ opacity: 0.7, minWidth: "12px" }}>{icon}</span>
      <span style={{ wordBreak: "break-all" }}>{text}</span>
    </div>
  );
}

function MainSection({ title, children, accent }: { title: string; children: React.ReactNode; accent: string }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
        <div style={{ width: "4px", height: "16px", background: accent, borderRadius: "2px" }} />
        <h2 style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b", textTransform: "uppercase", letterSpacing: "1px" }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}
