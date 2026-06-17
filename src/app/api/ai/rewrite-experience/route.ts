import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {
  try {
    const { experience, jobDescription } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "GROQ_API_KEY not configured" }, { status: 500 });
    }

    const prompt = `Rewrite these resume experience bullet points to be ATS-optimized and tailored to the job description.

Role: ${experience.role}
Company: ${experience.company}
Current Description:
${experience.description}

Target Job Description:
${jobDescription || "General professional role"}

Rules:
- Return ONLY bullet points, one per line, starting with •
- Start each bullet with a strong action verb (Led, Built, Reduced, Increased, Designed, etc.)
- Include metrics and numbers where logical
- Add relevant keywords from the job description naturally
- 4-6 bullet points max
- No preamble, no labels, just the bullet points`;

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
      max_tokens: 400,
    });

    const description = (completion.choices[0].message.content || "").trim();
    return NextResponse.json({ description });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
