// src/lib/auth.ts
export function getToken(): string | null {
  return localStorage.getItem('authToken');
}

export function isAuthenticated(): boolean {
  const token = getToken();
  return !!token;
}

export function requireAuth(redirectTo: string = '/login') {
  if (!isAuthenticated()) {
    if (typeof window !== 'undefined') {
      window.location.href = redirectTo;
    }
  }
}