import React, { useState } from 'react'
import PageHero from '../components/PageHero'
import ARVRScene from '../components/ARVRScene'

const services = [
  'AI Testing & Evaluation',
  'Agentic AI Systems',
  'Prompt Engineering & PromptOps',
  'Voice AI / Contact Center',
  'Healthcare Insurance AI',
  'Logistics Intelligence',
  'Custom AI Build',
  "Not Sure — Let's Talk",
]

const faqs = [
  {
    q: 'How quickly can you start a project?',
    a: 'Usually within 2 weeks of a signed agreement. We keep a small number of active projects to ensure focus and quality.',
  },
  {
    q: 'Do you work with companies outside the US?',
    a: 'Yes. We work with clients globally. Most of our collaboration is async-first with regular video syncs tailored to your timezone.',
  },
  {
    q: 'What does a typical engagement cost?',
    a: 'Projects range from $25k for a focused AI audit to $250k+ for full platform builds. We scope every engagement based on your specific requirements.',
  },
  {
    q: 'Do you sign NDAs?',
    a: 'Absolutely. We sign mutual NDAs before any substantive conversations about your data, workflows, or systems.',
  },
  {
    q: 'Can you work with our existing stack?',
    a: 'Yes. We are infrastructure-agnostic and integration-first. We\'ve shipped on AWS, GCP, Azure, and on-prem environments.',
  },
  {
    q: 'What happens after we launch?',
    a: 'All production deployments include a monitoring and support period. We offer ongoing managed services for clients who need continuous optimization.',
  },
]

interface FormData {
  name: string
  email: string
  company: string
  service: string
  message: string
}

