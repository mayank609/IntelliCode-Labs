import Icon from './ui/Icon'
import type { MouseEvent } from 'react'
import SectionIntro from './ui/SectionIntro'

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
  const handleTiltMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rotateY = ((x / rect.width) - 0.5) * 10
    const rotateX = (0.5 - (y / rect.height)) * 10

    card.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`)
    card.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`)
    card.style.setProperty('--glow-x', `${(x / rect.width) * 100}%`)
    card.style.setProperty('--glow-y', `${(y / rect.height) * 100}%`)
  }

  const resetTilt = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    card.style.setProperty('--tilt-x', '0deg')
    card.style.setProperty('--tilt-y', '0deg')
    card.style.setProperty('--glow-x', '50%')
    card.style.setProperty('--glow-y', '50%')
  }

  return (
    <div style={{ background: 'var(--bg)' }} id="products">
      <div className="section">
        <SectionIntro
          label="Product Lines"
          title={<>Quick<br />Highlights</>}
          subtitle="Step into a world of AI-driven solutions built to make every enterprise operation smarter and stronger."
        />
        <div className="highlights-grid">
          {cards.map((c) => (
            <div
              key={c.title}
              className="hl-card tilt-card stagger-item"
              onMouseMove={handleTiltMove}
              onMouseLeave={resetTilt}
            >
              <div className="hl-card-diffusion" aria-hidden="true" />
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
