import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {
  try {
    const { jobDescription } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "GROQ_API_KEY not configured" }, { status: 500 });
    }

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are a resume ATS analyzer. Return ONLY valid JSON with no markdown, no explanation.
{
  "role": "string",
  "seniority": "string",
  "technicalSkills": ["string"],
  "softSkills": ["string"],
  "keywords": ["string"],
  "requiredExperience": "string"
}`,
        },
        { role: "user", content: jobDescription },
      ],
      temperature: 0.1,
      max_tokens: 800,
    });

    const text = completion.choices[0].message.content || "{}";
    const cleaned = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);
    return NextResponse.json(parsed);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
