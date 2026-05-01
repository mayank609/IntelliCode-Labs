import { useNavigate } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Sparkline from '../components/ui/Sparkline'
import ARVRScene from '../components/ARVRScene'

const products = [
  {
    badge: 'AI Testing',
    title: 'TestMind Platform',
    tagline: 'Catch failures before your users do.',
    desc: 'An end-to-end AI evaluation and testing platform. TestMind generates adversarial test cases, monitors production models for drift, and catches regressions before they reach users. Purpose-built for LLM-based systems and multi-step AI workflows.',
    tags: ['LLM Evaluation', 'Regression Testing', 'Red Teaming', 'CI/CD Integration'],
    metric: '99.1%', metricLabel: 'Defect Detection Rate',
    features: ['Automated adversarial test generation', 'Hallucination & factuality scoring', 'Model version comparison', 'Production monitoring & alerts', 'CI/CD pipeline integration', 'Custom evaluation metrics'],
    sparkData: [20, 35, 28, 45, 38, 52, 44, 60, 55, 70, 74],
    color: 'oklch(0.48 0.14 232)',
  },
  {
    badge: 'Agentic AI',
    title: 'AgentForge',
    tagline: 'Build agents that actually work at scale.',
    desc: 'Build, deploy, and monitor multi-agent systems with a visual designer and enterprise-grade infrastructure. AgentForge handles the hard parts — tool use, memory, orchestration, and security — so your team can focus on the workflows.',
    tags: ['Multi-Agent', 'Tool Use', 'Memory', 'Orchestration'],
    metric: '3.4×', metricLabel: 'Throughput Improvement',
    features: ['Drag-and-drop agent designer', 'Built-in tool use & API integration', 'Persistent memory management', 'Role-based access control', 'Human-in-the-loop escalation', 'Real-time execution monitoring'],
    sparkData: [10, 18, 14, 24, 19, 30, 24, 36, 29, 40, 42],
    color: 'oklch(0.52 0.12 168)',
  },
  {
    badge: 'Prompt Engineering',
    title: 'PromptOps Suite',
    tagline: 'Treat prompts like production code.',
    desc: 'Stop managing prompts in spreadsheets. PromptOps Suite gives your team version control, A/B testing, automated optimization, and a shared library — so prompt management finally has the rigor it deserves.',
    tags: ['Version Control', 'A/B Testing', 'Cost Optimization', 'Team Collab'],
    metric: '68%', metricLabel: 'Avg. Cost Reduction',
    features: ['Git-style prompt version control', 'A/B testing with evaluation scoring', 'Automated cost optimization', 'Team prompt library & review', 'Rollback & audit trail', 'Multi-model A/B comparison'],
    sparkData: [40, 36, 34, 30, 28, 24, 22, 20, 18, 16, 15],
    color: 'oklch(0.58 0.15 50)',
  },
  {
    badge: 'Voice AI',
    title: 'VoicePilot',
    tagline: 'Replace legacy IVR with intelligent voice.',
    desc: 'A full-stack voice AI platform for contact centers. Real-time transcription under 200ms, intent routing, live agent assist, and post-call analytics — all in one system. Works with your existing telephony stack.',
    tags: ['Real-Time STT', 'Intent Detection', 'Agent Assist', 'Call Analytics'],
    metric: '<200ms', metricLabel: 'Average Transcription Latency',
    features: ['Sub-200ms real-time transcription', '40+ language & dialect support', 'Live agent assist overlay', 'Automated call summarization', 'Intent classification & routing', 'Post-call analytics dashboard'],
    sparkData: [30, 28, 26, 24, 22, 21, 20, 19, 18, 17, 16],
    color: 'oklch(0.48 0.14 300)',
  },
]

