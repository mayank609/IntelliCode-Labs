import Sparkline from './ui/Sparkline'
import FloatingParticles from './FloatingParticles'

interface Product {
  badge: string
  title: string
  desc: string
  tags: string[]
  sparklineColor?: string
  sparklineData?: number[]
}

const products: Product[] = [
  {
    badge: 'AI Testing',
    title: 'TestMind Platform',
    desc: 'An end-to-end AI evaluation and testing platform. Generates adversarial test cases, monitors production models, and catches regressions before they reach users.',
    tags: ['LLM Evaluation', 'Regression Testing', 'Red Teaming', 'CI/CD Integration'],
    sparklineColor: '#4a6cf7',
    sparklineData: [30, 45, 38, 55, 48, 65, 58, 72, 68, 80, 85],
  },
  {
    badge: 'Agentic AI',
    title: 'AgentForge',
    desc: 'Build, deploy, and monitor multi-agent systems. Drag-and-drop agent designer with built-in tool use, memory management, and enterprise security guardrails.',
    tags: ['Multi-Agent', 'Tool Use', 'Memory', 'Orchestration'],
    sparklineColor: '#52b89a',
    sparklineData: [25, 38, 32, 48, 42, 58, 52, 66, 60, 74, 82],
  },
  {
    badge: 'Prompt Engineering',
    title: 'PromptOps Suite',
    desc: 'Treat prompts as code. Version control, A/B testing, automated optimization, and a prompt library that your whole team can collaborate on.',
    tags: ['Version Control', 'A/B Testing', 'Cost Optimization', 'Team Collab'],
    sparklineColor: '#f5a623',
    sparklineData: [20, 32, 28, 42, 38, 52, 46, 60, 54, 68, 76],
  },
  {
    badge: 'Voice AI',
    title: 'VoicePilot',
    desc: 'A full-stack voice AI platform for contact centers. Real-time transcription, intent routing, agent assist, and post-call analytics — all in one system.',
    tags: ['Real-Time STT', 'Intent Detection', 'Agent Assist', 'Call Analytics'],
    sparklineColor: '#ff6b6b',
    sparklineData: [22, 35, 30, 45, 40, 56, 50, 64, 58, 70, 80],
  },
]

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' })
}

export default function Products() {
  return (
    <div className="section-outer" style={{ position: 'relative' }}>
      <FloatingParticles count={15} colors={['rgba(74, 108, 247, 0.1)', 'rgba(82, 184, 154, 0.1)', 'rgba(255, 107, 107, 0.1)']} />
      <div className="section" style={{ position: 'relative', zIndex: 1 }}>
        <span className="section-label">Our Products</span>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
          <h2 className="section-title">Four Focused<br />Products</h2>
          <p className="section-sub" style={{ margin: 0 }}>
            Narrow scope. Deep expertise. Each product solves one category of AI challenges — exceptionally well.
          </p>
        </div>
        <div className="products-grid">
          {products.map((p, index) => (
            <div key={p.title} className={`prod-card reveal-on-scroll reveal-delay-${(index + 1) * 100}`}>
              <div><span className="prod-badge animate-float" style={{ display: 'inline-block' }}>{p.badge}</span></div>
              
              {/* Sparkline visualization */}
              {p.sparklineData && (
                <div style={{ marginTop: 16, height: 35 }}>
                  <Sparkline color={p.sparklineColor} data={p.sparklineData} height={35} />
                </div>
              )}
              
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
