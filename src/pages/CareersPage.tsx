import { motion, Variants } from 'framer-motion'
import ARVRScene from '../components/ARVRScene'
import FloatingOrbs from '../components/FloatingOrbs'

const JOBDIVA_URL = 'https://www1.jobdiva.com/portal/?a=cijdnwq7sln7blp85ftqmzs8m5n2cp09a3b4hy73yc8p2wtdywnhut9bd2zh20pn&compid=0&t=1777486697372#/'

const openJobs = () => window.open(JOBDIVA_URL, '_blank', 'noopener,noreferrer')

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const perks = [
  {
    icon: '🌍',
    title: 'Fully Remote',
    desc: 'Work from anywhere. We hire the best regardless of timezone.',
  },
  {
    icon: '🚀',
    title: 'Ship Fast',
    desc: 'No bureaucracy. Your work goes to production in days, not quarters.',
  },
  {
    icon: '🧠',
    title: 'Deep AI Problems',
    desc: 'Real enterprise challenges in healthcare, logistics, and contact centers.',
  },
  {
    icon: '💰',
    title: 'Competitive Pay',
    desc: 'Top-of-market compensation with equity for senior roles.',
  },
  {
    icon: '📈',
    title: 'High Ownership',
    desc: 'Every engineer directly shapes product decisions and client outcomes.',
  },
  {
    icon: '🎓',
    title: 'Learning Budget',
    desc: '$2,000/year for courses, conferences, and certifications.',
  },
]

const positions = [
  {
    title: 'Senior AI Engineer',
    team: 'Engineering',
    location: 'Remote / Bangalore',
    type: 'Full-time',
    tags: ['Python', 'LLMs', 'RAG'],
    desc: 'Build and scale AgentForge and VoicePilot. Expertise in LLM orchestration and sub-200ms latency pipelines required.',
  },
  {
    title: 'Healthcare AI Domain Lead',
    team: 'Solutions',
    location: 'Remote (US)',
    type: 'Full-time',
    tags: ['HIPAA', 'Payer/Provider', 'LLMs'],
    desc: 'Bridge compliance and LLM capabilities. Deep experience in payer/provider workflows is a must.',
  },
  {
    title: 'Frontend Engineer (Creative)',
    team: 'Product',
    location: 'Remote',
    type: 'Full-time',
    tags: ['React', 'Three.js', 'TypeScript'],
    desc: 'Work on the visual designer for AgentForge. Experience with React, Three.js, and complex state management needed.',
  },
  {
    title: 'Principal Product Manager, AI Platform',
    team: 'Product',
    location: 'Remote (US / Canada)',
    type: 'Full-time',
    tags: ['AI Roadmap', 'Enterprise', 'B2B'],
    desc: 'Own the roadmap for TestMind and PromptOps Suite. Work directly with enterprise clients and our engineering team.',
  },
  {
    title: 'MLOps / DevOps Engineer',
    team: 'Engineering',
    location: 'Remote / Hyderabad',
    type: 'Full-time',
    tags: ['Kubernetes', 'AWS', 'CI/CD for ML'],
    desc: 'Own the infrastructure that runs our AI pipelines in production. Cloud-native and ML-aware mindset required.',
  },
  {
    title: 'Enterprise Sales Engineer',
    team: 'Sales',
    location: 'Remote (US)',
    type: 'Full-time',
    tags: ['Pre-sales', 'AI', 'Enterprise'],
    desc: 'Partner with enterprise prospects to scope AI solutions. Comfortable going deep technical and presenting to C-suite.',
  },
  {
    title: 'AI Evaluation & Red Team Researcher',
    team: 'Research',
    location: 'Remote',
    type: 'Full-time',
    tags: ['Adversarial Testing', 'LLM Safety', 'Benchmarking'],
    desc: 'Design adversarial evaluation strategies for LLM systems in high-stakes domains. Find failure modes before clients do.',
  },
]

