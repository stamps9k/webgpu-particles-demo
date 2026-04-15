import { useState } from 'react'
import { hello_particles } from 'webgpu-particles'

interface EnvEntry {
  label: string
  value: string
  status: 'ok' | 'warn'
}

function App() {
  const [count, setCount] = useState(0)

  const envEntries: EnvEntry[] = [
    { label: 'Mode',        value: import.meta.env.MODE,                      status: 'ok' },
    { label: 'Base URL',    value: import.meta.env.BASE_URL,                  status: 'ok' },
    { label: 'DEV',         value: String(import.meta.env.DEV),               status: import.meta.env.DEV ? 'ok' : 'warn' },
    { label: 'React',       value: '19',  status: 'ok' },
    { label: 'TypeScript',  value: 'enabled',                                 status: 'ok' },
    { label: 'Hello',       value: hello_particles(),                                 status: 'ok' },
  ]

  return (
    <main style={{ fontFamily: 'sans-serif', maxWidth: 480, margin: '60px auto', padding: '0 16px' }}>
      <h1>⚡ Dev Environment Check</h1>

      <section>
        <h2>Environment</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {envEntries.map(({ label, value, status }) => (
              <tr key={label} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '6px 0', color: '#666' }}>{label}</td>
                <td style={{ padding: '6px 0', fontWeight: 600 }}>{value}</td>
                <td>{status === 'ok' ? '✅' : '⚠️'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2>State</h2>
        <p>useState is working: <strong>{count}</strong></p>
        <button onClick={() => setCount(c => c + 1)}>Increment</button>
        <button onClick={() => setCount(0)} style={{ marginLeft: 8 }}>Reset</button>
      </section>
    </main>
  )
}

export default App