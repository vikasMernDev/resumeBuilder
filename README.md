# ResumeAI — AI-Powered ATS Resume Builder

A production-ready resume builder with 5 professional templates, AI skills extraction, ATS scoring, and one-click PDF export. No backend, no database — everything lives in the browser.

## Features

- **5 Templates**: Minimal, Modern (sidebar), Executive, Creative, Compact
- **AI-powered**: Paste any JD → extract skills, score ATS match, generate summary, rewrite experience
- **ATS Score**: Real-time keyword matching with a visual score ring
- **PDF Export**: Pixel-perfect A4 PDF download
- **No login required**: Resumes saved to localStorage

## Setup

```bash
npm install
cp .env.local.example .env.local
# Add your GROQ API key (free at https://console.groq.com)
npm run dev
```

## Environment Variables

```
GROQ_API_KEY=your_groq_api_key_here
```

## Deploy

### Vercel
```bash
npx vercel
# Add GROQ_API_KEY in Vercel environment variables
```

### Netlify
```bash
npm run build
# Deploy the .next folder, add GROQ_API_KEY in site settings
```

## Tech Stack

- **Next.js 15** (App Router)
- **Tailwind CSS v4**
- **Groq API** (LLaMA 3.3 70B) for AI features
- **jsPDF + html-to-image** for PDF export
- **localStorage** for data persistence (no database needed)

## Removing MongoDB

MongoDB has been completely removed. The `/api/resumes` route is now a stub. All resume data is stored in `localStorage` via `src/lib/storage.ts`.
