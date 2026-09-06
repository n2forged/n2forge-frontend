'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/useSession';
import WarehousePanel from './WarehousePanel';
import CreatePanel from './CreatePanel';
import BulkImportPanel from './BulkImportPanel';

export default function AdminView() {
  const { user, ready } = useSession();
  const router = useRouter();
  const [tab, setTab] = useState<'warehouse' | 'create' | 'bulk'>('warehouse');

  useEffect(() => {
    if (!ready) return;
    if (!user || user.role !== 'ADMIN') router.push('/');
  }, [ready, user, router]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-[#5A5A56]">Loading…</p>
      </div>
    );
  }

  if (!user || user.role !== 'ADMIN') return null;

  const tabs = [
    ['warehouse', 'Warehouse'],
    ['create', 'Create'],
    ['bulk', 'Bulk import'],
  ] as const;

  return (
    <section
      className="relative z-10"
      style={{ paddingLeft: '5vw', paddingRight: '5vw', paddingTop: '9rem', paddingBottom: '7rem' }}
    >
      <div className="flex items-center gap-3">
        <span className="h-px w-10 bg-[#C9A84C]" />
        <span className="text-xs font-medium uppercase tracking-[0.28em] text-[#C9A84C]">
          Admin
        </span>
      </div>

      <h1
        className="font-heading text-[2.25rem] font-bold tracking-[-0.02em] text-[#F2F0EA] sm:text-[2.75rem]"
        style={{ marginTop: '1.5rem' }}
      >
        Content forge
      </h1>

      <div className="flex items-center gap-2" style={{ marginTop: '2.5rem' }}>
        {tabs.map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`rounded-[4px] border text-[13px] font-medium tracking-wide transition-colors ${
              tab === key
                ? 'border-[#C9A84C] text-[#C9A84C]'
                : 'border-[#1E1E1E] text-[#5A5A56] hover:border-[#2A2A2A] hover:text-[#7C7C78]'
            }`}
            style={{ padding: '0.6rem 1.2rem' }}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{ marginTop: '2.5rem' }}>
        {tab === 'warehouse' && <WarehousePanel />}
        {tab === 'create' && <CreatePanel />}
        {tab === 'bulk' && <BulkImportPanel />}
      </div>
    </section>
  );
}
