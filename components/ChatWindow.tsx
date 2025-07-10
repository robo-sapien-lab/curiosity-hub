// components/ChatWindow.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useChat, ChatMessage } from "../hooks/useChat";
import { format } from "date-fns";

export function ChatWindow() {
  const [input, setInput] = useState("");
  const { history, send } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    await send(text);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full max-h-[70vh] w-full md:w-3/4 lg:w-1/2 mx-auto bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      {/* Message container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {history.map((msg: ChatMessage, idx: number) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg whitespace-pre-wrap break-words
                ${
                  msg.role === "user"
                    ? "bg-blue-100 text-blue-900 rounded-br-none"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none"
                }`}
            >
              <div>{msg.content}</div>
              <div className="text-xs text-gray-500 mt-1 text-right">
                {format(new Date(), "hh:mm a")}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="border-t p-4 bg-gray-50 dark:bg-gray-900 flex">
        <input
          className="flex-1 rounded-l-lg border border-gray-300 dark:border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              handleSubmit(e);
            }
          }}
          autoFocus
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 disabled:opacity-50"
          disabled={!input.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
}
