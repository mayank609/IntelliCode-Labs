interface Step {
  num: string
  title: string
  desc: string
}

interface Benefit {
  title: string
  desc: string
}

const steps: Step[] = [
  { num: '01', title: 'Discovery & Scoping', desc: 'We embed with your team for 2 weeks — mapping your current workflows, data landscape, and AI readiness. No boilerplate assessments.' },
  { num: '02', title: 'Build & Integrate', desc: 'Our engineers build purpose-fit AI pipelines using your existing stack. We ship production-grade systems, not demos.' },
  { num: '03', title: 'Monitor & Optimize', desc: 'Continuous evaluation, drift detection, and performance tuning after launch. AI systems degrade without oversight — we prevent that.' },
]

const benefits: Benefit[] = [
  { title: 'Reduce Operational Costs', desc: 'Consolidate fragmented AI tools into a single platform. Cut vendor sprawl and reduce total cost of ownership by up to 60%.' },
  { title: 'Save Time With Automation', desc: 'Automate repetitive decision-making tasks across claims, dispatch, and call queues — freeing your team for higher-value work.' },
  { title: 'Easy To Implement', desc: 'Our integration-first approach means your team can adopt AI without a full re-architecture. We work with your current systems.' },
]

export default function HowWeHelp() {
  return (
    <div className="section">
      <span className="section-label">How We Help</span>
      <h2 className="section-title">Our Process</h2>
      <p className="section-sub">A focused three-step engagement model that gets you from idea to production AI — without the consulting theater.</p>

      <div className="help-steps">
        {steps.map((s) => (
          <div key={s.num} className="help-step">
            <div className="step-num">{s.num}</div>
            <div className="step-divider" />
            <div className="step-title">{s.title}</div>
            <div className="step-desc">{s.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 80, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        {benefits.map((b, i) => (
          <div key={i} style={{ background: 'var(--white)', borderRadius: 20, padding: '36px 32px', boxShadow: 'var(--shadow-card)', border: '1px solid rgba(0,0,0,0.04)' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#4a6cf7" strokeWidth="2">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 10 }}>{b.title}</div>
            <div style={{ fontSize: '0.875rem', lineHeight: 1.7, color: '#666677' }}>{b.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