const teamColors: Record<string, string> = {
  Engineering: 'oklch(0.48 0.14 232)',
  Solutions: 'oklch(0.52 0.12 168)',
  Product: 'oklch(0.55 0.12 280)',
  Sales: 'oklch(0.52 0.14 60)',
  Research: 'oklch(0.50 0.14 320)',
}

export default function CareersPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg, var(--black) 0%, oklch(0.28 0.16 232) 55%, oklch(0.22 0.10 168) 100%)',
        padding: 'clamp(100px, 14vw, 160px) 40px clamp(80px, 10vw, 120px)',
        textAlign: 'center',
      }}>
        {/* Decorative orbs */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.6 }}>
          <FloatingOrbs density="low" colors={['blue', 'teal']} />
        </div>
        <ARVRScene />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ position: 'relative', zIndex: 1, maxWidth: 780, margin: '0 auto' }}
        >
          <motion.div variants={itemVariants} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 100, padding: '6px 18px', marginBottom: 28,
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', display: 'inline-block', boxShadow: '0 0 0 3px rgba(74,222,128,0.3)' }} />
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.06em' }}>We're Hiring</span>
          </motion.div>

          <motion.h1 variants={itemVariants} style={{
            fontSize: 'clamp(2.6rem, 6vw, 4.2rem)', fontWeight: 900,
            color: '#fff', lineHeight: 1.05, letterSpacing: '-0.04em', marginBottom: 24,
          }}>
            Build the Future of<br />
            <span style={{
              background: 'linear-gradient(90deg, oklch(0.75 0.18 232), oklch(0.78 0.16 168))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Enterprise AI.</span>
          </motion.h1>

          <motion.p variants={itemVariants} style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'rgba(255,255,255,0.62)',
            lineHeight: 1.7, marginBottom: 40, maxWidth: 580, margin: '0 auto 40px',
          }}>
            We're a small, focused team solving hard AI problems in regulated industries. No bloat, no bureaucracy — just ownership, impact, and craft.
          </motion.p>

          <motion.div variants={itemVariants} style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={openJobs}
              style={{
                background: '#fff', color: 'var(--black)', border: 'none',
                fontFamily: 'var(--font)', fontWeight: 800, fontSize: '0.95rem',
                padding: '15px 36px', borderRadius: 100, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 8,
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.35)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.25)'
              }}
            >
              View Open Positions
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={openJobs}
              style={{
                background: 'transparent', color: 'rgba(255,255,255,0.85)',
                border: '1.5px solid rgba(255,255,255,0.22)',
                fontFamily: 'var(--font)', fontWeight: 600, fontSize: '0.92rem',
                padding: '14px 30px', borderRadius: 100, cursor: 'pointer',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)')}
            >
              Submit Your CV
            </button>
          </motion.div>
        </motion.div>

        {/* Bottom wave divider */}
        <div style={{ position: 'absolute', bottom: -1, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 60 }}>
            <path d="M0,60 C360,0 1080,60 1440,20 L1440,60 Z" fill="var(--bg)" />
          </svg>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--gray-2)' }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto', padding: '28px 40px',
          display: 'flex', justifyContent: 'center', gap: 'clamp(32px, 6vw, 80px)',
          flexWrap: 'wrap',
        }}>
          {[
            { val: '7', label: 'Open Positions' },
            { val: '100%', label: 'Remote First' },
            { val: '12 days', label: 'Avg. Time to Offer' },
            { val: '4.9★', label: 'Glassdoor Rating' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 800, fontSize: '1.7rem', color: 'var(--black)', letterSpacing: '-0.04em', lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--gray-1)', marginTop: 4, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── PERKS ─── */}
      <div className="section-outer" style={{ position: 'relative' }}>
        <ARVRScene />
        <div className="section">
          <span className="section-label">Why Join Us</span>
          <h2 className="section-title" style={{ marginBottom: 48 }}>
            Everything you need<br />to do your best work.
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 20,
          }}>
            {perks.map((p, i) => (
              <motion.div
                key={p.title}
                className="prod-card reveal-on-scroll"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                style={{ gap: 0 }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: 'var(--accent-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, marginBottom: 16, flexShrink: 0,
                }}>
                  {p.icon}
                </div>
                <div className="prod-title" style={{ fontSize: '1.05rem', marginBottom: 8 }}>{p.title}</div>
                <div className="prod-desc">{p.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── POSITIONS ─── */}
      <div className="section-outer" style={{ position: 'relative', background: 'var(--bg)' }}>
        <ARVRScene />
        <div className="section">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, marginBottom: 48 }}>
            <div>
              <span className="section-label">Open Positions</span>
              <h2 className="section-title" style={{ marginBottom: 0 }}>Find your role.</h2>
            </div>
            <button
              onClick={openJobs}
              className="btn-hero-primary"
              style={{ padding: '13px 28px', fontSize: '0.88rem', flexShrink: 0 }}
            >
              Browse All on JobDiva
              <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="15 3 21 3 21 9" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="10" y1="14" x2="21" y2="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {positions.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: 'var(--white)',
                  borderRadius: 18,
                  padding: '24px 28px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 24,
                  flexWrap: 'wrap',
                  boxShadow: 'var(--shadow-card)',
                  border: '1px solid rgba(0,0,0,0.04)',
                  transition: 'box-shadow 0.2s, transform 0.2s',
                  cursor: 'default',
                }}
                whileHover={{ y: -2, boxShadow: '0 12px 40px rgba(0,0,0,0.10)' }}
              >
                <div style={{ flex: 1, minWidth: 240 }}>
                  {/* Meta row */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
                    <span style={{
                      fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.07em',
                      textTransform: 'uppercase', padding: '3px 10px', borderRadius: 100,
                      background: `${teamColors[p.team]}18`,
                      color: teamColors[p.team],
                      border: `1px solid ${teamColors[p.team]}30`,
                    }}>
                      {p.team}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--gray-1)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                      </svg>
                      {p.location}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--gray-1)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                      </svg>
                      {p.type}
                    </span>
                  </div>

                  <div style={{ fontWeight: 700, fontSize: '1.08rem', color: 'var(--black)', marginBottom: 8 }}>{p.title}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--gray-1)', lineHeight: 1.6, marginBottom: 12 }}>{p.desc}</div>

                  {/* Skill tags */}
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {p.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: '0.68rem', fontWeight: 600, padding: '3px 10px', borderRadius: 100,
                        background: 'var(--bg)', color: 'var(--gray-1)', border: '1px solid var(--gray-2)',
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={openJobs}
                  style={{
                    flexShrink: 0, padding: '12px 26px',
                    background: 'var(--black)', color: '#fff', border: 'none',
                    borderRadius: 100, fontFamily: 'var(--font)', fontWeight: 700,
                    fontSize: '0.85rem', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 7,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    whiteSpace: 'nowrap',
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
                  Apply Now
                  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── BOTTOM CTA ─── */}
      <div style={{ padding: '0 40px 120px' }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          background: 'linear-gradient(135deg, var(--black) 0%, oklch(0.30 0.18 232) 100%)',
          borderRadius: 24, padding: 'clamp(40px, 6vw, 72px) clamp(28px, 5vw, 64px)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 32, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.5 }}>
            <FloatingOrbs density="low" colors={['blue', 'teal']} />
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 14 }}>
              Don't see a fit?
            </div>
            <div style={{ fontWeight: 800, fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', letterSpacing: '-0.03em', color: 'white', lineHeight: 1.1 }}>
              We're always looking<br />for exceptional talent.
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
            <button
              onClick={openJobs}
              style={{
                background: 'white', color: 'var(--black)', border: 'none',
                fontFamily: 'var(--font)', fontSize: '0.95rem', fontWeight: 800,
                padding: '15px 34px', borderRadius: 100, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 8,
                transition: 'opacity 0.2s, transform 0.15s',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.opacity = '0.93' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.opacity = '1' }}
            >
              View All Jobs on JobDiva
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="15 3 21 3 21 9" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="10" y1="14" x2="21" y2="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
