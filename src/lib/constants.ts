export const COLORS = {
  background: '#0A0A0A',
  backgroundCard: '#111111',
  backgroundSidebar: '#0D0D0D',
  gold: '#C9A84C',
  goldLight: '#D4B86A',
  navy: '#1B2B5E',
  white: '#FFFFFF',
  muted: '#888888',
  border: '#222222',
  easy: '#22c55e',
  medium: '#f59e0b',
  hard: '#ef4444',
} as const;

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const STATUS_LABELS = {
  NOT_STARTED: 'Start Forge',
  ATTEMPTED: 'Resume Attempt',
  SOLVED: 'Review Code',
} as const;

export const STATUS_COLORS = {
  NOT_STARTED: '#888888',
  ATTEMPTED: '#3b82f6',
  SOLVED: '#C9A84C',
} as const;
