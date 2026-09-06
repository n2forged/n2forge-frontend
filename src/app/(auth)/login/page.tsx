'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthShell from '@/components/auth/AuthShell';
import Field from '@/components/auth/Field';
import { loginUser } from '@/lib/api';
import { saveSession } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError('');

    if (!email.trim() || !password) {
      setError('Enter your email and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await loginUser({ email: email.trim(), password });
      saveSession(res.token, res.user);
      router.push('/');
    } catch (err: unknown) {
      const message =
        typeof err === 'object' && err !== null && 'message' in err
          ? String((err as { message: unknown }).message)
          : 'Invalid email or password.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Back to the"
      titleAccent="forge."
      subtitle="Pick up exactly where you left off."
      footer={
        <>
          New here?{' '}
          <Link href="/register" className="text-[#C9A84C] transition-opacity hover:opacity-80">
            Create an account
          </Link>
        </>
      }
    >
      <div className="flex flex-col" style={{ gap: '1.5rem' }}>
        <Field
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
          autoComplete="email"
        />

        <Field
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
          autoComplete="current-password"
        />

        {error && (
          <div
            className="rounded-[4px] border border-[#3A211C] bg-[#170E0C] text-[14px] font-light text-[#C9705F]"
            style={{ padding: '0.85rem 1rem' }}
          >
            {error}
          </div>
        )}

        <button
          onClick={submit}
          disabled={loading}
          className="w-full rounded-[4px] bg-[#C9A84C] font-heading text-[15px] font-semibold tracking-wide text-[#070707] transition-all duration-300 hover:bg-[#E3C97A] disabled:cursor-not-allowed disabled:opacity-50"
          style={{ padding: '1rem', marginTop: '0.5rem' }}
        >
          {loading ? 'Signing in…' : 'Sign in →'}
        </button>
      </div>
    </AuthShell>
  );
}