const offices = [
  {
    country: 'United States',
    name: 'Headquarters',
    city: 'Alpharetta, GA',
    address: '5865, North Point Pkwy, Suite 250, Alpharetta, GA 30022',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.672462319088!2d-84.281878!3d34.052234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f575646f901235%3A0xc3f84860b77761!2s5865%20North%20Point%20Pkwy%20%23250%2C%20Alpharetta%2C%20GA%2030022!5e0!3m2!1sen!2sus!4v1714742400000!5m2!1sen!2sus',
    dirUrl: 'https://www.google.com/maps/dir//5865+North+Point+Pkwy+Suite+250,+Alpharetta,+GA+30022',
  },
  {
    country: 'Canada',
    name: 'VPC Partners Inc',
    city: 'Stoney Creek, ON',
    address: '9A Glenhollow Drive, Stoney Creek, ON L8J 3T9',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2906.666!2d-79.789!3d43.123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDA3JzIyLjgiTiA3OcKwNDcnMjAuNCJX!5e0!3m2!1sen!2sca!4v1714742400000!5m2!1sen!2sca',
    dirUrl: 'https://www.google.com/maps/dir//9A+Glenhollow+Drive,+Stoney+Creek,+ON+L8J+3T9',
  },
  {
    country: 'India',
    name: 'India H.Q',
    city: 'Hyderabad',
    address: '2nd Floor, Trendz Avenue, Plot No.-12, Madhapur, Hyderabad, 500081',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.123!2d78.389!3d17.445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI2JzQyLjAiTiA3OMKwMjMnMjAuNCJF!5e0!3m2!1sen!2sin!4v1714742400000!5m2!1sen!2sin',
    dirUrl: 'https://www.google.com/maps/dir//Trendz+Avenue,+Madhapur,+Hyderabad,+500081',
  },
  {
    country: 'India',
    name: 'Delivery Office',
    city: 'Delhi',
    address: 'A-11, Ramesh Enclave, Opp. RK Plaza, Rohini, Delhi 110086',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.123!2d77.089!3d28.723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDQzJzIyLjgiTiA3N8KwMDUnMjAuNCJF!5e0!3m2!1sen!2sin!4v1714742400000!5m2!1sen!2sin',
    dirUrl: 'https://www.google.com/maps/dir//A-11,+Ramesh+Enclave,+Rohini,+Delhi+110086',
  },
]

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', company: '', service: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => { setSubmitting(false); setSuccess(true) }, 1400)
  }

  return (
    <>
      <PageHero
        label="Contact Us"
        title="Let's Build Something Real."
        subtitle="Tell us your challenge. We'll come back with a scoped plan, honest timeline, and what real results look like for your domain."
      />

      {/* Contact form + info */}
      <div className="contact-section" style={{ paddingTop: 80, position: 'relative', overflow: 'hidden' }}>
        <ARVRScene />
        <div className="contact-inner" style={{ position: 'relative', zIndex: 3 }}>
          {/* Left */}
          <div className="contact-left">
            <span className="section-label">Get In Touch</span>
            <h2 className="section-title">We Respond<br />Within 24 Hours.</h2>
            <p className="section-sub">No pitch decks, no account managers. You talk directly with the engineers who will build your system.</p>

            <div className="contact-items">
              {[
                {
                  icon: <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="oklch(0.48 0.14 232)" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" /><polyline points="22,6 12,13 2,6" /></svg>,
                  title: 'Email',
                  text: 'hello@intellicodelabs.com',
                },
                {
                  icon: <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="oklch(0.48 0.14 232)" strokeWidth="1.8"><path d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" /></svg>,
                  title: 'Discovery Call',
                  text: '30-minute sessions available Monday–Friday via Calendly.',
                },
                {
                  icon: <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="oklch(0.48 0.14 232)" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" strokeLinecap="round" strokeLinejoin="round" /></svg>,
                  title: 'Response Time',
                  text: 'Initial response within 24 hrs. Proposal within 3 business days.',
                },
              ].map(item => (
                <div key={item.title} className="contact-item">
                  <div className="contact-item-icon">{item.icon}</div>
                  <div>
                    <div className="contact-item-title">{item.title}</div>
                    <div className="contact-item-text">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 48, background: 'var(--black)', borderRadius: 16, padding: '28px' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', marginBottom: 14 }}>What to expect</div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', lineHeight: 1.65, color: '#ddd' }}>
                "Average time from first call to working prototype: under 3 weeks."
              </div>
              <div style={{ marginTop: 12, fontSize: '0.8rem', color: '#555' }}>— IntelliCodeLabs Engineering Team</div>
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
                <div className="form-success-text">We'll review your request and reach out within 24 hours to schedule a discovery call.</div>
                <button className="btn-hero-secondary" style={{ marginTop: 8 }} onClick={() => { setSuccess(false); setForm({ name: '', email: '', company: '', service: '', message: '' }) }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <div className="form-title">Tell Us About Your Project</div>
                <div className="form-subtitle">Fill in the details and we'll come back within one business day.</div>
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="name">Full Name *</label>
                      <input id="name" name="name" type="text" className="form-input" placeholder="Jane Smith" required value={form.name} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="email">Work Email *</label>
                      <input id="email" name="email" type="email" className="form-input" placeholder="jane@company.com" required value={form.email} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="company">Company</label>
                      <input id="company" name="company" type="text" className="form-input" placeholder="Acme Corp" value={form.company} onChange={handleChange} />
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
                    <label className="form-label" htmlFor="message">Describe Your Challenge *</label>
                    <textarea id="message" name="message" className="form-textarea" placeholder="What workflow are you trying to improve? What does success look like?" required value={form.message} onChange={handleChange} />
                  </div>
                  <button type="submit" className="form-submit" disabled={submitting}>
                    {submitting ? (
                      <><svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" /></svg>Sending…</>
                    ) : (
                      <>Send Message <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" /></svg></>
                    )}
                  </button>
                  <p style={{ marginTop: 14, fontSize: '0.78rem', color: '#aaa', textAlign: 'center', lineHeight: 1.5 }}>
                    No spam. No commitments. Just a conversation.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ background: 'var(--bg)', padding: '100px 40px', position: 'relative', overflow: 'hidden' }} className="faq-section">
        <ARVRScene />
        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 3 }}>
          <span className="section-label">Common Questions</span>
          <h2 className="section-title" style={{ marginBottom: 48 }}>FAQ</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--white)', borderRadius: 16, overflow: 'hidden',
                  border: '1px solid rgba(0,0,0,0.05)',
                  position: 'relative', zIndex: 4
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--font)', textAlign: 'left', gap: 16,
                  }}
                >
                  <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--black)' }}>{faq.q}</span>
                  <svg
                    width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="var(--gray-1)" strokeWidth="2"
                    style={{ flexShrink: 0, transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                  >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 24px 20px', fontSize: '0.9rem', color: '#666677', lineHeight: 1.7 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Global Offices */}
      <div className="section-outer" style={{ position: 'relative', background: 'var(--white)' }}>
        <ARVRScene />
        <div className="section" style={{ position: 'relative', zIndex: 3 }}>
          <span className="section-label">Our Presence</span>
          <h2 className="section-title" style={{ marginBottom: 56 }}>Global Offices</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {offices.map((office, i) => (
              <div key={i} className="prod-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: 200, width: '100%', background: '#eee' }}>
                  <iframe
                    src={office.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={office.name}
                  />
                </div>
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <span className="prod-badge" style={{ background: 'var(--bg)', color: 'var(--accent)' }}>{office.country}</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gray-1)' }}>{office.city}</span>
                  </div>
                  <div className="prod-title" style={{ fontSize: '1.1rem', marginBottom: 8 }}>{office.name}</div>
                  <div className="prod-desc" style={{ fontSize: '0.85rem', lineHeight: 1.5, marginBottom: 20 }}>{office.address}</div>
                  <div style={{ marginTop: 'auto' }}>
                    <a
                      href={office.dirUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent)',
                        textDecoration: 'none', transition: 'gap 0.2s'
                      }}
                      onMouseOver={e => (e.currentTarget.style.gap = '12px')}
                      onMouseOut={e => (e.currentTarget.style.gap = '8px')}
                    >
                      Get Directions
                      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
