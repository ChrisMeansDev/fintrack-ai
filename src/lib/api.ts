// src/lib/api.ts

export async function apiGet(url: string) {
  const token = localStorage.getItem('authToken');

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'API GET request failed');
  }

  return res.json();
}

export async function apiPost(url: string, body: any) {
  const token = localStorage.getItem('authToken');

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'API POST request failed');
  }

  return res.json();
}