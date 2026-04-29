interface IndustryCard {
  variant: 'dark' | 'light' | 'accent'
  tag: string
  title: string
  desc: string
  bgWord: string
  metric: string
  metricLabel: string
}

const industries: IndustryCard[] = [
  {
    variant: 'dark',
    tag: 'Healthcare Insurance',
    title: 'Claims, Prior Auth & Compliance',
    desc: 'AI agents that automate prior authorization, claims triage, and member inquiry resolution — while staying audit-ready and HIPAA-compliant.',
    bgWord: 'HEALTH',
    metric: '74%',
    metricLabel: 'Reduction in manual review time',
  },
  {
    variant: 'light',
    tag: 'Logistics',
    title: 'Routing, Tracking & Dispatch AI',
    desc: 'Intelligent dispatch agents, predictive ETA systems, and natural-language freight query platforms that reduce ops costs and improve SLA performance.',
    bgWord: 'SHIP',
    metric: '60%',
    metricLabel: 'Reduction in ops overhead',
  },
  {
    variant: 'accent',
    tag: 'Contact Center',
    title: 'Voice, Chat & IVR Modernization',
    desc: 'Replace legacy IVR with intelligent voice AI. Real-time agent assist, automated summarization, and full omnichannel orchestration.',
    bgWord: 'TALK',
    metric: '40%',
    metricLabel: 'Fewer routine agent calls',
  },
]

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' })
}

export default function Industries() {
  return (
    <div className="section" id="how-we-help">
      <span className="section-label">Industries We Serve</span>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
        <h2 className="section-title">Built For<br />Your Domain</h2>
        <p className="section-sub" style={{ margin: 0 }}>
          We embed deep domain expertise into our AI systems — not generic models bolted onto your workflows.
        </p>
      </div>

      <div className="industries-grid">
        {industries.map(ind => (
          <div key={ind.tag} className={`ind-card ${ind.variant}`}>
            <div className="ind-tag">{ind.tag}</div>
            <div className="ind-title">{ind.title}</div>
            <div className="ind-desc">{ind.desc}</div>

            {/* Metric callout */}
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: ind.variant === 'light' ? '1px solid rgba(0,0,0,0.07)' : '1px solid rgba(255,255,255,0.12)' }}>
              <div style={{ fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-0.04em', lineHeight: 1 }}>
                {ind.metric}
              </div>
              <div style={{ fontSize: '0.75rem', marginTop: 4, opacity: 0.6 }}>{ind.metricLabel}</div>
            </div>

            <button className="ind-cta-btn" onClick={() => scrollTo('contact')}>
              Explore This Solution
              <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="ind-bg-text">{ind.bgWord}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
