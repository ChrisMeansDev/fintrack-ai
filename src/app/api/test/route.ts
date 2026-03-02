// src/app/api/test/route.ts
import { NextRequest, NextResponse } from "next/server";

// Named GET handler
export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "API Test Successful!" });
}

// Optional POST handler
export async function POST(req: NextRequest) {
  const body = await req.json();
  return NextResponse.json({ received: body });
}