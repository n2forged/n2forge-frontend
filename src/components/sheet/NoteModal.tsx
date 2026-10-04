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
      style={{ background: 'rgba(7,7,7,.82)', padding: '1.5rem' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-[440px] rounded-[10px] border border-[#1E1E1E] bg-[#0B0B0B]"
        style={{ padding: '1.75rem' }}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#C9A84C]">
          Note
        </p>

        <h3
          className="truncate font-heading text-[17px] font-semibold text-[#F2F0EA]"
          style={{ marginTop: '0.6rem' }}
        >
          {problemName}
        </h3>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value.slice(0, MAX))}
          autoFocus
          placeholder="Approach, edge case, where you got stuck…"
          className="w-full resize-none rounded-[6px] border border-[#1E1E1E] bg-[#070707] text-[14px] leading-[1.7] text-[#F2F0EA] outline-none transition-colors placeholder:text-[#3A3A36] focus:border-[#C9A84C]"
          style={{ marginTop: '1.25rem', padding: '0.85rem 1rem', minHeight: '120px' }}
        />

        <div className="flex items-center justify-between" style={{ marginTop: '0.7rem' }}>
          <span
            className={`text-[12px] tabular-nums ${
              remaining < 20 ? 'text-[#C9705F]' : 'text-[#3A3A36]'
            }`}
          >
            {remaining} left
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="rounded-[6px] text-[13px] font-medium text-[#5A5A56] transition-colors hover:text-[#7C7C78]"
              style={{ padding: '0.5rem 0.9rem' }}
            >
              Cancel
            </button>
            <button
              onClick={() => { onSave(note.trim()); onClose(); }}
              className="rounded-[6px] bg-[#C9A84C] font-heading text-[13px] font-semibold text-[#070707] transition-all hover:bg-[#E3C97A]"
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