export default function ProductsPage() {
  const navigate = useNavigate()
  return (
    <>
      <PageHero
        label="Our Products"
        title="Four Products. One Focus."
        subtitle="Narrow scope. Deep expertise. Each product solves one category of AI challenge — exceptionally well. No bloat, no feature creep."
      />

      {/* Product detail cards */}
      <div className="section-outer" style={{ position: 'relative' }}>
        <ARVRScene />
        <div className="section">
          {products.map((p, i) => (
            <div
              key={p.title}
              style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center',
                marginBottom: i < products.length - 1 ? 100 : 0,
                direction: i % 2 === 0 ? 'ltr' : 'rtl',
                position: 'relative', zIndex: 3
              }}
              className="about-split"
            >
              <div style={{ direction: 'ltr' }}>
                <span className="prod-badge">{p.badge}</span>
                <h3 style={{ fontWeight: 800, fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', letterSpacing: '-0.03em', lineHeight: 1.1, marginTop: 16, marginBottom: 8 }}>{p.title}</h3>
                <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--gray-1)', marginBottom: 20 }}>{p.tagline}</div>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.75, color: '#666677', marginBottom: 28 }}>{p.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
                  {p.tags.map(t => <span key={t} className="prod-tag">{t}</span>)}
                </div>
                <button
                  onClick={() => navigate('/contact')}
                  className="btn-hero-primary"
                >
                  Request a Demo
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              <div style={{ direction: 'ltr', display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Metric card */}
                <div style={{ background: 'var(--black)', borderRadius: 20, padding: '36px', color: 'white' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', marginBottom: 12 }}>{p.metricLabel}</div>
                  <div style={{ fontWeight: 800, fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', letterSpacing: '-0.04em', lineHeight: 1 }}>{p.metric}</div>
                  <div style={{ marginTop: 20 }}>
                    <Sparkline color={p.color} data={p.sparkData} height={48} />
                  </div>
                </div>
                {/* Features list */}
                <div style={{ background: 'var(--white)', borderRadius: 20, padding: '28px', boxShadow: 'var(--shadow-card)', border: '1px solid rgba(0,0,0,0.04)' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-1)', marginBottom: 16 }}>What's Included</div>
                  {p.features.map((f, fi) => (
                    <div key={fi} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '8px 0', borderBottom: fi < p.features.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
                      <div style={{ width: 20, height: 20, borderRadius: 6, background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="oklch(0.48 0.14 232)" strokeWidth="2.5">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span style={{ fontSize: '0.85rem', color: '#444' }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison table */}
      <div className="section-outer" style={{ position: 'relative' }}>
        <ARVRScene />
        <div className="section" style={{ position: 'relative', zIndex: 3 }}>
          <span className="section-label">Platform Overview</span>
          <h2 className="section-title" style={{ marginBottom: 48 }}>Which Product<br />Is Right For You?</h2>
          <div style={{ overflowX: 'auto', borderRadius: 20, border: '1px solid rgba(0,0,0,0.07)', boxShadow: 'var(--shadow-card)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font)' }}>
              <thead>
                <tr style={{ background: 'var(--black)', color: 'white' }}>
                  <th style={{ padding: '20px 24px', textAlign: 'left', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', borderRadius: '20px 0 0 0' }}>Capability</th>
                  {products.map((p, i) => (
                    <th key={p.title} style={{ padding: '20px 24px', textAlign: 'center', fontSize: '0.82rem', fontWeight: 700, borderRadius: i === products.length - 1 ? '0 20px 0 0' : 0 }}>
                      <span style={{ display: 'block', fontSize: '0.66rem', fontWeight: 600, color: '#555', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>{p.badge}</span>
                      {p.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { cap: 'LLM Evaluation', vals: [true, false, true, false] },
                  { cap: 'Agent Orchestration', vals: [false, true, false, false] },
                  { cap: 'Prompt Management', vals: [false, false, true, false] },
                  { cap: 'Voice / STT', vals: [false, false, false, true] },
                  { cap: 'CI/CD Integration', vals: [true, true, true, false] },
                  { cap: 'Production Monitoring', vals: [true, true, false, true] },
                  { cap: 'A/B Testing', vals: [true, false, true, false] },
                ].map((row, ri) => (
                  <tr key={row.cap} style={{ background: ri % 2 === 0 ? 'var(--white)' : 'var(--bg)' }}>
                    <td style={{ padding: '16px 24px', fontSize: '0.875rem', fontWeight: 500, color: 'var(--black)' }}>{row.cap}</td>
                    {row.vals.map((v, vi) => (
                      <td key={vi} style={{ padding: '16px 24px', textAlign: 'center' }}>
                        {v
                          ? <span style={{ color: 'oklch(0.52 0.14 168)', fontSize: '1.1rem' }}>✓</span>
                          : <span style={{ color: 'var(--gray-2)', fontSize: '1rem' }}>–</span>
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '0 40px 120px' }}>
        <div className="cta-dark-strip" style={{ maxWidth: 1280, margin: '0 auto', background: 'var(--black)', borderRadius: 24, padding: '64px 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 32, position: 'relative', overflow: 'hidden' }}>
          <ARVRScene />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#555', marginBottom: 14 }}>See It Live</div>
            <div className="cta-dark-strip-title" style={{ fontWeight: 800, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.03em', color: 'white', lineHeight: 1.1 }}>
              Want a live walkthrough<br />of any product?
            </div>
          </div>
          <div className="cta-dark-strip-btns" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
            <button onClick={() => navigate('/contact')} style={{ background: 'white', color: 'var(--black)', border: 'none', fontFamily: 'var(--font)', fontSize: '0.95rem', fontWeight: 700, padding: '14px 32px', borderRadius: 100, cursor: 'pointer' }}>
              Book A Demo
            </button>
            <button onClick={() => navigate('/services')} style={{ background: 'transparent', color: 'white', border: '1.5px solid #333', fontFamily: 'var(--font)', fontSize: '0.95rem', fontWeight: 600, padding: '13px 30px', borderRadius: 100, cursor: 'pointer' }}>
              View Services
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
