import PageHero from '../components/PageHero'
import ARVRScene from '../components/ARVRScene'

export default function SecurityPage() {
  return (
    <>
      <PageHero
        label="Legal"
        title="Security"
        subtitle="Our commitment to keeping your data and systems safe and compliant."
      />
      <div className="section-outer" style={{ position: 'relative' }}>
        <ARVRScene />
        <div className="section">
          <div style={{ maxWidth: 800, margin: '0 auto', fontSize: '1rem', lineHeight: 1.8, color: '#444' }}>
            <h3 style={{ color: 'var(--black)', marginTop: 40, marginBottom: 16 }}>1. Infrastructure Security</h3>
            <p>Our platforms are built on enterprise-grade infrastructure with multi-layered security. We utilize SOC 2 Type II compliant data centers and maintain strict access controls.</p>
            
            <h3 style={{ color: 'var(--black)', marginTop: 40, marginBottom: 16 }}>2. Data Encryption</h3>
            <p>All data is encrypted at rest using AES-256 and in transit using TLS 1.2 or higher. We employ industry-standard key management practices.</p>
            
            <h3 style={{ color: 'var(--black)', marginTop: 40, marginBottom: 16 }}>3. Compliance & Auditing</h3>
            <p>We undergo regular security audits and vulnerability assessments. Our healthcare solutions are HIPAA compliant, and our financial solutions adhere to relevant data protection standards.</p>
            
            <h3 style={{ color: 'var(--black)', marginTop: 40, marginBottom: 16 }}>4. AI Guardrails</h3>
            <p>We implement robust guardrails to prevent model hallucinations, data leakage, and unauthorized tool use. Our "TestMind" platform is used internally to validate every system we ship.</p>
            
            <h3 style={{ color: 'var(--black)', marginTop: 40, marginBottom: 16 }}>5. Reporting Vulnerabilities</h3>
            <p>If you believe you have found a security vulnerability in any of our services, please report it to us immediately at security@intellicodelabs.com.</p>
          </div>
        </div>
      </div>
    </>
  )
}
