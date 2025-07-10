// app/api/chat/route.ts

import { NextResponse } from "next/server";

// Define the chat message shape
export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Request payload for our endpoint
export interface ChatRequest {
  messages: ChatMessage[];
}

// Groq OpenAI-compatible Chat Completion endpoint
enum Headers {
  Authorization = "Authorization",
  ContentType = "Content-Type",
}

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function POST(request: Request) {
  // Debug log
  console.log("[chat route] Using Groq endpoint:", GROQ_API_URL);

  try {
    const { messages } = (await request.json()) as ChatRequest;
    console.log("[chat route] Messages:", messages);

    // Build the Groq-compatible payload (OpenAI-compatible format)
    const payload = {
      model: process.env.GROQ_MODEL,
      messages: messages,
      temperature: 0.7,
      max_tokens: 512,
      top_p: 1,
      stream: false,
      stop: null,
    };
    console.log("[chat route] Payload:", payload);

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        [Headers.Authorization]: `Bearer ${process.env.GROQ_API_KEY}`,
        [Headers.ContentType]: "application/json",
      },
      body: JSON.stringify(payload),
    });
    console.log("[chat route] Groq status =", response.status);

    if (!response.ok) {
      const errText = await response.text();
      console.error("[chat route] Groq error:", errText);
      return NextResponse.json({ error: errText }, { status: response.status });
    }

    const data = await response.json();
    console.log("[chat route] Groq response =", data);

    // OpenAI-compatible response: assume data.choices[0].message.content
    const replyContent = data.choices[0]?.message?.content ?? "";
    console.log("[chat route] Reply =", replyContent);

    return NextResponse.json({ reply: { role: "assistant", content: replyContent } });
  } catch (err) {
    console.error("[chat route] Server error:", err);
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
