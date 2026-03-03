// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Make sure your .env has OPENAI_API_KEY=sk-...
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    const aiMessage = response.choices[0].message?.content || "";

    return NextResponse.json({ message: aiMessage });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Optional GET route for testing
export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "Chat API is up!" });
}