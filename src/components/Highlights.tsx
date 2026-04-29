import Icon from './ui/Icon'

interface HighlightCard {
  icon: 'testing' | 'agent' | 'prompt' | 'voice'
  title: string
  desc: string
}

const cards: HighlightCard[] = [
  { icon: 'testing', title: 'AI Testing', desc: 'Automated test generation, regression pipelines, and evaluation harnesses purpose-built for LLM-based systems and multi-step AI workflows.' },
  { icon: 'agent', title: 'Agentic AI', desc: 'Design and deploy autonomous agent frameworks that reason, plan, and act — integrating with your enterprise systems and data sources.' },
  { icon: 'prompt', title: 'Prompt Engineering', desc: 'Systematic prompt design, versioning, evaluation and optimization. We build the scaffolding so your models perform predictably at scale.' },
  { icon: 'voice', title: 'Voice AI', desc: 'End-to-end voice AI platforms for contact centers — real-time transcription, intent detection, and conversational IVR replacement.' },
]

export default function Highlights() {
  return (
    <div style={{ background: 'var(--bg)' }} id="products">
      <div className="section">
        <span className="section-label">Product Lines</span>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
          <h2 className="section-title">Quick<br />Highlights</h2>
          <p className="section-sub" style={{ margin: 0 }}>
            Step into a world of AI-driven solutions built to make every enterprise operation smarter and stronger.
          </p>
        </div>
        <div className="highlights-grid">
          {cards.map((c) => (
            <div key={c.title} className="hl-card">
              <div className="hl-icon">
                <Icon name={c.icon} size={22} stroke="oklch(0.48 0.14 232)" />
              </div>
              <div className="hl-title">{c.title}</div>
              <div className="hl-desc">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
