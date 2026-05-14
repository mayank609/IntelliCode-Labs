import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminContent from '../components/AdminContent'

interface Query {
  _id: string
  name: string
  email: string
  company: string
  service: string
  message: string
  status: 'new' | 'read' | 'responded' | 'archived'
  notes: string
  createdAt: string
}

interface Subscriber {
  _id: string
  email: string
  createdAt: string
}

interface Stats {
  total: number
  new: number
  read: number
  responded: number
  archived: number
  today: number
  subscribers: number
  byService: Record<string, number>
}

const API = (path: string) => `/api/admin${path}`

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
  }
}

const STATUS_COLORS: Record<string, string> = {
  new: '#3b82f6',
  read: '#f59e0b',
  responded: '#10b981',
  archived: '#6b7280',
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const username = localStorage.getItem('admin_username') || 'admin'

  const [queries, setQueries] = useState<Query[]>([])
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  const [tab, setTab] = useState<'queries' | 'subscribers' | 'stats' | 'content' | 'settings'>('queries')
  const [modal, setModal] = useState<Query | null>(null)
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [sortOrder, setSortOrder] = useState('newest')

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [selectedSubIds, setSelectedSubIds] = useState<Set<string>>(new Set())

  const [pwForm, setPwForm] = useState({ current: '', next: '', confirm: '' })
  const [pwError, setPwError] = useState('')
  const [pwSuccess, setPwSuccess] = useState(false)
  const [pwSaving, setPwSaving] = useState(false)

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!localStorage.getItem('admin_token')) navigate('/admin/login', { replace: true })
  }, [navigate])

  const fetchAll = useCallback(async () => {
    try {
      const params = new URLSearchParams()
      if (statusFilter) params.set('status', statusFilter)
      if (search) params.set('search', search)
      params.set('sort', sortOrder)

      const [qRes, sRes, subRes] = await Promise.all([
        fetch(API(`/queries?${params}`), { headers: authHeaders() }),
        fetch(API('/stats'), { headers: authHeaders() }),
        fetch(API('/subscribers'), { headers: authHeaders() }),
      ])
      if (qRes.status === 401) {
        localStorage.removeItem('admin_token')
        navigate('/admin/login', { replace: true })
        return
      }
      const [qData, sData, subData] = await Promise.all([qRes.json(), sRes.json(), subRes.json()])
      setQueries(qData)
      setStats(sData)
      setSubscribers(subData)
    } catch {}
    finally { setLoading(false) }
  }, [statusFilter, search, sortOrder, navigate])

  useEffect(() => { fetchAll() }, [fetchAll])

  useEffect(() => {
    timerRef.current = setInterval(fetchAll, 30000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [fetchAll])

  const openModal = async (q: Query) => {
    setDeleteConfirm(false)
    setNotes(q.notes || '')
    setModal(q)
    if (q.status === 'new') {
      try {
        const res = await fetch(API(`/queries/${q._id}`), { headers: authHeaders() })
        const updated = await res.json()
        setModal(updated)
        setQueries(prev => prev.map(x => x._id === updated._id ? updated : x))
        setStats(prev => prev ? { ...prev, new: Math.max(0, prev.new - 1), read: prev.read + 1 } : prev)
      } catch {}
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(API(`/queries/${id}`), {
        method: 'PATCH', headers: authHeaders(),
        body: JSON.stringify({ status }),
      })
      const updated = await res.json()
      setQueries(prev => prev.map(q => q._id === id ? updated : q))
      if (modal?._id === id) setModal(updated)
    } catch {}
  }

  const saveNotes = async () => {
    if (!modal) return
    setSaving(true)
    try {
      const res = await fetch(API(`/queries/${modal._id}`), {
        method: 'PATCH', headers: authHeaders(),
        body: JSON.stringify({ notes }),
      })
      const updated = await res.json()
      setModal(updated)
      setQueries(prev => prev.map(q => q._id === updated._id ? updated : q))
    } catch {}
    setSaving(false)
  }

  const deleteQuery = async (id: string) => {
    try {
      await fetch(API(`/queries/${id}`), { method: 'DELETE', headers: authHeaders() })
      setQueries(prev => prev.filter(q => q._id !== id))
      setModal(null)
      fetchAll()
    } catch {}
  }

  const deleteSub = async (id: string) => {
    try {
      await fetch(API(`/subscribers/${id}`), { method: 'DELETE', headers: authHeaders() })
      setSubscribers(prev => prev.filter(s => s._id !== id))
    } catch {}
  }

  const bulkStatus = async (status: string) => {
    try {
      await fetch(API('/queries/bulk-status'), {
        method: 'POST', headers: authHeaders(),
        body: JSON.stringify({ ids: [...selectedIds], status }),
      })
      setSelectedIds(new Set())
      fetchAll()
    } catch {}
  }

  const bulkDelete = async () => {
    try {
      await fetch(API('/queries/bulk-delete'), {
        method: 'POST', headers: authHeaders(),
        body: JSON.stringify({ ids: [...selectedIds] }),
      })
      setSelectedIds(new Set())
      fetchAll()
    } catch {}
  }

  const bulkDeleteSubs = async () => {
    try {
      await fetch(API('/subscribers/bulk-delete'), {
        method: 'POST', headers: authHeaders(),
        body: JSON.stringify({ ids: [...selectedSubIds] }),
      })
      setSelectedSubIds(new Set())
      fetchAll()
    } catch {}
  }

  const exportCSV = () => {
    fetch(API('/queries/export'), { headers: authHeaders() })
      .then(r => r.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `queries-${new Date().toISOString().slice(0, 10)}.csv`
        a.click()
        URL.revokeObjectURL(url)
      })
  }

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setPwError('')
    setPwSuccess(false)
    if (pwForm.next !== pwForm.confirm) { setPwError('Passwords do not match.'); return }
    if (pwForm.next.length < 6) { setPwError('Min 6 characters.'); return }
    setPwSaving(true)
    try {
      const res = await fetch(API('/change-password'), {
        method: 'POST', headers: authHeaders(),
        body: JSON.stringify({ currentPassword: pwForm.current, newPassword: pwForm.next }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      setPwSuccess(true)
      setPwForm({ current: '', next: '', confirm: '' })
    } catch (err: any) { setPwError(err.message) }
    setPwSaving(false)
  }

  const logout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_username')
    navigate('/admin/login', { replace: true })
  }

  const inp: React.CSSProperties = {
    width: '100%', padding: '9px 12px', borderRadius: 8,
    border: '1px solid #334155', background: '#1e293b',
    color: '#f1f5f9', fontFamily: 'inherit', fontSize: '0.88rem',
    outline: 'none', boxSizing: 'border-box',
  }

  return (
    <div id="admin-root" style={{ minHeight: '100vh', background: '#0f172a', color: '#f1f5f9', fontFamily: 'var(--font)', cursor: 'auto' }}>

      {/* Header */}
      <div style={{ background: '#1e293b', borderBottom: '1px solid #334155', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="/intellicode-logo-transparent.png" alt="Logo" style={{ height: 32 }} />
          <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#48b7ff' }}>Admin</span>
        </div>

        <div style={{ display: 'flex', gap: 2 }}>
          {(['queries', 'subscribers', 'stats', 'content', 'settings'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '6px 14px', borderRadius: 6, border: 'none', cursor: 'pointer',
              background: tab === t ? '#334155' : 'transparent',
              color: tab === t ? '#f1f5f9' : '#94a3b8',
              fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 600,
              textTransform: 'capitalize',
            }}>
              {t === 'queries' && stats?.new ? `Queries (${stats.new})` : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {tab === 'queries' && (
            <button onClick={exportCSV} style={{ padding: '5px 12px', borderRadius: 6, border: '1px solid #334155', background: 'transparent', color: '#94a3b8', fontFamily: 'inherit', fontSize: '0.78rem', cursor: 'pointer' }}>
              Export CSV
            </button>
          )}
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>@{username}</span>
          <button onClick={logout} style={{ padding: '5px 12px', borderRadius: 6, border: '1px solid #334155', background: 'transparent', color: '#94a3b8', fontFamily: 'inherit', fontSize: '0.78rem', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      </div>

      <div style={{ padding: '24px', maxWidth: 1100, margin: '0 auto' }}>

        {/* ── QUERIES TAB ── */}
        {tab === 'queries' && (
          <>
            {/* Filters */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search name, email, message…"
                style={{ ...inp, width: 260 }}
              />
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ ...inp, width: 150 }}>
                <option value="">All statuses</option>
                <option value="new">New</option>
                <option value="read">Read</option>
                <option value="responded">Responded</option>
                <option value="archived">Archived</option>
              </select>
              <select value={sortOrder} onChange={e => setSortOrder(e.target.value)} style={{ ...inp, width: 140 }}>
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
              <button onClick={fetchAll} style={{ padding: '9px 14px', borderRadius: 8, border: '1px solid #334155', background: 'transparent', color: '#94a3b8', cursor: 'pointer', fontSize: '0.82rem' }}>
                Refresh
              </button>
            </div>

            {/* Bulk bar */}
            {selectedIds.size > 0 && (
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12, padding: '10px 14px', background: '#1e293b', borderRadius: 8, border: '1px solid #334155' }}>
                <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>{selectedIds.size} selected</span>
                <button onClick={() => bulkStatus('responded')} style={{ ...smallBtn, color: '#10b981', borderColor: '#10b981' }}>Responded</button>
                <button onClick={() => bulkStatus('archived')} style={{ ...smallBtn, color: '#6b7280', borderColor: '#6b7280' }}>Archive</button>
                <button onClick={bulkDelete} style={{ ...smallBtn, color: '#ef4444', borderColor: '#ef4444' }}>Delete</button>
                <button onClick={() => setSelectedIds(new Set())} style={{ ...smallBtn, marginLeft: 'auto' }}>Clear</button>
              </div>
            )}

            {/* Table */}
            {loading ? (
              <div style={{ textAlign: 'center', padding: 60, color: '#64748b' }}>Loading…</div>
            ) : queries.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 60, color: '#64748b' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>📭</div>
                No queries yet.
              </div>
            ) : (
              <div style={{ border: '1px solid #334155', borderRadius: 10, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#1e293b', borderBottom: '1px solid #334155' }}>
                      <th style={{ ...th, width: 36 }}>
                        <input type="checkbox" style={{ accentColor: '#48b7ff' }}
                          checked={selectedIds.size === queries.length && queries.length > 0}
                          onChange={() => setSelectedIds(selectedIds.size === queries.length ? new Set() : new Set(queries.map(q => q._id)))}
                        />
                      </th>
                      <th style={th}>Name / Company</th>
                      <th style={th}>Email</th>
                      <th style={th}>Service</th>
                      <th style={th}>Status</th>
                      <th style={th}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {queries.map((q, i) => (
                      <tr
                        key={q._id}
                        onClick={() => openModal(q)}
                        style={{
                          borderBottom: i < queries.length - 1 ? '1px solid #1e293b' : 'none',
                          background: i % 2 === 0 ? '#0f172a' : '#0d1526',
                          cursor: 'pointer',
                          transition: 'background 0.1s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#1e293b')}
                        onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? '#0f172a' : '#0d1526')}
                      >
                        <td style={td} onClick={e => e.stopPropagation()}>
                          <input type="checkbox" style={{ accentColor: '#48b7ff' }}
                            checked={selectedIds.has(q._id)}
                            onChange={() => setSelectedIds(prev => {
                              const n = new Set(prev)
                              n.has(q._id) ? n.delete(q._id) : n.add(q._id)
                              return n
                            })}
                          />
                        </td>
                        <td style={td}>
                          <div style={{ fontWeight: q.status === 'new' ? 700 : 400, color: '#f1f5f9', fontSize: '0.88rem' }}>{q.name}</div>
                          {q.company && <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{q.company}</div>}
                        </td>
                        <td style={{ ...td, color: '#94a3b8', fontSize: '0.82rem' }}>{q.email}</td>
                        <td style={{ ...td, fontSize: '0.78rem', color: '#64748b' }}>{q.service || '—'}</td>
                        <td style={td}>
                          <span style={{ display: 'inline-block', padding: '2px 9px', borderRadius: 100, fontSize: '0.7rem', fontWeight: 700, background: STATUS_COLORS[q.status] + '22', color: STATUS_COLORS[q.status], border: `1px solid ${STATUS_COLORS[q.status]}44` }}>
                            {q.status}
                          </span>
                        </td>
                        <td style={{ ...td, fontSize: '0.75rem', color: '#64748b', whiteSpace: 'nowrap' }}>{fmtDate(q.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div style={{ marginTop: 10, fontSize: '0.75rem', color: '#475569' }}>
              {queries.length} {queries.length === 1 ? 'query' : 'queries'}{statusFilter || search ? ' (filtered)' : ''}
            </div>
          </>
        )}

        {/* ── SUBSCRIBERS TAB ── */}
        {tab === 'subscribers' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontWeight: 700, fontSize: '1.1rem', color: '#f1f5f9' }}>Newsletter Subscribers ({subscribers.length})</h2>
              {selectedSubIds.size > 0 && (
                <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={bulkDeleteSubs} style={{ ...smallBtn, color: '#ef4444', borderColor: '#ef4444' }}>Delete {selectedSubIds.size} selected</button>
                  <button onClick={() => setSelectedSubIds(new Set())} style={smallBtn}>Clear</button>
                </div>
              )}
            </div>
            {subscribers.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 60, color: '#64748b' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>📬</div>
                No subscribers yet.
              </div>
            ) : (
              <div style={{ border: '1px solid #334155', borderRadius: 10, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#1e293b', borderBottom: '1px solid #334155' }}>
                      <th style={{ ...th, width: 36 }}>
                        <input type="checkbox" style={{ accentColor: '#48b7ff' }}
                          checked={selectedSubIds.size === subscribers.length && subscribers.length > 0}
                          onChange={() => setSelectedSubIds(selectedSubIds.size === subscribers.length ? new Set() : new Set(subscribers.map(s => s._id)))}
                        />
                      </th>
                      <th style={th}>Email</th>
                      <th style={th}>Subscribed On</th>
                      <th style={{ ...th, width: 60 }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((s, i) => (
                      <tr key={s._id} style={{ borderBottom: i < subscribers.length - 1 ? '1px solid #1e293b' : 'none', background: i % 2 === 0 ? '#0f172a' : '#0d1526' }}>
                        <td style={td}>
                          <input type="checkbox" style={{ accentColor: '#48b7ff' }}
                            checked={selectedSubIds.has(s._id)}
                            onChange={() => setSelectedSubIds(prev => {
                              const n = new Set(prev)
                              n.has(s._id) ? n.delete(s._id) : n.add(s._id)
                              return n
                            })}
                          />
                        </td>
                        <td style={{ ...td, color: '#cbd5e1' }}>{s.email}</td>
                        <td style={{ ...td, fontSize: '0.78rem', color: '#64748b' }}>{fmtDate(s.createdAt)}</td>
                        <td style={td}>
                          <button onClick={() => deleteSub(s._id)} style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', fontSize: '0.8rem', padding: '2px 6px' }}
                            onMouseEnter={e => (e.currentTarget.style.color = '#ef4444')}
                            onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
                          >✕</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* ── STATS TAB ── */}
        {tab === 'stats' && stats && (
          <>
            <h2 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 20 }}>Overview</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12, marginBottom: 32 }}>
              {[
                { label: 'Total Queries', val: stats.total },
                { label: 'New', val: stats.new, hi: true },
                { label: 'Read', val: stats.read },
                { label: 'Responded', val: stats.responded },
                { label: 'Archived', val: stats.archived },
                { label: 'Today', val: stats.today },
                { label: 'Subscribers', val: stats.subscribers ?? 0 },
              ].map(c => (
                <div key={c.label} style={{ background: '#1e293b', border: `1px solid ${c.hi ? '#3b82f6' : '#334155'}`, borderRadius: 10, padding: '16px 20px' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: c.hi ? '#60a5fa' : '#64748b', marginBottom: 6 }}>{c.label}</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: c.hi ? '#60a5fa' : '#f1f5f9', lineHeight: 1 }}>{c.val}</div>
                </div>
              ))}
            </div>
            <h3 style={{ fontWeight: 600, fontSize: '0.9rem', color: '#94a3b8', marginBottom: 12 }}>By Service</h3>
            <div style={{ maxWidth: 500, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {Object.entries(stats.byService).sort((a, b) => b[1] - a[1]).map(([svc, count]) => (
                <div key={svc}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: '0.82rem' }}>
                    <span style={{ color: '#94a3b8' }}>{svc}</span>
                    <span style={{ color: '#f1f5f9', fontWeight: 600 }}>{count}</span>
                  </div>
                  <div style={{ height: 5, borderRadius: 3, background: '#1e293b' }}>
                    <div style={{ height: '100%', borderRadius: 3, background: '#3b82f6', width: `${stats.total > 0 ? (count / stats.total) * 100 : 0}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── CONTENT TAB ── */}
        {tab === 'content' && <AdminContent />}

        {/* ── SETTINGS TAB ── */}
        {tab === 'settings' && (
          <div style={{ maxWidth: 420 }}>
            <h2 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 24 }}>Change Password</h2>
            {pwSuccess && <div style={{ background: '#052e16', border: '1px solid #166534', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: '0.85rem', color: '#4ade80' }}>Password changed successfully.</div>}
            {pwError && <div style={{ background: '#2d0a0a', border: '1px solid #7f1d1d', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: '0.85rem', color: '#f87171' }}>{pwError}</div>}
            <form onSubmit={changePassword} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { label: 'Current Password', key: 'current' as const },
                { label: 'New Password', key: 'next' as const },
                { label: 'Confirm New Password', key: 'confirm' as const },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: 5 }}>{f.label}</label>
                  <input type="password" required value={pwForm[f.key]} onChange={e => setPwForm(p => ({ ...p, [f.key]: e.target.value }))} style={inp} />
                </div>
              ))}
              <button type="submit" disabled={pwSaving} style={{ padding: '10px', borderRadius: 8, border: 'none', background: '#3b82f6', color: '#fff', fontFamily: 'inherit', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', opacity: pwSaving ? 0.6 : 1 }}>
                {pwSaving ? 'Saving…' : 'Update Password'}
              </button>
            </form>
            <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid #334155' }}>
              <div style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: 16 }}>Signed in as <strong style={{ color: '#94a3b8' }}>@{username}</strong></div>
              <button onClick={logout} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #7f1d1d', background: 'transparent', color: '#f87171', fontFamily: 'inherit', fontSize: '0.82rem', cursor: 'pointer' }}>
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── QUERY MODAL ── */}
      {modal && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
          onClick={e => { if (e.target === e.currentTarget) { setModal(null); setDeleteConfirm(false) } }}
        >
          <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 14, width: '100%', maxWidth: 600, maxHeight: '90vh', overflow: 'auto', padding: 28 }}>
            {/* Modal header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#f1f5f9', marginBottom: 3 }}>{modal.name}</div>
                <a href={`mailto:${modal.email}`} style={{ fontSize: '0.85rem', color: '#60a5fa', textDecoration: 'none' }}>{modal.email}</a>
                {modal.company && <span style={{ fontSize: '0.85rem', color: '#64748b' }}> · {modal.company}</span>}
              </div>
              <button onClick={() => { setModal(null); setDeleteConfirm(false) }} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '1.2rem', lineHeight: 1, padding: 4 }}>✕</button>
            </div>

            {/* Meta */}
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', padding: '12px 16px', background: '#0f172a', borderRadius: 8, marginBottom: 18, fontSize: '0.8rem' }}>
              <div><span style={{ color: '#64748b' }}>Received: </span><span style={{ color: '#94a3b8' }}>{fmtDate(modal.createdAt)}</span></div>
              {modal.service && <div><span style={{ color: '#64748b' }}>Service: </span><span style={{ color: '#94a3b8' }}>{modal.service}</span></div>}
              <div>
                <span style={{ display: 'inline-block', padding: '2px 9px', borderRadius: 100, fontSize: '0.7rem', fontWeight: 700, background: STATUS_COLORS[modal.status] + '22', color: STATUS_COLORS[modal.status], border: `1px solid ${STATUS_COLORS[modal.status]}44` }}>
                  {modal.status}
                </span>
              </div>
            </div>

            {/* Message */}
            <div style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#64748b', marginBottom: 8 }}>Message</div>
            <div style={{ background: '#0f172a', borderRadius: 8, padding: '14px 16px', fontSize: '0.88rem', lineHeight: 1.7, color: '#cbd5e1', marginBottom: 20, whiteSpace: 'pre-wrap' }}>
              {modal.message}
            </div>

            {/* Status buttons */}
            <div style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#64748b', marginBottom: 8 }}>Update Status</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
              {(['new', 'read', 'responded', 'archived'] as const).map(s => (
                <button key={s} onClick={() => updateStatus(modal._id, s)} style={{
                  padding: '6px 14px', borderRadius: 100, cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.78rem', fontWeight: 600,
                  border: `1.5px solid ${STATUS_COLORS[s]}`,
                  background: modal.status === s ? STATUS_COLORS[s] : 'transparent',
                  color: modal.status === s ? '#fff' : STATUS_COLORS[s],
                }}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>

            {/* Notes */}
            <div style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#64748b', marginBottom: 8 }}>Admin Notes</div>
            <textarea
              value={notes} onChange={e => setNotes(e.target.value)}
              placeholder="Internal notes, follow-up reminders…"
              style={{ width: '100%', minHeight: 80, background: '#0f172a', border: '1px solid #334155', borderRadius: 8, padding: '10px 12px', color: '#cbd5e1', fontFamily: 'inherit', fontSize: '0.85rem', resize: 'vertical', outline: 'none', boxSizing: 'border-box', lineHeight: 1.5 }}
            />
            <div style={{ display: 'flex', gap: 10, marginTop: 10, flexWrap: 'wrap' }}>
              <button onClick={saveNotes} disabled={saving || notes === (modal.notes || '')} style={{ padding: '8px 18px', borderRadius: 8, border: 'none', background: '#3b82f6', color: '#fff', fontFamily: 'inherit', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', opacity: saving || notes === (modal.notes || '') ? 0.5 : 1 }}>
                {saving ? 'Saving…' : 'Save Notes'}
              </button>
              <a href={`mailto:${modal.email}?subject=Re: Your IntelliCodeLabs Enquiry`} style={{ padding: '8px 18px', borderRadius: 8, border: '1px solid #334155', background: 'transparent', color: '#94a3b8', fontFamily: 'inherit', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                Reply via Email
              </a>
            </div>

            {/* Delete */}
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid #334155' }}>
              {deleteConfirm ? (
                <div style={{ background: '#2d0a0a', border: '1px solid #7f1d1d', borderRadius: 8, padding: '14px' }}>
                  <div style={{ fontSize: '0.85rem', color: '#fca5a5', marginBottom: 10 }}>Delete this query? This cannot be undone.</div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button onClick={() => deleteQuery(modal._id)} style={{ padding: '7px 16px', borderRadius: 8, border: 'none', background: '#ef4444', color: '#fff', fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}>Yes, Delete</button>
                    <button onClick={() => setDeleteConfirm(false)} style={{ padding: '7px 16px', borderRadius: 8, border: '1px solid #334155', background: 'transparent', color: '#94a3b8', fontFamily: 'inherit', fontSize: '0.82rem', cursor: 'pointer' }}>Cancel</button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setDeleteConfirm(true)} style={{ padding: '7px 16px', borderRadius: 8, border: '1px solid #7f1d1d', background: 'transparent', color: '#f87171', fontFamily: 'inherit', fontSize: '0.82rem', cursor: 'pointer' }}>
                  Delete Query
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const th: React.CSSProperties = {
  padding: '10px 14px', textAlign: 'left', fontSize: '0.72rem',
  fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
  color: '#64748b',
}

const td: React.CSSProperties = {
  padding: '11px 14px', verticalAlign: 'middle',
}

const smallBtn: React.CSSProperties = {
  padding: '4px 12px', borderRadius: 6, border: '1px solid #475569',
  background: 'transparent', color: '#94a3b8', fontFamily: 'inherit',
  fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
}
