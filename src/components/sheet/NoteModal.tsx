'use client';

import { useEffect, useState } from 'react';

const MAX = 200;

export default function NoteModal({
  problemName,
  initialNote,
  onSave,
  onClose,
}: {
  problemName: string;
  initialNote: string;
  onSave: (note: string) => void;
  onClose: () => void;
}) {
  const [note, setNote] = useState(initialNote);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const remaining = MAX - note.length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(13,15,20,.72)', backdropFilter: 'blur(10px)', padding: '1.5rem' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-[440px] rounded-[18px] border"
        style={{
          padding: '1.75rem',
          borderColor: 'rgba(255,255,255,.1)',
          background: 'rgba(28,30,38,.72)',
          backdropFilter: 'blur(32px) saturate(160%)',
          WebkitBackdropFilter: 'blur(32px) saturate(160%)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,.1), 0 24px 60px rgba(0,0,0,.45)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#FFB84D]">
          Note
        </p>

        <h3
          className="truncate font-heading text-[17px] font-semibold text-[#F4F4F7]"
          style={{ marginTop: '0.6rem' }}
        >
          {problemName}
        </h3>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value.slice(0, MAX))}
          autoFocus
          placeholder="Approach, edge case, where you got stuck…"
          className="w-full resize-none rounded-[6px] border border-[rgba(255,255,255,.1)] bg-[rgba(0,0,0,.25)] text-[14px] leading-[1.7] text-[#F4F4F7] outline-none transition-colors placeholder:text-[rgba(255,255,255,.3)] focus:border-[#FFB84D]"
          style={{ marginTop: '1.25rem', padding: '0.85rem 1rem', minHeight: '120px' }}
        />

        <div className="flex items-center justify-between" style={{ marginTop: '0.7rem' }}>
          <span
            className={`text-[12px] tabular-nums ${
              remaining < 20 ? 'text-[#FF8A8A]' : 'text-[rgba(255,255,255,.3)]'
            }`}
          >
            {remaining} left
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="rounded-[6px] text-[13px] font-medium text-[#8B8B99] transition-colors hover:text-[#9898A6]"
              style={{ padding: '0.5rem 0.9rem' }}
            >
              Cancel
            </button>
            <button
              onClick={() => { onSave(note.trim()); onClose(); }}
              className="rounded-[6px] bg-[#FFB84D] font-heading text-[13px] font-semibold text-[#0D0F14] transition-all hover:bg-[#FFC970]"
              style={{ padding: '0.5rem 1.2rem' }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
