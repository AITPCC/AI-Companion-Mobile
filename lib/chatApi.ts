const DEFAULT_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://127.0.0.1:8000';

const normalizeBaseUrl = (url: string) => {
  if (url.endsWith('/')) return url.slice(0, -1);
  return url;
};

export const getBaseUrl = () => normalizeBaseUrl(DEFAULT_BASE_URL);

interface ChatHistoryItem {
  content: string;
}

export interface ChatApiResponse {
  status: number;
  content?: string | null;
  error?: string | null;
}

interface SendChatParams {
  message: string;
  history?: ChatHistoryItem[];
  mode?: string;
}

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const url = `${getBaseUrl()}${path}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = (await response.json()) as T;
  return data;
}

export async function sendChatCompletion({
  message,
  history = [],
  mode = 'history_figure',
}: SendChatParams): Promise<ChatApiResponse> {
  const payload = {
    message,
    history,
    config: {
      mode,
    },
  };

  return postJson<ChatApiResponse>('/chat/completions', payload);
}

export async function checkHealth(): Promise<boolean> {
  try {
    const url = `${getBaseUrl()}/health/`;
    const response = await fetch(url);
    if (!response.ok) return false;
    const data = (await response.json()) as { status?: string };
    return data.status === 'ok';
  } catch {
    return false;
  }
}

