import { NextResponse } from "next/server";

// MongoDB removed — resumes are stored in localStorage on the client.
// These routes are kept as stubs for future backend integration.

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({ success: true, data: body });
}

export async function GET() {
  return NextResponse.json({ success: true, data: [] });
}
