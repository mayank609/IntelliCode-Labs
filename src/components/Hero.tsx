import Sparkline from './ui/Sparkline'
import ARVRScene from './ARVRScene'
import { motion, Variants } from 'framer-motion'

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' })
}

const stats = [
  { val: '50+', label: 'Enterprise Deployments' },
  { val: '99.4%', label: 'System Uptime SLA' },
  { val: '<200ms', label: 'Voice AI Latency' },
  { val: '12 Wks', label: 'Avg. To Production' },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
}

export default function Hero() {
  return (
    <section className="hero" id="home" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="hero-grid" />
      <div className="hero-blob hero-blob-1" />
      <div className="hero-blob hero-blob-2" />
      <div className="hero-blob hero-blob-3" />
      <ARVRScene />

      {/* Floating card — left */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        className="float-card float-card-1 hero-float-left" 
        style={{ top: '32%', left: '3%', width: 196 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <div className="fc-label">Activity</div>
            <div className="fc-value">29 hrs<br />Smart Work</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.63rem', color: 'var(--gray-1)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4a6cf7', display: 'inline-block' }} />
              7 Days
            </div>
            <Sparkline color="#4a6cf7" data={[30, 42, 28, 50, 38, 60, 44, 55, 62, 50, 68]} height={44} />
          </div>
        </div>
      </motion.div>

      {/* Floating card — right */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        className="float-card float-card-2 hero-float-right" 
        style={{ top: '32%', right: '3%', width: 208 }}
      >
        <div className="fc-label">AI Campaigns</div>
        <div className="fc-value" style={{ fontSize: '2rem' }}>7,450</div>
        <div style={{ marginTop: 10 }}>
          <Sparkline color="#52b89a" data={[10, 14, 12, 18, 15, 20, 17, 22, 19, 24, 25]} height={48} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            {['01', '05', '10', '15', '20', '25'].map(n => (
              <span key={n} style={{ fontSize: '0.58rem', color: 'var(--gray-1)' }}>{n}</span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main centered content */}
      <motion.div 
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="hero-badge">
          <span className="hero-badge-dot" />
          <span className="hero-badge-text">AI Professional Services Platform</span>
          <span className="hero-badge-new">NEW</span>
        </motion.div>

        <motion.h1 variants={itemVariants} className="hero-headline">
          Build Enterprise AI<br />
          That <span className="grad-text">Actually Works.</span>
        </motion.h1>

        <motion.p variants={itemVariants} className="hero-subtext">
          Precision AI systems for healthcare insurance, logistics &amp; contact centers —
          engineered to think, learn, and scale with your enterprise from day one.
        </motion.p>

        <motion.div variants={itemVariants} className="hero-actions">
          <button className="btn-hero-primary" onClick={() => scrollTo('contact')}>
            Get A Demo
            <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="btn-hero-secondary" onClick={() => scrollTo('products')}>
            View Our Products
          </button>
        </motion.div>

        <motion.div variants={itemVariants} className="hero-trust">
          <span className="hero-trust-label">Trusted by</span>
          <span className="hero-trust-sep" />
          <span className="hero-trust-name">Regional Health Plans</span>
          <span className="hero-trust-sep" />
          <span className="hero-trust-name">Logistics Enterprises</span>
          <span className="hero-trust-sep" />
          <span className="hero-trust-name">InsureTech Startups</span>
          <span className="hero-trust-sep" />
          <span className="hero-trust-name">Contact Centers</span>
        </motion.div>
      </motion.div>

      {/* Stats bar */}
      <motion.div 
        className="hero-stats-bar"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        {stats.map(s => (
          <div key={s.val} className="hero-stat">
            <div className="hero-stat-val">{s.val}</div>
            <div className="hero-stat-label">{s.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
