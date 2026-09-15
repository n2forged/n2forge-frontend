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

export const getSheetDetail = async (slug: string): Promise<import('@/types').SheetDetail> => {
  const res = await fetch(`${API_BASE_URL}/api/v1/sheets/${slug}/detail`);
  if (!res.ok) throw await res.json();
  return res.json();
};

export const getOverallProgress = async (
  token: string
): Promise<import('@/types').OverallProgress> => {
  const res = await fetch(`${API_BASE_URL}/api/v1/tracking/progress`, {
    headers: getHeaders(token),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};

export const getMe = async (token: string): Promise<import('@/types').User> => {
  const res = await fetch(`${API_BASE_URL}/api/v1/users/me`, {
    headers: getHeaders(token),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};

export const createSheet = async (
  data: { name: string; slug: string; description: string },
  token: string
) => {
  const res = await fetch(`${API_BASE_URL}/api/v1/sheets`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};

export const createTopic = async (
  data: { name: string; slug: string },
  token: string
) => {
  const res = await fetch(`${API_BASE_URL}/api/v1/sheets/topics`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};

export const createProblem = async (
  data: { name: string; slug: string; difficulty: string },
  token: string
) => {
  const res = await fetch(`${API_BASE_URL}/api/v1/problems`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};

export const addProblemLink = async (
  data: { problemId: string; url: string; platform: string; isPrimary: boolean },
  token: string
) => {
  const res = await fetch(`${API_BASE_URL}/api/v1/problems/links`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};

export const assignTopicToSheet = async (
  data: { sheetId: string; topicId: string; orderIndex: number },
  token: string
) => {
  const res = await fetch(`${API_BASE_URL}/api/v1/sheets/topics/assign`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};

export const assignProblemToSheet = async (
  data: { sheetId: string; problemId: string; topicId: string; orderIndex: number },
  token: string
) => {
  const res = await fetch(`${API_BASE_URL}/api/v1/sheets/problems/assign`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};

export const bulkImport = async (payload: unknown, token: string) => {
  const res = await fetch(`${API_BASE_URL}/api/v1/sheets/bulk-import`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};

export const getAllTopics2 = async (): Promise<import('@/types').Topic[]> => {
  const res = await fetch(`${API_BASE_URL}/api/v1/sheets/topics`);
  if (!res.ok) throw await res.json();
  return res.json();
};

export const getAllProblems2 = async (): Promise<import('@/types').Problem[]> => {
  const res = await fetch(`${API_BASE_URL}/api/v1/problems`);
  if (!res.ok) throw await res.json();
  return res.json();
};



export const getWarehouse = async (
  token: string
): Promise<import('@/types').WarehouseProblem[]> => {
  const res = await fetch(`${API_BASE_URL}/api/v1/problems/warehouse`, {
    headers: getHeaders(token),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};

export const tagProblem = async (problemId: string, topicId: string, token: string) => {
  const res = await fetch(`${API_BASE_URL}/api/v1/problems/${problemId}/topics/${topicId}`, {
    method: 'POST',
    headers: getHeaders(token),
  });
  if (!res.ok) throw await res.json();
};

export const untagProblem = async (problemId: string, topicId: string, token: string) => {
  const res = await fetch(`${API_BASE_URL}/api/v1/problems/${problemId}/topics/${topicId}`, {
    method: 'DELETE',
    headers: getHeaders(token),
  });
  if (!res.ok) throw await res.json();
};

export const deleteProblem = async (problemId: string, token: string) => {
  const res = await fetch(`${API_BASE_URL}/api/v1/problems/${problemId}`, {
    method: 'DELETE',
    headers: getHeaders(token),
  });
  if (!res.ok) throw await res.json();
};
