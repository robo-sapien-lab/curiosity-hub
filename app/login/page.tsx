// app/login/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../components/AuthContext";
import { SignInButton } from "../../components/SignInButton";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("[LoginPage] loading:", loading, "user:", user);
    if (!loading && user) {
      console.log("[LoginPage] redirecting to /");
      router.replace("/");
    }
  }, [loading, user, router]);

  if (loading) {
    return <div>Loading…</div>;
  }

  return (
    <div>
      <h1>Welcome to Avyra.ai</h1>
      <SignInButton />
    </div>
  );
}
