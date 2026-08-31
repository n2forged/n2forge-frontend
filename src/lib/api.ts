import { LoginResponse, ProgressSummary, Sheet, SheetProblem, Topic, User, UserProblem } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const getHeaders = (token?: string) => ({
  'Content-Type': 'application/json',
  ...(token && { Authorization: `Bearer ${token}` }),
});

// Auth
export const registerUser = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}): Promise<User> => {
  const res = await fetch(`${API_BASE_URL}/api/v1/users/register`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};

export const loginUser = async (data: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  const res = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};

// Sheets
export const getAllSheets = async (): Promise<Sheet[]> => {
  const res = await fetch(`${API_BASE_URL}/api/v1/sheets`);
  if (!res.ok) throw await res.json();
  return res.json();
};

export const getSheetBySlug = async (slug: string): Promise<Sheet> => {
  const res = await fetch(`${API_BASE_URL}/api/v1/sheets/${slug}`);
  if (!res.ok) throw await res.json();
  return res.json();
};

export const getSheetProblems = async (sheetId: string): Promise<SheetProblem[]> => {
  const res = await fetch(`${API_BASE_URL}/api/v1/sheets/${sheetId}/problems`);
  if (!res.ok) throw await res.json();
  return res.json();
};

// Topics
export const getAllTopics = async (): Promise<Topic[]> => {
  const res = await fetch(`${API_BASE_URL}/api/v1/sheets/topics`);
  if (!res.ok) throw await res.json();
  return res.json();
};

// Problems
export const getAllProblems = async () => {
  const res = await fetch(`${API_BASE_URL}/api/v1/problems`);
  if (!res.ok) throw await res.json();
  return res.json();
};

// Tracking
export const markProblem = async (
  data: { problemId: string; sheetId: string; status: string; revision: boolean; note: string },
  token: string
): Promise<UserProblem> => {
  const res = await fetch(`${API_BASE_URL}/api/v1/tracking/problems`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};

export const getUserProgress = async (sheetId: string, token: string): Promise<UserProblem[]> => {
  const res = await fetch(`${API_BASE_URL}/api/v1/tracking/problems/${sheetId}`, {
    headers: getHeaders(token),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};

export const getProgressSummary = async (sheetId: string, token: string): Promise<ProgressSummary> => {
  const res = await fetch(`${API_BASE_URL}/api/v1/tracking/progress/${sheetId}`, {
    headers: getHeaders(token),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};
