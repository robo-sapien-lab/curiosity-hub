// components/SignInButton.tsx
"use client";

import { signInWithRedirect } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";

export function SignInButton() {
  const handleRedirectSignIn = () => {
    signInWithRedirect(auth, googleProvider);
  };

  return (
    <button
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      onClick={handleRedirectSignIn}
    >
      Sign in with Google
    </button>
  );
}
