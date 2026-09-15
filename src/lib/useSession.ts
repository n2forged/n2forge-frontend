'use client';

import { useEffect, useState } from 'react';
import { User } from '@/types';
import { getToken, getUser, clearSession } from './auth';

export function useSession() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = getToken();
    setToken(t);
    setUser(t ? getUser() : null);
    setReady(true);
  }, []);

  const logout = () => {
    clearSession();
    setUser(null);
    setToken(null);
  };

  return { user, token, ready, logout };
}
