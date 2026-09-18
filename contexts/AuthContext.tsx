import { AuthUser, deleteAccount as deleteAccountApi, fetchCurrentUser, getGuestToken, loginUser, registerUser, updateUsername } from '@/lib/authApi';
import * as SecureStore from 'expo-secure-store';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

type AuthResult = { success: true } | { success: false; error: string };

const TOKEN_KEY = 'auth_token';
const GUEST_TOKEN = 'guest_token';

interface AuthContextValue {
  currentUser: AuthUser | null;
  signUp: (email: string, username: string, password: string) => Promise<AuthResult>;
  logIn: (email: string, password: string) => Promise<AuthResult>;
  logOut: () => Promise<void>;
  deleteAccount: () => Promise<AuthResult>;
  resetPassword: (email: string, newPassword: string) => Promise<AuthResult>;
  updateProfile: (username: string) => Promise<AuthResult>;
  ensureGuestToken: (forceRefresh?: boolean) => Promise<string | null>;
  getActiveToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  // Restore the session on app start if a token was saved from a previous run.
  useEffect(() => {
    (async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (!token) {
        await ensureGuestToken();
        return;
      }
      try {
        setCurrentUser(await fetchCurrentUser(token));
      } catch {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
      }
    })();
  }, []);

  const signUp = useCallback(
    async (email: string, username: string, password: string): Promise<AuthResult> => {
      const result = await registerUser(email, password, username);
      if (!result.success) return result;
      return { success: true };
    },
    []
  );

  const logIn = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    const loginResult = await loginUser(email, password);
    if (!loginResult.success) return loginResult;

    try {
      const user = await fetchCurrentUser(loginResult.token);
      await SecureStore.setItemAsync(TOKEN_KEY, loginResult.token);
      setCurrentUser(user);
      return { success: true };
    } catch (e) {
      return { success: false, error: e instanceof Error ? e.message : 'Login failed.' };
    }
  }, []);

  const logOut = useCallback(async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    setCurrentUser(null);
  }, []);

  const deleteAccount = useCallback(async (): Promise<AuthResult> => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    if (!token) {
      return { success: false, error: 'You must be logged in.' };
    }
    const result = await deleteAccountApi(token);
    if (!result.success) return result;
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    setCurrentUser(null);
    return { success: true };
  }, []);

  const updateProfile = useCallback(async (username: string): Promise<AuthResult> => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    if (!token) {
      return { success: false, error: 'You must be logged in.' };
    }
    const result = await updateUsername(token, username);
    if (!result.success) return result;
    setCurrentUser(result.user);
    return { success: true };
  }, []);

  // No backend endpoint for this yet (only /auth/register and /auth/login exist) —
  // kept as a no-op so the screen still works until the backend adds one.
  const resetPassword = useCallback(async (): Promise<AuthResult> => {
    return { success: true };
  }, []);

  const ensureGuestToken = useCallback(async (forceRefresh = false): Promise<string | null> => {
    if (!forceRefresh) {
      const token = await SecureStore.getItemAsync(GUEST_TOKEN);
      if (token) return token;
    }

    const guesttokenresult = await getGuestToken();
    if (!guesttokenresult.success) return null;

    await SecureStore.setItemAsync(GUEST_TOKEN, guesttokenresult.token);
    return guesttokenresult.token;
  }, [])

  // Logged-in user's JWT if present, otherwise whatever guest token is stored locally.
  const getActiveToken = useCallback(async (): Promise<string | null> => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    if (token) return token;
    return ensureGuestToken();
  }, [ensureGuestToken]);

  return (
    <AuthContext.Provider
      value={{ currentUser, signUp, logIn, logOut, deleteAccount, resetPassword, updateProfile, getActiveToken, ensureGuestToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
