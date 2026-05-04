import Hero from '../components/Hero'
import Ticker from '../components/Ticker'
import Highlights from '../components/Highlights'
import Testimonials from '../components/Testimonials'
import Sparkline from '../components/ui/Sparkline'
import TechMarquee from '../components/ui/TechMarquee'
import AnimatedCounter from '../components/ui/AnimatedCounter'
import ARVRScene from '../components/ARVRScene'
import Products from '../components/Products'
import Industries from '../components/Industries'
import CTA from '../components/CTA'

export default function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <TechMarquee />
      <Ticker />
      <div className="section-outer" style={{ position: 'relative' }}>
        <ARVRScene />
        <Highlights />
      </div>

      {/* Products — all four products with sparklines */}
      <Products />

      {/* Industries — with donut chart metrics */}
      <Industries />

      {/* Key metrics strip */}
      <div className="section-outer">
        <ARVRScene />
        <div className="section" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, background: 'var(--gray-2)', borderRadius: 20, overflow: 'hidden' }}>
            {[
              { val: <AnimatedCounter value={50} suffix="+" />, label: 'Enterprise Deployments', spark: [10,14,12,18,15,20,17,22,19,24,25] },
              { val: <AnimatedCounter value={99.4} decimals={1} suffix="%" />, label: 'System Uptime SLA', spark: [42,44,43,45,44,46,45,47,46,48,47] },
              { val: <AnimatedCounter value={200} prefix="<" suffix="ms" />, label: 'Voice AI Latency', spark: [30,28,26,24,22,21,20,19,18,17,16] },
              { val: <AnimatedCounter value={3} suffix="×" />, label: 'Avg. Throughput Improvement', spark: [10,15,20,25,22,28,24,30,26,32,30] },
            ].map((item, i) => (
              <div key={item.label} className={`reveal-on-scroll reveal-delay-${(i + 1) * 100}`} style={{ background: 'var(--white)', padding: '36px 32px' }}>
                <div style={{ fontWeight: 800, fontSize: '2.2rem', letterSpacing: '-0.04em', color: 'var(--black)', lineHeight: 1, marginBottom: 6 }}>{item.val}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--gray-1)', marginBottom: 16 }}>{item.label}</div>
                <Sparkline color="oklch(0.48 0.14 232)" data={item.spark} height={36} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section-outer" style={{ position: 'relative' }}>
        <ARVRScene />
        <Testimonials />
      </div>

      {/* Contact form + dark CTA strip */}
      <CTA />
    </div>
  )
}
