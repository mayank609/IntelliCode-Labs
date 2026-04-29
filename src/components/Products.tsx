interface Product {
  badge: string
  title: string
  desc: string
  tags: string[]
}

const products: Product[] = [
  {
    badge: 'AI Testing',
    title: 'TestMind Platform',
    desc: 'An end-to-end AI evaluation and testing platform. Generates adversarial test cases, monitors production models, and catches regressions before they reach users.',
    tags: ['LLM Evaluation', 'Regression Testing', 'Red Teaming', 'CI/CD Integration'],
  },
  {
    badge: 'Agentic AI',
    title: 'AgentForge',
    desc: 'Build, deploy, and monitor multi-agent systems. Drag-and-drop agent designer with built-in tool use, memory management, and enterprise security guardrails.',
    tags: ['Multi-Agent', 'Tool Use', 'Memory', 'Orchestration'],
  },
  {
    badge: 'Prompt Engineering',
    title: 'PromptOps Suite',
    desc: 'Treat prompts as code. Version control, A/B testing, automated optimization, and a prompt library that your whole team can collaborate on.',
    tags: ['Version Control', 'A/B Testing', 'Cost Optimization', 'Team Collab'],
  },
  {
    badge: 'Voice AI',
    title: 'VoicePilot',
    desc: 'A full-stack voice AI platform for contact centers. Real-time transcription, intent routing, agent assist, and post-call analytics — all in one system.',
    tags: ['Real-Time STT', 'Intent Detection', 'Agent Assist', 'Call Analytics'],
  },
]

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' })
}

export default function Products() {
  return (
    <div className="section-outer">
      <div className="section">
        <span className="section-label">Our Products</span>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
          <h2 className="section-title">Four Focused<br />Products</h2>
          <p className="section-sub" style={{ margin: 0 }}>
            Narrow scope. Deep expertise. Each product solves one category of AI challenges — exceptionally well.
          </p>
        </div>
        <div className="products-grid">
          {products.map((p) => (
            <div key={p.title} className="prod-card">
              <div><span className="prod-badge">{p.badge}</span></div>
              <div className="prod-title">{p.title}</div>
              <div className="prod-desc">{p.desc}</div>
              <div className="prod-tags">
                {p.tags.map((t) => <span key={t} className="prod-tag">{t}</span>)}
              </div>
              <div style={{ marginTop: 8 }}>
                <a
                  href="#"
                  style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--accent)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                  onClick={(e) => { e.preventDefault(); scrollTo('contact') }}
                >
                  Learn More
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
