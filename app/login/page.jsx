'use client';

import { useState } from 'react';
import { auth, googleProvider } from '../../lib/firebase';
import { signInWithPopup }     from 'firebase/auth';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    console.log('🔵 handleLogin');
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('🟢 popup result:', result);
      // At this point AuthProvider’s onAuthStateChanged WILL fire
    } catch (err) {
      console.error('🔴 Login failed', err);
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 320, margin: '4rem auto', textAlign: 'center' }}>
      <h1>Welcome back!</h1>
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Signing in…' : 'Sign in with Google'}
      </button>
    </div>
  );
}
