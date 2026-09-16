import { getBaseUrl } from './chatApi';

export interface AuthUser {
  id: number;
  username: string;
  email: string;
}

interface BackendUserProfile {
  user_id: number;
  user_name: string;
  email: string;
  created_at: string;
}

interface BackendLoginResponse {
  access_token: string;
  token_type: string;
}

type AuthResult<T extends object> = ({ success: true } & T) | { success: false; error: string };

function toAuthUser(profile: BackendUserProfile): AuthUser {
  return { id: profile.user_id, username: profile.user_name, email: profile.email };
}

function extractErrorMessage(body: unknown, fallback: string): string {
  const record = body as { error?: unknown; detail?: unknown } | null;
  if (typeof record?.error === 'string') return record.error;
  if (typeof record?.detail === 'string') return record.detail;
  if (Array.isArray(record?.detail)) {
    const first = record.detail[0] as { msg?: unknown } | undefined;
    if (typeof first?.msg === 'string') return first.msg;
  }
  return fallback;
}

async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<{ ok: boolean; body: T | { error: string } }> {
  try {
    const response = await fetch(`${getBaseUrl()}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...(options.headers ?? {}) },
    });
    const body = (await response.json()) as T;
    return { ok: response.ok, body };
  } catch {
    return { ok: false, body: { error: 'Could not reach the server. Is it running?' } };
  }
}

export async function registerUser(
  email: string,
  password: string,
  username: string
): Promise<AuthResult<{ user: AuthUser }>> {
  const { ok, body } = await apiFetch<BackendUserProfile>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, user_name: username }),
  });
  if (!ok) {
    return { success: false, error: extractErrorMessage(body, 'Could not create account.') };
  }
  return { success: true, user: toAuthUser(body as BackendUserProfile) };
}

export async function loginUser(
  email: string,
  password: string
): Promise<AuthResult<{ token: string }>> {
  const { ok, body } = await apiFetch<BackendLoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  if (!ok) {
    return { success: false, error: extractErrorMessage(body, 'Invalid email or password.') };
  }
  return { success: true, token: (body as BackendLoginResponse).access_token };
}

export async function getGuestToken(): Promise<AuthResult<{ token: string }>> {
  const { ok, body } = await apiFetch<BackendLoginResponse>('/auth/guest-session', {
    method: 'POST',
  });
  if (!ok) {
    return { success: false, error: extractErrorMessage(body, 'Could not start a guest session.') };
  }
  return { success: true, token: (body as BackendLoginResponse).access_token };
}

export async function updateUsername(
  token: string,
  username: string
): Promise<AuthResult<{ user: AuthUser }>> {
  const { ok, body } = await apiFetch<BackendUserProfile>('/users/me', {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ user_name: username }),
  });
  if (!ok) {
    return { success: false, error: extractErrorMessage(body, 'Could not update profile.') };
  }
  return { success: true, user: toAuthUser(body as BackendUserProfile) };
}

export async function fetchCurrentUser(token: string): Promise<AuthUser> {
  const { ok, body } = await apiFetch<BackendUserProfile>('/users/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!ok) {
    throw new Error(extractErrorMessage(body, 'Failed to load user profile.'));
  }
  return toAuthUser(body as BackendUserProfile);
}
