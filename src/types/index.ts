export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export type ProblemStatus = 'NOT_STARTED' | 'ATTEMPTED' | 'SOLVED';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: 'USER' | 'ADMIN';
  profilePictureUrl: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface Problem {
  id: string;
  name: string;
  slug: string;
  difficulty: Difficulty;
  createdAt: string;
}

export interface ProblemLink {
  id: string;
  problemId: string;
  url: string;
  platform: string;
  isPrimary: boolean;
}

export interface Topic {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
}

export interface Sheet {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
}

export interface SheetProblem {
  id: string;
  sheetId: string;
  problemId: string;
  topicId: string;
  orderIndex: number;
}

export interface UserProblem {
  id: string;
  userId: string;
  problemId: string;
  sheetId: string;
  status: ProblemStatus;
  revision: boolean;
  note: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProgressSummary {
  solvedCount: number;
  attemptedCount: number;
  notStartedCount: number;
  totalCount: number;
}

export interface LoginResponse {
  token: string;
  user: User;
}
