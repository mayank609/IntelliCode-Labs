import { useState, useEffect, useCallback } from 'react'

type ContentType = 'blogs' | 'case-studies' | 'services' | 'products' | 'industries'

interface Doc { _id: string; title: string; published: boolean; order: number; [key: string]: any }

const TYPES: { key: ContentType; label: string; fields: Field[] }[] = [
  {
    key: 'blogs',
    label: 'Blog Posts',
    fields: [
      { key: 'title',    label: 'Title',    type: 'text',     required: true },
      { key: 'category', label: 'Category', type: 'text' },
      { key: 'date',     label: 'Date',     type: 'text',     placeholder: 'e.g. May 12, 2026' },
      { key: 'author',   label: 'Author',   type: 'text' },
      { key: 'desc',     label: 'Summary',  type: 'textarea' },
      { key: 'image',    label: 'Image URL',type: 'text' },
      { key: 'order',    label: 'Order',    type: 'number' },
      { key: 'published',label: 'Published',type: 'checkbox' },
    ],
  },
  {
    key: 'case-studies',
    label: 'Case Studies',
    fields: [
      { key: 'title',       label: 'Title',        type: 'text',     required: true },
      { key: 'client',      label: 'Client',       type: 'text' },
      { key: 'domain',      label: 'Domain',       type: 'text' },
      { key: 'metric',      label: 'Metric',       type: 'text',     placeholder: 'e.g. 74%' },
      { key: 'metricLabel', label: 'Metric Label', type: 'text' },
      { key: 'desc',        label: 'Description',  type: 'textarea' },
      { key: 'image',       label: 'Image URL',    type: 'text' },
      { key: 'order',       label: 'Order',        type: 'number' },
      { key: 'published',   label: 'Published',    type: 'checkbox' },
    ],
  },
  {
    key: 'services',
    label: 'Services',
    fields: [
      { key: 'title',     label: 'Title',   type: 'text',     required: true },
      { key: 'icon',      label: 'Icon key',type: 'text',     placeholder: 'testing | agent | prompt | voice' },
      { key: 'desc',      label: 'Description', type: 'textarea' },
      { key: 'bullets',   label: 'Bullet Points (one per line)', type: 'lines' },
      { key: 'order',     label: 'Order',   type: 'number' },
      { key: 'published', label: 'Published', type: 'checkbox' },
    ],
  },
  {
    key: 'products',
    label: 'Products',
    fields: [
      { key: 'title',       label: 'Title',         type: 'text',     required: true },
      { key: 'badge',       label: 'Badge',         type: 'text' },
      { key: 'tagline',     label: 'Tagline',       type: 'text' },
      { key: 'desc',        label: 'Description',   type: 'textarea' },
      { key: 'metric',      label: 'Metric',        type: 'text' },
      { key: 'metricLabel', label: 'Metric Label',  type: 'text' },
      { key: 'tags',        label: 'Tags (one per line)',     type: 'lines' },
      { key: 'features',    label: 'Features (one per line)', type: 'lines' },
      { key: 'color',       label: 'Color (CSS)',   type: 'text' },
      { key: 'order',       label: 'Order',         type: 'number' },
      { key: 'published',   label: 'Published',     type: 'checkbox' },
    ],
  },
  {
    key: 'industries',
    label: 'Industries',
    fields: [
      { key: 'title',       label: 'Title',          type: 'text',     required: true },
      { key: 'tag',         label: 'Tag',            type: 'text' },
      { key: 'desc',        label: 'Description',    type: 'textarea' },
      { key: 'bgWord',      label: 'Background Word',type: 'text' },
      { key: 'metric',      label: 'Metric',         type: 'text' },
      { key: 'metricLabel', label: 'Metric Label',   type: 'text' },
      { key: 'variant',     label: 'Variant',        type: 'text',     placeholder: 'dark | light | accent' },
      { key: 'challenges',  label: 'Challenges (one per line)', type: 'lines' },
      { key: 'solutions',   label: 'Solutions (one per line)',  type: 'lines' },
      { key: 'order',       label: 'Order',          type: 'number' },
      { key: 'published',   label: 'Published',      type: 'checkbox' },
    ],
  },
]

interface Field {
  key: string
  label: string
  type: 'text' | 'textarea' | 'number' | 'checkbox' | 'lines'
  required?: boolean
  placeholder?: string
}

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
  }
}

const API = (path: string) => `/api/admin/content${path}`

function blankForm(fields: Field[]): Record<string, any> {
  const form: Record<string, any> = {}
  for (const f of fields) {
    if (f.type === 'checkbox') form[f.key] = true
    else if (f.type === 'number') form[f.key] = 0
    else if (f.type === 'lines') form[f.key] = ''
    else form[f.key] = ''
  }
  return form
}

