import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('admin_token')) navigate('/admin/dashboard', { replace: true })
  }, [navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok && res.status === 500 && res.headers.get('content-length') === '0') {
        throw new Error('Backend server is not running. Start it with: cd backend && npm run dev')
      }
      let data: any = {}
      try { data = await res.json() } catch { throw new Error('Server unreachable — is the backend running on port 3001?') }
      if (!res.ok) throw new Error(data.error || 'Login failed')
      localStorage.setItem('admin_token', data.token)
      localStorage.setItem('admin_username', data.username)
      navigate('/admin/dashboard', { replace: true })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div id="admin-root" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'auto',
      background: '#0a1628', fontFamily: 'var(--font)',
    }}>
      {/* Background grid */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, opacity: 0.08,
        backgroundImage: 'linear-gradient(rgba(72,183,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(72,183,255,0.4) 1px, transparent 1px)',
        backgroundSize: '56px 56px',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 420, padding: '0 24px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <img src="/intellicode-logo-transparent.png" alt="IntelliCodeLabs" style={{ height: 52, objectFit: 'contain' }} />
          <div style={{ marginTop: 16, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#48b7ff' }}>
            Admin Portal
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(72,183,255,0.15)',
          borderRadius: 20, padding: '40px 36px', backdropFilter: 'blur(16px)',
        }}>
          <h1 style={{ fontWeight: 800, fontSize: '1.6rem', color: '#e8f2ff', letterSpacing: '-0.02em', marginBottom: 6 }}>
            Sign In
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#6e8caa', marginBottom: 32 }}>
            Access the IntelliCodeLabs admin dashboard.
          </p>

          {error && (
            <div style={{
              background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)',
              borderRadius: 10, padding: '12px 16px', marginBottom: 20,
              fontSize: '0.85rem', color: '#fca5a5',
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#a8c5e0', marginBottom: 6, letterSpacing: '0.04em' }}>
                USERNAME
              </label>
              <input
                type="text" autoComplete="username" required
                value={form.username}
                onChange={e => setForm(p => ({ ...p, username: e.target.value }))}
                style={{
                  width: '100%', background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(72,183,255,0.2)',
                  borderRadius: 10, padding: '12px 16px', color: '#e8f2ff', fontFamily: 'var(--font)',
                  fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => (e.target.style.borderColor = 'rgba(72,183,255,0.6)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(72,183,255,0.2)')}
              />
            </div>

            <div style={{ marginBottom: 28 }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#a8c5e0', marginBottom: 6, letterSpacing: '0.04em' }}>
                PASSWORD
              </label>
              <input
                type="password" autoComplete="current-password" required
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                style={{
                  width: '100%', background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(72,183,255,0.2)',
                  borderRadius: 10, padding: '12px 16px', color: '#e8f2ff', fontFamily: 'var(--font)',
                  fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => (e.target.style.borderColor = 'rgba(72,183,255,0.6)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(72,183,255,0.2)')}
              />
            </div>

            <button
              type="submit" disabled={loading}
              style={{
                width: '100%', background: '#48b7ff', color: '#07233f', border: 'none',
                fontFamily: 'var(--font)', fontSize: '0.95rem', fontWeight: 700,
                padding: '14px', borderRadius: 100, cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              {loading ? (
                <>
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 1s linear infinite' }}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
                  </svg>
                  Signing In…
                </>
              ) : 'Sign In'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: 24, fontSize: '0.78rem', color: '#3a5570' }}>
          Default credentials: admin / admin123
        </p>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
