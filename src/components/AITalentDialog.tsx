import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const STORAGE_KEY = 'ai_talent_dialog_dismissed'

export default function AITalentDialog() {
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return
    const t = setTimeout(() => setVisible(true), 3500)
    return () => clearTimeout(t)
  }, [])

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  const handleCTA = () => {
    dismiss()
    navigate('/contact')
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={dismiss}
            style={{
              position: 'fixed', inset: 0, zIndex: 9998,
              background: 'rgba(10,25,47,0.55)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
          />

          {/* Dialog */}
          <motion.div
            key="dialog"
            initial={{ opacity: 0, y: 60, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed', zIndex: 9999,
              bottom: 40, right: 40,
              width: 'min(420px, calc(100vw - 32px))',
              background: '#fff',
              borderRadius: 24,
              boxShadow: '0 24px 80px rgba(10,25,47,0.22), 0 4px 16px rgba(10,25,47,0.10)',
              overflow: 'hidden',
              fontFamily: 'var(--font)',
            }}
          >
            {/* Gradient header strip */}
            <div style={{
              background: 'linear-gradient(135deg, var(--black) 0%, oklch(0.38 0.18 232) 60%, oklch(0.52 0.12 168) 100%)',
              padding: '28px 28px 22px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Decorative blobs */}
              <div style={{
                position: 'absolute', top: -30, right: -30,
                width: 130, height: 130, borderRadius: '50%',
                background: 'oklch(0.55 0.18 232 / 0.35)',
                filter: 'blur(30px)',
              }} />
              <div style={{
                position: 'absolute', bottom: -20, left: 60,
                width: 90, height: 90, borderRadius: '50%',
                background: 'oklch(0.58 0.14 168 / 0.30)',
                filter: 'blur(24px)',
              }} />

              {/* Close button */}
              <button
                onClick={dismiss}
                aria-label="Close"
                style={{
                  position: 'absolute', top: 14, right: 14,
                  width: 30, height: 30, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  color: '#fff', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, lineHeight: 1,
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.22)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
              >
                ✕
              </button>

              {/* Icon badge */}
              <div style={{
                width: 46, height: 46, borderRadius: 14,
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 14, fontSize: 22,
              }}>
                🤖
              </div>

              <div style={{
                fontSize: '0.68rem', fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'oklch(0.85 0.06 232)', marginBottom: 6,
              }}>
                AI Talent Solutions
              </div>

              <h2 style={{
                fontSize: '1.38rem', fontWeight: 800,
                color: '#fff', lineHeight: 1.2,
                letterSpacing: '-0.03em',
                position: 'relative',
              }}>
                Looking for AI Talent?
              </h2>
            </div>

            {/* Body */}
            <div style={{ padding: '22px 28px 26px' }}>
              <p style={{
                fontSize: '0.9rem', lineHeight: 1.65,
                color: '#555', marginBottom: 20,
              }}>
                We connect enterprises with <strong style={{ color: 'var(--black)' }}>elite AI engineers, data scientists,</strong> and <strong style={{ color: 'var(--black)' }}>ML architects</strong> — ready to embed in your team from week one.
              </p>

              {/* Feature pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 22 }}>
                {['LLM Engineers', 'RAG Specialists', 'MLOps', 'AI PMs'].map(tag => (
                  <span key={tag} style={{
                    fontSize: '0.72rem', fontWeight: 600,
                    padding: '5px 12px', borderRadius: 100,
                    background: 'var(--accent-light)',
                    color: 'var(--accent)',
                    border: '1px solid oklch(0.85 0.06 232)',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Trust line */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                marginBottom: 22,
                padding: '10px 14px',
                background: '#f7f7fa',
                borderRadius: 10,
                border: '1px solid var(--gray-2)',
              }}>
                <span style={{ fontSize: 16 }}>⚡</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--gray-1)', lineHeight: 1.4 }}>
                  Average time-to-placement: <strong style={{ color: 'var(--black)' }}>12 days.</strong> No retainer. No risk.
                </span>
              </div>

              {/* CTA buttons */}
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={handleCTA}
                  style={{
                    flex: 1,
                    padding: '12px 18px',
                    background: 'var(--black)',
                    color: '#fff', border: 'none',
                    borderRadius: 12, fontWeight: 700,
                    fontSize: '0.88rem', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    fontFamily: 'var(--font)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 10px 28px rgba(19,50,79,0.28)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  Get Matched Now
                  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  onClick={dismiss}
                  style={{
                    padding: '12px 16px',
                    background: 'transparent',
                    color: 'var(--gray-1)', border: '1.5px solid var(--gray-2)',
                    borderRadius: 12, fontWeight: 600,
                    fontSize: '0.84rem', cursor: 'pointer',
                    transition: 'border-color 0.2s, color 0.2s',
                    fontFamily: 'var(--font)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#bbb'
                    e.currentTarget.style.color = 'var(--black)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--gray-2)'
                    e.currentTarget.style.color = 'var(--gray-1)'
                  }}
                >
                  Maybe later
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
