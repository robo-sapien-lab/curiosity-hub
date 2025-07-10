// app/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../components/AuthContext";
import { ChatWindow } from "../components/ChatWindow";

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("[HomePage] loading:", loading, "user:", user);
    if (!loading && !user) {
      console.log("[HomePage] redirecting to /login");
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return <div>Loading…</div>;
  }

  return (
    <>
      <h1>Hello, {user.displayName}</h1>
      <ChatWindow />
    </>
  );
}
