// hooks/useChat.ts

"use client";

import { useState } from "react";
import { useAuth } from "../components/AuthContext";
import { supabase } from "../lib/supabase";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function useChat() {
  const { user } = useAuth();
  const [history, setHistory] = useState<ChatMessage[]>([]);

  const send = async (content: string) => {
    if (!user) {
      console.error("Not authenticated");
      return;
    }

    // 1️⃣ Append user message to state and persist it
    const userMsg: ChatMessage = { role: "user", content };
    setHistory((h) => [...h, userMsg]);
    await supabase.from("interactions").insert({
      user_id: user.uid,
      role: userMsg.role,
      content: userMsg.content,
    });

    // 2️⃣ Call the chat API
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [...history, userMsg] }),
    });
    const data = await res.json();

    // 3️⃣ Append assistant reply to state and persist it
    if (res.ok && data.reply) {
      const botMsg: ChatMessage = data.reply;
      setHistory((h) => [...h, botMsg]);
      await supabase.from("interactions").insert({
        user_id: user.uid,
        role: botMsg.role,
        content: botMsg.content,
      });
    } else {
      console.error("Chat error:", data.error);
    }
  };

  return { history, send };
}
