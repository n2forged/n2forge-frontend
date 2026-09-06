'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthShell from '@/components/auth/AuthShell';
import Field from '@/components/auth/Field';
import { registerUser, loginUser } from '@/lib/api';
import { saveSession } from '@/lib/auth';

const PASSWORD_RULE =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export default function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError('');

    if (!firstName.trim() || !username.trim() || !email.trim() || !password) {
      setError('Fill in first name, username, email and password.');
      return;
    }
    if (username.trim().length < 3) {
      setError('Username must be at least 3 characters.');
      return;
    }
    if (!PASSWORD_RULE.test(password)) {
      setError(
        'Password needs 8+ characters with an uppercase, lowercase, digit and special character.'
      );
      return;
    }

    setLoading(true);
    try {
      await registerUser({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        username: username.trim(),
        password,
      });

      const res = await loginUser({ email: email.trim(), password });
      saveSession(res.token, res.user);
      router.push('/');
    } catch (err: unknown) {
      const message =
        typeof err === 'object' && err !== null && 'message' in err
          ? String((err as { message: unknown }).message)
          : 'Something went wrong. Try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Get started"
      title="Start"
      titleAccent="forging."
      subtitle="Free, forever. No paywalls, no drip content."
      footer={
        <>
          Already have an account?{' '}
          <Link href="/login" className="text-[#C9A84C] transition-opacity hover:opacity-80">
            Sign in
          </Link>
        </>
      }
    >
      <div className="flex flex-col" style={{ gap: '1.5rem' }}>
        <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
          <Field
            label="First name"
            value={firstName}
            onChange={setFirstName}
            placeholder="Nikhil"
            autoComplete="given-name"
          />
          <Field
            label="Last name"
            value={lastName}
            onChange={setLastName}
            placeholder="Singh"
            autoComplete="family-name"
          />
        </div>

        <Field
          label="Username"
          value={username}
          onChange={setUsername}
          placeholder="nikhil"
          autoComplete="username"
        />

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
          autoComplete="new-password"
        />

        <p className="text-[13px] font-light leading-[1.6] text-[#5A5A56]">
          8+ characters, with an uppercase, lowercase, digit and special character.
        </p>

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
          {loading ? 'Creating account…' : 'Create account →'}
        </button>
      </div>
    </AuthShell>
  );
}
