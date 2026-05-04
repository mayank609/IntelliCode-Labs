import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

/* ── Types ── */
interface Query {
  id: string
  name: string
  email: string
  company: string
  service: string
  message: string
  status: 'new' | 'read' | 'responded' | 'archived'
  notes: string
  createdAt: string
}

interface Stats {
  total: number
  new: number
  read: number
  responded: number
  archived: number
  today: number
  byService: Record<string, number>
}

/* ── Helpers ── */
const API = (path: string) => `/api/admin${path}`

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
  }
}

const STATUS_META: Record<string, { label: string; color: string; bg: string }> = {
  new:       { label: 'New',       color: '#fff',    bg: '#3b82f6' },
  read:      { label: 'Read',      color: '#fff',    bg: '#f59e0b' },
  responded: { label: 'Responded', color: '#fff',    bg: '#10b981' },
  archived:  { label: 'Archived',  color: '#9ca3af', bg: '#374151' },
}

function StatusBadge({ status }: { status: string }) {
  const meta = STATUS_META[status] || STATUS_META.read
  return (
    <span style={{
      display: 'inline-block', padding: '3px 10px', borderRadius: 100,
      fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.04em',
      background: meta.bg, color: meta.color,
    }}>
      {meta.label}
    </span>
  )
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

/* ── Stat Card ── */
function StatCard({ label, value, accent, sub }: { label: string; value: number | string; accent?: boolean; sub?: string }) {
  return (
    <div style={{
      background: accent ? 'rgba(72,183,255,0.12)' : 'rgba(255,255,255,0.04)',
      border: `1px solid ${accent ? 'rgba(72,183,255,0.35)' : 'rgba(255,255,255,0.07)'}`,
      borderRadius: 14, padding: '20px 24px', flex: 1, minWidth: 120,
    }}>
      <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: accent ? '#48b7ff' : '#6e8caa', marginBottom: 8 }}>
        {label}
      </div>
      <div style={{ fontWeight: 800, fontSize: '2rem', letterSpacing: '-0.04em', color: accent ? '#48b7ff' : '#e8f2ff', lineHeight: 1 }}>
        {value}
      </div>
      {sub && <div style={{ fontSize: '0.72rem', color: '#4a6480', marginTop: 4 }}>{sub}</div>}
    </div>
  )
}

