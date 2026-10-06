'use client';

import { useState } from 'react';
import { updateProblem } from '@/lib/api';
import { getToken } from '@/lib/auth';
import { WarehouseProblem } from '@/types';

const inputCls =
  'w-full rounded-[4px] border border-[#1E1E1E] bg-[#070707] text-[14px] text-[#F2F0EA] outline-none transition-colors placeholder:text-[#3A3A36] focus:border-[#C9A84C]';
const fieldStyle = { marginTop: '0.55rem', padding: '0.75rem 0.9rem' };
const labelCls = 'block text-[11px] font-medium uppercase tracking-[0.18em] text-[#7C7C78]';

export default function EditProblemModal({
  problem,
  onClose,
  onSaved,
}: {
  problem: WarehouseProblem;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [name, setName] = useState(problem.name);
  const [slug, setSlug] = useState(problem.slug);
  const [difficulty, setDifficulty] = useState<string>(problem.difficulty);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const dirty =
    name.trim() !== problem.name ||
    slug.trim() !== problem.slug ||
    difficulty !== problem.difficulty;

  const save = async () => {
    const token = getToken();
    if (!token) {
      setErr('Not signed in.');
      return;
    }
    setErr('');
    setBusy(true);
    try {
      await updateProblem(
        problem.id,
        { name: name.trim(), slug: slug.trim(), difficulty },
        token
      );
      onSaved();
      onClose();
    } catch (e: unknown) {
      const m =
        typeof e === 'object' && e !== null && 'message' in e
          ? String((e as { message: unknown }).message)
          : 'Could not save.';
      setErr(m);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(7,7,7,.82)', padding: '1.5rem' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-[460px] rounded-[6px] border border-[#2A2A2A] bg-[#0B0B0B]"
        style={{ padding: '2rem' }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-heading text-lg font-semibold text-[#F2F0EA]">Edit problem</h3>
        <p
          className="text-[13px] font-light leading-[1.6] text-[#5A5A56]"
          style={{ marginTop: '0.5rem' }}
        >
          Changing the slug breaks any link already pointing at the old one.
        </p>

        <div className="flex flex-col" style={{ marginTop: '1.5rem', gap: '1.1rem' }}>
          <div>
            <label className={labelCls} htmlFor="edit-name">Name</label>
            <input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputCls}
              style={fieldStyle}
            />
          </div>

          <div>
            <label className={labelCls} htmlFor="edit-slug">Slug</label>
            <input
              id="edit-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className={inputCls}
              style={fieldStyle}
            />
          </div>

          <div>
            <label className={labelCls} htmlFor="edit-diff">Difficulty</label>
            <select
              id="edit-diff"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className={inputCls}
              style={fieldStyle}
            >
              <option value="EASY">EASY</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HARD">HARD</option>
            </select>
          </div>
        </div>

        {err && (
          <div
            className="rounded-[4px] border border-[#3A211C] bg-[#170E0C] text-[13px] font-light text-[#C9705F]"
            style={{ marginTop: '1.25rem', padding: '0.8rem 1rem' }}
          >
            {err}
          </div>
        )}

        <div className="flex items-center gap-3" style={{ marginTop: '2rem' }}>
          <button
            onClick={save}
            disabled={busy || !dirty || !name.trim() || !slug.trim()}
            className="rounded-[4px] bg-[#C9A84C] font-heading text-[14px] font-semibold text-[#070707] transition-all hover:bg-[#E3C97A] disabled:cursor-not-allowed disabled:opacity-40"
            style={{ padding: '0.7rem 1.5rem' }}
          >
            {busy ? 'Saving…' : 'Save'}
          </button>
          <button
            onClick={onClose}
            className="rounded-[4px] border border-[#2A2A2A] text-[14px] font-medium text-[#7C7C78] transition-colors hover:text-[#F2F0EA]"
            style={{ padding: '0.7rem 1.5rem' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
