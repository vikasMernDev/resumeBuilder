import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "ResumeAI – Build ATS-Optimized Resumes with AI",
  description: "Create professional, ATS-friendly resumes in minutes. Powered by AI to match any job description.",
  keywords: "resume builder, ATS resume, AI resume, job application, CV builder",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-slate-50">{children}</body>
    </html>
  );
}