/* ── Main Component ── */
export default function AdminDashboard() {
  const navigate = useNavigate()
  const username = localStorage.getItem('admin_username') || 'admin'

  const [queries, setQueries] = useState<Query[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [selected, setSelected] = useState<Query | null>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [serviceFilter, setServiceFilter] = useState('')
  const [sortOrder, setSortOrder] = useState('newest')
  const [draftNotes, setDraftNotes] = useState('')
  const [saving, setSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [activeTab, setActiveTab] = useState<'queries' | 'stats'>('queries')

  /* ── Auth guard ── */
  useEffect(() => {
    if (!localStorage.getItem('admin_token')) navigate('/admin/login', { replace: true })
  }, [navigate])

  /* ── Fetch ── */
  const fetchAll = useCallback(async () => {
    try {
      const params = new URLSearchParams()
      if (statusFilter) params.set('status', statusFilter)
      if (serviceFilter) params.set('service', serviceFilter)
      if (search) params.set('search', search)
      params.set('sort', sortOrder)

      const [qRes, sRes] = await Promise.all([
        fetch(API(`/queries?${params}`), { headers: authHeaders() }),
        fetch(API('/stats'), { headers: authHeaders() }),
      ])

      if (qRes.status === 401 || sRes.status === 401) {
        localStorage.removeItem('admin_token')
        navigate('/admin/login', { replace: true })
        return
      }

      const [qData, sData] = await Promise.all([qRes.json(), sRes.json()])
      setQueries(qData)
      setStats(sData)
    } catch {
      // network error — keep showing stale data
    } finally {
      setLoading(false)
    }
  }, [statusFilter, serviceFilter, search, sortOrder, navigate])

  useEffect(() => { fetchAll() }, [fetchAll])

  /* ── Select query ── */
  const selectQuery = async (q: Query) => {
    setDeleteConfirm(false)
    setSelected(q)
    setDraftNotes(q.notes || '')
    if (q.status === 'new') {
      const res = await fetch(API(`/queries/${q.id}`), { headers: authHeaders() })
      const updated = await res.json()
      setSelected(updated)
      setQueries(prev => prev.map(x => x.id === updated.id ? updated : x))
      setStats(prev => prev ? { ...prev, new: Math.max(0, prev.new - 1), read: prev.read + 1 } : prev)
    }
  }

  /* ── Update status ── */
  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(API(`/queries/${id}`), {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify({ status }),
    })
    const updated = await res.json()
    setQueries(prev => prev.map(q => q.id === id ? updated : q))
    if (selected?.id === id) setSelected(updated)
    fetchAll()
  }

  /* ── Save notes ── */
  const saveNotes = async () => {
    if (!selected) return
    setSaving(true)
    const res = await fetch(API(`/queries/${selected.id}`), {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify({ notes: draftNotes }),
    })
    const updated = await res.json()
    setSelected(updated)
    setQueries(prev => prev.map(q => q.id === updated.id ? updated : q))
    setSaving(false)
  }

  /* ── Delete single ── */
  const deleteQuery = async (id: string) => {
    await fetch(API(`/queries/${id}`), { method: 'DELETE', headers: authHeaders() })
    setQueries(prev => prev.filter(q => q.id !== id))
    setSelected(null)
    setDeleteConfirm(false)
    fetchAll()
  }

  /* ── Bulk actions ── */
  const bulkDelete = async () => {
    await fetch(API('/queries/bulk-delete'), {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ ids: [...selectedIds] }),
    })
    setSelectedIds(new Set())
    fetchAll()
  }

  const bulkStatus = async (status: string) => {
    await fetch(API('/queries/bulk-status'), {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ ids: [...selectedIds], status }),
    })
    setSelectedIds(new Set())
    fetchAll()
  }

  /* ── Logout ── */
  const logout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_username')
    navigate('/admin/login', { replace: true })
  }

  const allServices = Array.from(new Set(queries.map(q => q.service).filter(Boolean)))

  /* ── Layout ── */
  const S = {
    root: {
      minHeight: '100vh', display: 'flex', flexDirection: 'column' as const,
      background: '#0a1628', fontFamily: 'var(--font)', color: '#e8f2ff',
    },
    header: {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 32px', height: 60, background: 'rgba(10,22,40,0.95)',
      borderBottom: '1px solid rgba(72,183,255,0.12)', flexShrink: 0,
      backdropFilter: 'blur(12px)', position: 'sticky' as const, top: 0, zIndex: 100,
    },
    body: { flex: 1, display: 'flex', overflow: 'hidden', height: 'calc(100vh - 60px)' },
    listPanel: {
      width: selected ? '56%' : '100%', display: 'flex', flexDirection: 'column' as const,
      borderRight: '1px solid rgba(72,183,255,0.1)', overflow: 'hidden',
      transition: 'width 0.25s ease',
    },
    detailPanel: {
      flex: 1, overflow: 'auto', background: 'rgba(255,255,255,0.02)',
      display: selected ? 'flex' : 'none', flexDirection: 'column' as const,
    },
  }

  return (
    <div style={S.root}>
      {/* ── Header ── */}
      <header style={S.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <img src="/intellicode-logo-transparent.png" alt="Logo" style={{ height: 36, objectFit: 'contain' }} />
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#48b7ff' }}>
            Admin
          </span>
        </div>

        <div style={{ display: 'flex', gap: 4 }}>
          {(['queries', 'stats'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: activeTab === tab ? 'rgba(72,183,255,0.15)' : 'none',
                border: 'none', borderRadius: 8, padding: '7px 18px',
                color: activeTab === tab ? '#48b7ff' : '#6e8caa',
                fontFamily: 'var(--font)', fontSize: '0.85rem', fontWeight: 600,
                cursor: 'pointer', textTransform: 'capitalize',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {stats && stats.new > 0 && (
            <span style={{ background: '#3b82f6', color: '#fff', borderRadius: 100, padding: '2px 10px', fontSize: '0.72rem', fontWeight: 700 }}>
              {stats.new} new
            </span>
          )}
          <span style={{ fontSize: '0.82rem', color: '#6e8caa' }}>@{username}</span>
          <button onClick={logout} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '6px 14px', color: '#a8c5e0', fontFamily: 'var(--font)', fontSize: '0.82rem', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      </header>

      {/* ── Stats Tab ── */}
      {activeTab === 'stats' && stats && (
        <div style={{ flex: 1, overflow: 'auto', padding: '32px' }}>
          <h2 style={{ fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.02em', marginBottom: 24 }}>Overview</h2>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 40 }}>
            <StatCard label="Total Queries" value={stats.total} />
            <StatCard label="New" value={stats.new} accent />
            <StatCard label="Read" value={stats.read} />
            <StatCard label="Responded" value={stats.responded} />
            <StatCard label="Archived" value={stats.archived} />
            <StatCard label="Today" value={stats.today} sub="submissions today" />
          </div>

          <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#a8c5e0', marginBottom: 16 }}>Queries by Service Area</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 600 }}>
            {Object.entries(stats.byService).sort((a, b) => b[1] - a[1]).map(([svc, count]) => (
              <div key={svc}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: '0.85rem', color: '#a8c5e0' }}>{svc}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#48b7ff' }}>{count}</span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.07)' }}>
                  <div style={{ height: '100%', borderRadius: 3, background: '#48b7ff', width: `${(count / stats.total) * 100}%`, opacity: 0.8 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Queries Tab ── */}
      {activeTab === 'queries' && (
        <div style={S.body}>
          {/* List panel */}
          <div style={S.listPanel}>
            {/* Filters bar */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(72,183,255,0.08)', display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
              {/* Search */}
              <div style={{ position: 'relative', flex: 1, minWidth: 180 }}>
                <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="#4a6480" strokeWidth="2" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}>
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search queries…"
                  style={{
                    width: '100%', paddingLeft: 36, paddingRight: 12, height: 36,
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 8, color: '#e8f2ff', fontFamily: 'var(--font)', fontSize: '0.85rem',
                    outline: 'none', boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Status filter */}
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                style={{ height: 36, padding: '0 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#a8c5e0', fontFamily: 'var(--font)', fontSize: '0.82rem', outline: 'none', cursor: 'pointer' }}
              >
                <option value="">All statuses</option>
                <option value="new">New</option>
                <option value="read">Read</option>
                <option value="responded">Responded</option>
                <option value="archived">Archived</option>
              </select>

              {/* Service filter */}
              <select
                value={serviceFilter}
                onChange={e => setServiceFilter(e.target.value)}
                style={{ height: 36, padding: '0 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#a8c5e0', fontFamily: 'var(--font)', fontSize: '0.82rem', outline: 'none', cursor: 'pointer' }}
              >
                <option value="">All services</option>
                {allServices.map(s => <option key={s} value={s}>{s}</option>)}
              </select>

              {/* Sort */}
              <select
                value={sortOrder}
                onChange={e => setSortOrder(e.target.value)}
                style={{ height: 36, padding: '0 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#a8c5e0', fontFamily: 'var(--font)', fontSize: '0.82rem', outline: 'none', cursor: 'pointer' }}
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>

              <button onClick={fetchAll} title="Refresh" style={{ height: 36, width: 36, background: 'rgba(72,183,255,0.1)', border: '1px solid rgba(72,183,255,0.2)', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#48b7ff" strokeWidth="2.5">
                  <path d="M23 4v6h-6M1 20v-6h6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Bulk actions */}
            {selectedIds.size > 0 && (
              <div style={{ padding: '10px 20px', background: 'rgba(72,183,255,0.08)', borderBottom: '1px solid rgba(72,183,255,0.15)', display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ fontSize: '0.82rem', color: '#48b7ff', fontWeight: 600 }}>{selectedIds.size} selected</span>
                <button onClick={() => bulkStatus('responded')} style={bulkBtn('#10b981')}>Mark Responded</button>
                <button onClick={() => bulkStatus('archived')} style={bulkBtn('#6b7280')}>Archive</button>
                <button onClick={bulkDelete} style={bulkBtn('#ef4444')}>Delete</button>
                <button onClick={() => setSelectedIds(new Set())} style={{ ...bulkBtn('#6e8caa'), marginLeft: 'auto' }}>Clear</button>
              </div>
            )}

            {/* Query list */}
            <div style={{ flex: 1, overflow: 'auto' }}>
              {loading ? (
                <div style={{ padding: 40, textAlign: 'center', color: '#4a6480' }}>Loading…</div>
              ) : queries.length === 0 ? (
                <div style={{ padding: 60, textAlign: 'center', color: '#4a6480' }}>
                  <div style={{ fontSize: '2rem', marginBottom: 12 }}>📭</div>
                  <div style={{ fontWeight: 600 }}>No queries found</div>
                  <div style={{ fontSize: '0.85rem', marginTop: 6 }}>Adjust your filters or wait for new submissions.</div>
                </div>
              ) : queries.map(q => (
                <div
                  key={q.id}
                  onClick={() => selectQuery(q)}
                  style={{
                    padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)',
                    cursor: 'pointer', display: 'flex', gap: 12, alignItems: 'flex-start',
                    background: selected?.id === q.id ? 'rgba(72,183,255,0.07)' : 'transparent',
                    borderLeft: selected?.id === q.id ? '3px solid #48b7ff' : '3px solid transparent',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => { if (selected?.id !== q.id) e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
                  onMouseLeave={e => { if (selected?.id !== q.id) e.currentTarget.style.background = 'transparent' }}
                >
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedIds.has(q.id)}
                    onChange={e => {
                      e.stopPropagation()
                      setSelectedIds(prev => {
                        const next = new Set(prev)
                        next.has(q.id) ? next.delete(q.id) : next.add(q.id)
                        return next
                      })
                    }}
                    onClick={e => e.stopPropagation()}
                    style={{ marginTop: 3, flexShrink: 0, accentColor: '#48b7ff' }}
                  />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontWeight: q.status === 'new' ? 700 : 500, fontSize: '0.9rem', color: '#e8f2ff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {q.name}
                        {q.company ? <span style={{ color: '#6e8caa', fontWeight: 400 }}> · {q.company}</span> : null}
                      </span>
                      <StatusBadge status={q.status} />
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#4a6480', marginBottom: 5 }}>{q.email}</div>
                    {q.service && (
                      <span style={{ fontSize: '0.68rem', fontWeight: 600, background: 'rgba(72,183,255,0.1)', color: '#48b7ff', borderRadius: 100, padding: '2px 8px', letterSpacing: '0.04em' }}>
                        {q.service}
                      </span>
                    )}
                    <div style={{ fontSize: '0.8rem', color: '#6e8caa', marginTop: 6, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as any }}>
                      {q.message}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#3a5570', marginTop: 6 }}>{fmtDate(q.createdAt)}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer count */}
            <div style={{ padding: '10px 20px', borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: '0.75rem', color: '#3a5570' }}>
              {queries.length} {queries.length === 1 ? 'query' : 'queries'}{statusFilter || serviceFilter || search ? ' (filtered)' : ''}
            </div>
          </div>

          {/* ── Detail panel ── */}
          {selected && (
            <div style={S.detailPanel}>
              <div style={{ padding: '24px 28px', borderBottom: '1px solid rgba(72,183,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.15rem', color: '#e8f2ff', marginBottom: 4 }}>{selected.name}</div>
                  <a href={`mailto:${selected.email}`} style={{ fontSize: '0.85rem', color: '#48b7ff', textDecoration: 'none' }}>{selected.email}</a>
                  {selected.company && <span style={{ fontSize: '0.85rem', color: '#6e8caa' }}> · {selected.company}</span>}
                </div>
                <button
                  onClick={() => { setSelected(null); setDeleteConfirm(false) }}
                  style={{ background: 'none', border: 'none', color: '#4a6480', cursor: 'pointer', padding: 4, flexShrink: 0 }}
                >
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" /></svg>
                </button>
              </div>

              <div style={{ padding: '24px 28px', flex: 1, overflow: 'auto' }}>
                {/* Meta row */}
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24, padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div>
                    <div style={{ fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#4a6480', marginBottom: 4 }}>Received</div>
                    <div style={{ fontSize: '0.85rem', color: '#a8c5e0' }}>{fmtDate(selected.createdAt)}</div>
                  </div>
                  {selected.service && (
                    <div>
                      <div style={{ fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#4a6480', marginBottom: 4 }}>Service</div>
                      <div style={{ fontSize: '0.85rem', color: '#a8c5e0' }}>{selected.service}</div>
                    </div>
                  )}
                  <div>
                    <div style={{ fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#4a6480', marginBottom: 4 }}>Status</div>
                    <StatusBadge status={selected.status} />
                  </div>
                </div>

                {/* Message */}
                <div style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#4a6480', marginBottom: 10 }}>Message</div>
                <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '18px 20px', fontSize: '0.9rem', lineHeight: 1.75, color: '#c8dff0', marginBottom: 28, whiteSpace: 'pre-wrap' }}>
                  {selected.message}
                </div>

                {/* Change status */}
                <div style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#4a6480', marginBottom: 10 }}>Update Status</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
                  {(['new', 'read', 'responded', 'archived'] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => updateStatus(selected.id, s)}
                      style={{
                        padding: '7px 16px', borderRadius: 100, border: '1.5px solid',
                        fontFamily: 'var(--font)', fontSize: '0.78rem', fontWeight: 600,
                        cursor: 'pointer', transition: 'all 0.15s',
                        background: selected.status === s ? STATUS_META[s].bg : 'transparent',
                        borderColor: STATUS_META[s].bg,
                        color: selected.status === s ? '#fff' : STATUS_META[s].bg,
                      }}
                    >
                      {STATUS_META[s].label}
                    </button>
                  ))}
                </div>

                {/* Admin notes */}
                <div style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#4a6480', marginBottom: 10 }}>Admin Notes</div>
                <textarea
                  value={draftNotes}
                  onChange={e => setDraftNotes(e.target.value)}
                  placeholder="Add internal notes, next steps, follow-up reminders…"
                  style={{
                    width: '100%', minHeight: 100, background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12,
                    padding: '14px 16px', color: '#c8dff0', fontFamily: 'var(--font)',
                    fontSize: '0.875rem', resize: 'vertical', outline: 'none', boxSizing: 'border-box',
                    lineHeight: 1.6,
                  }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(72,183,255,0.4)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
                />
                <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                  <button
                    onClick={saveNotes}
                    disabled={saving || draftNotes === (selected.notes || '')}
                    style={{
                      background: '#48b7ff', color: '#07233f', border: 'none',
                      fontFamily: 'var(--font)', fontSize: '0.85rem', fontWeight: 700,
                      padding: '9px 20px', borderRadius: 100, cursor: 'pointer',
                      opacity: saving || draftNotes === (selected.notes || '') ? 0.5 : 1,
                    }}
                  >
                    {saving ? 'Saving…' : 'Save Notes'}
                  </button>
                  <a
                    href={`mailto:${selected.email}?subject=Re: Your IntelliCodeLabs Enquiry`}
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#a8c5e0', fontFamily: 'var(--font)', fontSize: '0.85rem', fontWeight: 600, padding: '9px 20px', borderRadius: 100, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                  >
                    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 6L12 13 2 6" strokeLinecap="round" /></svg>
                    Reply via Email
                  </a>
                </div>

                {/* Delete */}
                <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  {deleteConfirm ? (
                    <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 12, padding: '16px 20px' }}>
                      <div style={{ fontSize: '0.88rem', color: '#fca5a5', fontWeight: 600, marginBottom: 12 }}>Are you sure? This cannot be undone.</div>
                      <div style={{ display: 'flex', gap: 10 }}>
                        <button onClick={() => deleteQuery(selected.id)} style={{ background: '#ef4444', color: '#fff', border: 'none', fontFamily: 'var(--font)', fontSize: '0.85rem', fontWeight: 700, padding: '8px 20px', borderRadius: 100, cursor: 'pointer' }}>
                          Yes, Delete
                        </button>
                        <button onClick={() => setDeleteConfirm(false)} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#a8c5e0', fontFamily: 'var(--font)', fontSize: '0.85rem', fontWeight: 600, padding: '8px 20px', borderRadius: 100, cursor: 'pointer' }}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => setDeleteConfirm(true)} style={{ background: 'none', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', fontFamily: 'var(--font)', fontSize: '0.82rem', fontWeight: 600, padding: '8px 18px', borderRadius: 100, cursor: 'pointer' }}>
                      Delete Query
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function bulkBtn(color: string): React.CSSProperties {
  return {
    background: `${color}20`, border: `1px solid ${color}50`,
    color, fontFamily: 'var(--font)', fontSize: '0.78rem', fontWeight: 600,
    padding: '5px 14px', borderRadius: 100, cursor: 'pointer',
  }
}
