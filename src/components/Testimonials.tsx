import { useState } from 'react'
import { useRef } from 'react'
import SectionIntro from './ui/SectionIntro'

interface Testimonial {
  quote: string
  name: string
  role: string
  initials: string
  featured?: boolean
}

const testimonials: Testimonial[] = [
  {
    quote: 'IntelliCodeLabs rebuilt our prior authorization workflow with an agentic AI system. We cut manual review time by 74% in the first quarter without any compliance issues.',
    name: 'Jennifer Marsh',
    role: 'VP Operations, Regional Health Plan',
    initials: 'JM',
    featured: true,
  },
  {
    quote: 'Their AI testing platform caught a critical regression in our claims model before it hit production. The ROI on that alone paid for the entire engagement.',
    name: 'David Chen',
    role: 'CTO, InsureTech Startup',
    initials: 'DC',
  },
  {
    quote: 'VoicePilot replaced our legacy IVR completely. Customer satisfaction scores are up 22 points and our agents handle 40% fewer routine calls.',
    name: 'Maria Santos',
    role: 'Director of CX, Logistics Co.',
    initials: 'MS',
  },
  {
    quote: "The PromptOps suite is the missing layer we needed. Prompt management was chaos before — now it's treated like production code. Finally.",
    name: 'Alex Kim',
    role: 'Head of AI, Insurance Group',
    initials: 'AK',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollToCard = (index: number) => {
    setActive(index)
    const wrap = scrollRef.current
    if (!wrap) return
    const card = wrap.querySelectorAll<HTMLElement>('.testi-card')[index]
    card?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  return (
    <div style={{ background: 'var(--bg)' }}>
      <div className="section">
        <SectionIntro
          label="Client Success Stories"
          title={<>Real Results,<br />Real Enterprises.</>}
          subtitle="From health plans to logistics - companies trust us with their most critical AI workflows."
          actions={
            <div style={{ display: 'flex', gap: 8 }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToCard(i)}
                  className="testi-dot"
                  style={{
                    width: i === active ? 28 : 8,
                    background: i === active ? 'var(--accent)' : 'var(--gray-2)',
                  }}
                />
              ))}
            </div>
          }
        />

        <div className="testimonials-wrap horizontal-scroll" ref={scrollRef}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`testi-card stagger-item${t.featured ? ' featured' : ''}`}
              style={{
                outline: i === active ? '2px solid var(--accent)' : '2px solid transparent',
                outlineOffset: 2,
              }}
              onClick={() => scrollToCard(i)}
            >
              <div className="testi-stars">
                {[1, 2, 3, 4, 5].map(s => (
                  <span key={s} style={{ color: '#f5a623', fontSize: '0.85rem' }}>★</span>
                ))}
              </div>
              <div className="testi-quote">"{t.quote}"</div>
              <div className="testi-author">
                <div className="testi-avatar">{t.initials}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
