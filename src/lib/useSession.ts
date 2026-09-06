'use client';

import { useEffect, useState } from 'react';
import { User } from '@/types';
import { getToken, getUser, clearSession } from './auth';

export function useSession() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUser(getToken() ? getUser() : null);
    setReady(true);
  }, []);

  const logout = () => {
    clearSession();
    setUser(null);
  };

  return { user, ready, logout };
}
