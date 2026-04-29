const items = [
  'Healthcare Insurance', 'Logistics Intelligence', 'Contact Center AI',
  'Agentic Systems', 'Voice AI Platforms', 'Prompt Engineering',
  'AI Testing', 'LLM Orchestration',
]

export default function Ticker() {
  const doubled = [...items, ...items]
  return (
    <div className="ticker-section">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <div key={i} className="ticker-item">
            {item}
            <div className="ticker-dot" />
          </div>
        ))}
      </div>
    </div>
  )
}
