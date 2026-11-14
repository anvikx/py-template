import { useEffect, useState, type ReactElement } from 'react'

import { getHealth } from './api.ts'

type BackendStatus = 'loading' | 'ok' | 'down'

export function App(): ReactElement {
  const [status, setStatus] = useState<BackendStatus>('loading')

  useEffect(() => {
    getHealth()
      .then((health) => {
        setStatus(health.status === 'ok' ? 'ok' : 'down')
      })
      .catch(() => {
        setStatus('down')
      })
  }, [])

  return (
    <main>
      <h1>Junction 2026</h1>
      <p>Backend: {status}</p>
    </main>
  )
}
