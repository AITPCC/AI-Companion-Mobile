import React, { createContext, useCallback, useContext, useState } from 'react';

interface MockUser {
  email: string;
  username: string;
  password: string;
}

type AuthResult = { success: true } | { success: false; error: string };

interface AuthContextValue {
  currentUser: MockUser | null;
  signUp: (email: string, username: string, password: string) => AuthResult;
  logIn: (email: string, password: string) => AuthResult;
  logOut: () => void;
  resetPassword: (email: string, newPassword: string) => AuthResult;
  updateProfile: (username: string) => AuthResult;
}

// In-memory validation only, no seeded demo account and nothing persisted —
// swap these bodies for real API calls once the backend auth endpoints are
// wired in, callers already consume the AuthResult shape.
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<MockUser[]>([]);
  const [currentUser, setCurrentUser] = useState<MockUser | null>(null);

  const signUp = useCallback(
    (email: string, username: string, password: string): AuthResult => {
      const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        return { success: false, error: 'This email is already in use.' };
      }
      const newUser: MockUser = { email, username, password };
      setUsers((prev) => [...prev, newUser]);
      setCurrentUser(newUser);
      return { success: true };
    },
    [users]
  );

  const logIn = useCallback(
    (email: string, password: string): AuthResult => {
      const user = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      if (!user) {
        return { success: false, error: 'Invalid email or password.' };
      }
      setCurrentUser(user);
      return { success: true };
    },
    [users]
  );

  const logOut = useCallback(() => setCurrentUser(null), []);

  const updateProfile = useCallback(
    (username: string): AuthResult => {
      if (!currentUser) {
        return { success: false, error: 'You must be logged in.' };
      }
      setUsers((prev) =>
        prev.map((u) => (u.email === currentUser.email ? { ...u, username } : u))
      );
      setCurrentUser((prev) => (prev ? { ...prev, username } : prev));
      return { success: true };
    },
    [currentUser]
  );

  const resetPassword = useCallback(
    (email: string, newPassword: string): AuthResult => {
      const idx = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());
      if (idx === -1) {
        return { success: false, error: 'No account found with that email.' };
      }
      setUsers((prev) => prev.map((u, i) => (i === idx ? { ...u, password: newPassword } : u)));
      return { success: true };
    },
    [users]
  );

  return (
    <AuthContext.Provider
      value={{ currentUser, signUp, logIn, logOut, resetPassword, updateProfile }}
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
