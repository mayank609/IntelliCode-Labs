import { useState } from 'react'
import Sparkline from './ui/Sparkline'

interface Feature {
  title: string
  desc: string
  metric: string
  metricLabel: string
}

const feats: Feature[] = [
  { title: 'LLM Evaluation Framework', desc: 'Comprehensive evaluation pipelines measuring accuracy, hallucination rate, latency, and cost — across every model version.', metric: '99.1%', metricLabel: 'Defect Detection Rate' },
  { title: 'Multi-Agent Orchestration', desc: 'Coordinate multiple specialized agents with shared memory, tool use, and escalation paths for complex enterprise tasks.', metric: '3.4×', metricLabel: 'Throughput Improvement' },
  { title: 'Real-Time Voice Processing', desc: 'Sub-200ms transcription and intent detection pipelines for live contact center environments with 40+ language support.', metric: '<200ms', metricLabel: 'Average Latency' },
  { title: 'Prompt Versioning & CI/CD', desc: 'Treat prompts as code — version control, A/B testing, rollback capabilities, and automated performance benchmarking.', metric: '68%', metricLabel: 'Prompt Cost Reduction' },
]

const included = [
  'Automated test harness',
  'Real-time model monitoring',
  'Version-controlled prompts',
  'Custom evaluation metrics',
]

export default function KeyFeatures() {
  const [active, setActive] = useState(0)
  const feat = feats[active]

  return (
    <div className="section-outer" id="application-services">
      <div className="section">
        <div className="features-split">
          <div>
            <span className="section-label">Key Features</span>
            <h2 className="section-title">Explore The<br />Capabilities</h2>
            <p className="section-sub">Explore the powerful capabilities of our AI platforms, designed to streamline your workflow and boost results.</p>
            <div className="features-list">
              {feats.map((f, i) => (
                <div
                  key={f.title}
                  className="feat-item"
                  style={{ opacity: active === i ? 1 : 0.4 }}
                  onClick={() => setActive(i)}
                >
                  <div className="feat-num">0{i + 1}</div>
                  <div>
                    <div className="feat-title">{f.title}</div>
                    <div className="feat-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Metric card */}
            <div style={{ background: 'var(--black)', borderRadius: 20, padding: '40px 36px', color: 'white' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#666', marginBottom: 12 }}>
                {feat.metricLabel}
              </div>
              <div style={{ fontWeight: 800, fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.04em', lineHeight: 1 }}>
                {feat.metric}
              </div>
              <div style={{ marginTop: 16, fontSize: '0.875rem', color: '#555', lineHeight: 1.6 }}>{feat.title}</div>
              <div style={{ marginTop: 20 }}>
                <Sparkline color="#4a6cf7" data={[20, 35, 28, 45, 38, 52, 44, 60, 55, 70, 74]} height={50} />
              </div>
            </div>

            {/* Included card */}
            <div style={{ background: 'var(--bg)', borderRadius: 20, padding: '28px', border: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-1)', marginBottom: 16 }}>
                What's Included
              </div>
              {included.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: i < included.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
                  <div style={{ width: 20, height: 20, borderRadius: 6, background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="#4a6cf7" strokeWidth="2.5">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#444' }}>{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