function docToForm(doc: Doc, fields: Field[]): Record<string, any> {
  const form: Record<string, any> = {}
  for (const f of fields) {
    if (f.type === 'lines') {
      form[f.key] = Array.isArray(doc[f.key]) ? doc[f.key].join('\n') : (doc[f.key] || '')
    } else {
      form[f.key] = doc[f.key] ?? (f.type === 'checkbox' ? true : f.type === 'number' ? 0 : '')
    }
  }
  return form
}

function formToBody(form: Record<string, any>, fields: Field[]): Record<string, any> {
  const body: Record<string, any> = {}
  for (const f of fields) {
    if (f.type === 'lines') {
      body[f.key] = (form[f.key] as string).split('\n').map((s: string) => s.trim()).filter(Boolean)
    } else if (f.type === 'number') {
      body[f.key] = Number(form[f.key]) || 0
    } else {
      body[f.key] = form[f.key]
    }
  }
  return body
}

export default function AdminContent() {
  const [activeType, setActiveType] = useState<ContentType>('blogs')
  const [docs, setDocs] = useState<Doc[]>([])
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState<'create' | 'edit' | null>(null)
  const [editDoc, setEditDoc] = useState<Doc | null>(null)
  const [form, setForm] = useState<Record<string, any>>({})
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const typeDef = TYPES.find(t => t.key === activeType)!

  const fetchDocs = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(API(`/${activeType}`), { headers: authHeaders() })
      const data = await res.json()
      setDocs(Array.isArray(data) ? data : [])
    } catch {}
    setLoading(false)
  }, [activeType])

  useEffect(() => { fetchDocs() }, [fetchDocs])

  const openCreate = () => {
    setEditDoc(null)
    setForm(blankForm(typeDef.fields))
    setError('')
    setModal('create')
  }

  const openEdit = (doc: Doc) => {
    setEditDoc(doc)
    setForm(docToForm(doc, typeDef.fields))
    setError('')
    setModal('edit')
  }

  const closeModal = () => { setModal(null); setEditDoc(null); setError('') }

  const handleSave = async () => {
    setSaving(true)
    setError('')
    try {
      const body = formToBody(form, typeDef.fields)
      const url = modal === 'edit' ? API(`/${activeType}/${editDoc!._id}`) : API(`/${activeType}`)
      const method = modal === 'edit' ? 'PATCH' : 'POST'
      const res = await fetch(url, { method, headers: authHeaders(), body: JSON.stringify(body) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Save failed')
      closeModal()
      fetchDocs()
    } catch (err: any) { setError(err.message) }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    try {
      await fetch(API(`/${activeType}/${id}`), { method: 'DELETE', headers: authHeaders() })
      setDeleteId(null)
      fetchDocs()
    } catch {}
  }

  const setField = (key: string, value: any) => setForm(p => ({ ...p, [key]: value }))

  const inp: React.CSSProperties = {
    width: '100%', padding: '8px 10px', borderRadius: 6,
    border: '1px solid #334155', background: '#0f172a',
    color: '#f1f5f9', fontFamily: 'inherit', fontSize: '0.85rem',
    outline: 'none', boxSizing: 'border-box',
  }

  return (
    <div>
      {/* Type tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
        {TYPES.map(t => (
          <button key={t.key} onClick={() => setActiveType(t.key)} style={{
            padding: '6px 14px', borderRadius: 6, border: '1px solid',
            borderColor: activeType === t.key ? '#3b82f6' : '#334155',
            background: activeType === t.key ? '#1e3a5f' : 'transparent',
            color: activeType === t.key ? '#60a5fa' : '#94a3b8',
            fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#f1f5f9' }}>{typeDef.label} ({docs.length})</h3>
        <button onClick={openCreate} style={{ padding: '7px 16px', borderRadius: 7, border: 'none', background: '#3b82f6', color: '#fff', fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}>
          + Add New
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 40, color: '#64748b' }}>Loading…</div>
      ) : docs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 40, color: '#64748b' }}>
          No {typeDef.label.toLowerCase()} yet. Click "+ Add New" to create one.
        </div>
      ) : (
        <div style={{ border: '1px solid #334155', borderRadius: 10, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#1e293b', borderBottom: '1px solid #334155' }}>
                <th style={th}>#</th>
                <th style={th}>Title</th>
                <th style={th}>Status</th>
                <th style={{ ...th, width: 100 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((doc, i) => (
                <tr key={doc._id} style={{ borderBottom: i < docs.length - 1 ? '1px solid #1e293b' : 'none', background: i % 2 === 0 ? '#0f172a' : '#0d1526' }}>
                  <td style={{ ...td, color: '#475569', fontSize: '0.75rem', width: 36 }}>{doc.order ?? i}</td>
                  <td style={{ ...td, color: '#e2e8f0', fontSize: '0.88rem' }}>{doc.title}</td>
                  <td style={td}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: 100, background: doc.published ? '#052e16' : '#1c1917', color: doc.published ? '#4ade80' : '#78716c', border: `1px solid ${doc.published ? '#166534' : '#44403c'}` }}>
                      {doc.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td style={td}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => openEdit(doc)} style={{ padding: '4px 10px', borderRadius: 5, border: '1px solid #334155', background: 'transparent', color: '#94a3b8', fontFamily: 'inherit', fontSize: '0.75rem', cursor: 'pointer' }}>Edit</button>
                      <button onClick={() => setDeleteId(doc._id)} style={{ padding: '4px 10px', borderRadius: 5, border: '1px solid #7f1d1d', background: 'transparent', color: '#f87171', fontFamily: 'inherit', fontSize: '0.75rem', cursor: 'pointer' }}>Del</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create/Edit Modal */}
      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
          onClick={e => { if (e.target === e.currentTarget) closeModal() }}>
          <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 14, width: '100%', maxWidth: 580, maxHeight: '90vh', overflow: 'auto', padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#f1f5f9' }}>
                {modal === 'create' ? `New ${typeDef.label.replace(/s$/, '')}` : `Edit: ${editDoc?.title}`}
              </h3>
              <button onClick={closeModal} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '1.1rem' }}>✕</button>
            </div>

            {error && <div style={{ background: '#2d0a0a', border: '1px solid #7f1d1d', borderRadius: 7, padding: '9px 12px', marginBottom: 14, fontSize: '0.82rem', color: '#f87171' }}>{error}</div>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {typeDef.fields.map(f => (
                <div key={f.key}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem', color: '#94a3b8', marginBottom: f.type === 'checkbox' ? 0 : 5 }}>
                    {f.type === 'checkbox' ? (
                      <>
                        <input type="checkbox" checked={!!form[f.key]} onChange={e => setField(f.key, e.target.checked)} style={{ accentColor: '#3b82f6', width: 15, height: 15 }} />
                        {f.label}
                      </>
                    ) : (
                      f.label + (f.required ? ' *' : '')
                    )}
                  </label>
                  {f.type === 'text' && (
                    <input value={form[f.key] ?? ''} onChange={e => setField(f.key, e.target.value)} placeholder={f.placeholder} required={f.required} style={inp} />
                  )}
                  {f.type === 'number' && (
                    <input type="number" value={form[f.key] ?? 0} onChange={e => setField(f.key, e.target.value)} style={{ ...inp, width: 100 }} />
                  )}
                  {f.type === 'textarea' && (
                    <textarea value={form[f.key] ?? ''} onChange={e => setField(f.key, e.target.value)} rows={3} style={{ ...inp, resize: 'vertical', lineHeight: 1.5 }} />
                  )}
                  {f.type === 'lines' && (
                    <>
                      <textarea value={form[f.key] ?? ''} onChange={e => setField(f.key, e.target.value)} rows={4} placeholder="One item per line" style={{ ...inp, resize: 'vertical', lineHeight: 1.5 }} />
                      <div style={{ fontSize: '0.7rem', color: '#475569', marginTop: 3 }}>One item per line</div>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button onClick={handleSave} disabled={saving} style={{ padding: '9px 20px', borderRadius: 8, border: 'none', background: '#3b82f6', color: '#fff', fontFamily: 'inherit', fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer', opacity: saving ? 0.6 : 1 }}>
                {saving ? 'Saving…' : modal === 'edit' ? 'Save Changes' : 'Create'}
              </button>
              <button onClick={closeModal} style={{ padding: '9px 18px', borderRadius: 8, border: '1px solid #334155', background: 'transparent', color: '#94a3b8', fontFamily: 'inherit', fontSize: '0.88rem', cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 12, padding: 24, maxWidth: 360, width: '100%' }}>
            <div style={{ fontWeight: 600, color: '#f1f5f9', marginBottom: 8 }}>Delete this item?</div>
            <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: 18 }}>This cannot be undone.</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => handleDelete(deleteId)} style={{ padding: '8px 18px', borderRadius: 7, border: 'none', background: '#ef4444', color: '#fff', fontFamily: 'inherit', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>Delete</button>
              <button onClick={() => setDeleteId(null)} style={{ padding: '8px 16px', borderRadius: 7, border: '1px solid #334155', background: 'transparent', color: '#94a3b8', fontFamily: 'inherit', fontSize: '0.85rem', cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const th: React.CSSProperties = { padding: '10px 14px', textAlign: 'left', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#64748b' }
const td: React.CSSProperties = { padding: '10px 14px', verticalAlign: 'middle' }
