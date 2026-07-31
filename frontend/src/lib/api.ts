// Must include the backend's API prefix (see backend/app/core/config.py: api_prefix).
// Without it every request 404s and the app silently falls back to static data.
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"

export async function fetchFromApi<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`)
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}
