// Single place that talks to the backend. Caddy (prod) and the Vite proxy (dev)
// route /api/* to FastAPI, so relative paths work in both.
const API_BASE = '/api'

export interface Health {
  readonly status: string
}

export async function getHealth(): Promise<Health> {
  const response = await fetch(`${API_BASE}/health`)
  if (!response.ok) {
    throw new Error(`Health check failed: ${response.status}`)
  }
  return (await response.json()) as Health
}
