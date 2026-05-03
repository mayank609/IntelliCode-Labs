import PageHero from '../components/PageHero'
import ARVRScene from '../components/ARVRScene'

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        label="Legal"
        title="Privacy Policy"
        subtitle="Last Updated: May 3, 2026. Your privacy and data security are our top priorities."
      />
      <div className="section-outer" style={{ position: 'relative' }}>
        <ARVRScene />
        <div className="section">
          <div style={{ maxWidth: 800, margin: '0 auto', fontSize: '1rem', lineHeight: 1.8, color: '#444' }}>
            <h3 style={{ color: 'var(--black)', marginTop: 40, marginBottom: 16 }}>1. Information We Collect</h3>
            <p>At IntelliCodeLabs, we collect information that you provide directly to us when you request a demo, sign up for our newsletter, or contact us for support. This may include your name, email address, company name, and any other information you choose to provide.</p>
            
            <h3 style={{ color: 'var(--black)', marginTop: 40, marginBottom: 16 }}>2. How We Use Your Information</h3>
            <p>We use the information we collect to provide, maintain, and improve our services, to communicate with you about your account and our products, and to respond to your inquiries.</p>
            
            <h3 style={{ color: 'var(--black)', marginTop: 40, marginBottom: 16 }}>3. Data Security</h3>
            <p>We implement appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure.</p>
            
            <h3 style={{ color: 'var(--black)', marginTop: 40, marginBottom: 16 }}>4. HIPAA Compliance</h3>
            <p>For our healthcare insurance clients, we operate as a Business Associate and maintain strict HIPAA compliance protocols. All patient data is handled with the highest level of security and confidentiality required by law.</p>
            
            <h3 style={{ color: 'var(--black)', marginTop: 40, marginBottom: 16 }}>5. Contact Us</h3>
            <p>If you have any questions about this Privacy Policy, please contact us at hello@intellicodelabs.com.</p>
          </div>
        </div>
      </div>
    </>
  )
}
