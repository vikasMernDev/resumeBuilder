import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {
  try {
    const { formData, jobDescription } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "GROQ_API_KEY not configured" }, { status: 500 });
    }

    const prompt = `Generate a concise, ATS-optimized professional resume summary (3-5 sentences max).

Candidate:
Name: ${formData.personalInfo?.fullName || "the candidate"}
Skills: ${formData.skills || "not provided"}
Experience: ${(formData.experience || []).filter((e: {company:string}) => e.company).map((e: {role:string;company:string}) => `${e.role} at ${e.company}`).join("; ")}

Job Description:
${jobDescription || "General professional role"}

Rules:
- ATS-optimized with relevant keywords from the job description
- Professional and achievement-focused tone
- Start with a strong opening line
- Include years of experience if available
- Mention 2-3 key skills naturally
- Return ONLY the summary text, no labels or formatting`;

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
      max_tokens: 300,
    });

    const summary = (completion.choices[0].message.content || "").trim();
    return NextResponse.json({ summary });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
