const DEFAULT_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://127.0.0.1:8000';

const MAX_ATTEMPTS = 3;
const RETRY_DELAYS_MS = [1000, 2000];

const normalizeBaseUrl = (url: string) => {
  if (url.endsWith('/')) return url.slice(0, -1);
  return url;
};

export const getBaseUrl = () => normalizeBaseUrl(DEFAULT_BASE_URL);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

function isRetryableChatResponse(response: ChatApiResponse): boolean {
  if (response.status === 200 && response.content) return false;

  const httpLike = response.status;
  if ([502, 503, 504, 429].includes(httpLike)) return true;

  const err = (response.error ?? '').toLowerCase();
  return (
    err.includes('503') ||
    err.includes('502') ||
    err.includes('504') ||
    err.includes('429') ||
    err.includes('unavailable') ||
    err.includes('high demand') ||
    err.includes('timeout') ||
    err.includes('overloaded') ||
    err.includes('rate limit') ||
    err.includes('temporarily')
  );
}

/** User-facing message; hides raw provider JSON blobs. */
export function formatChatError(error?: string | null): string {
  if (!error?.trim()) {
    return 'Service is temporarily unavailable. Please try again later.';
  }

  const lower = error.toLowerCase();
  if (
    lower.includes('503') ||
    lower.includes('unavailable') ||
    lower.includes('high demand') ||
    lower.includes('overloaded') ||
    lower.includes('rate limit')
  ) {
    return 'The AI service is busy. Please try again in a moment.';
  }

  if (lower.includes('timeout') || lower.includes('timed out')) {
    return 'The request timed out. Please try again.';
  }

  if (error.includes("'error'") || error.includes('"error"') || error.length > 160) {
    return 'Something went wrong. Please try again.';
  }

  return error;
}

async function postJson<T>(path: string, body: unknown, token: string | null): Promise<T> {
  const url = `${getBaseUrl()}${path}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });

  const data = (await response.json()) as T;
  return data;
}

async function sendChatCompletionOnce(
  { message, history = [], mode = 'history_figure' }: SendChatParams,
  token: string | null
): Promise<ChatApiResponse> {
  const payload = {
    message,
    history,
    config: {
      mode,
    },
  };

  return postJson<ChatApiResponse>('/chat/completions', payload, token);
}

export async function sendChatCompletion(
  params: SendChatParams,
  token: string | null
): Promise<ChatApiResponse> {
  let lastResponse: ChatApiResponse | null = null;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    try {
      const response = await sendChatCompletionOnce(params, token);
      lastResponse = response;

      if (!isRetryableChatResponse(response)) {
        return response;
      }

      if (attempt < MAX_ATTEMPTS - 1) {
        await sleep(RETRY_DELAYS_MS[attempt] ?? RETRY_DELAYS_MS.at(-1)!);
      }
    } catch (error) {
      if (attempt >= MAX_ATTEMPTS - 1) {
        throw error;
      }
      await sleep(RETRY_DELAYS_MS[attempt] ?? RETRY_DELAYS_MS.at(-1)!);
    }
  }

  return lastResponse ?? { status: 503, error: 'Service unavailable after retries.' };
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
