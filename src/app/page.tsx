import Link from "next/link";
import { TEMPLATES } from "@/lib/templates";

const features = [
  { icon: "✦", title: "AI-Powered Writing", desc: "Paste any job description and our AI extracts keywords, rewrites your bullets, and generates a tailored summary in seconds." },
  { icon: "⌖", title: "ATS Score Checker", desc: "Know exactly how your resume scores against applicant tracking systems before you hit submit." },
  { icon: "▣", title: "5 Professional Templates", desc: "From minimal to executive — every template is ATS-safe and printer-ready at A4 size." },
  { icon: "↓", title: "One-Click PDF Export", desc: "Download a pixel-perfect PDF anytime. Your resume is always saved locally in your browser." },
];

const steps = [
  { n: "01", title: "Choose a template", desc: "Pick from 5 professionally designed layouts." },
  { n: "02", title: "Fill in your details", desc: "Personal info, experience, education, projects — all in a clean sidebar form." },
  { n: "03", title: "Paste a job description", desc: "Let AI match your resume to the role with one click." },
  { n: "04", title: "Download & apply", desc: "Export a polished PDF and land more interviews." },
];

const TemplateSwatch = ({ t }: { t: typeof TEMPLATES[0] }) => {
  const colorMap: Record<string, string> = {
    minimal: "bg-slate-100 border border-slate-200",
    modern: "bg-indigo-600",
    executive: "bg-slate-900",
    creative: "bg-violet-600",
    compact: "bg-emerald-600",
  };

  return (
    <div className="group relative rounded-2xl overflow-hidden card-hover cursor-pointer border border-slate-200 bg-white shadow-sm">
      {/* Mock preview */}
      <div className={`h-44 ${colorMap[t.id]} relative`}>
        <div className="absolute inset-0 flex flex-col gap-2 p-4 opacity-60">
          <div className={`h-3 w-2/3 rounded-full ${t.id === "minimal" ? "bg-slate-300" : "bg-white/40"}`} />
          <div className={`h-2 w-1/2 rounded-full ${t.id === "minimal" ? "bg-slate-200" : "bg-white/25"}`} />
          <div className="mt-2 flex gap-2">
            {[1,2,3].map(i => <div key={i} className={`h-2 w-12 rounded-full ${t.id === "minimal" ? "bg-slate-200" : "bg-white/20"}`} />)}
          </div>
          <div className={`mt-2 h-1 w-full rounded ${t.id === "minimal" ? "bg-slate-200" : "bg-white/15"}`} />
          <div className={`h-1 w-4/5 rounded ${t.id === "minimal" ? "bg-slate-200" : "bg-white/15"}`} />
          <div className={`h-1 w-3/5 rounded ${t.id === "minimal" ? "bg-slate-200" : "bg-white/15"}`} />
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-semibold text-slate-900">{t.name}</h3>
          <div className="flex gap-1">
            {t.tags.slice(0,2).map(tag => (
              <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-medium">{tag}</span>
            ))}
          </div>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">{t.description}</p>
      </div>

      <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/5 transition-colors flex items-center justify-center">
        <Link
          href={`/create?template=${t.id}`}
          className="opacity-0 group-hover:opacity-100 transition-opacity brand-gradient text-white text-sm font-medium px-5 py-2 rounded-full shadow-lg"
        >
          Use template →
        </Link>
      </div>
    </div>
  );
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 glass border-b border-white/60">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 brand-gradient rounded-lg flex items-center justify-center text-white text-xs font-bold">R</div>
            <span className="font-bold text-slate-900 text-lg">ResumeAI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/resumes" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">My Resumes</Link>
            <Link href="/create" className="brand-gradient text-white text-sm font-medium px-4 py-2 rounded-full hover:opacity-90 transition-opacity">
              Create Resume
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_#eef2ff_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_#f5f3ff_0%,_transparent_60%)]" />
        <div className="relative max-w-6xl mx-auto px-6 py-28 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium mb-8">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
            AI-powered · ATS-optimized · Free to use
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight tracking-tight mb-6">
            Resumes that<br />
            <span className="brand-gradient-text">get past the bots</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Paste a job description. Let AI extract the right keywords, rewrite your bullets, and score your resume — all before you apply.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/create" className="brand-gradient text-white font-semibold px-8 py-4 rounded-2xl text-base hover:opacity-90 transition-opacity shadow-lg shadow-indigo-200">
              Build my resume →
            </Link>
            <Link href="#templates" className="bg-white text-slate-700 font-semibold px-8 py-4 rounded-2xl text-base border border-slate-200 hover:bg-slate-50 transition-colors">
              Browse templates
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[["5", "Templates"], ["3", "AI features"], ["ATS", "Optimized"]].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-bold brand-gradient-text">{num}</div>
                <div className="text-xs text-slate-500 mt-1 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need to land the interview</h2>
            <p className="text-slate-500 text-lg">No fluff. Just the tools that actually move the needle.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm card-hover">
                <div className="text-2xl mb-4 text-indigo-500 font-bold">{f.icon}</div>
                <h3 className="font-semibold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">5 templates. One for every role.</h2>
            <p className="text-slate-500 text-lg">All templates pass ATS scanners and export to clean PDF.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {TEMPLATES.map((t) => <TemplateSwatch key={t.id} t={t} />)}
          </div>
          <div className="text-center mt-10">
            <Link href="/create" className="brand-gradient text-white font-semibold px-8 py-4 rounded-2xl text-base hover:opacity-90 transition-opacity shadow-lg shadow-indigo-200">
              Start building for free →
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">From blank page to offer letter</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {steps.map((s) => (
              <div key={s.n} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex gap-5">
                <div className="text-3xl font-bold brand-gradient-text opacity-40 shrink-0 leading-none">{s.n}</div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{s.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 brand-gradient">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to land more interviews?</h2>
          <p className="text-indigo-200 text-lg mb-8">Free, no account required. Your data stays in your browser.</p>
          <Link href="/create" className="inline-block bg-white text-indigo-700 font-bold px-10 py-4 rounded-2xl text-base hover:bg-indigo-50 transition-colors shadow-lg">
            Create my resume →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-500 text-sm py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 brand-gradient rounded-md flex items-center justify-center text-white text-xs font-bold">R</div>
            <span className="text-slate-400 font-medium">ResumeAI</span>
          </div>
          <p>© {new Date().getFullYear()} ResumeAI. Built for job seekers.</p>
        </div>
      </footer>
    </div>
  );
}
