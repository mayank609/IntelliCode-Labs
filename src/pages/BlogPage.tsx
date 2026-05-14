import { useState } from 'react'
import PageHero from '../components/PageHero'
import ARVRScene from '../components/ARVRScene'
import { useNavigate } from 'react-router-dom'

const posts = [
  {
    title: 'Why Prior Authorization Is the Next Frontier for Agentic AI',
    category: 'Healthcare',
    date: 'May 12, 2026',
    author: 'Arjun Kapoor',
    desc: 'A deep dive into how we reduced prior-auth review time by 74% using a multi-agent orchestration framework.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Sub-200ms Latency: The Voice AI Engineering Challenge',
    category: 'Engineering',
    date: 'April 28, 2026',
    author: 'Derek Kumar',
    desc: 'How we optimized our STT and LLM pipelines to achieve near-human response times in contact center deployments.',
    image: 'https://images.unsplash.com/photo-1589254065675-d0584d82967f?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'PromptOps: Bringing Software Engineering Rigor to AI Prompts',
    category: 'Product',
    date: 'April 15, 2026',
    author: 'Sana Rahman',
    desc: 'Stop using spreadsheets for prompt management. Why version control and A/B testing are essential for production AI.',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Building HIPAA-Compliant LLM Systems: A Practical Guide',
    category: 'Healthcare',
    date: 'March 31, 2026',
    author: 'Laura Pinto',
    desc: 'What it actually takes to ship AI in healthcare — BAAs, PHI handling, audit trails, and the guardrails that keep you compliant.',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e90526354c?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'The True Cost of LLM Hallucinations in Production',
    category: 'Engineering',
    date: 'March 18, 2026',
    author: 'Marcus Chen',
    desc: 'Hallucinations aren\'t just annoying — in claims adjudication or freight dispatch, they have real financial consequences. Here\'s how we measure and mitigate them.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'From Legacy IVR to Conversational Voice AI: A Migration Playbook',
    category: 'Product',
    date: 'March 5, 2026',
    author: 'Derek Kumar',
    desc: 'Replacing an IVR without disrupting 50,000 daily calls is hard. Here\'s the phased rollout strategy that keeps containment rates high and customer complaints low.',
    image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'AgentForge 2.0: Lessons from 50+ Agentic AI Deployments',
    category: 'Product',
    date: 'February 20, 2026',
    author: 'Sana Rahman',
    desc: 'After shipping agentic AI in healthcare and logistics for two years, here\'s what we got wrong the first time — and how AgentForge 2.0 fixes it.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Freight Intelligence: How Predictive ETA Cuts SLA Breaches by 40%',
    category: 'Logistics',
    date: 'February 6, 2026',
    author: 'Marcus Chen',
    desc: 'Our ML model for ETA prediction — how we trained it on historical load data, how we handle exceptions, and the dispatch agent it feeds into.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
  },
]

export default function BlogPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState('')

  const handleSubscribe = async () => {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    if (!valid) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to subscribe')
      setSubscribed(true)
      setEmail('')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <>
      <PageHero
        label="Blog"
        title="Insights From The<br />AI Trenches."
        subtitle="Technical deep-dives, domain-specific insights, and our thoughts on the future of enterprise AI. No fluff, just what we're learning."
      />

      <div className="section-outer" style={{ position: 'relative' }}>
        <ARVRScene />
        <div className="section">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 32 }}>
            {posts.map(post => (
              <div key={post.title} className="prod-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ height: 200, width: '100%', overflow: 'hidden' }}>
                  <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '28px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span className="prod-badge" style={{ background: 'var(--bg)', color: 'var(--accent)' }}>{post.category}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--gray-1)' }}>{post.date}</span>
                  </div>
                  <div className="prod-title" style={{ fontSize: '1.2rem', lineHeight: 1.3 }}>{post.title}</div>
                  <div className="prod-desc" style={{ marginTop: 12, marginBottom: 20 }}>{post.desc}</div>
                  <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>By {post.author}</div>
                    <button 
                      onClick={() => navigate('/contact')}
                      style={{ background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                    >
                      Read More
                      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '0 40px 120px' }}>
        <div className="cta-dark-strip" style={{ maxWidth: 1280, margin: '0 auto', background: 'var(--black)', borderRadius: 24, padding: '64px 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 32, position: 'relative', overflow: 'hidden' }}>
          <ARVRScene />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#555', marginBottom: 14 }}>Stay Updated</div>
            <div className="cta-dark-strip-title" style={{ fontWeight: 800, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.03em', color: 'white', lineHeight: 1.1 }}>
              Get our technical<br />insights in your inbox.
            </div>
          </div>
          <div className="cta-dark-strip-btns" style={{ display: 'flex', flexDirection: 'column', gap: 10, position: 'relative', zIndex: 3 }}>
            {subscribed ? (
              <div style={{ color: '#7dffb3', fontWeight: 700, fontSize: '1rem', padding: '14px 0' }}>
                ✓ You're subscribed! We'll be in touch.
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <input
                    type="email"
                    placeholder="Your work email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError('') }}
                    onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                    style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${error ? '#ff6b6b' : 'rgba(255,255,255,0.1)'}`, borderRadius: 100, padding: '14px 24px', color: 'white', width: 280, fontFamily: 'var(--font)', outline: 'none' }}
                  />
                  <button onClick={handleSubscribe} style={{ background: 'white', color: 'var(--black)', border: 'none', fontFamily: 'var(--font)', fontSize: '0.95rem', fontWeight: 700, padding: '14px 32px', borderRadius: 100, cursor: 'pointer' }}>
                    Subscribe
                  </button>
                </div>
                {error && <div style={{ color: '#ff6b6b', fontSize: '0.8rem', paddingLeft: 20 }}>{error}</div>}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
