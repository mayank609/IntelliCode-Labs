import React, { useState } from 'react'

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' })
}

const services = [
  'AI Testing & Evaluation',
  'Agentic AI Systems',
  'Prompt Engineering & PromptOps',
  'Voice AI / Contact Center',
  'Healthcare Insurance AI',
  'Logistics Intelligence',
  'Custom AI Build',
  'Not Sure — Let\'s Talk',
]

const contactItems = [
  {
    icon: (
      <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="oklch(0.48 0.14 232)" strokeWidth="1.8">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: 'Email Us',
    text: 'hello@intellicodelabs.com\nWe reply within 24 hours.',
  },
  {
    icon: (
      <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="oklch(0.48 0.14 232)" strokeWidth="1.8">
        <path d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Book A Call',
    text: '30-minute discovery sessions\navailable Monday – Friday.',
  },
  {
    icon: (
      <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="oklch(0.48 0.14 232)" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12,6 12,12 16,14" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Fast Turnaround',
    text: 'Initial proposal delivered\nwithin 3 business days.',
  },
]

interface FormData {
  name: string
  email: string
  company: string
  service: string
  message: string
}

export default function CTA() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', company: '', service: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSuccess(true)
    }, 1400)
  }

  return (
    <div className="contact-section" id="contact">
      <div className="contact-inner">
        {/* Left — info */}
        <div className="contact-left">
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title">Ready To Deploy<br />AI That Works?</h2>
          <p className="section-sub">
            Tell us about your challenge. We'll come back with a scoped plan, timeline, and what real results look like for your domain.
          </p>

          <div className="contact-items">
            {contactItems.map(item => (
              <div key={item.title} className="contact-item">
                <div className="contact-item-icon">{item.icon}</div>
                <div>
                  <div className="contact-item-title">{item.title}</div>
                  <div className="contact-item-text" style={{ whiteSpace: 'pre-line' }}>{item.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Social proof note */}
          <div style={{
            marginTop: 48, background: 'var(--black)', borderRadius: 16, padding: '24px 28px', color: 'white',
          }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', marginBottom: 12 }}>
              What to expect
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.95rem', lineHeight: 1.6, color: '#ddd' }}>
              "Our average time from first call to a working AI prototype is under 3 weeks."
            </div>
            <div style={{ marginTop: 12, fontSize: '0.8rem', color: '#666' }}>— IntelliCodeLabs Engineering Team</div>
          </div>
        </div>

        {/* Right — form */}
        <div className="contact-form-wrap">
          {success ? (
            <div className="form-success">
              <div className="form-success-icon">
                <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="oklch(0.52 0.12 168)" strokeWidth="2.5">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="form-success-title">Message Received!</div>
              <div className="form-success-text">
                We'll review your request and reach out within 24 hours to schedule a discovery call.
              </div>
              <button
                className="btn-hero-secondary"
                style={{ marginTop: 8 }}
                onClick={() => { setSuccess(false); setForm({ name: '', email: '', company: '', service: '', message: '' }) }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <>
              <div className="form-title">Let's Talk</div>
              <div className="form-subtitle">Fill in the details below and we'll get back to you within one business day.</div>

              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Full Name *</label>
                    <input
                      id="name" name="name" type="text" className="form-input"
                      placeholder="Jane Smith" required value={form.name} onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Work Email *</label>
                    <input
                      id="email" name="email" type="email" className="form-input"
                      placeholder="jane@company.com" required value={form.email} onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="company">Company</label>
                    <input
                      id="company" name="company" type="text" className="form-input"
                      placeholder="Acme Corp" value={form.company} onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="service">Area of Interest</label>
                    <select id="service" name="service" className="form-select" value={form.service} onChange={handleChange}>
                      <option value="">Select a service…</option>
                      {services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">Tell Us About Your Challenge *</label>
                  <textarea
                    id="message" name="message" className="form-textarea"
                    placeholder="Describe your current workflow, pain points, or what you'd like AI to do for your business…"
                    required value={form.message} onChange={handleChange}
                  />
                </div>

                <button type="submit" className="form-submit" disabled={submitting}>
                  {submitting ? (
                    <>
                      <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </button>

                <p style={{ marginTop: 14, fontSize: '0.78rem', color: '#aaa', textAlign: 'center', lineHeight: 1.5 }}>
                  No spam. No commitments. Just a conversation about what AI can do for your business.
                </p>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Dark CTA strip above footer */}
      <div className="cta-dark-strip" style={{
        maxWidth: 1280, margin: '80px auto 0',
        background: 'var(--black)', borderRadius: 24, padding: '64px 56px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 32,
      }}>
        <div>
          <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#555', marginBottom: 14 }}>
            Start Today
          </div>
          <div className="cta-dark-strip-title" style={{ fontWeight: 800, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.03em', color: 'white', lineHeight: 1.1 }}>
            The Future of Enterprise<br />AI Is Already Here.
          </div>
        </div>
        <div className="cta-dark-strip-btns" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', flexShrink: 0 }}>
          <button
            onClick={() => scrollTo('contact')}
            style={{
              background: 'white', color: 'var(--black)', border: 'none',
              fontFamily: 'var(--font)', fontSize: '0.95rem', fontWeight: 700,
              padding: '14px 32px', borderRadius: 100, cursor: 'pointer',
              transition: 'opacity 0.2s, transform 0.15s',
            }}
            onMouseOver={e => (e.currentTarget.style.opacity = '0.88')}
            onMouseOut={e => (e.currentTarget.style.opacity = '1')}
          >
            Book A Demo
          </button>
          <button
            onClick={() => scrollTo('products')}
            style={{
              background: 'transparent', color: 'white', border: '1.5px solid #333',
              fontFamily: 'var(--font)', fontSize: '0.95rem', fontWeight: 600,
              padding: '13px 30px', borderRadius: 100, cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#666')}
            onMouseOut={e => (e.currentTarget.style.borderColor = '#333')}
          >
            View Products
          </button>
        </div>
      </div>
    </div>
  )
}
