'use client';

export default function Field({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  autoComplete,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-[#7C7C78]">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`w-full rounded-[4px] border bg-[#0B0B0B] text-[15px] text-[#F2F0EA] outline-none transition-colors placeholder:text-[#4A4A46] ${
          error
            ? 'border-[#9E4B3F] focus:border-[#9E4B3F]'
            : 'border-[#1E1E1E] focus:border-[#C9A84C]'
        }`}
        style={{ marginTop: '0.65rem', padding: '0.9rem 1rem' }}
      />
      {error && (
        <p className="text-[13px] font-light text-[#9E4B3F]" style={{ marginTop: '0.5rem' }}>
          {error}
        </p>
      )}
    </div>
  );
}
